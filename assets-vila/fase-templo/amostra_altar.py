# Amostra do novo visual do templo: o altar dos holocaustos (com a lenha e o fogo), um trecho do Pátio dos Sacerdotes,
# os doze degraus e a fachada do santuário. Roda dentro do Blender (MCP): exec(open(<este arquivo>).read()).
# Tudo em metros, Z para cima, X = leste do jogo, Y = norte do jogo (Blender), o centro do altar na origem e o chão do
# Pátio dos Sacerdotes em z = 0. A luz (sol da manhã, sombras projetadas e cantos escuros) é pintada na cor de vértice;
# a textura multiplica por ela.
#
# Fontes das medidas (reduzidas para a escala do jogo, como no resto do templo):
#   - o altar (Mishná, Middot 3.1-4): base (yesod), um côvado acima; o rebordo (sovev) onde os sacerdotes andavam; os
#     quatro chifres; a linha vermelha no meio da altura, que separava o sangue de cima do de baixo; a rampa ao sul,
#     sem degraus (Êx 20.26); as pedras brutas, não lavradas pelo ferro (Êx 20.25; Dt 27.5-6), caiadas.
#   - no alto (Mishná, Tamid 2): a pilha grande da lenha a leste, a segunda pilha (as brasas do incenso) e o monte de
#     cinzas no centro (o "tapuach").
#   - a fachada (Josefo, Guerras V.5.4; Antiguidades XV.11.3): o pórtico sem portas, a parede de dentro dourada, a
#     cortina bordada em azul, linho, escarlate e púrpura, e a videira de ouro com cachos sobre a porta de dentro.
import bpy, math, random
import numpy as np
from mathutils import Vector as V, noise
from mathutils.bvhtree import BVHTree

BASE = 'M:/Claude/github/Projects-animais/assets-vila/fase-templo/'
TEX = {'altar': BASE + 'texturas/originais/pedra_altar_v1.webp', 'muro': BASE + 'texturas/originais/muro_herodiano_v3.webp',
       'ouro': BASE + 'texturas/originais/ouro_v2.webp', 'cortina': BASE + 'texturas/originais/cortina_v1.webp',
       'lajes': BASE + 'texturas/originais/lajes_patio_v2.webp', 'madeira': BASE + 'texturas/originais/lenha_v1.webp',
       'chama': BASE + 'texturas/chama_recorte.png'}
TILE = {'altar': 3.6, 'muro': 13.0, 'branco': 13.0, 'lajes': 8.0, 'madeira': 1.6, 'ouro': 4.0, 'cortina': 5.5}
TEX['branco'] = BASE + 'texturas/muro_branco.png'
MATS = ['altar', 'muro', 'lajes', 'madeira', 'chama', 'liso', 'brasa', 'branco', 'fogo', 'ouro', 'cortina']
SUN = V((0.82, -0.30, 0.50)).normalized()       # o sol da manhã, do leste
R = random.Random(11)
COLL = 'AmostraTemplo'

def smooth(a, b, x):
    t = max(0.0, min(1.0, (x - a) / (b - a))); return t * t * (3 - 2 * t)
def mix(a, b, t): return tuple(a[i] + (b[i] - a[i]) * t for i in range(3))
def mul(a, b): return tuple(a[i] * b[i] for i in range(3))

# ---------------------------------------------------------------- a chama: tira o fundo branco
def recorta_chama():
    import os
    if os.path.exists(TEX['chama']): return
    im = bpy.data.images.load(BASE + 'texturas/originais/chama_v1.webp')
    w, h = im.size; px = np.array(im.pixels[:], dtype=np.float32).reshape(h, w, 4)
    d = np.max(1.0 - px[:, :, :3], axis=2)
    a = np.clip((d - 0.05) / 0.10, 0, 1)
    px[:, :, 3] = a
    # o branco que sobra na borda vira a cor da chama vizinha (sem halo claro)
    out = bpy.data.images.new('chama_recorte', w, h, alpha=True); out.pixels[:] = px.ravel()
    out.filepath_raw = TEX['chama']; out.file_format = 'PNG'; out.save()
    bpy.data.images.remove(im); bpy.data.images.remove(out)

# ---------------------------------------------------------------- o muro do santuário: a mesma pedra, clareada
def clareia_muro():
    im = bpy.data.images.load(TEX['muro'], check_existing=True)
    w, h = im.size; px = np.array(im.pixels[:], dtype=np.float32).reshape(h, w, 4)
    px[:, :, :3] = px[:, :, :3] * 0.55 + np.array([0.45, 0.44, 0.41], dtype=np.float32)
    out = bpy.data.images.get('muro_branco') or bpy.data.images.new('muro_branco', w, h)
    out.pixels[:] = px.ravel(); out.filepath_raw = TEX['branco']; out.file_format = 'PNG'; out.save()

