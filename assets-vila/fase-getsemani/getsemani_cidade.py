# Getsêmani: Jerusalém em 3D do outro lado do Cedrom (rodado por getsemani_blender.py, com exec, e usa o que ele define:
# altura, h_base, mat_vc, col_exp, HPORTA, PORTA_Z).
#
# Tudo é malha facetada com cor de vértice (sem textura nova): cada bloco de pedra é um quadrado com o seu tom,
# e cada fiada termina numa linha de argamassa mais escura.
#   - o muro leste do monte do templo (x = -100, de z = -95 a 15), com o Pórtico de Salomão por cima
#     e a Porta de Susã (fechada) de frente para o santuário;
#   - o santuário (de frente para o leste, para o Getsêmani), o pátio interno e o Pórtico Real ao sul;
#   - a Fortaleza Antônia, no canto noroeste do templo, com a torre alta no sudeste;
#   - o muro da cidade ao norte do templo, com torres e a PORTA DAS OVELHAS (z = 40): túnel de verdade,
#     portas de madeira abertas e a escada que sobe da trilha;
#   - o chão da cidade e as casas (Bezeta, ao norte; a cidade alta, a oeste; o Ofel, ao sul);
#   - o chão de longe, em volta da área de jogo (as encostas do Cedrom e do Monte das Oliveiras continuam).
import bpy, math, random
from mathutils import Vector

rc = random.Random(71)


def hx(h): return tuple(int(h[i:i + 2], 16) / 255 for i in (0, 2, 4))


PAL = {
    'herod': hx('dccaa6'), 'muro': hx('cfbd99'), 'antonia': hx('c9b791'), 'branco': hx('f0eadb'), 'ouro': hx('d8a640'),
    'ouro_esc': hx('9c6e24'), 'cedro': hx('9a7a5c'), 'telha': hx('b08a68'), 'madeira': hx('6b4a2e'), 'escuro': hx('3a2f26'),
    'lajes': hx('cbbfa6'), 'claro': hx('e4d6b6'), 'bronze': hx('8a6a3a'),
}
CASAS = [hx(c) for c in ('dbc9a5', 'cfb994', 'e2d4b4', 'c8b18a', 'd6c19b', 'e0cba2')]


class M:
    def __init__(self, nome): self.nome, self.v, self.f, self.c = nome, [], [], []

    def quad(self, pts, cor, out=None):
        # pts em coordenadas do jogo (x, y, z); out = para onde a face deve olhar (acerta a ordem)
        P = [Vector(p) for p in pts]
        if out is not None:
            n = (P[1] - P[0]).cross(P[2] - P[0])
            if n.dot(Vector(out)) < 0: P = P[::-1]
        b = len(self.v)
        for p in P: self.v.append((p.x, -p.z, p.y))
        self.f.append(tuple(range(b, b + len(P)))); self.c.append(tuple(min(1, max(0, x)) for x in cor) + (1,))

    def cria(self, dupla=False):
        me = bpy.data.meshes.new(self.nome); me.from_pydata(self.v, [], self.f); me.update()
        ca = me.color_attributes.new('Col', 'BYTE_COLOR', 'CORNER')
        for p in me.polygons:
            for li in p.loop_indices: ca.data[li].color_srgb = self.c[p.index]
        o = bpy.data.objects.new(self.nome, me); col_exp.objects.link(o); o.data.materials.append(mat_vc('Mat_' + self.nome, dupla))
        return o


def k(c, f): return tuple(x * f for x in c)


def plano(m, P, U, Vv, LU, LV, out, cor, var=0.06):
    P, U, Vv = Vector(P), Vector(U), Vector(Vv)
    m.quad([P, P + U * LU, P + U * LU + Vv * LV, P + Vv * LV], k(cor, 1 + rc.uniform(-var, var)), out)