# ---------------------------------------------------------------- a malha
class Malha:
    def __init__(s): s.v = []; s.f = []
    def face(s, pts, mat, cor=(1, 1, 1), uv=None, luz=True, sombra=True, jit=0.0, corfn=None, n0=None):
        i0 = len(s.v); s.v.extend([V(p) for p in pts])
        s.f.append(dict(idx=list(range(i0, i0 + len(pts))), mat=mat, cor=cor, uv=uv, luz=luz, sombra=sombra, jit=jit, corfn=corfn, n0=n0))
M = Malha()

def normal(pts):
    n = V((0, 0, 0))
    for i in range(len(pts)):
        a, b = pts[i], pts[(i + 1) % len(pts)]
        n.x += (a.y - b.y) * (a.z + b.z); n.y += (a.z - b.z) * (a.x + b.x); n.z += (a.x - b.x) * (a.y + b.y)
    return n.normalized() if n.length > 1e-9 else V((0, 0, 1))

def uv_plano(p, n, T):
    if abs(n.z) > 0.7: return (p.x / T, p.y / T)
    t = V((-n.y, n.x, 0)).normalized(); return (p.dot(t) / T, p.z / T)

# quadrilátero subdividido (a, b embaixo; c, d em cima; vira para fora pela regra da mão direita a→b→c)
def grade(a, b, c, d, mat, nu, cortes, **kw):
    a, b, c, d = V(a), V(b), V(c), V(d)
    P = lambda u, t: (a.lerp(b, u)).lerp(d.lerp(c, u), t)
    for i in range(nu):
        for j in range(len(cortes) - 1):
            u0, u1, t0, t1 = i / nu, (i + 1) / nu, cortes[j], cortes[j + 1]
            M.face([P(u0, t0), P(u1, t0), P(u1, t1), P(u0, t1)], mat, **kw)

def cortes_em(z0, z1, passo, extras=()):
    zs = sorted(set([z0, z1] + [z for z in extras if z0 < z < z1]))
    out = [zs[0]]
    for z in zs[1:]:
        n = max(1, round((z - out[-1]) / passo))
        base = out[-1]
        for k in range(1, n + 1): out.append(base + (z - base) * k / n)
    return [(z - z0) / (z1 - z0) for z in out]

# bloco: paredes um pouco inclinadas (bat), quina de cima chanfrada (ch), topo; sem fundo, a não ser que peça
def bloco(x0, x1, y0, y1, z0, z1, mat, mat_topo=None, bat=0.0, ch=0.05, jit=0.0, corfn=None, cor=(1, 1, 1), passo=0.6, extras=(), fundo=False, lados=(1, 1, 1, 1), topo=True):
    zt = z1 - ch; d1 = bat * (zt - z0); d2 = d1 + ch
    B = [V((x0, y0, z0)), V((x1, y0, z0)), V((x1, y1, z0)), V((x0, y1, z0))]
    def ins(p, d, z): return V((p.x + (d if p.x == x0 else -d), p.y + (d if p.y == y0 else -d), z))
    T1 = [ins(p, d1, zt) for p in B]; T2 = [ins(p, d2, z1) for p in B]
    kw = dict(jit=jit, corfn=corfn, cor=cor)
    for k in range(4):
        if not lados[k]: continue
        a, b = B[k], B[(k + 1) % 4]
        L = (b - a).length; nu = max(1, round(L / passo))
        grade(a, b, T1[(k + 1) % 4], T1[k], mat, nu, cortes_em(z0, zt, passo * 0.85, extras), **kw)
        if ch > 0: grade(T1[k], T1[(k + 1) % 4], T2[(k + 1) % 4], T2[k], mat, nu, [0, 1], **kw)
    if topo:
        a, b, c, d = T2
        nu = max(1, round((b - a).length / passo)); nv = max(1, round((d - a).length / passo))
        grade(a, b, c, d, mat_topo or mat, nu, [j / nv for j in range(nv + 1)], **kw)
    if fundo: M.face([B[3], B[2], B[1], B[0]], mat, **kw)

def prisma(a, b, r, lados, mat, cor=(1, 1, 1), rot=0.0, jit=0.0, luz=True, r2=None):
    a, b = V(a), V(b); ax = (b - a).normalized()
    u = ax.cross(V((0, 0, 1))) if abs(ax.z) < 0.9 else ax.cross(V((1, 0, 0))); u.normalize(); w = ax.cross(u)
    r2 = r if r2 is None else r2
    A = [a + (u * math.cos(rot + 2 * math.pi * k / lados) + w * math.sin(rot + 2 * math.pi * k / lados)) * r for k in range(lados)]
    Bp = [b + (u * math.cos(rot + 2 * math.pi * k / lados) + w * math.sin(rot + 2 * math.pi * k / lados)) * r2 for k in range(lados)]
    L = (b - a).length
    for k in range(lados):
        k2 = (k + 1) % lados
        uvs = [(k / lados * 0.6, 0), (k / lados * 0.6, L / TILE.get(mat, 1)), (k2 / lados * 0.6, L / TILE.get(mat, 1)), (k2 / lados * 0.6, 0)]   # o veio ao longo da tora
        M.face([A[k], Bp[k], Bp[k2], A[k2]][::-1], mat, cor=cor, uv=uvs[::-1], jit=jit, luz=luz)
    M.face(A[::-1] if False else A, mat, cor=mul(cor, (1.15, 1.05, 0.9)), jit=jit, luz=luz, uv=[(0.5 + 0.08 * math.cos(2 * math.pi * k / lados), 0.5 + 0.08 * math.sin(2 * math.pi * k / lados)) for k in range(lados)])
    M.face(Bp[::-1], mat, cor=mul(cor, (1.15, 1.05, 0.9)), jit=jit, luz=luz, uv=[(0.5, 0.5)] * lados)

def cartao(c, w, h, ang, mat='chama'):
    c = V(c); d = V((math.cos(ang), math.sin(ang), 0)) * (w / 2)
    M.face([c - d, c + d, c + d + V((0, 0, h)), c - d + V((0, 0, h))], mat, uv=[(0, 0), (1, 0), (1, 1), (0, 1)], luz=False, sombra=False)

# ================================================================ o chão do pátio
for i in range(-21, 10):
    for j in range(-16, 11):
        M.face([(i, j, 0), (i + 1, j, 0), (i + 1, j + 1, 0), (i, j + 1, 0)], 'lajes', cor=(1, 1, 1))

# ================================================================ o altar
CAL = (1.0, 1.0, 1.0)                                     # a cal
def cor_altar(p, fc=None, rampa=False):
    c = CAL
    if fc is not None and not rampa and 1.92 <= fc.z <= 2.06 and max(abs(fc.x), abs(fc.y)) > 3.9: c = (0.74, 0.20, 0.16)   # a linha vermelha
    c = mix(c, (0.60, 0.56, 0.52), 0.55 * smooth(2.9, 3.7, p.z) * smooth(3.5, 3.0, max(abs(p.x), abs(p.y))) if p.z > 3.55 else 0.35 * smooth(2.9, 3.6, p.z))  # fuligem
    if p.z > 3.55:                                       # as cinzas no alto, mais escuras perto do fogo
        dfogo = min(V((p.x - 1.7, p.y)).length, V((p.x, p.y - 0.3)).length)
        c = mix(c, (0.45, 0.43, 0.41), 0.75 * smooth(2.4, 0.6, dfogo))
    if p.z < 0.5:                                        # o pé do altar, onde o sangue era derramado (Lv 4.7)
        c = mix(c, (0.80, 0.72, 0.68), 0.5 * smooth(0.5, 0.0, p.z))
    return c
bloco(-4.5, 4.5, -4.5, 4.5, 0.0, 0.45, 'altar', ch=0.08, jit=0.025, corfn=cor_altar)                  # a base (yesod)
bloco(-4.1, 4.1, -4.1, 4.1, 0.45, 2.4, 'altar', bat=0.02, ch=0.07, jit=0.03, corfn=cor_altar, extras=(1.92, 2.06))
bloco(-3.7, 3.7, -3.7, 3.7, 2.4, 3.6, 'altar', bat=0.02, ch=0.07, jit=0.03, corfn=cor_altar)
for sx in (-1, 1):                                        # os quatro chifres
    for sy in (-1, 1):
        cx, cy = sx * 3.28, sy * 3.28
        bloco(cx - 0.38, cx + 0.38, cy - 0.38, cy + 0.38, 3.6, 4.45, 'altar', bat=0.22, ch=0.10, jit=0.015, corfn=lambda p, fc=None: mix(CAL, (0.72, 0.68, 0.62), 0.25 * smooth(3.6, 4.4, p.z)), passo=0.3)