def blocos(m, P, U, Vv, LU, LV, out, cor, fiada=0.8, comp=(1.2, 2.4), furo=None, arg=0.07):
    """Face de cantaria: fiadas de altura `fiada`, blocos de comprimento sorteado em `comp`, desencontrados.
    furo(v0, v1) -> (u0, u1) ou None: o vão (porta) que a fiada entre v0 e v1 precisa deixar aberto."""
    P, U, Vv = Vector(P), Vector(U), Vector(Vv)
    pt = lambda u, v: P + U * u + Vv * v
    v = 0.0; linha = 0
    while v < LV - 1e-3:
        h = min(fiada * rc.uniform(0.9, 1.1), LV - v)
        if LV - (v + h) < fiada * 0.35: h = LV - v
        vt = v + h - min(arg, h * 0.3)
        vao = furo(v, v + h) if furo else None
        u = -rc.uniform(0, comp[0]) if linha % 2 else 0.0
        while u < LU - 1e-3:
            u1 = min(LU, u + rc.uniform(*comp)); a = max(0.0, u)
            if LU - u1 < comp[0] * 0.4: u1 = LU
            pedacos = [(a, u1)]
            if vao:
                pedacos = [(a, min(u1, vao[0])), (max(a, vao[1]), u1)]
            f = rc.uniform(0.86, 1.06) * (1.04 if rc.random() < 0.12 else 1.0)
            for x0, x1 in pedacos:
                if x1 - x0 > 1e-3: m.quad([pt(x0, v), pt(x1, v), pt(x1, vt), pt(x0, vt)], k(cor, f), out)
            u = u1
        if vt < v + h - 1e-4:        # a argamassa da fiada
            pedacos = [(0, LU)] if not vao else [(0, vao[0]), (vao[1], LU)]
            for x0, x1 in pedacos:
                if x1 - x0 > 1e-3: m.quad([pt(x0, vt), pt(x1, vt), pt(x1, v + h), pt(x0, v + h)], k(cor, 0.7), out)
        v += h; linha += 1


def caixa(m, x0, x1, y0, y1, z0, z1, cor, lados='+x -x +z -z +y', pedra=None, fiada=0.8, comp=(1.2, 2.4), furos=None):
    """Caixa aberta embaixo. `pedra` = lados com cantaria (os outros são lisos)."""
    furos = furos or {}; pedra = (pedra or '').split()
    L = lados.split()
    F = {'+x': ((x1, y0, z0), (0, 0, 1), (0, 1, 0), z1 - z0, y1 - y0, (1, 0, 0)),
         '-x': ((x0, y0, z1), (0, 0, -1), (0, 1, 0), z1 - z0, y1 - y0, (-1, 0, 0)),
         '+z': ((x1, y0, z1), (-1, 0, 0), (0, 1, 0), x1 - x0, y1 - y0, (0, 0, 1)),
         '-z': ((x0, y0, z0), (1, 0, 0), (0, 1, 0), x1 - x0, y1 - y0, (0, 0, -1))}
    for s in L:
        if s == '+y': plano(m, (x0, y1, z0), (1, 0, 0), (0, 0, 1), x1 - x0, z1 - z0, (0, 1, 0), k(cor, 1.04), 0.03); continue
        P, U, Vv, LU, LV, out = F[s]
        if s in pedra: blocos(m, P, U, Vv, LU, LV, out, cor, fiada, comp, furos.get(s))
        else: plano(m, P, U, Vv, LU, LV, out, k(cor, 0.94))


def ameias(m, pts, y, cor, larg=0.9, alto=1.1, esp=0.7, passo=1.8):
    """Merlões ao longo de uma linha (lista de pontos (x, z)) no alto do muro."""
    for (xa, za), (xb, zb) in zip(pts, pts[1:]):
        L = math.hypot(xb - xa, zb - za); n = max(1, int(L / passo)); ux, uz = (xb - xa) / L, (zb - za) / L
        for i in range(n):
            c = (i + 0.5) * L / n; cx, cz = xa + ux * c, za + uz * c
            hx_, hz_ = (ux * larg / 2 + abs(uz) * esp / 2), (uz * larg / 2 + abs(ux) * esp / 2)
            caixa(m, cx - abs(hx_), cx + abs(hx_), y, y + alto, cz - abs(hz_), cz + abs(hz_), k(cor, rc.uniform(0.9, 1.02)))


# ================= o chão de longe =================
def grade(lo, hi, nucleo, passo0=4.0):
    """Coordenadas de uma grade que fica mais rala longe do núcleo [n0, n1]."""
    n0, n1 = nucleo; xs = []
    x = n0
    while x > lo: xs.append(x); x -= passo0 * (1 + max(0, n0 - x) / 25)
    xs.append(lo); xs = xs[::-1]
    x = n0 + passo0
    while x < n1 - 1e-6: xs.append(x); x += passo0
    x = n1
    while x < hi: xs.append(x); x += passo0 * (1 + max(0, x - n1) / 25)
    xs.append(hi)
    return sorted(set(round(v, 3) for v in xs))


def chao_longe(nome, xs, zs, h, cor, pula):
    bm_v, bm_f = [], []
    idx = {}
    for i, x in enumerate(xs):
        for j, z in enumerate(zs):
            idx[i, j] = len(bm_v); bm_v.append((x, -z, h(x, z)))
    cores = []
    for i in range(len(xs) - 1):
        for j in range(len(zs) - 1):
            if pula(xs[i], xs[i + 1], zs[j], zs[j + 1]): continue
            a, b, c, d = idx[i, j], idx[i + 1, j], idx[i + 1, j + 1], idx[i, j + 1]
            bm_f.append((a, d, c, b))       # olhando para cima (no Blender, -z do jogo é +y)
            cores.append(cor((xs[i] + xs[i + 1]) / 2, (zs[j] + zs[j + 1]) / 2))
    me = bpy.data.meshes.new(nome); me.from_pydata(bm_v, [], bm_f); me.update()
    ca = me.color_attributes.new('Col', 'BYTE_COLOR', 'CORNER')
    for p in me.polygons:
        for li in p.loop_indices: ca.data[li].color_srgb = cores[p.index] + (1,)
    o = bpy.data.objects.new(nome, me); col_exp.objects.link(o); o.data.materials.append(mat_vc('Mat_' + nome))
    return o