# a rampa ao sul, sem degraus (Êx 20.26)
RY0, RY1 = -12.7, -3.7
def zr(y): return 3.6 * (y - RY0) / (RY1 - RY0)
cor_rampa = lambda p, fc=None: cor_altar(p, fc, True)
grade((-1.7, RY0, 0), (1.7, RY0, 0), (1.7, RY1, 3.6), (-1.7, RY1, 3.6), 'altar', 5, [j / 14 for j in range(15)], jit=0.02, corfn=cor_rampa)
for sx in (-1.7, 1.7):
    a, b = V((sx, RY0, 0)), V((sx, RY1, 0)); c, d = V((sx, RY1, 3.6)), V((sx, RY0, 0.0))
    if sx > 0: grade(a, b, c, d, 'altar', 14, [0, 0.25, 0.5, 0.75, 1], jit=0.025, corfn=cor_rampa)
    else: grade(b, a, d, c, 'altar', 14, [0, 0.25, 0.5, 0.75, 1], jit=0.025, corfn=cor_rampa)
# o monte de cinzas no centro (tapuach)
def monte(cx, cy, z, r, h, n=10, cor=(0.66, 0.64, 0.61)):
    an = [2 * math.pi * k / n + R.uniform(-0.15, 0.15) for k in range(n)]
    an_r = [(1.0, 0.0), (0.7, 0.55), (0.32, 0.9)]
    rings = [[V((cx + math.cos(a) * r * f * R.uniform(0.9, 1.08), cy + math.sin(a) * r * f * R.uniform(0.9, 1.08), z + h * t)) for a in an] for f, t in an_r]
    for q in range(len(rings) - 1):
        for k in range(n):
            k2 = (k + 1) % n; M.face([rings[q][k], rings[q][k2], rings[q + 1][k2], rings[q + 1][k]], 'liso', cor=cor)
    top = V((cx, cy, z + h))
    for k in range(n): M.face([rings[-1][k], rings[-1][(k + 1) % n], top], 'liso', cor=cor)
monte(0.0, 0.3, 3.6, 1.1, 0.75)
# a lenha (madeira de figueira, nogueira e oliveira: Tamid 2.3), em fogueiras armadas em grade
ZT = 3.6
def pilha(cx, cy, comp, camadas, n=4, r=0.11, queima=1.0):
    for k in range(camadas):
        z = ZT + r + k * 2 * r * 0.95
        for i in range(n):
            o = -comp * 0.38 + i * (comp * 0.76 / (n - 1)) + R.uniform(-0.05, 0.05)
            h = comp / 2 + R.uniform(-0.12, 0.12)
            carv = queima * smooth(camadas, 0, k + 0.5)        # as de baixo, mais queimadas
            cor = mix((1.0, 1.0, 1.0), (0.36, 0.31, 0.30), 0.9 * carv)
            if k % 2 == 0: a, b = (cx - h, cy + o, z), (cx + h, cy + o, z)
            else: a, b = (cx + o, cy - h, z), (cx + o, cy + h, z)
            prisma(a, b, r * R.uniform(0.85, 1.15), 6, 'madeira', cor=cor, rot=R.uniform(0, 1), jit=0.0)
pilha(1.7, 0.0, 2.2, 6, n=5)            # a pilha grande, a leste
pilha(-1.7, -2.0, 1.3, 3, n=3)          # a segunda: as brasas para o incenso
pilha(-1.8, 2.1, 1.1, 2, n=3, queima=0.2)
# as brasas entre a lenha
for i in range(26):
    x, y = 1.7 + R.uniform(-0.9, 0.9), R.uniform(-0.9, 0.9); s = R.uniform(0.07, 0.14)
    cor = mix((1.0, 0.35, 0.06), (1.0, 0.75, 0.25), R.random())
    bloco(x - s, x + s, y - s, y + s, ZT, ZT + s * 1.3, 'brasa', ch=0.02, cor=cor, passo=1)
for i in range(10):
    x, y = -1.7 + R.uniform(-0.5, 0.5), -2.0 + R.uniform(-0.5, 0.5); s = R.uniform(0.06, 0.1)
    bloco(x - s, x + s, y - s, y + s, ZT, ZT + s * 1.2, 'brasa', ch=0.02, cor=(1.0, 0.45, 0.1), passo=1)