def cor_campo(x, z):
    r = 0.5 + 0.3 * math.sin(x * 0.043 + 1.3) * math.cos(z * 0.051 - 0.4) + 0.2 * math.sin(x * 0.011 - z * 0.017)
    base = hx('a3ad66') if r < 0.45 else hx('96a35c') if r < 0.62 else hx('c2bd7c')
    if -70 < x < -56: base = hx('b5a985') if abs(x + 62.5) < 3 else hx('a8a46c')       # o leito do Cedrom, pedregoso
    if x < -88: base = hx('bba77e')                                                   # o barranco seco ao pé do muro
    return k(base, rc.uniform(0.95, 1.03))


h_longe = lambda x, z: h_base(min(x, 170.0) - 0.4 * max(0.0, x - 170.0), z) - 0.03
xs = grade(-104.0, 520.0, (X0 + 4, X1 - 4))
zs = grade(-520.0, 520.0, (Z0 + 4, Z1 - 4))
chao_longe('Getsemani_Fundo', xs, zs, h_longe, cor_campo, lambda a, b, c, d: a >= X0 + 4 - 1e-6 and b <= X1 - 4 + 1e-6 and c >= Z0 + 4 - 1e-6 and d <= Z1 - 4 + 1e-6)


# o chão da cidade (a oeste do muro): sobe para oeste (a cidade alta); perto da Porta das Ovelhas, no nível da soleira
def h_cidade(x, z):
    w = h_base(-100.0, z)
    h = w + 1.6 * sm(-100.0, -104.0, x) + 0.075 * max(0.0, -104.0 - x)
    h += 0.04 * max(0.0, -150.0 - x) * sm(15, -40, z)            # a cidade alta, atrás do templo, mais alta ainda
    if z > 20: h += (HPORTA - h) * (1 - sm(0, 30, abs(z - PORTA_Z) - 4)) * (1 - sm(0, 40, -104.0 - x))   # a rua que sai da porta
    return h


def cor_cidade(x, z):
    if -207 < x < -98 and -97 < z < 17: return hx('d6ccb6')
    return k(hx('cdbb95') if (int(x / 9) + int(z / 9)) % 3 else hx('c4b089'), rc.uniform(0.94, 1.03))


xc = grade(-520.0, -100.0, (-300.0, -100.0), 5.0)
zc = grade(-520.0, 520.0, (-160.0, 150.0), 5.0)
chao_longe('Cidade_Chao', xc, zc, h_cidade, cor_cidade, lambda a, b, c, d: False)


# ================= o monte do templo =================
TX0, TX1, TZ0, TZ1, TY = -205.0, -100.0, -95.0, 15.0, 15.0        # a esplanada (topo em TY)
tm = M('Templo_Muros')
SUSA = (-35.0, -25.0)                                           # a Porta de Susã, no muro leste
caixa(tm, TX0, TX1, -3.0, TY, TZ0, TZ1, PAL['herod'], lados='+x -x +z -z +y', pedra='+x +z -z', fiada=1.1, comp=(1.8, 3.6))
# o muro externo continua por cima da esplanada: é o fundo dos pórticos (Salomão a leste, o Real ao sul)
caixa(tm, TX1 - 12, TX1, TY, TY + 6.0, TZ0 + 12, TZ1 - 12, PAL['herod'], lados='+x -x', pedra='+x', fiada=1.1, comp=(1.8, 3.6))
caixa(tm, TX0, TX1, TY, TY + 6.0, TZ1 - 12, TZ1, PAL['herod'], lados='+x +z -z -x', pedra='+x +z', fiada=1.1, comp=(1.8, 3.6))
caixa(tm, TX0, TX1, TY, TY + 12.0, TZ0, TZ0 + 12, PAL['herod'], lados='+x -z +z -x', pedra='+x -z', fiada=1.1, comp=(1.8, 3.6))
caixa(tm, TX0, TX0 + 12, TY, TY + 6.0, TZ0 + 12, TZ1 - 12, PAL['herod'], lados='-x +x', pedra='-x', fiada=1.1, comp=(1.8, 3.6))
# cornija e telhados dos pórticos (cedro)
for x0, x1, z0, z1, y in [(TX1 - 12.6, TX1 + 0.4, TZ0 + 12, TZ1 - 12, TY + 6.0), (TX0 - 0.4, TX1 + 0.4, TZ1 - 12, TZ1 + 0.4, TY + 6.0),
                          (TX0 - 0.4, TX1 + 0.4, TZ0 - 0.4, TZ0 + 12.6, TY + 12.0), (TX0 - 0.4, TX0 + 12.6, TZ0 + 12, TZ1 - 12, TY + 6.0)]:
    caixa(tm, x0, x1, y, y + 0.5, z0, z1, k(PAL['claro'], 1.0))
    caixa(tm, x0 + 0.5, x1 - 0.5, y + 0.5, y + 1.3, z0 + 0.5, z1 - 0.5, PAL['cedro'])