# o fogo: línguas de chama com volume (facetadas, do miolo amarelo à ponta vermelha), e alguns cartões em volta para o
# contorno recortado. No jogo, cada língua sobe, balança e muda de altura.
FOGO = [(1.0, 0.88, 0.42), (1.0, 0.60, 0.14), (0.94, 0.36, 0.08), (0.74, 0.16, 0.06)]
def lingua(c, h, r, ang, curva, lados=6):
    c = V(c); dirc = V((math.cos(ang), math.sin(ang), 0))
    T = [0.0, 0.18, 0.40, 0.62, 0.82]
    an0 = R.uniform(0, 6.28)
    aneis = []
    for t in T:
        rr = r * (0.75 + 0.6 * math.sin(math.pi * min(1.0, t * 1.25))) * (1 - t) ** 0.7
        off = dirc * curva * h * t * t + V((0, 0, h * t))
        aneis.append([c + off + V((math.cos(an0 + 2 * math.pi * k / lados) * rr * R.uniform(0.85, 1.15), math.sin(an0 + 2 * math.pi * k / lados) * rr * R.uniform(0.85, 1.15), R.uniform(-0.04, 0.04) * h)) for k in range(lados)])
    ponta = c + dirc * curva * h * 1.05 + V((0, 0, h))
    def cor_t(z):
        t = (z - c.z) / h; i = min(2, int(t * 3)); return mix(FOGO[i], FOGO[i + 1], t * 3 - i)
    for q in range(len(aneis) - 1):
        for k in range(lados):
            k2 = (k + 1) % lados; pts = [aneis[q][k], aneis[q][k2], aneis[q + 1][k2], aneis[q + 1][k]]
            M.face(pts, 'fogo', corfn=lambda p, fc=None: cor_t(p.z), sombra=False, luz=False)
    for k in range(lados): M.face([aneis[-1][k], aneis[-1][(k + 1) % lados], ponta], 'fogo', corfn=lambda p, fc=None: cor_t(p.z), sombra=False, luz=False)
for (dx, dy, h, r) in ((0, 0, 3.0, 0.55), (0.55, 0.45, 2.2, 0.42), (-0.6, -0.35, 2.4, 0.45), (0.45, -0.55, 1.8, 0.38), (-0.5, 0.55, 1.9, 0.38),
                       (0.0, 0.75, 1.3, 0.3), (0.8, -0.1, 1.4, 0.32), (-0.8, 0.1, 1.5, 0.32), (0.2, -0.8, 1.2, 0.28)):
    lingua((1.7 + dx, dy, ZT + 0.2), h, r, math.atan2(dy, dx) if (dx or dy) else 0.0, 0.18 + R.uniform(-0.05, 0.08))
for (dx, dy, h, w) in ((0.1, 0.05, 2.6, 1.6), (-0.3, 0.3, 1.9, 1.2), (0.4, -0.3, 1.8, 1.1)):
    a0 = R.uniform(0, 3.14)
    for a in (a0, a0 + math.pi / 2): cartao((1.7 + dx, dy, ZT + 0.3), w, h, a)
for (dx, dy, h, r) in ((0, 0, 0.9, 0.22), (0.25, 0.2, 0.6, 0.16), (-0.2, 0.15, 0.55, 0.15)):
    lingua((-1.7 + dx, -2.0 + dy, ZT + 0.15), h, r, 0.5, 0.15)

# ================================================================ os degraus e a fachada do santuário
FX = -15.0; YP = 3.0                                         # a frente do pórtico; o piso do pórtico
# os doze degraus (Middot 3.6), em quatro lances de três, com um patamar entre os lances, e as muretas dos lados
x, h = FX, YP; YD = 10.3
def degrau(xa, xb, h):          # o espelho, recuado, e o piso com o bocel saliente (a sombra fina embaixo marca o degrau)
    bloco(xa, xb, -YD, YD, 0.0, h, 'branco', ch=0.04, passo=2.6, lados=(0, 1, 0, 0), cor=(0.98, 0.97, 0.94))
for g in range(4):
    for k in range(3):
        h -= YP / 12
        degrau(x, x + 0.45, h)
        bloco(x, x + 0.45, -11.0, -YD, 0.0, h + 0.85, 'branco', ch=0.06, passo=1.0, lados=(1, 1, 1, 1), corfn=None, cor=(0.96, 0.95, 0.92))
        bloco(x, x + 0.45, YD, 11.0, 0.0, h + 0.85, 'branco', ch=0.06, passo=1.0, lados=(1, 1, 1, 1), corfn=None, cor=(0.96, 0.95, 0.92))
        x += 0.45
    if g < 3:
        degrau(x, x + 1.0, h)
        for (ya, yb) in ((-11.0, -YD), (YD, 11.0)): bloco(x, x + 1.0, ya, yb, 0.0, h + 0.85, 'branco', ch=0.06, passo=1.0, cor=(0.96, 0.95, 0.92))
        x += 1.0
bloco(FX - 4.0, FX, -11.0, 11.0, 0.0, YP, 'lajes', ch=0.0, passo=1.0)
BR = (1.0, 1.0, 1.0)
def cor_muro(p, fc=None): return mix(BR, (0.86, 0.84, 0.80), 0.25 * smooth(8, 0, p.z - YP))
H = YP + 22.0
bloco(FX - 4.0, FX, -11.0, -3.2, YP, H, 'branco', ch=0.0, passo=1.5, corfn=cor_muro, jit=0.01)                       # as duas alas
bloco(FX - 4.0, FX, 3.2, 11.0, YP, H, 'branco', ch=0.0, passo=1.5, corfn=cor_muro, jit=0.01)
bloco(FX - 4.0, FX, -3.2, 3.2, YP + 14.0, H, 'branco', ch=0.0, passo=1.5, corfn=cor_muro, fundo=True, jit=0.01)      # sobre a abertura (sem portas)
OURO, OURO2 = (1.0, 1.0, 1.0), (0.74, 0.68, 0.60)       # a textura do ouro dá a cor; o OURO2 escurece
for y in (-9.0, -5.6, 5.6, 9.0):                             # as meias-colunas com capitel de ouro
    bloco(FX, FX + 0.55, y - 0.65, y + 0.65, YP, YP + 19.4, 'branco', ch=0.06, passo=1.2, corfn=cor_muro, jit=0.008)
    bloco(FX - 0.05, FX + 0.85, y - 0.95, y + 0.95, YP + 19.4, YP + 20.3, 'ouro', bat=-0.15, ch=0.12, cor=OURO, passo=1)
    bloco(FX - 0.05, FX + 0.75, y - 0.85, y + 0.85, YP - 0.0, YP + 0.5, 'branco', ch=0.08, passo=1.2, corfn=cor_muro)
bloco(FX - 4.3, FX + 0.6, -11.4, 11.4, H - 0.2, H + 0.7, 'ouro', ch=0.15, cor=OURO, passo=2)                       # a cornija dourada
for i in range(19):                                         # as pontas de ouro no alto (Middot 4.6: contra as aves)
    y = -10.4 + i * (20.8 / 18)
    prisma((FX - 0.6, y, H + 0.7), (FX - 0.6, y, H + 1.9), 0.11, 4, 'ouro', cor=OURO, r2=0.01)
# dentro do pórtico: a parede de dentro, coberta de ouro, e a porta do Santo Lugar com a cortina
XI = FX - 3.0
M.face([(XI, -3.2, YP), (XI, -2.5, YP), (XI, -2.5, YP + 14), (XI, -3.2, YP + 14)][::-1] and [(XI, -3.2, YP), (XI, -3.2, YP + 14), (XI, -2.5, YP + 14), (XI, -2.5, YP)][::-1], 'ouro', cor=OURO)
for (ya, yb, za, zb) in ((-3.2, -2.5, YP, YP + 14), (2.5, 3.2, YP, YP + 14), (-2.5, 2.5, YP + 10.6, YP + 14)):
    M.face([(XI, ya, za), (XI, yb, za), (XI, yb, zb), (XI, ya, zb)][::-1] if False else [(XI, yb, za), (XI, ya, za), (XI, ya, zb), (XI, yb, zb)][::-1], 'ouro', cor=OURO)
# a cortina: pregas verticais, nas quatro cores (Josefo: o azul, o linho, o escarlate e a púrpura, bordados com o céu)
AZUL, LINHO, ESC, PURP, OUROC = (0.17, 0.22, 0.50), (0.88, 0.84, 0.74), (0.66, 0.15, 0.13), (0.34, 0.16, 0.40), (0.90, 0.72, 0.34)
FAIXAS = [(0.0, 0.05, ESC), (0.05, 0.075, OUROC), (0.075, 0.10, LINHO), (0.30, 0.33, ESC), (0.33, 0.345, OUROC), (0.62, 0.65, PURP), (0.65, 0.665, OUROC),
          (0.88, 0.905, LINHO), (0.905, 0.93, OUROC), (0.93, 1.0, ESC)]