# o pináculo (o canto sudeste, mais alto) e o canto nordeste
caixa(tm, TX1 - 8, TX1 + 0.3, TY + 12, TY + 15, TZ0 - 0.3, TZ0 + 8, PAL['herod'], pedra='+x -z', fiada=1.1, comp=(1.8, 3.6))
caixa(tm, TX1 - 7, TX1 + 0.6, -3.0, TY + 9, TZ1 - 6, TZ1 + 0.6, PAL['herod'], pedra='+x +z', fiada=1.1, comp=(1.8, 3.6))
# a Porta de Susã: duas portas em arco, fechadas, de bronze
caixa(tm, TX1, TX1 + 1.4, -3.0, 12.0, SUSA[0], SUSA[1], k(PAL['herod'], 1.04), pedra='+x', fiada=1.1, comp=(1.4, 2.6))
for zc_ in (SUSA[0] + 2.6, SUSA[1] - 2.6):
    yb = h_base(-100.0, zc_) + 0.6
    pts = [(TX1 + 1.42, yb, zc_ - 1.6), (TX1 + 1.42, yb, zc_ + 1.6), (TX1 + 1.42, yb + 4.2, zc_ + 1.6)]
    for i in range(1, 6):
        a = math.pi * i / 6; pts.append((TX1 + 1.42, yb + 4.2 + math.sin(a) * 1.6, zc_ + math.cos(a) * 1.6))
    pts.append((TX1 + 1.42, yb + 4.2, zc_ - 1.6))
    tm.quad(pts, PAL['bronze'], (1, 0, 0))
# as pilastras da parte de cima do muro (como no muro herodiano de Hebrom): dão ritmo e sombra à face lisa
z_ = TZ0 + 13.5
while z_ < TZ1 - 13:
    caixa(tm, TX1, TX1 + 0.45, TY - 0.6, TY + 5.9, z_ - 0.65, z_ + 0.65, k(PAL['herod'], 1.07), lados='+x +z -z +y')
    z_ += 3.6
x_ = TX1 - 13.5
while x_ > TX0 + 2:
    caixa(tm, x_ - 0.65, x_ + 0.65, TY - 0.6, TY + 11.9, TZ0 - 0.45, TZ0, k(PAL['herod'], 1.07), lados='-z +x -x +y')
    x_ -= 3.6
# a faixa da base da parte de cima (onde começam as pilastras)
caixa(tm, TX1, TX1 + 0.3, TY - 1.2, TY - 0.6, TZ0 + 12, TZ1 - 12, k(PAL['claro'], 1.0), lados='+x +y')
tm.cria()

# o pátio interno (levantado), com a Porta de Nicanor a leste, e o santuário
sa = M('Santuario')
caixa(sa, -172.0, -118.0, TY - 1, TY + 4.0, -54.0, -6.0, k(PAL['lajes'], 1.03), pedra='+x +z -z', fiada=0.7, comp=(1.0, 2.0))
for x0, x1, z0, z1 in [(-172.0, -118.0, -54.0, -52.6), (-172.0, -118.0, -7.4, -6.0), (-119.4, -118.0, -54.0, -6.0), (-172.0, -170.6, -54.0, -6.0)]:
    caixa(sa, x0, x1, TY + 4.0, TY + 9.0, z0, z1, PAL['claro'], pedra='+x -z +z', fiada=0.7, comp=(1.0, 2.0))