CZ = sorted(set([0.0, 1.0] + [a for a, b, c in FAIXAS] + [b for a, b, c in FAIXAS] + [k / 10 for k in range(11)]))
NP = 18
for k in range(NP):
    y0, y1 = -2.5 + 5.0 * k / NP, -2.5 + 5.0 * (k + 1) / NP
    x0, x1 = XI + 0.05 + (0.13 if k % 2 else 0.0), XI + 0.05 + (0.0 if k % 2 else 0.13)
    for j in range(len(CZ) - 1):
        ta, tb = CZ[j], CZ[j + 1]; za, zb = YP + ta * 10.4, YP + tb * 10.4; tm = (ta + tb) / 2
        c2 = next((c for a, b, c in FAIXAS if a <= tm < b), None)
        if c2 is None:      # o campo azul e púrpura, com as estrelas bordadas (o céu: Josefo)
            T_ = TILE['cortina']      # o desenho corre reto por cima das pregas
            M.face([(x1, y1, za), (x0, y0, za), (x0, y0, zb), (x1, y1, zb)][::-1], 'cortina', cor=(1.0, 1.0, 1.0), uv=[(y1 / T_, zb / T_), (y0 / T_, zb / T_), (y0 / T_, za / T_), (y1 / T_, za / T_)]); continue
        M.face([(x1, y1, za), (x0, y0, za), (x0, y0, zb), (x1, y1, zb)][::-1], 'liso', cor=c2)
prisma((XI + 0.12, -2.7, YP + 10.5), (XI + 0.12, 2.7, YP + 10.5), 0.09, 6, 'ouro', cor=OURO)                       # a vara
# a videira de ouro sobre a porta de dentro, com os cachos pendurados (Josefo, Guerras V.5.4)
XV = XI + 0.25
pts = [V((XV, -3.0 + 6.0 * i / 24, YP + 11.6 + 0.28 * math.sin(i * 0.9))) for i in range(25)]
for i in range(24): prisma(pts[i], pts[i + 1], 0.07, 5, 'ouro', cor=OURO2)
def folha(c, s, ang):
    c = V(c); pts_ = []
    for k in range(7):
        a = math.pi * k / 6; r = s * (1.0 if k % 2 == 0 else 0.62)
        pts_.append(c + V((0.05 * math.sin(a), math.cos(a + ang) * r, math.sin(a + ang) * r + s * 0.2)))
    M.face(pts_ + [c], 'ouro', cor=OURO)
    M.face((pts_ + [c])[::-1], 'ouro', cor=OURO)
for i in range(1, 24, 2): folha(pts[i] + V((0.04, 0, 0.05)), 0.34, R.uniform(-0.4, 0.4))
def cacho(c, n=9):
    c = V(c)
    for k in range(n):
        f = k / n; z = c.z - 0.08 - f * 0.55; r = 0.16 * (1 - f) + 0.04
        a = k * 2.4; p = V((c.x + 0.07, c.y + math.cos(a) * r, z + math.sin(a) * 0.03))
        prisma(p - V((0.06, 0, 0)), p + V((0.06, 0, 0)), 0.065, 5, 'ouro', cor=mix(OURO, OURO2, 0.5 * (k % 2)))
    prisma(c, c - V((0, 0, 0.12)), 0.025, 4, 'ouro', cor=OURO2)
for i in range(3, 24, 4): cacho(pts[i])

# ================================================================ a luz pintada
for F in M.f:                                                # a pedra bruta: um pouco de irregularidade
    if F['jit'] <= 0: continue
    for i in F['idx']:
        p = M.v[i]; k = smooth(0.0, 0.25, p.z)
        M.v[i] = p + noise.noise_vector(p * 1.9) * F['jit'] * k
verts_bvh, polys_bvh = [], []
for F in M.f:
    if F['sombra']: polys_bvh.append(F['idx'])
bvh = BVHTree.FromPolygons([tuple(v) for v in M.v], polys_bvh, all_triangles=False)
DIRS = []
for k in range(10):
    a = 2.39996 * k; z = 0.15 + 0.8 * (k + 0.5) / 10; r = math.sqrt(1 - z * z); DIRS.append(V((math.cos(a) * r, math.sin(a) * r, z)))
def ao_em(p, n):
    t = n.orthogonal().normalized(); b = n.cross(t); h = 0
    for d in DIRS:
        w = (t * d.x + b * d.y + n * d.z).normalized()
        if bvh.ray_cast(p + n * 0.03, w, 2.2)[0] is not None: h += 1
    return 1 - h / len(DIRS)
cores, uvs = [], []
for F in M.f:
    pts = [M.v[i] for i in F['idx']]; n = normal(pts)
    for k, p in enumerate(pts):
        base = F['corfn'](p, sum(pts, V((0, 0, 0))) / len(pts)) if F['corfn'] else F['cor']
        if F['mat'] in ('chama',): c = (1, 1, 1)
        elif F['mat'] == 'brasa': c = base
        elif F['mat'] == 'fogo': c = tuple(x * (0.70 + 0.30 * max(0.0, n.dot(V((0.5, -0.6, 0.62)).normalized()))) for x in base)   # as facetas da chama
        else:
            lam = max(0.0, n.dot(SUN)); sol = 1.0
            if lam > 0 and bvh.ray_cast(p + n * 0.03, SUN, 60)[0] is not None: sol = 0.0
            ao = ao_em(p, n)
            L = 0.52 + 0.55 * lam * sol + 0.10 * max(0.0, n.z)
            c = mul(base, mix((0.80, 0.80, 0.97), (1.0, 0.97, 0.90), lam * sol))
            c = tuple(min(1.0, x * L * (0.55 + 0.45 * ao)) for x in c)
        cores.append(c)
        if F['uv']: uvs.append(F['uv'][k])
        elif F['mat'] in TILE: uvs.append(uv_plano(p, n, TILE[F['mat']]))
        else: uvs.append((0.5, 0.5))

# ================================================================ o objeto no Blender
for nome in ('Cube',):
    if nome in bpy.data.objects: bpy.data.objects.remove(bpy.data.objects[nome])
col = bpy.data.collections.get(COLL) or bpy.data.collections.new(COLL)
if COLL not in bpy.context.scene.collection.children: bpy.context.scene.collection.children.link(col)
for o in list(col.objects): bpy.data.objects.remove(o)
me = bpy.data.meshes.new('Templo_Amostra')
me.from_pydata([tuple(v) for v in M.v], [], [F['idx'] for F in M.f])
ul = me.uv_layers.new(name='UVMap'); ca = me.color_attributes.new('Col', 'FLOAT_COLOR', 'CORNER')
li = 0
for F in M.f:
    for _ in F['idx']:
        ul.data[li].uv = uvs[li]; c = cores[li]; ca.data[li].color = (c[0], c[1], c[2], 1.0); li += 1
recorta_chama()
def material(nome):
    m = bpy.data.materials.get('amostra_' + nome) or bpy.data.materials.new('amostra_' + nome)
    m.use_nodes = True; nt = m.node_tree; nt.nodes.clear()
    out = nt.nodes.new('ShaderNodeOutputMaterial'); em = nt.nodes.new('ShaderNodeEmission')
    vc = nt.nodes.new('ShaderNodeVertexColor'); vc.layer_name = 'Col'
    mx = nt.nodes.new('ShaderNodeMix'); mx.data_type = 'RGBA'; mx.blend_type = 'MULTIPLY'; mx.inputs[0].default_value = 1.0
    nt.links.new(vc.outputs[0], mx.inputs[6])
    alpha = None
    if nome in TEX:
        im = bpy.data.images.load(TEX[nome], check_existing=True); tx = nt.nodes.new('ShaderNodeTexImage'); tx.image = im
        nt.links.new(tx.outputs[0], mx.inputs[7]); alpha = tx.outputs[1]
    else: mx.inputs[7].default_value = (1, 1, 1, 1)
    nt.links.new(mx.outputs[2], em.inputs[0]); em.inputs[1].default_value = 2.2 if nome == 'brasa' else (1.25 if nome == 'fogo' else 1.0)
    if nome == 'chama':
        tr = nt.nodes.new('ShaderNodeBsdfTransparent'); ms = nt.nodes.new('ShaderNodeMixShader')
        nt.links.new(alpha, ms.inputs[0]); nt.links.new(tr.outputs[0], ms.inputs[1]); nt.links.new(em.outputs[0], ms.inputs[2]); em.inputs[1].default_value = 1.6
        nt.links.new(ms.outputs[0], out.inputs[0])
        try: m.surface_render_method = 'DITHERED'
        except Exception: pass
        m.use_backface_culling = False
    else: nt.links.new(em.outputs[0], out.inputs[0])
    return m
clareia_muro()
for nome in MATS: me.materials.append(material(nome))
mi = {n: i for i, n in enumerate(MATS)}
for k, F in enumerate(M.f): me.polygons[k].material_index = mi[F['mat']]
ob = bpy.data.objects.new('Templo_Amostra', me); col.objects.link(ob)
w = bpy.context.scene.world or bpy.data.worlds.new('Mundo'); bpy.context.scene.world = w; w.use_nodes = True
bg = next(n for n in w.node_tree.nodes if n.type == 'BACKGROUND'); bg.inputs[0].default_value = (0.62, 0.76, 0.90, 1); bg.inputs[1].default_value = 1.0
try: bpy.context.scene.view_settings.view_transform = 'Standard'
except Exception: pass
print('faces', len(M.f), 'triangulos', sum(len(F['idx']) - 2 for F in M.f))