caixa(sa, -121.0, -116.5, TY + 4.0, TY + 13.0, -35.0, -25.0, PAL['claro'], pedra='+x', fiada=0.7, comp=(1.0, 2.0))      # Nicanor
sa.quad([(-116.48, TY + 4.0, -32.0), (-116.48, TY + 4.0, -28.0), (-116.48, TY + 10.0, -28.0), (-116.48, TY + 10.0, -32.0)], PAL['ouro_esc'], (1, 0, 0))
BASE = TY + 4.0
# o pórtico do santuário: 100 côvados de largura e de altura (aqui 28 x 29), branco, com ouro no alto
caixa(sa, -135.0, -130.0, BASE, BASE + 29.0, -44.0, -16.0, PAL['branco'], pedra='+x +z -z', fiada=1.4, comp=(2.0, 3.6))
caixa(sa, -162.0, -135.0, BASE, BASE + 23.0, -38.0, -22.0, PAL['branco'], pedra='+z -z', fiada=1.4, comp=(2.0, 3.6))
caixa(sa, -135.4, -129.6, BASE + 29.0, BASE + 30.0, -44.4, -15.6, PAL['ouro'])
caixa(sa, -162.4, -135.0, BASE + 23.0, BASE + 23.8, -38.4, -21.6, PAL['ouro'])
for i in range(15):                       # as pontas douradas do telhado
    z_ = -43.2 + i * 2.0
    caixa(sa, -132.9, -132.1, BASE + 30.0, BASE + 31.2, z_ - 0.25, z_ + 0.25, PAL['ouro'], lados='+x -x +z -z +y')
# a entrada: o vão alto com a cortina e a videira de ouro por cima
sa.quad([(-129.97, BASE, -34.0), (-129.97, BASE, -26.0), (-129.97, BASE + 17.0, -26.0), (-129.97, BASE + 17.0, -34.0)], PAL['ouro'], (1, 0, 0))
sa.quad([(-129.94, BASE, -32.6), (-129.94, BASE, -27.4), (-129.94, BASE + 15.6, -27.4), (-129.94, BASE + 15.6, -32.6)], hx('7d3b2a'), (1, 0, 0))
sa.quad([(-129.95, BASE + 17.6, -35.5), (-129.95, BASE + 17.6, -24.5), (-129.95, BASE + 19.4, -24.5), (-129.95, BASE + 19.4, -35.5)], PAL['ouro'], (1, 0, 0))
# meias-colunas na fachada, com capitéis dourados, e a escadaria do pátio dos sacerdotes até o pórtico
for z_ in (-42.0, -38.0, -22.0, -18.0):
    caixa(sa, -130.0, -129.3, BASE, BASE + 26.4, z_ - 0.8, z_ + 0.8, k(PAL['branco'], 1.03), lados='+x +z -z')
    caixa(sa, -130.0, -129.1, BASE + 26.4, BASE + 27.4, z_ - 1.0, z_ + 1.0, PAL['ouro'], lados='+x +z -z +y')
caixa(sa, -130.0, -128.6, BASE + 27.4, BASE + 28.2, -44.0, -16.0, k(PAL['branco'], 1.05), lados='+x +z -z +y')       # a cornija
for i in range(6):
    caixa(sa, -130.0 + i * 0.7, -129.3 + i * 0.7, BASE - 0.2, BASE + 1.2 - i * 0.24, -37.0, -23.0, k(PAL['lajes'], 1.0 + 0.02 * (i % 2)), lados='+x +z -z +y')
sa.cria()

# o Pórtico Real (ao sul, sobre o muro): a basílica comprida, com a nave central mais alta
pr_ = M('Portico_Real')
caixa(pr_, TX0 + 2, TX1 - 2, TY + 12.0 + 1.3, TY + 15.0, TZ0 + 3, TZ0 + 9, k(PAL['claro'], 0.98), lados='+x -x +z -z')
caixa(pr_, TX0 + 1.6, TX1 - 1.6, TY + 15.0, TY + 15.6, TZ0 + 2.6, TZ0 + 9.4, PAL['cedro'])
pr_.cria()

# ================= a Fortaleza Antônia =================
an = M('Fortaleza_Antonia')
AX0_, AX1_, AZ0_, AZ1_ = -206.0, -176.0, 15.0, 42.0
caixa(an, AX0_, AX1_, 2.0, TY + 18.0, AZ0_, AZ1_, PAL['antonia'], pedra='+x +z -x -z', fiada=0.9, comp=(1.4, 2.8))
ameias(an, [(AX1_ - 0.4, AZ0_), (AX1_ - 0.4, AZ1_)], TY + 18.0, PAL['antonia'])
ameias(an, [(AX1_, AZ1_ - 0.4), (AX0_, AZ1_ - 0.4)], TY + 18.0, PAL['antonia'])
for tx0, tz0, extra in [(AX1_ - 7, AZ0_, 13.0), (AX1_ - 7, AZ1_ - 7, 6.0), (AX0_, AZ1_ - 7, 6.0), (AX0_, AZ0_, 6.0)]:
    caixa(an, tx0 - 0.5, tx0 + 7.5, 2.0, TY + 18.0 + extra, tz0 - 0.5, tz0 + 7.5, k(PAL['antonia'], 1.03), pedra='+x +z -x -z', fiada=0.9, comp=(1.4, 2.8))
    yt = TY + 18.0 + extra
    ameias(an, [(tx0 - 0.1, tz0 - 0.1), (tx0 + 7.1, tz0 - 0.1), (tx0 + 7.1, tz0 + 7.1), (tx0 - 0.1, tz0 + 7.1), (tx0 - 0.1, tz0 - 0.1)], yt, PAL['antonia'], passo=1.75)
    for j in range(3):                    # seteiras
        yy = TY + 8 + j * 6
        an.quad([(tx0 + 7.53, yy, tz0 + 3.2), (tx0 + 7.53, yy, tz0 + 3.8), (tx0 + 7.53, yy + 1.6, tz0 + 3.8), (tx0 + 7.53, yy + 1.6, tz0 + 3.2)], PAL['escuro'], (1, 0, 0))
an.cria()

# ================= o muro da cidade e a Porta das Ovelhas =================
mc = M('Muro_Cidade')
WX = -100.0                       # a face leste
WT = 13.0                         # o alto do muro
PZ = PORTA_Z; ABRE, MOLA = 1.7, 3.6         # meia largura do vão e altura até o começo do arco
HP = HPORTA


def trecho(z0, z1, topo=WT):
    caixa(mc, WX - 3.0, WX, -2.0, topo, z0, z1, PAL['muro'], lados='+x -x +y', pedra='+x', fiada=0.75, comp=(1.1, 2.2))
    ameias(mc, [(WX - 0.35, z0 + 0.5), (WX - 0.35, z1 - 0.5)], topo, PAL['muro'])


def torre(z0, z1, topo=WT + 3.5, frente=2.5):
    caixa(mc, WX - 4.0, WX + frente, -2.0, topo, z0, z1, k(PAL['muro'], 1.02), pedra='+x +z -z', fiada=0.75, comp=(1.1, 2.2))
    x1 = WX + frente
    ameias(mc, [(x1 - 0.35, z0 + 0.3), (x1 - 0.35, z1 - 0.3)], topo, PAL['muro'])
    ameias(mc, [(x1 - 0.3, z0 + 0.35), (WX - 3.7, z0 + 0.35)], topo, PAL['muro'])
    ameias(mc, [(x1 - 0.3, z1 - 0.35), (WX - 3.7, z1 - 0.35)], topo, PAL['muro'])


# do canto nordeste do templo para o norte
TORRES = [(20.0, 25.5), (62.0, 67.5), (84.0, 89.5)]
G0, G1 = PZ - 7.5, PZ + 7.5            # o portão inteiro (duas torres e o corpo do meio)
cortes = sorted([(TZ1 + 0.6, TZ1 + 0.6)] + TORRES + [(G0, G1), (104.0, 110.0)])
z = TZ1 + 0.6
for a, b in cortes[1:]:
    if a - z > 0.5: trecho(z, a)
    z = b
for a, b in TORRES: torre(a, b)
torre(104.0, 110.0, frente=1.5)
# o muro norte vira para oeste
caixa(mc, -260.0, WX - 3.0, -2.0, WT, 107.0, 110.0, PAL['muro'], lados='+z -z +y', pedra='+z', fiada=0.75, comp=(1.1, 2.2))
for x_ in (-140.0, -180.0, -220.0):
    caixa(mc, x_ - 2.75, x_ + 2.75, -2.0, WT + 3.5, 105.0, 112.5, k(PAL['muro'], 1.02), pedra='+z +x -x', fiada=0.75, comp=(1.1, 2.2))

# a Porta das Ovelhas: duas torres e o corpo do meio, com o vão em arco e o túnel
torre(G0, PZ - 2.5, topo=WT + 4.5, frente=4.0)
torre(PZ + 2.5, G1, topo=WT + 4.5, frente=4.0)
FX = WX + 3.0                           # a face do corpo do meio (um pouco recuada das torres)


def furo_porta(v0, v1):
    # v medido a partir de y = -2 (a base da face)
    y0, y1 = v0 - 2.0, v1 - 2.0
    if y1 <= HP or y0 >= HP + MOLA + ABRE: return None
    yy = max(y0, HP)
    if yy <= HP + MOLA: w = ABRE
    else: w = math.sqrt(max(0.0, ABRE ** 2 - (yy - HP - MOLA) ** 2))
    c = PZ - (PZ - 2.5)                  # u cresce para o norte a partir de z = PZ - 2.5
    return (c - w, c + w) if w > 0.05 else None


caixa(mc, WX - 4.0, FX, -2.0, WT + 1.5, PZ - 2.5, PZ + 2.5, k(PAL['muro'], 1.04), lados='+x +y', pedra='+x', fiada=0.6, comp=(0.9, 1.6), furos={'+x': furo_porta})
ameias(mc, [(FX - 0.35, PZ - 2.2), (FX - 0.35, PZ + 2.2)], WT + 1.5, PAL['muro'])
# o arco de aduelas, em relevo, por cima do recorte em degraus
ARC = M('Porta_Ovelhas')
xf = FX + 0.14; N = 11; r0, r1 = ABRE, ABRE + 0.6; yc = HP + MOLA
for i in range(N):
    a0, a1 = math.pi * i / N, math.pi * (i + 1) / N
    p = [(xf, yc + math.sin(a0) * r0, PZ + math.cos(a0) * r0), (xf, yc + math.sin(a1) * r0, PZ + math.cos(a1) * r0),
         (xf, yc + math.sin(a1) * r1, PZ + math.cos(a1) * r1), (xf, yc + math.sin(a0) * r1, PZ + math.cos(a0) * r1)]
    ARC.quad(p, k(PAL['claro'], 1.04 if i % 2 else 0.95), (1, 0, 0))
    # a espessura da aduela (o intradorso)
    ARC.quad([(FX, yc + math.sin(a0) * r0, PZ + math.cos(a0) * r0), (xf, yc + math.sin(a0) * r0, PZ + math.cos(a0) * r0),
              (xf, yc + math.sin(a1) * r0, PZ + math.cos(a1) * r0), (FX, yc + math.sin(a1) * r0, PZ + math.cos(a1) * r0)], k(PAL['claro'], 0.8),
             (0, -math.sin((a0 + a1) / 2), -math.cos((a0 + a1) / 2)))
for s in (-1, 1):                       # as ombreiras
    z0, z1 = PZ + s * ABRE, PZ + s * (ABRE + 0.6)
    ARC.quad([(xf, HP, min(z0, z1)), (xf, HP, max(z0, z1)), (xf, yc, max(z0, z1)), (xf, yc, min(z0, z1))], k(PAL['claro'], 0.98), (1, 0, 0))
    ARC.quad([(FX, HP, z0), (xf, HP, z0), (xf, yc, z0), (FX, yc, z0)], k(PAL['claro'], 0.8), (0, 0, -s))
# o túnel: paredes, abóbada e lajes do chão, de FX até o lado da cidade
TX_ = WX - 4.0
for s in (-1, 1):
    zz = PZ + s * ABRE
    blocos(ARC, (FX, HP, zz), (-1, 0, 0), (0, 1, 0), FX - TX_, MOLA, (0, 0, -s), k(PAL['muro'], 0.82), fiada=0.6, comp=(0.9, 1.5))
for i in range(N):
    a0, a1 = math.pi * i / N, math.pi * (i + 1) / N
    p = [(FX, yc + math.sin(a0) * ABRE, PZ + math.cos(a0) * ABRE), (TX_, yc + math.sin(a0) * ABRE, PZ + math.cos(a0) * ABRE),
         (TX_, yc + math.sin(a1) * ABRE, PZ + math.cos(a1) * ABRE), (FX, yc + math.sin(a1) * ABRE, PZ + math.cos(a1) * ABRE)]
    ARC.quad(p, k(PAL['muro'], 0.66 + 0.04 * (i % 2)), (0, -math.sin((a0 + a1) / 2), -math.cos((a0 + a1) / 2)))
for i in range(5):
    x0 = FX - (FX - TX_) * i / 5; x1 = FX - (FX - TX_) * (i + 1) / 5
    for s in (-1, 1):
        ARC.quad([(x0, HP + 0.02, PZ), (x1, HP + 0.02, PZ), (x1, HP + 0.02, PZ + s * ABRE), (x0, HP + 0.02, PZ + s * ABRE)], k(PAL['lajes'], rc.uniform(0.86, 1.0)), (0, 1, 0))
# as portas de madeira, abertas contra as paredes do túnel
for s in (-1, 1):
    zz = PZ + s * (ABRE - 0.18)
    caixa(ARC, FX - 2.0, FX - 0.3, HP + 0.02, HP + MOLA + 0.6, min(zz, zz - s * 0.14), max(zz, zz - s * 0.14), PAL['madeira'], lados='+x -x +z -z +y')
# a escada: da ponta da trilha até a soleira, com as muretas dos lados
DEG = 7; XA, XB = FX + 5.2, FX + 0.05
for i in range(DEG):
    xa = XA - (XA - XB) * i / DEG; xb = XA - (XA - XB) * (i + 1) / DEG
    # o degrau cobre o chão inteiro embaixo dele (a rampa do chão é por onde o jogador anda; o degrau fica rente)
    yt = max(altura(xb + (xa - xb) * a_, PZ + b_) for a_ in (0, 0.5, 1) for b_ in (-2.3, -1.2, 0, 1.2, 2.3)) + 0.1
    caixa(ARC, xb, xa, yt - 0.7, yt, PZ - 2.3, PZ + 2.3, k(PAL['lajes'], 0.96 + 0.05 * (i % 2)), lados='+x +z -z +y')
for s in (-1, 1):
    zz = PZ + s * 2.55
    for i in range(DEG):
        xa = XA - (XA - XB) * i / DEG; xb = XA - (XA - XB) * (i + 1) / DEG
        yt = altura((xa + xb) / 2, PZ) + 0.75
        caixa(ARC, xb, xa, yt - 1.6, yt, zz - 0.25, zz + 0.25, k(PAL['muro'], 0.98), lados='+x -x +z -z +y')
mc.cria(); ARC.cria()

# ================= as casas =================
ca_ = M('Casas_Cidade')
LIVRE = [(-176.0 - 6, -100.0, PZ - 3.0, PZ + 3.0),     # a rua que sai da Porta das Ovelhas
         (-162.0, -112.0, 46.0, 80.0),                    # o lugar do Tanque de Betesda (a próxima fase)
         (AX0_ - 4, AX1_ + 4, AZ0_ - 4, AZ1_ + 4),
         (TX0 - 2, TX1 + 2, TZ0 - 2, TZ1 + 2)]


def livre(x0, x1, z0, z1):
    for a, b, c, d in LIVRE:
        if x1 > a and x0 < b and z1 > c and z0 < d: return False
    return True


def casa(x, z, lx, lz, alto):
    x0, x1, z0, z1 = x - lx / 2, x + lx / 2, z - lz / 2, z + lz / 2
    if not livre(x0, x1, z0, z1): return
    y0 = min(h_cidade(x0, z0), h_cidade(x1, z1), h_cidade(x0, z1), h_cidade(x1, z0)) - 0.5
    cor = rc.choice(CASAS)
    caixa(ca_, x0, x1, y0, y0 + 0.5 + alto, z0, z1, cor, lados='+x -x +z -z +y')
    yt = y0 + 0.5 + alto
    if rc.random() < 0.55:      # parapeito do terraço
        for a, b, c, d in [(x0, x1, z0, z0 + 0.3), (x0, x1, z1 - 0.3, z1), (x0, x0 + 0.3, z0, z1), (x1 - 0.3, x1, z0, z1)]:
            caixa(ca_, a, b, yt, yt + 0.6, c, d, k(cor, 1.02), lados='+x -x +z -z +y')
    if rc.random() < 0.3:       # um quarto no terraço
        caixa(ca_, x0 + 0.6, x0 + lx * 0.5, yt, yt + 2.4, z0 + 0.6, z0 + lz * 0.5, k(cor, 0.97), lados='+x -x +z -z +y')
    # portas e janelas escuras nas faces que olham para leste e para a rua
    if rc.random() < 0.7:
        ca_.quad([(x1 + 0.02, y0 + 0.5, z - 0.5), (x1 + 0.02, y0 + 0.5, z + 0.5), (x1 + 0.02, y0 + 2.4, z + 0.5), (x1 + 0.02, y0 + 2.4, z - 0.5)], PAL['escuro'], (1, 0, 0))
    if alto > 4 and rc.random() < 0.6:
        yy = y0 + alto - 1.0
        ca_.quad([(x1 + 0.02, yy, z + 1.0), (x1 + 0.02, yy, z + 1.6), (x1 + 0.02, yy + 0.7, z + 1.6), (x1 + 0.02, yy + 0.7, z + 1.0)], PAL['escuro'], (1, 0, 0))


def bairro(x0, x1, z0, z1, passo, alto, prob=0.85):
    x = x1 - passo / 2
    while x > x0:
        z = z0 + passo / 2
        while z < z1:
            if rc.random() < prob:
                lx, lz = passo * rc.uniform(0.6, 0.9), passo * rc.uniform(0.6, 0.9)
                casa(x + rc.uniform(-1, 1), z + rc.uniform(-1, 1), lx, lz, rc.uniform(*alto))
            z += passo
        x -= passo


bairro(-170.0, -105.0, 18.0, 104.0, 9.0, (3.0, 6.5))             # Bezeta e a vizinhança de Betesda
bairro(-300.0, -170.0, 18.0, 104.0, 11.0, (3.5, 6.5), 0.7)
bairro(-330.0, -210.0, -150.0, 18.0, 12.0, (4.0, 8.0), 0.75)    # a cidade alta, atrás do templo
bairro(-205.0, -104.0, -170.0, -100.0, 11.0, (3.0, 5.5), 0.6)  # o Ofel, ao sul
ca_.cria()
print('CIDADE ok', len(tm.f), len(sa.f), len(an.f), len(mc.f), len(ARC.f), len(ca_.f))
