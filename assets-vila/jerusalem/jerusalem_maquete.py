# Jerusalém: a MAQUETE da cidade, para situar as fases (Monte das Oliveiras, Getsêmani, Betesda, templo).
# Não é o modelo final: só volumes facetados com cor de vértice, nos lugares certos, para conferir a geografia.
# O modelo bonito (kit de peças, texturas pedidas por prompt, peças do Tripo) vai substituir isto peça por peça,
# nos mesmos lugares.
#
# Uso:  blender -b --factory-startup -P jerusalem_maquete.py
# Grava jerusalem.blend, jerusalem_maquete.glb e jerusalem_lugares.json nesta pasta.
#
# As posições e o relevo vêm de relevo.py (o "mundo" = as coordenadas do Getsêmani; ver lá a tabela de distâncias).
# Os prédios são desenhados no "plano velho" e, no fim, levados para o mundo (para_mundo: espelha o norte e reduz a 0,6
# em volta da rocha); os chãos já nascem no mundo.
# Os chãos:
#   Cidade_Chao  - a oeste do Cedrom, debaixo da cidade (um pouco mais baixo que o relevo: o Getsêmani cobre por cima);
#   Vale_Chao    - o vale e as encostas em volta do Getsêmani, com um buraco onde fica o terreno detalhado dele;
#   Vale_Miolo   - tapa esse buraco (o Monte das Oliveiras mostra; o Getsêmani esconde);
#   Leste_Chao   - o Monte das Oliveiras (o Getsêmani mostra; a fase do monte tira o pedaço que ela mesma cobre).
import bpy, math, json, os, random
from mathutils import Vector

AQUI = os.path.dirname(os.path.abspath(__file__)) if '__file__' in globals() else r"M:\Claude\github\Projects-animais\assets-vila\jerusalem"
exec(open(os.path.join(AQUI, 'relevo.py'), encoding='utf-8').read())
rc = random.Random(71)
NUCLEO_GS = (-140.0, 76.0, -62.0, 40.0)          # o terreno detalhado do Getsêmani (x0, x1, z0, z1), no mundo

bpy.ops.wm.read_factory_settings(use_empty=True)
sc = bpy.context.scene
col_exp = bpy.data.collections.new('Exportar'); sc.collection.children.link(col_exp)


def mat_vc(nome):
    m = bpy.data.materials.new(nome); m.use_nodes = True
    nt = m.node_tree; bs = next(n for n in nt.nodes if n.type == 'BSDF_PRINCIPLED')
    ca = nt.nodes.new('ShaderNodeAttribute'); ca.attribute_name = 'Col'
    nt.links.new(ca.outputs['Color'], bs.inputs['Base Color'])
    bs.inputs['Roughness'].default_value = 1.0
    if 'Specular IOR Level' in bs.inputs: bs.inputs['Specular IOR Level'].default_value = 0.1
    m.use_backface_culling = True
    return m


def hx(h): return tuple(int(h[i:i + 2], 16) / 255 for i in (0, 2, 4))


PAL = {
    'herod': hx('dccaa6'), 'muro': hx('cfbd99'), 'antonia': hx('c9b791'), 'branco': hx('f0eadb'), 'ouro': hx('d8a640'),
    'ouro_esc': hx('9c6e24'), 'cedro': hx('9a7a5c'), 'madeira': hx('6b4a2e'), 'escuro': hx('3a2f26'),
    'lajes': hx('cbbfa6'), 'claro': hx('e4d6b6'), 'bronze': hx('8a6a3a'), 'agua': hx('5f8f8c'), 'coluna': hx('e8dcc0'),
}
CASAS = [hx(c) for c in ('dbc9a5', 'cfb994', 'e2d4b4', 'c8b18a', 'd6c19b', 'e0cba2')]


class M:
    def __init__(self, nome): self.nome, self.v, self.f, self.c = nome, [], [], []

    def quad(self, pts, cor, out=None):
        P = [Vector(p) for p in pts]
        if out is not None:
            n = (P[1] - P[0]).cross(P[2] - P[0])
            if n.dot(Vector(out)) < 0: P = P[::-1]
        b = len(self.v)
        for p in P: self.v.append((p.x, -p.z, p.y))
        self.f.append(tuple(range(b, b + len(P)))); self.c.append(tuple(min(1, max(0, x)) for x in cor) + (1,))

    def cria(self):
        me = bpy.data.meshes.new(self.nome); me.from_pydata(self.v, [], self.f); me.update()
        ca = me.color_attributes.new('Col', 'BYTE_COLOR', 'CORNER')
        for p in me.polygons:
            for li in p.loop_indices: ca.data[li].color_srgb = self.c[p.index]
        o = bpy.data.objects.new(self.nome, me); col_exp.objects.link(o); o.data.materials.append(mat_vc('Mat_' + self.nome))
        return o


def k(c, f): return tuple(x * f for x in c)


def plano(m, P, U, Vv, LU, LV, out, cor, var=0.05):
    P, U, Vv = Vector(P), Vector(U), Vector(Vv)
    m.quad([P, P + U * LU, P + U * LU + Vv * LV, P + Vv * LV], k(cor, 1 + rc.uniform(-var, var)), out)


def blocos(m, P, U, Vv, LU, LV, out, cor, fiada=1.4, comp=(2.4, 4.0), furo=None, arg=0.1):
    """Face em fiadas (só para dar escala: blocos grandes, poucos triângulos)."""
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
            pedacos = [(a, u1)] if not vao else [(a, min(u1, vao[0])), (max(a, vao[1]), u1)]
            f = rc.uniform(0.9, 1.05)
            for x0, x1 in pedacos:
                if x1 - x0 > 1e-3: m.quad([pt(x0, v), pt(x1, v), pt(x1, vt), pt(x0, vt)], k(cor, f), out)
            u = u1
        if vt < v + h - 1e-4:
            pedacos = [(0, LU)] if not vao else [(0, vao[0]), (vao[1], LU)]
            for x0, x1 in pedacos:
                if x1 - x0 > 1e-3: m.quad([pt(x0, vt), pt(x1, vt), pt(x1, v + h), pt(x0, v + h)], k(cor, 0.74), out)
        v += h; linha += 1


def caixa(m, x0, x1, y0, y1, z0, z1, cor, lados='+x -x +z -z +y', pedra=None, fiada=1.4, comp=(2.4, 4.0), furos=None):
    furos = furos or {}; pedra = (pedra or '').split()
    F = {'+x': ((x1, y0, z0), (0, 0, 1), (0, 1, 0), z1 - z0, y1 - y0, (1, 0, 0)),
         '-x': ((x0, y0, z1), (0, 0, -1), (0, 1, 0), z1 - z0, y1 - y0, (-1, 0, 0)),
         '+z': ((x1, y0, z1), (-1, 0, 0), (0, 1, 0), x1 - x0, y1 - y0, (0, 0, 1)),
         '-z': ((x0, y0, z0), (1, 0, 0), (0, 1, 0), x1 - x0, y1 - y0, (0, 0, -1))}
    for s in lados.split():
        if s == '+y': plano(m, (x0, y1, z0), (1, 0, 0), (0, 0, 1), x1 - x0, z1 - z0, (0, 1, 0), k(cor, 1.04), 0.03); continue
        P, U, Vv, LU, LV, out = F[s]
        if s in pedra: blocos(m, P, U, Vv, LU, LV, out, cor, fiada, comp, furos.get(s))
        else: plano(m, P, U, Vv, LU, LV, out, k(cor, 0.95))


def ameias(m, pts, y, cor, larg=0.7 * MH, alto=0.7 * MV, esp=0.5 * MH, passo=1.4 * MH):
    for (xa, za), (xb, zb) in zip(pts, pts[1:]):
        L = math.hypot(xb - xa, zb - za); n = max(1, int(L / passo)); ux, uz = (xb - xa) / L, (zb - za) / L
        for i in range(n):
            c = (i + 0.5) * L / n; cx, cz = xa + ux * c, za + uz * c
            hx_, hz_ = abs(ux * larg / 2) + abs(uz) * esp / 2, abs(uz * larg / 2) + abs(ux) * esp / 2
            caixa(m, cx - hx_, cx + hx_, y, y + alto, cz - hz_, cz + hz_, k(cor, rc.uniform(0.92, 1.02)), lados='+x -x +z -z +y')


def colunata(m, pts, y0, alto, larg, cor, passo=2.6 * MH, dentro=None):
    """Uma fileira de colunas (caixas finas) ao longo de pts, com o telhado de cedro por cima, `larg` para dentro."""
    for (xa, za), (xb, zb) in zip(pts, pts[1:]):
        L = math.hypot(xb - xa, zb - za); n = max(1, int(L / passo)); ux, uz = (xb - xa) / L, (zb - za) / L
        for i in range(n + 1):
            cx, cz = xa + ux * L * i / n, za + uz * L * i / n
            c_ = 0.3 * MH; caixa(m, cx - c_, cx + c_, y0, y0 + alto, cz - c_, cz + c_, PAL['coluna'], lados='+x -x +z -z')
        nx, nz = dentro if dentro else (-uz, ux)
        xs = [xa, xb, xa + nx * larg, xb + nx * larg]; zs = [za, zb, za + nz * larg, zb + nz * larg]
        caixa(m, min(xs) - 0.3, max(xs) + 0.3, y0 + alto, y0 + alto + 0.7, min(zs) - 0.3, max(zs) + 0.3, PAL['cedro'])


# ================= os chãos =================
def grade(lo, hi, n0, n1, passo0):
    xs = []; x = n0
    while x > lo: xs.append(x); x -= passo0 * (1 + max(0, n0 - x) / 40)
    xs.append(lo)
    x = n0 + passo0
    while x < n1 - 1e-6: xs.append(x); x += passo0
    x = n1
    while x < hi: xs.append(x); x += passo0 * (1 + max(0, x - n1) / 40)
    xs.append(hi)
    return sorted(set(round(v, 3) for v in xs if lo - 1e-6 <= v <= hi + 1e-6))


def chao(nome, xs, zs, h, cor, pula=lambda a, b, c, d: False):
    V, Fc, C = [], [], []; idx = {}
    for i, x in enumerate(xs):
        for j, z in enumerate(zs): idx[i, j] = len(V); V.append((x, -z, h(x, z)))
    for i in range(len(xs) - 1):
        for j in range(len(zs) - 1):
            if pula(xs[i], xs[i + 1], zs[j], zs[j + 1]): continue
            a, b, c, d = idx[i, j], idx[i + 1, j], idx[i + 1, j + 1], idx[i, j + 1]
            Fc.append((a, d, c, b)); C.append(cor((xs[i] + xs[i + 1]) / 2, (zs[j] + zs[j + 1]) / 2))
    me = bpy.data.meshes.new(nome); me.from_pydata(V, [], Fc); me.update()
    ca = me.color_attributes.new('Col', 'BYTE_COLOR', 'CORNER')
    for p in me.polygons:
        for li in p.loop_indices: ca.data[li].color_srgb = C[p.index] + (1,)
    o = bpy.data.objects.new(nome, me); col_exp.objects.link(o); o.data.materials.append(mat_vc('Mat_' + nome))
    return o


def cor_campo(x, z):
    r = 0.5 + 0.3 * math.sin(x * 0.043 + 1.3) * math.cos(z * 0.051 - 0.4) + 0.2 * math.sin(x * 0.011 - z * 0.017)
    base = hx('a3ad66') if r < 0.45 else hx('96a35c') if r < 0.62 else hx('c2bd7c')
    if abs(x - LEITO) < 4: base = hx('b5a985')
    if x < -95: base = hx('bba77e') if r < 0.6 else hx('c2bd7c')
    return k(base, rc.uniform(0.95, 1.03))


def cor_cidade(x, z):
    return k(hx('cdbb95') if (int(x / 11) + int(z / 11)) % 3 else hx('c4b089'), rc.uniform(0.94, 1.03))


gx0, gx1, gz0, gz1 = NUCLEO_GS
h_vale = lambda x, z: h_mundo(x, z) - 0.06
xs = grade(-112.0, 92.0, max(gx0, -112.0), gx1, 4.0); zs = grade(-1100.0, 1100.0, gz0, gz1, 4.0)
dentro_gs = lambda a, b, c, d: a >= gx0 + 3 and b <= gx1 - 3 and c >= gz0 + 3 and d <= gz1 - 3
chao('Vale_Chao', xs, zs, h_vale, cor_campo, dentro_gs)
chao('Vale_Miolo', [x for x in xs if gx0 + 3 - 4.01 <= x <= gx1 - 3 + 4.01], [z for z in zs if gz0 + 3 - 4.01 <= z <= gz1 - 3 + 4.01], h_vale, cor_campo,
     lambda a, b, c, d: not dentro_gs(a, b, c, d))
chao('Leste_Chao', grade(92.0, 1100.0, 92.0, 92.0, 5.0), zs, h_vale, cor_campo)
chao('Cidade_Chao', grade(-1100.0, -100.0, -270.0, -100.0, 4.0), grade(-1100.0, 1100.0, -95.0, 165.0, 4.0), lambda x, z: h_mundo(x, z) - 0.15, cor_cidade)
CHAOS = {o.name for o in col_exp.objects}

# ================= o monte do templo =================
tm = M('Templo_Muros')
caixa(tm, TX0, TX1, -4.0, TY, TZ0, TZ1, PAL['herod'], pedra='+x +z -z -x', fiada=1.6, comp=(3.0, 5.0))
TOPO = TY + 6.0           # o muro de fora continua por cima (o fundo dos pórticos)
for x0, x1, z0, z1, y1 in [(TX1 - 12, TX1, TZ0 + 12, TZ1 - 12, TOPO), (TX0, TX1, TZ1 - 12, TZ1, TOPO),
                           (TX0, TX1, TZ0, TZ0 + 12, TY + 13.0), (TX0, TX0 + 12, TZ0 + 12, TZ1 - 12, TOPO)]:
    caixa(tm, x0, x1, TY, y1, z0, z1, PAL['herod'], lados='+x -x +z -z', pedra='+x -x +z -z', fiada=1.6, comp=(3.0, 5.0))
    caixa(tm, x0 - 0.4, x1 + 0.4, y1, y1 + 0.5, z0 - 0.4, z1 + 0.4, PAL['claro'])
    caixa(tm, x0 + 0.4, x1 - 0.4, y1 + 0.5, y1 + 1.4, z0 + 0.4, z1 - 0.4, PAL['cedro'])
# pilastras na parte de cima das faces leste e sul
z_ = TZ0 + 14
while z_ < TZ1 - 13:
    caixa(tm, TX1, TX1 + 0.5, TY - 0.6, TOPO - 0.1, z_ - 0.7, z_ + 0.7, k(PAL['herod'], 1.07), lados='+x +z -z +y'); z_ += 4.5
x_ = TX1 - 14
while x_ > TX0 + 2:
    caixa(tm, x_ - 0.7, x_ + 0.7, TY - 0.6, TY + 12.9, TZ0 - 0.5, TZ0, k(PAL['herod'], 1.07), lados='-z +x -x +y'); x_ -= 4.5
# as quinas: o pináculo (sudeste) e a torre do nordeste
caixa(tm, TX1 - 9, TX1 + 0.4, TY + 13, TY + 17, TZ0 - 0.4, TZ0 + 9, PAL['herod'], pedra='+x -z')
caixa(tm, TX1 - 8, TX1 + 0.8, -4.0, TOPO + 6, TZ1 - 8, TZ1 + 0.8, PAL['herod'], pedra='+x +z')
# a Porta de Susã (Porta Dourada): fechada, duas portas em arco de bronze, de frente para o santuário
ys = pe_velho(SUSA_Z) - 1
caixa(tm, TX1, TX1 + 2.0, ys, TY + 2, SUSA_Z - 7, SUSA_Z + 7, k(PAL['herod'], 1.05), pedra='+x')
for zc in (SUSA_Z - 3.2, SUSA_Z + 3.2):
    yb = ys + 1.2
    pts = [(TX1 + 2.03, yb, zc - 2.0), (TX1 + 2.03, yb, zc + 2.0), (TX1 + 2.03, yb + 5.0, zc + 2.0)]
    for i in range(1, 6):
        a = math.pi * i / 6; pts.append((TX1 + 2.03, yb + 5.0 + math.sin(a) * 2.0, zc + math.cos(a) * 2.0))
    pts.append((TX1 + 2.03, yb + 5.0, zc - 2.0))
    tm.quad(pts, PAL['bronze'], (1, 0, 0))
tm.cria()

# ================= os pátios e o santuário =================
sa = M('Santuario')
SX, SZ = SANTUARIO
# a balaustrada (soreg): até aqui vão os gentios
for x0, x1, z0, z1 in [(SX - 40, SX + 60, SZ - 34, SZ - 33.4), (SX - 40, SX + 60, SZ + 33.4, SZ + 34), (SX + 59.4, SX + 60, SZ - 34, SZ + 34), (SX - 40, SX - 39.4, SZ - 34, SZ + 34)]:
    caixa(sa, x0, x1, TY, TY + 1.4, z0, z1, PAL['claro'])
# o pátio das mulheres (a leste) e o pátio de Israel e dos sacerdotes, mais alto, com o santuário
caixa(sa, SX + 33, SX + 55, TY - 1, TY + 2.5, SZ - 18, SZ + 18, k(PAL['lajes'], 1.02), pedra='+x +z -z', fiada=0.9, comp=(1.6, 2.8))
for x0, x1, z0, z1 in [(SX + 33, SX + 55, SZ - 18, SZ - 16.8), (SX + 33, SX + 55, SZ + 16.8, SZ + 18), (SX + 53.8, SX + 55, SZ - 18, SZ + 18)]:
    caixa(sa, x0, x1, TY + 2.5, TY + 8.5, z0, z1, PAL['claro'], pedra='+x +z -z', fiada=0.9, comp=(1.6, 2.8))
caixa(sa, SX + 54, SX + 57, TY + 2.5, TY + 13, SZ - 4, SZ + 4, PAL['claro'])          # a Porta Formosa
sa.quad([(SX + 57.03, TY + 2.5, SZ - 2), (SX + 57.03, TY + 2.5, SZ + 2), (SX + 57.03, TY + 9, SZ + 2), (SX + 57.03, TY + 9, SZ - 2)], PAL['bronze'], (1, 0, 0))
BASE = TY + 5.0
caixa(sa, SX - 32, SX + 33, TY - 1, BASE, SZ - 26, SZ + 26, k(PAL['lajes'], 1.03), pedra='+x +z -z -x', fiada=0.9, comp=(1.6, 2.8))
for x0, x1, z0, z1 in [(SX - 32, SX + 33, SZ - 26, SZ - 24.8), (SX - 32, SX + 33, SZ + 24.8, SZ + 26), (SX + 31.8, SX + 33, SZ - 26, SZ + 26), (SX - 32, SX - 30.8, SZ - 26, SZ + 26)]:
    caixa(sa, x0, x1, BASE, BASE + 8, z0, z1, PAL['claro'], pedra='+x -z +z -x', fiada=0.9, comp=(1.6, 2.8))
caixa(sa, SX + 31, SX + 35, BASE - 2.5, BASE + 13, SZ - 5, SZ + 5, PAL['claro'])        # a Porta de Nicanor
sa.quad([(SX + 35.03, BASE - 2.5, SZ - 2.6), (SX + 35.03, BASE - 2.5, SZ + 2.6), (SX + 35.03, BASE + 8, SZ + 2.6), (SX + 35.03, BASE + 8, SZ - 2.6)], PAL['ouro_esc'], (1, 0, 0))
for i in range(5):        # os 15 degraus (aqui 5) da Porta de Nicanor, do pátio das mulheres para cima
    caixa(sa, SX + 35 + i * 0.9, SX + 35.9 + i * 0.9, TY + 2.5, BASE - 0.5 * i, SZ - 6, SZ + 6, k(PAL['lajes'], 1 + 0.02 * (i % 2)), lados='+x +z -z +y')
# o altar dos holocaustos, de pedra bruta, com a rampa ao sul
caixa(sa, SX + 16, SX + 25, BASE, BASE + 4.0, SZ - 4.5, SZ + 4.5, hx('cfc3ab'), lados='+x -x +z -z +y')
for i in range(4):
    caixa(sa, SX + 18.5, SX + 22.5, BASE, BASE + 1.0 * (i + 1), SZ - 4.5 - 7 + i * 1.75, SZ - 4.5 - 7 + (i + 1) * 1.75, k(hx('cfc3ab'), 0.96), lados='+x -x -z +y')
# o santuário: o pórtico (100 côvados de largura e de altura; aqui 30 x 38), de frente para o leste, e o corpo atrás
FR = SX + 15                    # a fachada
caixa(sa, FR - 5, FR, BASE, BASE + 38, SZ - 15, SZ + 15, PAL['branco'], pedra='+x +z -z', fiada=2.0, comp=(2.6, 4.2))
caixa(sa, SX - 28, FR - 5, BASE, BASE + 30, SZ - 9, SZ + 9, PAL['branco'], pedra='+z -z -x', fiada=2.0, comp=(2.6, 4.2))
caixa(sa, FR - 5.4, FR + 0.4, BASE + 38, BASE + 39.2, SZ - 15.4, SZ + 15.4, PAL['ouro'])
caixa(sa, SX - 28.4, FR - 5, BASE + 30, BASE + 31, SZ - 9.4, SZ + 9.4, PAL['ouro'])
for i in range(16):
    z_ = SZ - 14.3 + i * 1.9
    caixa(sa, FR - 2.9, FR - 2.1, BASE + 39.2, BASE + 40.6, z_ - 0.25, z_ + 0.25, PAL['ouro'], lados='+x -x +z -z +y')
for z_ in (SZ - 13, SZ - 8, SZ + 8, SZ + 13):         # meias-colunas com capitel de ouro
    caixa(sa, FR, FR + 0.7, BASE, BASE + 34.5, z_ - 0.9, z_ + 0.9, k(PAL['branco'], 1.03), lados='+x +z -z')
    caixa(sa, FR, FR + 0.9, BASE + 34.5, BASE + 35.8, z_ - 1.1, z_ + 1.1, PAL['ouro'], lados='+x +z -z +y')
sa.quad([(FR + 0.03, BASE, SZ - 5), (FR + 0.03, BASE, SZ + 5), (FR + 0.03, BASE + 22, SZ + 5), (FR + 0.03, BASE + 22, SZ - 5)], PAL['ouro'], (1, 0, 0))
sa.quad([(FR + 0.06, BASE, SZ - 3.6), (FR + 0.06, BASE, SZ + 3.6), (FR + 0.06, BASE + 20, SZ + 3.6), (FR + 0.06, BASE + 20, SZ - 3.6)], hx('7d3b2a'), (1, 0, 0))
sa.quad([(FR + 0.05, BASE + 22.6, SZ - 6.5), (FR + 0.05, BASE + 22.6, SZ + 6.5), (FR + 0.05, BASE + 24.6, SZ + 6.5), (FR + 0.05, BASE + 24.6, SZ - 6.5)], PAL['ouro'], (1, 0, 0))
for i in range(6):        # a escadaria do pátio dos sacerdotes até o pórtico
    caixa(sa, FR + i * 0.8, FR + 0.8 + i * 0.8, BASE - 0.1, BASE + 1.5 - i * 0.27, SZ - 10, SZ + 10, k(PAL['lajes'], 1.0 + 0.02 * (i % 2)), lados='+x +z -z +y')
sa.cria()

# ================= a Fortaleza Antônia (no canto noroeste do templo) =================
an = M('Fortaleza_Antonia')
AX0, AX1, AZ0, AZ1 = ANTONIA
TOPO_A = TY + 20
caixa(an, AX0, AX1, 6.0, TOPO_A, AZ0, AZ1, PAL['antonia'], pedra='+x +z -x -z', fiada=1.3, comp=(2.0, 3.4))
ameias(an, [(AX1 - 0.4, AZ0), (AX1 - 0.4, AZ1)], TOPO_A, PAL['antonia']); ameias(an, [(AX1, AZ1 - 0.4), (AX0, AZ1 - 0.4)], TOPO_A, PAL['antonia'])
for tx0, tz0, extra in [(AX1 - 8, AZ0, 16.0), (AX1 - 8, AZ1 - 8, 8.0), (AX0, AZ1 - 8, 8.0), (AX0, AZ0, 8.0)]:
    caixa(an, tx0 - 0.5, tx0 + 8.5, 6.0, TOPO_A + extra, tz0 - 0.5, tz0 + 8.5, k(PAL['antonia'], 1.03), pedra='+x +z -x -z', fiada=1.3, comp=(2.0, 3.4))
    ameias(an, [(tx0 - 0.1, tz0 - 0.1), (tx0 + 8.1, tz0 - 0.1), (tx0 + 8.1, tz0 + 8.1), (tx0 - 0.1, tz0 + 8.1), (tx0 - 0.1, tz0 - 0.1)], TOPO_A + extra, PAL['antonia'])
an.cria()

# ================= o muro da cidade ao norte do templo, a Porta das Ovelhas e o Tanque de Israel =================
mc = M('Muro_Cidade')
NZ = NORTE_Z; ESP = 3.0
TOPO_M = 33.0
# o trecho leste: da torre do nordeste do templo até o canto, e o muro norte até a Antônia (com o vão da porta)
PX, PZ_ = PORTA_OVELHAS
caixa(mc, TX1 - ESP, TX1, -2.0, TOPO_M, TZ1 + 0.8, NZ + ESP, PAL['muro'], lados='+x -x +z +y', pedra='+x +z', fiada=1.1, comp=(1.6, 3.0))
ameias(mc, [(TX1 - 0.4, TZ1 + 1), (TX1 - 0.4, NZ + ESP)], TOPO_M, PAL['muro'])
ABRE, MOLA = 1.5 * MH, 2.4 * MV        # meia largura do vão e altura do começo do arco
MEIO = ABRE + 1.8                       # meia largura do corpo do meio
G0, G1 = PX - MEIO - 8.0, PX + MEIO + 8.0            # a porta inteira (duas torres e o corpo do meio)
for x0, x1 in [(TX1 - ESP, G1), (G0, AX1)]:
    caixa(mc, x0, x1, 8.0, TOPO_M, NZ, NZ + ESP, PAL['muro'], lados='+z -z +y', pedra='+z', fiada=1.1, comp=(1.6, 3.0))
    ameias(mc, [(x0, NZ + ESP - 0.4), (x1, NZ + ESP - 0.4)], TOPO_M, PAL['muro'])
for xt in (-178.0, -255.0, -280.0):       # torres no muro norte
    caixa(mc, xt - 3.5, xt + 3.5, 8.0, TOPO_M + 4, NZ - 1, NZ + ESP + 3, k(PAL['muro'], 1.02), pedra='+z +x -x', fiada=1.1, comp=(1.6, 3.0))
    ameias(mc, [(xt - 3.4, NZ + ESP + 2.6), (xt + 3.4, NZ + ESP + 2.6)], TOPO_M + 4, PAL['muro'])
caixa(mc, TX1 - 7, TX1 + 1.5, -2.0, TOPO_M + 5, NZ - 4, NZ + ESP + 1.5, k(PAL['muro'], 1.02), pedra='+x +z')      # a torre do canto
# a Porta das Ovelhas: abre para o norte (para Betesda); torres dos lados, túnel com abóbada e portas abertas
HP = h_velho(PX, NZ + ESP + 4) + 0.3          # a soleira
for x0, x1 in [(G0, PX - MEIO), (PX + MEIO, G1)]:
    caixa(mc, x0, x1, 8.0, TOPO_M + 5, NZ - 1, NZ + ESP + 4, k(PAL['muro'], 1.03), pedra='+z +x -x', fiada=1.1, comp=(1.6, 3.0))
    ameias(mc, [(x0 + 0.3, NZ + ESP + 3.6), (x1 - 0.3, NZ + ESP + 3.6)], TOPO_M + 5, PAL['muro'])
FZ = NZ + ESP + 2.0            # a face do corpo do meio (recuada 2 m das torres)


def furo_porta(v0, v1):
    y0 = 8.0 + v0
    if 8.0 + v1 <= HP or y0 >= HP + MOLA + ABRE: return None
    yy = max(y0, HP)
    w = ABRE if yy <= HP + MOLA else math.sqrt(max(0.0, ABRE ** 2 - (yy - HP - MOLA) ** 2))
    c = MEIO                    # a face +z vai de x1 (u = 0) para x0: o centro fica a MEIO de x1
    return (c - w, c + w) if w > 0.05 else None


caixa(mc, PX - MEIO, PX + MEIO, 8.0, TOPO_M + 1.5, NZ - 1, FZ, k(PAL['muro'], 1.05), lados='+z +y', pedra='+z', fiada=0.8, comp=(1.1, 1.8), furos={'+z': furo_porta})
ameias(mc, [(PX - MEIO + 0.3, FZ - 0.4), (PX + MEIO - 0.3, FZ - 0.4)], TOPO_M + 1.5, PAL['muro'])
yc = HP + MOLA; N = 11
for i in range(N):            # o arco de aduelas e a abóbada do túnel
    a0, a1 = math.pi * i / N, math.pi * (i + 1) / N
    p = lambda a, r, z: (PX + math.cos(a) * r, yc + math.sin(a) * r, z)
    mc.quad([p(a0, ABRE, FZ + 0.15), p(a1, ABRE, FZ + 0.15), p(a1, ABRE + 0.6, FZ + 0.15), p(a0, ABRE + 0.6, FZ + 0.15)], k(PAL['claro'], 1.04 if i % 2 else 0.95), (0, 0, 1))
    mc.quad([p(a0, ABRE, FZ + 0.15), p(a0, ABRE, NZ - 1), p(a1, ABRE, NZ - 1), p(a1, ABRE, FZ + 0.15)], k(PAL['muro'], 0.66), (-math.cos((a0 + a1) / 2), -math.sin((a0 + a1) / 2), 0))
for s in (-1, 1):
    xx = PX + s * ABRE
    blocos(mc, (xx, HP, FZ + 0.15), (0, 0, -1), (0, 1, 0), FZ + 0.15 - (NZ - 1), MOLA, (-s, 0, 0), k(PAL['muro'], 0.8), fiada=0.6, comp=(0.9, 1.5))
    mc.quad([(PX + s * ABRE, HP, FZ + 0.15), (PX + s * (ABRE + 0.6), HP, FZ + 0.15), (PX + s * (ABRE + 0.6), yc, FZ + 0.15), (PX + s * ABRE, yc, FZ + 0.15)], k(PAL['claro'], 0.98), (0, 0, 1))
    xd = PX + s * (ABRE - 0.18)
    caixa(mc, min(xd, xd - s * 0.14), max(xd, xd - s * 0.14), HP, HP + MOLA + 0.6, FZ - 2.2, FZ - 0.4, PAL['madeira'], lados='+x -x +z -z +y')
mc.quad([(PX - ABRE, HP + 0.02, NZ - 1), (PX + ABRE, HP + 0.02, NZ - 1), (PX + ABRE, HP + 0.02, FZ + 0.15), (PX - ABRE, HP + 0.02, FZ + 0.15)], PAL['lajes'], (0, 1, 0))
# a cidade de Davi: o muro desce pelo lado do Cedrom, da quina sudeste do templo para o sul
z = TZ0
while z > -340:
    z1 = max(-340.0, z - 30)
    y0 = min(pe_velho(z), pe_velho(z1)) - 2
    caixa(mc, TX1 - 3, TX1 - 1, y0, y0 + 12, z1, z, PAL['muro'], lados='+x -x +y', pedra='+x', fiada=1.1, comp=(1.6, 3.0))
    caixa(mc, TX1 - 5, TX1 + 1.5, y0, y0 + 15, z1 - 3, z1 + 3, k(PAL['muro'], 1.02), pedra='+x +z -z')
    z = z1
mc.cria()

# o Tanque de Israel (dentro do muro, junto ao lado norte do templo) e o Tanque de Betesda (fora, ao norte da porta)
tq = M('Tanques')


def tanque(x0, x1, z0, z1, y_borda, fundo):
    for a, b, c, d in [(x0, x1, z0 - 1, z0), (x0, x1, z1, z1 + 1), (x0 - 1, x0, z0 - 1, z1 + 1), (x1, x1 + 1, z0 - 1, z1 + 1)]:
        caixa(tq, a, b, y_borda - 0.6, y_borda + 0.5, c, d, PAL['claro'], lados='+x -x +z -z +y')
    for a, b, c, d, out in [(x0, x1, z0, z0, (0, 0, 1)), (x0, x1, z1, z1, (0, 0, -1))]:
        tq.quad([(a, y_borda, c), (b, y_borda, c), (b, y_borda - fundo, c), (a, y_borda - fundo, c)], k(PAL['herod'], 0.8), out)
    for a, out in [(x0, (1, 0, 0)), (x1, (-1, 0, 0))]:
        tq.quad([(a, y_borda, z0), (a, y_borda, z1), (a, y_borda - fundo, z1), (a, y_borda - fundo, z0)], k(PAL['herod'], 0.8), out)
    tq.quad([(x0, y_borda - fundo * 0.6, z0), (x1, y_borda - fundo * 0.6, z0), (x1, y_borda - fundo * 0.6, z1), (x0, y_borda - fundo * 0.6, z1)], PAL['agua'], (0, 1, 0))


tanque(-232.0, -168.0, 25.0, 36.0, h_velho(-200, 30) + 0.3, 5.0)
BX, BZ = BETESDA
yb = max(h_velho(BX + dx, BZ + dz) for dx in (-22, 0, 22) for dz in (-20, 0, 20)) + 0.4
tanque(BX - 20, BX + 20, BZ - 19, BZ - 2, yb, 6.0)       # os dois tanques, com o dique no meio
tanque(BX - 20, BX + 20, BZ + 2, BZ + 19, yb, 6.0)
# os cinco alpendres (Jo 5.2): os quatro lados e o do dique
colunata(tq, [(BX - 22, BZ - 21), (BX + 22, BZ - 21)], yb, 3.6 * MV, 3.5, PAL['coluna'], dentro=(0, -1))
colunata(tq, [(BX - 22, BZ + 21), (BX + 22, BZ + 21)], yb, 3.6 * MV, 3.5, PAL['coluna'], dentro=(0, 1))
colunata(tq, [(BX + 22, BZ - 21), (BX + 22, BZ + 21)], yb, 3.6 * MV, 3.5, PAL['coluna'], dentro=(1, 0))
colunata(tq, [(BX - 22, BZ - 21), (BX - 22, BZ + 21)], yb, 3.6 * MV, 3.5, PAL['coluna'], dentro=(-1, 0))
colunata(tq, [(BX - 20, BZ), (BX + 20, BZ)], yb, 3.6 * MV, 1.0, PAL['coluna'], dentro=(0, 1))
caixa(tq, BX - 20, BX + 20, yb - 6, yb + 0.1, BZ - 2, BZ + 2, PAL['lajes'], lados='+z -z +x -x +y')        # o dique
# o chão em volta do tanque, nivelado (as fases de perto vão refazer isto)
caixa(tq, BX - 27, BX + 27, yb - 3, yb - 0.05, BZ - 27, BZ - 21.6, k(PAL['lajes'], 0.98), lados='+x -x +z -z +y')
caixa(tq, BX - 27, BX + 27, yb - 3, yb - 0.05, BZ + 21.6, BZ + 27, k(PAL['lajes'], 0.98), lados='+x -x +z -z +y')
caixa(tq, BX + 21.6, BX + 27, yb - 3, yb - 0.05, BZ - 21.6, BZ + 21.6, k(PAL['lajes'], 0.98), lados='+x -x +z -z +y')
caixa(tq, BX - 27, BX - 21.6, yb - 3, yb - 0.05, BZ - 21.6, BZ + 21.6, k(PAL['lajes'], 0.98), lados='+x -x +z -z +y')
tq.cria()

# ================= ferramentas para o resto da cidade =================
# (MH e MV, de relevo.py: 1 m do jogo, na horizontal e na vertical, em unidades do plano velho)
def dentro(px, pz, poli):
    c = False
    for (xa, za), (xb, zb) in zip(poli, poli[1:] + poli[:1]):
        if (za > pz) != (zb > pz) and px < xa + (pz - za) * (xb - xa) / (zb - za): c = not c
    return c


def obox(m, xa, za, xb, zb, larg, y0, y1, cor, fora=0, topo=True, fiada=2.0, comp=(3.5, 6.0)):
    """Uma caixa ao longo de um segmento (muros tortos). fora=1: o lado à esquerda (de quem vai de a para b) é de
    pedra aparelhada; fora=-1: o da direita."""
    L = math.hypot(xb - xa, zb - za); ux, uz = (xb - xa) / L, (zb - za) / L; nx, nz = -uz, ux; h = larg / 2
    A = (xa + nx * h, za + nz * h); B = (xb + nx * h, zb + nz * h); C = (xb - nx * h, zb - nz * h); D = (xa - nx * h, za - nz * h)
    for p, q, out, st in [(A, B, (nx, 0, nz), fora == 1), (C, D, (-nx, 0, -nz), fora == -1), (B, C, (ux, 0, uz), False), (D, A, (-ux, 0, -uz), False)]:
        P0 = Vector((p[0], y0, p[1])); U = Vector((q[0] - p[0], 0, q[1] - p[1])); Lq = U.length; U.normalize()
        if st: blocos(m, P0, U, (0, 1, 0), Lq, y1 - y0, out, cor, fiada, comp)
        else: plano(m, P0, U, (0, 1, 0), Lq, y1 - y0, out, k(cor, 0.95))
    if topo: m.quad([(A[0], y1, A[1]), (B[0], y1, B[1]), (C[0], y1, C[1]), (D[0], y1, D[1])], k(cor, 1.04), (0, 1, 0))


def muro(m, pts, alto=5.5 * MV, esp=2.0 * MH, fora=1, torres=45.0, cor=None):
    """Muralha que acompanha o chão, em trechos de até 16, com ameias do lado de fora e torres a cada `torres`."""
    cor = cor or PAL['muro']; acum = 0.0; prox = torres / 2; tor = []
    for (xa, za), (xb, zb) in zip(pts, pts[1:]):
        L = math.hypot(xb - xa, zb - za); n = max(1, math.ceil(L / 16)); ux, uz = (xb - xa) / L, (zb - za) / L
        nx, nz = -uz * fora, ux * fora
        for i in range(n):
            x0, z0 = xa + ux * L * i / n, za + uz * L * i / n; x1, z1 = xa + ux * L * (i + 1) / n, za + uz * L * (i + 1) / n
            g = [h_velho(x0, z0), h_velho(x1, z1), h_velho((x0 + x1) / 2, (z0 + z1) / 2)]
            yt = max(g) + alto
            obox(m, x0, z0, x1, z1, esp, min(g) - 2.5, yt, cor, fora=fora)
            o = esp / 2 - 0.8
            ameias(m, [(x0 + nx * o, z0 + nz * o), (x1 + nx * o, z1 + nz * o)], yt, cor)
        while torres and prox <= acum + L:
            t = prox - acum; tor.append((xa + ux * t, za + uz * t)); prox += torres
        acum += L
    T = 2.2 * MH
    for cx, cz in tor:
        gs = [h_velho(cx + a, cz + b) for a in (-T, T) for b in (-T, T)]
        yt = max(gs) + alto + 1.8 * MV
        caixa(m, cx - T, cx + T, min(gs) - 2.5, yt, cz - T, cz + T, k(cor, 1.03), pedra='+x -x +z -z', fiada=2.0, comp=(3.0, 5.0))
        caixa(m, cx - T - 0.4, cx + T + 0.4, yt, yt + 0.6, cz - T - 0.4, cz + T + 0.4, PAL['claro'])
    return tor


def estrada(m, pts, larg, cor, sobe=0.9, degraus=False, passo=3.0):
    """Faixa calçada (ou de terra) que acompanha o chão; com degraus, listras claras e escuras (a rua em escada)."""
    for (xa, za), (xb, zb) in zip(pts, pts[1:]):
        L = math.hypot(xb - xa, zb - za); n = max(1, math.ceil(L / passo)); nx, nz = -(zb - za) / L * larg / 2, (xb - xa) / L * larg / 2
        for i in range(n):
            a, b = i / n, (i + 1) / n
            pa = (xa + (xb - xa) * a, za + (zb - za) * a); pb = (xa + (xb - xa) * b, za + (zb - za) * b)
            ya, yb_ = h_velho(*pa) + sobe, h_velho(*pb) + sobe
            c = k(cor, 0.86 if (degraus and i % 2) else rc.uniform(0.97, 1.03))
            m.quad([(pa[0] + nx, ya, pa[1] + nz), (pb[0] + nx, yb_, pb[1] + nz), (pb[0] - nx, yb_, pb[1] - nz), (pa[0] - nx, ya, pa[1] - nz)], c, (0, 1, 0))


def canteiro(m, x0, x1, z0, z1, cores, sobe=0.5, passo=3.0 * MH):
    nx_, nz_ = max(1, round((x1 - x0) / passo)), max(1, round((z1 - z0) / passo))
    y = lambda x, z: h_velho(x, z) + sobe
    for i in range(nx_):
        for j in range(nz_):
            a, b = x0 + (x1 - x0) * i / nx_, x0 + (x1 - x0) * (i + 1) / nx_; c, d = z0 + (z1 - z0) * j / nz_, z0 + (z1 - z0) * (j + 1) / nz_
            m.quad([(a, y(a, c), c), (b, y(b, c), c), (b, y(b, d), d), (a, y(a, d), d)], k(rc.choice(cores), rc.uniform(0.94, 1.05)), (0, 1, 0))


def arvore(m, x, z, r=2.0 * MH, alto=4.5 * MV, cor=None, cipreste=False):
    y = h_velho(x, z) - 0.3; cor = cor or k(hx('7f8c56'), rc.uniform(0.88, 1.08)); t = 0.15 * MH
    caixa(m, x - t, x + t, y, y + alto * 0.5, z - t, z + t, PAL['madeira'], lados='+x -x +z -z')
    if cipreste: r, y0, ym, y1 = r * 0.45, y + alto * 0.2, y + alto * 0.5, y + alto * 1.35
    else: y0, ym, y1 = y + alto * 0.38, y + alto * 0.68, y + alto
    n = 6; a0 = rc.uniform(0, 6.28)
    an = [(x + math.cos(a0 + i * 2 * math.pi / n) * r * rc.uniform(0.85, 1.1), ym + rc.uniform(-0.2, 0.2) * MV, z + math.sin(a0 + i * 2 * math.pi / n) * r * rc.uniform(0.85, 1.1)) for i in range(n)]
    for i in range(n):
        p, q = an[i], an[(i + 1) % n]; ox, oz = p[0] + q[0] - 2 * x, p[2] + q[2] - 2 * z
        m.quad([p, q, (x, y1, z)], k(cor, 1.06), (ox, 1, oz))
        m.quad([q, p, (x, y0, z)], k(cor, 0.78), (ox, -1, oz))


def penedo(m, x, z, r0, r1, y0, y1, cor, n=9, ez=1.0):
    """Um rochedo: tronco de cone irregular, com o topo em leque."""
    a0 = rc.uniform(0, 6.28); A = [a0 + i * 2 * math.pi / n for i in range(n)]
    base = [(x + math.cos(a) * r0 * rc.uniform(0.85, 1.12), y0, z + math.sin(a) * r0 * ez * rc.uniform(0.85, 1.12)) for a in A]
    topo = [(x + math.cos(a) * r1 * rc.uniform(0.8, 1.2), y1 + rc.uniform(-0.7, 0.4), z + math.sin(a) * r1 * ez * rc.uniform(0.8, 1.2)) for a in A]
    for i in range(n):
        j = (i + 1) % n; am = (A[i] + A[j]) / 2
        m.quad([base[i], base[j], topo[j], topo[i]], k(cor, rc.uniform(0.82, 0.98)), (math.cos(am), 0.3, math.sin(am)))
        m.quad([topo[i], topo[j], (x, y1 + 0.5, z)], k(cor, rc.uniform(1.0, 1.08)), (0, 1, 0))
    return topo


# os bairros: só dentro dos muros (os polígonos abaixo), longe das ruas e dos lugares abertos
CID_SUL = [(-606.0, -150.0), (-608.0, -330.0), (-575.0, -480.0), (-480.0, -507.0), (-262.0, -507.0), (-222.0, -478.0), (-175.0, -440.0),
           (-163.0, -340.0), (-163.0, -203.0), (-311.0, -203.0), (-311.0, -146.0), (-372.0, -148.0), (-482.0, -150.0)]
CID_NORTE = [(-470.0, -150.0), (-470.0, 25.0), (-452.0, 58.0), (-336.0, 42.0), (-332.0, 18.0), (-311.0, 18.0), (-311.0, -146.0), (-372.0, -148.0)]
ESTR = []        # (pontos, meia largura + folga): nenhuma casa em cima

# ================= as muralhas: o primeiro muro (a cidade alta e a baixa) e o segundo (o bairro novo, ao norte) =================
mu = M('Muralhas')
GEN = (-489.0, -150.0)                 # a Porta de Genat ("do Jardim"): no primeiro muro, para o norte; dela sai a estrada de Emaús
GW, GT = 1.5 * MH, 4.0 * MH            # meia abertura (3 m) e largura das torres (4 m)
muro(mu, [(-606.0, -150.0), (GEN[0] - GW - GT, -150.0)], fora=1, torres=40.0)
muro(mu, [(GEN[0] + GW + GT, -150.0), (-372.0, -148.0)], fora=1, torres=40.0)
muro(mu, [(-606.0, -150.0), (-608.0, -330.0), (-575.0, -480.0), (-480.0, -507.0), (-262.0, -507.0), (-222.0, -478.0), (-175.0, -440.0), (-163.0, -340.0)], fora=-1, torres=42.0)
muro(mu, [(-470.0, -150.0), (-470.0, 25.0), (-452.0, 58.0), (-336.0, 40.0)], fora=1, torres=38.0)
# a Porta de Genat: duas torres e o vão (3 m de largura, 3,6 m de altura); a estrada passa no meio
gG = h_velho(*GEN); ytG = max(h_velho(GEN[0] + a, GEN[1] + b) for a in (-GW - GT, GW + GT) for b in (-6, 6)) + 5.5 * MV
for x0 in (GEN[0] - GW - GT, GEN[0] + GW):
    caixa(mu, x0, x0 + GT, gG - 3, ytG + 1.8 * MV, GEN[1] - 2.2 * MH, GEN[1] + 2.2 * MH, k(PAL['muro'], 1.04), pedra='+x -x +z -z', fiada=1.6, comp=(2.4, 4.0))
    caixa(mu, x0 - 0.4, x0 + GT + 0.4, ytG + 1.8 * MV, ytG + 1.8 * MV + 0.6, GEN[1] - 2.2 * MH - 0.4, GEN[1] + 2.2 * MH + 0.4, PAL['claro'])
    ameias(mu, [(x0, GEN[1] + 2.2 * MH - 0.8), (x0 + GT, GEN[1] + 2.2 * MH - 0.8)], ytG + 1.8 * MV + 0.6, PAL['muro'])
caixa(mu, GEN[0] - GW, GEN[0] + GW, gG + 3.6 * MV, ytG, GEN[1] - 1.0 * MH, GEN[1] + 1.0 * MH, k(PAL['muro'], 1.04), pedra='+z -z', fiada=1.2, comp=(1.6, 2.8))
caixa(mu, GEN[0] - GW, GEN[0] + GW, gG + 3.4 * MV, gG + 3.6 * MV, GEN[1] - 1.1 * MH, GEN[1] + 1.1 * MH, PAL['claro'])
for s in (-1, 1):            # as folhas da porta, abertas para dentro (sul)
    xd = GEN[0] + s * (GW - 0.4)
    caixa(mu, xd - 0.25, xd + 0.25, gG - 0.2, gG + 3.3 * MV, GEN[1] - 1.0 * MH - 1.5 * MH, GEN[1] - 1.0 * MH, PAL['madeira'], lados='+x -x +z -z +y')
# o viaduto sobre o Tiropeon (o arco de Wilson): liga a cidade alta ao templo; a rua passa por baixo
yv = TY + 0.3
obox(mu, -372.0, -147.5, TX0, -147.0, 4.0 * MH, yv - 1.2 * MV, yv, PAL['herod'], fora=1)
for xa in (-366.0, -350.0, -335.0):
    g = min(h_velho(xa + a, -147.0) for a in (-4.5, 4.5))
    caixa(mu, xa - 4.5, xa + 4.5, g - 1.5, yv - 1.2 * MV, -147.0 - 2.0 * MH, -147.0 + 2.0 * MH, PAL['herod'], pedra='+z -z', fiada=1.6, comp=(2.4, 4.0))
for zz in (-147.0 - 1.85 * MH, -147.0 + 1.85 * MH):
    obox(mu, -372.0, zz, TX0, zz, 0.3 * MH, yv, yv + 1.0 * MV, PAL['claro'])
mu.cria()
ESTR += [([(-372.0, -147.5), (TX0, -147.0)], 9.0)]

# ================= o palácio de Herodes e as três torres (Hípico, Fasael e Mariane), no alto da cidade alta =================
pa = M('Palacio_Herodes')
PL = (-600.0, -556.0, -322.0, -168.0)
ybP = max(h_velho(x, z) for x in PL[:2] for z in PL[2:]) + 0.6
caixa(pa, PL[0], PL[1], ybP - 12, ybP, PL[2], PL[3], PAL['herod'], pedra='+x -x +z -z', fiada=1.6, comp=(3.0, 5.0))
for z0, z1, zf, s in ((-198.0, -170.0, -198.0, -1), (-320.0, -292.0, -292.0, 1)):     # as duas alas, com o jardim no meio
    caixa(pa, PL[0] + 2, PL[1] - 2, ybP, ybP + 6.0 * MV, z0, z1, PAL['branco'], pedra='+x -x +z -z', fiada=1.8, comp=(2.6, 4.2))
    caixa(pa, PL[0] + 1.6, PL[1] - 1.6, ybP + 6.0 * MV, ybP + 6.0 * MV + 0.6, z0 - 0.4, z1 + 0.4, PAL['claro'])
    xx = PL[0] + 6
    while xx < PL[1] - 5:
        for y_ in (ybP + 0.8 * MV, ybP + 3.6 * MV):
            pa.quad([(xx - 0.5 * MH, y_, zf + s * 0.03), (xx + 0.5 * MH, y_, zf + s * 0.03), (xx + 0.5 * MH, y_ + 1.6 * MV, zf + s * 0.03), (xx - 0.5 * MH, y_ + 1.6 * MV, zf + s * 0.03)], PAL['escuro'], (0, 0, s))
        xx += 3.2 * MH
colunata(pa, [(PL[0] + 4, -290.0), (PL[0] + 4, -200.0)], ybP, 3.5 * MV, 3.0, PAL['coluna'], dentro=(-1, 0))
colunata(pa, [(PL[1] - 4, -290.0), (PL[1] - 4, -200.0)], ybP, 3.5 * MV, 3.0, PAL['coluna'], dentro=(1, 0))
pa.quad([(PL[0] + 8, ybP + 0.05, -288.0), (PL[1] - 8, ybP + 0.05, -288.0), (PL[1] - 8, ybP + 0.05, -202.0), (PL[0] + 8, ybP + 0.05, -202.0)], hx('8f9a5c'), (0, 1, 0))
for zc in (-270.0, -245.0, -220.0):        # os tanques do jardim
    pa.quad([(-583.0, ybP + 0.1, zc - 4), (-573.0, ybP + 0.1, zc - 4), (-573.0, ybP + 0.1, zc + 4), (-583.0, ybP + 0.1, zc + 4)], PAL['agua'], (0, 1, 0))
gT = h_velho(-600.0, -152.0)
for x0, x1, z0, z1, alto in [(-617.0, -601.0, -160.0, -144.0, 13.0 * MV), (-596.0, -576.0, -162.0, -144.0, 16.0 * MV), (-572.0, -558.0, -158.0, -144.0, 11.0 * MV)]:
    caixa(pa, x0, x1, gT - 3, gT + alto, z0, z1, k(PAL['herod'], 1.03), pedra='+x -x +z -z', fiada=1.6, comp=(2.4, 4.0))
    caixa(pa, x0 - 0.4, x1 + 0.4, gT + alto, gT + alto + 0.6, z0 - 0.4, z1 + 0.4, PAL['claro'])
    ameias(pa, [(x0 + 0.8, z0 + 0.8), (x1 - 0.8, z0 + 0.8), (x1 - 0.8, z1 - 0.8), (x0 + 0.8, z1 - 0.8), (x0 + 0.8, z0 + 0.8)], gT + alto + 0.6, PAL['herod'])
pa.cria()

# ================= a cidade baixa: o Tanque de Siloé, a rua em escada, a rua do muro oeste com as lojas, o arco de
# Robinson e a escadaria do sul (as portas de Hulda) =================
cb = M('Cidade_Baixa')
SIL = (-308.0, -260.0, -494.0, -470.0)
ySil = max(h_velho(x, z) for x in SIL[:2] for z in SIL[2:]) + 0.3
dS, hS = 0.8 * MH, 0.4 * MV
for i in range(5):        # o tanque em degraus (de Siloé, Jo 9.7)
    a = i * dS; yt = ySil - i * hS
    for x0, x1, z0, z1 in [(SIL[0] + a, SIL[1] - a, SIL[2] + a, SIL[2] + a + dS), (SIL[0] + a, SIL[1] - a, SIL[3] - a - dS, SIL[3] - a),
                           (SIL[0] + a, SIL[0] + a + dS, SIL[2] + a, SIL[3] - a), (SIL[1] - a - dS, SIL[1] - a, SIL[2] + a, SIL[3] - a)]:
        caixa(cb, x0, x1, ySil - 8, yt, z0, z1, k(PAL['lajes'], 1.0 + 0.03 * (i % 2)), lados='+x -x +z -z +y' if i == 0 else '+y +x -x +z -z')
a = 5 * dS
cb.quad([(SIL[0] + a, ySil - 4.5 * hS, SIL[2] + a), (SIL[1] - a, ySil - 4.5 * hS, SIL[2] + a), (SIL[1] - a, ySil - 4.5 * hS, SIL[3] - a), (SIL[0] + a, ySil - 4.5 * hS, SIL[3] - a)], PAL['agua'], (0, 1, 0))
RUA_ESCADA = [(-284.0, -466.0), (-287.0, -440.0), (-294.0, -390.0), (-303.0, -330.0), (-313.0, -270.0), (-317.0, -225.0), (-317.0, -196.0)]
RUA_MURO = [(-317.0, -196.0), (-317.0, -60.0), (-321.0, 10.0)]
estrada(cb, RUA_ESCADA, 3.0 * MH, PAL['lajes'], degraus=True, passo=0.8 * MH)
estrada(cb, RUA_MURO, 3.6 * MH, PAL['lajes'], passo=2.0 * MH)
ESTR += [(RUA_ESCADA, 7.0), (RUA_MURO, 8.0)]
# as lojas do lado oeste da rua do muro (Jo 2.16: o comércio ficava também cá fora, ao pé do templo)
PANOS = [hx(c) for c in ('b0483a', '3f6b8a', 'd9c27a', 'efe6d2', '7a5a8c', 'a86b3c')]
XL0, XL1 = -335.0, -323.5
z_ = -178.0
while z_ < -62:
    if not -160 < z_ < -134:
        w = 1.5 * MH - 0.4
        g = min(h_velho(x, zz) for x in (XL0, XL1) for zz in (z_ - w, z_ + w)) - 0.5
        caixa(cb, XL0, XL1, g, g + rc.uniform(3.2, 4.2) * MV, z_ - w, z_ + w, rc.choice(CASAS))
        cb.quad([(XL1 + 0.03, g + 0.5, z_ - 0.5 * MH), (XL1 + 0.03, g + 0.5, z_ + 0.5 * MH), (XL1 + 0.03, g + 0.5 + 2.0 * MV, z_ + 0.5 * MH), (XL1 + 0.03, g + 0.5 + 2.0 * MV, z_ - 0.5 * MH)], PAL['escuro'], (1, 0, 0))
        cor = rc.choice(PANOS); q = [(XL1, g + 2.6 * MV, z_ - w), (XL1 + 1.1 * MH, g + 2.2 * MV, z_ - w), (XL1 + 1.1 * MH, g + 2.2 * MV, z_ + w), (XL1, g + 2.6 * MV, z_ + w)]
        cb.quad(q, cor, (0.3, 1, 0)); cb.quad(q, k(cor, 0.7), (-0.3, -1, 0))
    z_ += 3.0 * MH + 0.6
# o arco de Robinson: uma ponte em arco por cima da rua, e a escada que desce dela para o sul
yR = TY - 0.8
caixa(cb, -326.0, TX0, yR - 1.5 * MV, yR, -195.0, -184.0, PAL['herod'], pedra='+z -z', fiada=1.4, comp=(2.4, 4.0))
gR = min(h_velho(x, z) for x in (-336.0, -326.0) for z in (-195.0, -184.0)) - 1
caixa(cb, -336.0, -326.0, gR, yR, -195.0, -184.0, PAL['herod'], pedra='+x -x +z -z', fiada=1.4, comp=(2.4, 4.0))
N_ = 10
for i in range(N_):
    za, zb = -195.0 - i * 4.0, -195.0 - (i + 1) * 4.0
    yt = yR - (yR - (h_velho(-331.0, -235.0) + 0.6)) * (i + 1) / N_
    g = min(h_velho(-336.0, zb), h_velho(-326.0, zb)) - 1
    caixa(cb, -336.0, -326.0, g, yt, zb, za, k(PAL['lajes'], 1.0 + 0.03 * (i % 2)), pedra='+x -x', fiada=1.4, comp=(2.4, 4.0))
ESTR += [([(-331.0, -184.0), (-331.0, -236.0)], 7.0)]
# a escadaria do sul, as portas de Hulda (a dupla e a tripla) e a praça diante delas
yP = max(h_velho(x, z) for x in (-292.0, -205.0) for z in (-216.0, -203.0)) + 0.3
caixa(cb, -292.0, -205.0, yP - 4, yP, -216.0, TZ0, PAL['lajes'], lados='+x -x -z +y')
for i in range(6):
    caixa(cb, -290.0, -207.0, yP - 6, yP - 0.5 * (i + 1), -216.0 - (i + 1) * 2.1, -216.0 - i * 2.1, k(PAL['lajes'], 1.0 + 0.03 * (i % 2)), lados='+x -x -z +y')
for xc, w in [(-271.0, 0.9 * MH), (-263.5, 0.9 * MH), (-231.0, 0.8 * MH), (-223.0, 0.8 * MH), (-215.0, 0.8 * MH)]:
    cb.quad([(xc - w, yP, TZ0 - 0.04), (xc + w, yP, TZ0 - 0.04), (xc + w, yP + 3.0 * MV, TZ0 - 0.04), (xc - w, yP + 3.0 * MV, TZ0 - 0.04)], PAL['escuro'], (0, 0, -1))
    cb.quad([(xc - w - 0.6, yP + 3.0 * MV, TZ0 - 0.05), (xc + w + 0.6, yP + 3.0 * MV, TZ0 - 0.05), (xc + w + 0.6, yP + 3.4 * MV, TZ0 - 0.05), (xc - w - 0.6, yP + 3.4 * MV, TZ0 - 0.05)], PAL['claro'], (0, 0, -1))
cb.cria()

# ================= os pórticos do templo por dentro (colunas) e o mercado no Pátio dos Gentios =================
po = M('Porticos')
# a Estoa Real (o pórtico do sul): a nave do meio mais alta
caixa(po, TX0 + 4, TX1 - 10, TY + 13, TY + 18, TZ0 + 3, TZ0 + 9, PAL['herod'], lados='+x -x +z -z', pedra='+z -z', fiada=1.6, comp=(3.0, 5.0))
caixa(po, TX0 + 3.6, TX1 - 9.6, TY + 18, TY + 18.5, TZ0 + 2.6, TZ0 + 9.4, PAL['claro'])
caixa(po, TX0 + 4.4, TX1 - 10.4, TY + 18.5, TY + 19.4, TZ0 + 3.4, TZ0 + 8.6, PAL['cedro'])
CR, CP, CF = 0.3 * MH, 2.6 * MH, 1.2 * MH          # meia grossura das colunas, o passo, a distância da parede


def fileira(face, a, b, alto, eixo):
    """Colunas na frente da face de dentro de um pórtico, com a sombra do pórtico atrás delas."""
    if eixo == 'x':        # a face é um plano z = face; as colunas correm em x
        s = 1 if face < SZ else -1
        po.quad([(a, TY, face + s * 0.04), (b, TY, face + s * 0.04), (b, TY + alto, face + s * 0.04), (a, TY + alto, face + s * 0.04)], k(PAL['escuro'], 1.5), (0, 0, s))
        x = a + CP / 2
        while x < b - 1:
            caixa(po, x - CR, x + CR, TY, TY + alto, face + s * CF - CR, face + s * CF + CR, PAL['coluna'], lados='+x -x +z -z'); x += CP
        caixa(po, a, b, TY + alto, TY + alto + 0.8, min(face, face + s * (CF + CR)), max(face, face + s * (CF + CR)), PAL['claro'], lados='+x -x +z -z +y')
    else:
        s = 1 if face < SX else -1
        po.quad([(face + s * 0.04, TY, a), (face + s * 0.04, TY, b), (face + s * 0.04, TY + alto, b), (face + s * 0.04, TY + alto, a)], k(PAL['escuro'], 1.5), (s, 0, 0))
        z = a + CP / 2
        while z < b - 1:
            caixa(po, face + s * CF - CR, face + s * CF + CR, TY, TY + alto, z - CR, z + CR, PAL['coluna'], lados='+x -x +z -z'); z += CP
        caixa(po, min(face, face + s * (CF + CR)), max(face, face + s * (CF + CR)), TY + alto, TY + alto + 0.8, a, b, PAL['claro'], lados='+x -x +z -z +y')


fileira(TZ0 + 12, TX0 + 12, TX1 - 12, 9.0, 'x')         # a Estoa Real
fileira(TZ1 - 12, TX0 + 12, TX1 - 12, 4.6, 'x')         # o pórtico do norte
fileira(TX1 - 12, TZ0 + 12, TZ1 - 12, 4.6, 'z')         # o Pórtico de Salomão (leste; Jo 10.23)
fileira(TX0 + 12, TZ0 + 12, TZ1 - 12, 4.6, 'z')         # o pórtico do oeste
po.cria()

# o mercado, em metros do jogo: mesa de 2 x 1 m, toldo a 2,2 m, ovelha de 1 m, boi de 2 m
me_ = M('Mercado_Templo')
MAD = hx('a07a52')
BENS = [hx(c) for c in ('b5704a', 'c9a56a', '8c6b45', 'd8c9a0', '6f7d4a')]


def banca(x, z, pano=True):
    y = TY; l, p = 2.0 * MH, 1.0 * MH
    caixa(me_, x - l / 2, x + l / 2, y, y + 0.9 * MV, z - p / 2, z + p / 2, MAD, lados='+x -x +z -z +y')
    for i in range(rc.randint(1, 3)):
        bx = x - l / 2 + 0.15 * MH + i * 0.65 * MH
        caixa(me_, bx, bx + 0.5 * MH, y + 0.9 * MV, y + (0.9 + rc.uniform(0.2, 0.45)) * MV, z - 0.25 * MH, z + 0.25 * MH, rc.choice(BENS), lados='+x -x +z -z +y')
    if not pano:
        caixa(me_, x - l / 2, x + l / 2, y + 0.9 * MV, y + 0.9 * MV + 0.05, z - p / 2, z + p / 2, hx('5a3f5c'), lados='+y')
        return
    t = 0.05 * MH
    for sx in (-1, 1):
        caixa(me_, x + sx * l / 2 - t, x + sx * l / 2 + t, y, y + 2.2 * MV, z - p / 2 - t, z - p / 2 + t, MAD, lados='+x -x +z -z')
    cor = rc.choice(PANOS); q = [(x - l / 2 - 0.1 * MH, y + 2.2 * MV, z - p / 2), (x + l / 2 + 0.1 * MH, y + 2.2 * MV, z - p / 2), (x + l / 2 + 0.1 * MH, y + 1.9 * MV, z + p / 2 + 0.5 * MH), (x - l / 2 - 0.1 * MH, y + 1.9 * MV, z + p / 2 + 0.5 * MH)]
    me_.quad(q, cor, (0, 1, 0.3)); me_.quad(q, k(cor, 0.7), (0, -1, -0.3))


def cerca(x0, x1, z0, z1):
    y = TY; t = 0.05 * MH
    for a, b, c, d in [(x0, x1, z0 - t, z0 + t), (x0, x1, z1 - t, z1 + t), (x0 - t, x0 + t, z0, z1), (x1 - t, x1 + t, z0, z1)]:
        caixa(me_, a, b, y + 0.55 * MV, y + 0.8 * MV, c, d, MAD, lados='+x -x +z -z +y')
    for a in (x0, x1):
        for c in (z0, z1): caixa(me_, a - 2 * t, a + 2 * t, y, y + 1.0 * MV, c - 2 * t, c + 2 * t, MAD, lados='+x -x +z -z +y')


def bicho(x, z, boi=False):
    y = TY; c = hx('a9876a') if boi else k(hx('ece6d6'), rc.uniform(0.9, 1.02))
    l, w, h = (2.0 * MH, 0.8 * MH, 1.3 * MV) if boi else (1.0 * MH, 0.5 * MH, 0.65 * MV)
    s = rc.choice((-1, 1))
    caixa(me_, x - l / 2, x + l / 2, y + h * 0.45, y + h, z - w / 2, z + w / 2, c, lados='+x -x +z -z +y')
    caixa(me_, x + s * l / 2, x + s * (l / 2 + w * 0.6), y + h * 0.6, y + h * 1.05, z - w * 0.3, z + w * 0.3, k(c, 0.75), lados='+x -x +z -z +y')
    caixa(me_, x - l / 2 + 0.1, x + l / 2 - 0.1, y, y + h * 0.45, z - w / 2 + 0.1, z + w / 2 - 0.1, k(c, 0.6), lados='+x -x +z -z')


for zr in (-181.0, -170.0):          # as bancas, em duas fileiras ao longo da Estoa Real (com passagens para as saídas das portas de Hulda)
    x = TX0 + 18
    while x < TX1 - 18:
        if not (abs(x + 267.5) < 7 or abs(x + 223) < 9): banca(x + rc.uniform(-0.3, 0.3), zr)
        x += 2.8 * MH
for i in range(8):                  # os cambistas (mesas sem toldo)
    banca(-262.0 + i * 2.6 * MH, -157.0, pano=False)
for x0, x1, z0, z1, n, boi in [(-293.0, -281.0, -150.0, -139.0, 5, False), (-278.0, -266.0, -150.0, -139.0, 4, False), (-193.0, -177.0, -151.0, -138.0, 2, True)]:
    cerca(x0, x1, z0, z1)
    for i in range(n):
        if boi: bicho((x0 + x1) / 2, z0 + (i + 0.5) * (z1 - z0) / n, True)
        else: bicho(rc.uniform(x0 + 2.0, x1 - 2.0), z0 + 1.5 + (i + 0.5) * (z1 - z0 - 3) / n)
for i in range(5):                  # as gaiolas das pombas, empilhadas
    xg = -212.0 + i * 0.6 * MH
    for j in range(rc.randint(1, 3)): caixa(me_, xg, xg + 0.5 * MH, TY + j * 0.45 * MV, TY + (j + 0.95) * 0.45 * MV, -152.0, -152.0 + 0.5 * MH, hx('c2a36c'), lados='+x -x +z -z +y')
me_.cria()

# ================= o Gólgota, o horto e o sepulcro (Jo 19.17-20, 19.41-42), em metros do jogo =================
# Fora do segundo muro, junto à estrada que sai da Porta de Genat; o lugar que a tradição guarda (a Igreja do Santo
# Sepulcro): uma pedreira velha, com um rochedo que ficou de pé e túmulos cavados na parede de pedra.
go = M('Golgota')
ROCHA_C = hx('bdb19a')
GOL = (-512.0, -62.0)                 # o rochedo: ~12 m de largura, ~4,5 m de altura
gGo = h_velho(*GOL)
penedo(go, GOL[0], GOL[1], 6.0 * MH, 2.8 * MH, gGo - 1.0, gGo + 4.3 * MV, ROCHA_C, n=11)
for dx, dz, r in ((3.5, 2.5, 2.2), (-2.8, 3.5, 1.8), (1.5, -4.0, 2.0)):
    penedo(go, GOL[0] + dx * MH, GOL[1] + dz * MH, r * MH, r * 0.45 * MH, gGo - 0.8, gGo + rc.uniform(1.6, 2.4) * MV, k(ROCHA_C, 0.95), n=7)
yTop = gGo + 4.3 * MV
for dx, dz in ((-0.8, -1.6), (0.3, 0.0), (-0.8, 1.6)):          # as três estacas, vazias: é domingo
    x_, z_ = GOL[0] + dx * MH, GOL[1] + dz * MH; t = 0.13 * MH
    caixa(go, x_ - t, x_ + t, yTop - 1.0, yTop + 3.4 * MV, z_ - t, z_ + t, hx('5e4632'), lados='+x -x +z -z +y')
# a parede da pedreira, com o sepulcro novo cavado nela (a porta olha para o leste, para o horto)
SEP = (-572.0, -62.0)
gS = h_velho(*SEP)
caixa(go, -590.0, SEP[0], gS - 2.0, gS + 4.5 * MV, -89.0, -35.0, k(ROCHA_C, 0.93), lados='+x +z -z')
for x_, z_, r, a in ((-584.0, -80.0, 3.5, 3.5), (-582.0, -46.0, 3.8, 4.0), (-588.0, -63.0, 3.0, 4.6), (-598.0, -86.0, 3.0, 3.0), (-598.0, -40.0, 3.2, 3.3)):
    penedo(go, x_, z_, r * MH, r * 0.45 * MH, gS - 1.5, gS + (a + rc.uniform(-0.3, 0.4)) * MV, k(ROCHA_C, rc.uniform(0.9, 1.0)), n=8)
dh, dv = 0.55 * MH, 1.5 * MV          # a entrada: 1,1 m de largura e 1,5 m de altura (era preciso abaixar-se, Jo 20.5)
go.quad([(SEP[0] + 0.03, gS - 0.1, SEP[1] - dh), (SEP[0] + 0.03, gS - 0.1, SEP[1] + dh), (SEP[0] + 0.03, gS + dv, SEP[1] + dh), (SEP[0] + 0.03, gS + dv, SEP[1] - dh)], hx('1e1914'), (1, 0, 0))
# a pedra que fechava a entrada (1 m de raio), rolada para o lado (Mc 16.4)
Rh, Rv, N = 1.0 * MH, 1.0 * MV, 12
cz, cy = SEP[1] + dh + Rh + 0.3 * MH, gS + Rv
fr = [(SEP[0] + 0.15 + 0.35 * MH, cy + math.sin(2 * math.pi * i / N) * Rv, cz + math.cos(2 * math.pi * i / N) * Rh) for i in range(N)]
tr = [(SEP[0] + 0.15, y, z) for _, y, z in fr]
go.quad(fr, hx('9d9282'), (1, 0, 0))
for i in range(N):
    j = (i + 1) % N; a = 2 * math.pi * (i + 0.5) / N
    go.quad([fr[i], fr[j], tr[j], tr[i]], hx('7f766a'), (0, math.sin(a), math.cos(a)))
# o horto (~13 x 18 m): uma mureta baixa, o chão verde, oliveiras e figueiras; a entrada fica do lado do Gólgota
HO = (-572.0, -532.0, -92.0, -32.0)
canteiro(go, HO[0], HO[1], HO[2], HO[3], [hx('8f9a5c'), hx('9aa463'), hx('a7a46b')], sobe=0.45)
for pts in ([(HO[1], -55.0), (HO[1], HO[3]), (HO[0], HO[3])], [(HO[0], HO[2]), (HO[1], HO[2]), (HO[1], -69.0)]):
    for (xa, za), (xb, zb) in zip(pts, pts[1:]):
        g = min(h_velho(xa, za), h_velho(xb, zb)); obox(go, xa, za, xb, zb, 0.4 * MH, g - 0.5, g + 1.1 * MV, hx('cdbf9f'))
estrada(go, [(-533.0, -62.0), (SEP[0] - 0.5, -62.0)], 1.4 * MH, hx('c6b38c'), sobe=0.55)
go.cria()
ESTR += [([(-600.0, -62.0), (-498.0, -62.0)], 34.0)]

# ================= a estrada de Emaús e as árvores =================
es = M('Estradas')
EMAUS = [(GEN[0], -138.0), (GEN[0], -150.0), (-488.0, -100.0), (-487.0, -45.0), (-489.0, -18.0), (-505.0, 2.0), (-540.0, 20.0), (-580.0, 48.0), (-650.0, 80.0), (-760.0, 120.0), (-900.0, 150.0)]
estrada(es, EMAUS, 3.0 * MH, hx('c9b48a'), sobe=0.7, passo=4.0)
ESTR += [(EMAUS, 6.0)]
es.cria()
av = M('Arvores')
n_ = 0
while n_ < 7:                       # no horto
    x, z = rc.uniform(HO[0] + 5, HO[1] - 5), rc.uniform(HO[2] + 5, HO[3] - 5)
    if abs(z - SEP[1]) < 2.5 * MH: continue
    arvore(av, x, z, r=rc.uniform(1.6, 2.0) * MH, alto=rc.uniform(3.8, 4.6) * MV); n_ += 1
for zc in (-275.0, -250.0, -225.0):
    for xc in (-586.0, -570.0): arvore(av, xc, zc, r=1.3 * MH, alto=4.5 * MV, cipreste=rc.random() < 0.5)
n_ = 0
while n_ < 30:                      # pomares e hortas fora dos muros, a oeste e ao norte (a terra do Gólgota era assim)
    x, z = rc.uniform(-640.0, -478.0), rc.uniform(-140.0, 110.0)
    if dist_poli(x, z, EMAUS) < 4.0 * MH or (-605 < x < -490 and -100 < z < -24): continue
    arvore(av, x, z, r=rc.uniform(1.8, 2.4) * MH, alto=rc.uniform(4.0, 5.2) * MV); n_ += 1
av.cria()

# ================= as casas (em metros do jogo: 4 a 7 m de lado, 3 a 6,5 m de altura) =================
cs = M('Casas_Cidade')
LIVRE = [(TX0 - 3, TX1 + 3, TZ0 - 3, TZ1 + 3), (AX0 - 5, AX1 + 5, AZ0 - 5, AZ1 + 5), (BX - 32, BX + 32, BZ - 32, BZ + 32),
         (TX0, TX1 + 3, TZ1, NZ + 6), (PX - 6, PX + 6, NZ, NZ + 40), (PL[0] - 6, PL[1] + 5, PL[2] - 5, -140.0),
         (SIL[0] - 5, SIL[1] + 5, SIL[2] - 5, SIL[3] + 6), (-296.0, -200.0, -232.0, -200.0), (-338.0, -311.0, -200.0, -55.0),
         (GEN[0] - 22, GEN[0] + 22, -162.0, -140.0), (-475.0, -290.0, 30.0, 64.0)]


def livre(x0, x1, z0, z1):
    for a, b, c, d in LIVRE:
        if x1 > a and x0 < b and z1 > c and z0 < d: return False
    cx, cz, r = (x0 + x1) / 2, (z0 + z1) / 2, 0.5 * math.hypot(x1 - x0, z1 - z0)
    for pts, w in ESTR:
        if dist_poli(cx, cz, pts) < w + r: return False
    return True


def casa(x, z, lx, lz, alto, zona=None):
    x0, x1, z0, z1 = x - lx / 2, x + lx / 2, z - lz / 2, z + lz / 2
    if not livre(x0, x1, z0, z1): return
    if zona and not (dentro(x, z, zona) and dist_poli(x, z, zona + zona[:1]) > 4.0 + 0.5 * math.hypot(lx, lz)): return
    y0 = min(h_velho(x0, z0), h_velho(x1, z1), h_velho(x0, z1), h_velho(x1, z0)) - 0.6
    cor = rc.choice(CASAS); yt = y0 + 0.6 + alto
    caixa(cs, x0, x1, y0, yt, z0, z1, cor)
    if rc.random() < 0.3: caixa(cs, x0 + 0.6, x0 + lx * 0.5, yt, yt + 2.2 * MV, z0 + 0.6, z0 + lz * 0.5, k(cor, 0.97))
    if rc.random() < 0.6:
        d = 0.5 * MH; cs.quad([(x1 + 0.02, y0 + 0.6, z - d), (x1 + 0.02, y0 + 0.6, z + d), (x1 + 0.02, y0 + 0.6 + 1.9 * MV, z + d), (x1 + 0.02, y0 + 0.6 + 1.9 * MV, z - d)], PAL['escuro'], (1, 0, 0))


def bairro(x0, x1, z0, z1, passo, alto, prob=0.8, zona=None):
    x = x1 - passo / 2
    while x > x0:
        z = z0 + passo / 2
        while z < z1:
            if rc.random() < prob: casa(x + rc.uniform(-1, 1), z + rc.uniform(-1, 1), passo * rc.uniform(0.6, 0.85), passo * rc.uniform(0.6, 0.85), rc.uniform(*alto), zona)
            z += passo
        x -= passo


bairro(-608.0, -340.0, -507.0, -150.0, 8.0 * MH, (4.0 * MV, 6.5 * MV), 0.75, CID_SUL)     # a cidade alta (casas grandes, no alto da colina oeste)
bairro(-340.0, -163.0, -507.0, -200.0, 6.0 * MH, (3.0 * MV, 4.5 * MV), 0.85, CID_SUL)     # a cidade baixa: o Tiropeon, o Ofel e a Cidade de Davi
bairro(-470.0, -311.0, -150.0, 58.0, 6.5 * MH, (3.5 * MV, 5.5 * MV), 0.8, CID_NORTE)      # o bairro novo, dentro do segundo muro
bairro(-440.0, -275.0, 66.0, 190.0, 8.0 * MH, (3.0 * MV, 4.5 * MV), 0.35)                # Bezeta (fora do muro, ainda pouco construída; o lado de Betesda fica aberto)
cs.cria()

# ================= do plano velho para o mundo =================
# cada vértice dos prédios: (x, z) -> para_mundo, y -> 0,6 y; o espelho troca o lado das faces, então elas viram
import bmesh
for o in list(col_exp.objects):
    if o.name in CHAOS: continue
    me = o.data
    for v in me.vertices:
        x, z = para_mundo(*encolhe(v.co.x, -v.co.y)); v.co = (x, -z, KY * v.co.z)
    bm_ = bmesh.new(); bm_.from_mesh(me); bmesh.ops.reverse_faces(bm_, faces=bm_.faces[:]); bm_.to_mesh(me); bm_.free(); me.update()


def P(x, y, z):
    a, b = para_mundo(*encolhe(x, z)); return [round(a, 2), round(KY * y, 2), round(b, 2)]


# ================= os lugares (para as fases), já no mundo =================
L = {'mundo': 'coordenadas do Getsêmani (x leste, y altura, o norte é -z)', 'oliveiras': OLIVEIRAS,
     'santuario': P(SX, BASE, SZ), 'fachada': P(FR, BASE + 39, SZ), 'susa': P(TX1 + 2, pe_velho(SUSA_Z), SUSA_Z),
     'quina_ne': P(TX1, TOPO, TZ1), 'porta_ovelhas': P(PX, HP, NZ + ESP + 2.5), 'betesda': P(BX, yb, BZ), 'antonia': P((AX0 + AX1) / 2, TOPO_A, (AZ0 + AZ1) / 2),
     'betesda_leste': P(BX + 27, yb, BZ), 'nucleo_getsemani': list(NUCLEO_GS),
     'golgota': P(GOL[0], yTop, GOL[1]), 'sepulcro': P(SEP[0] + 1, gS, SEP[1]), 'horto': P(-552.0, h_velho(-552.0, -62.0), -62.0),
     'porta_genat': P(GEN[0], gG, GEN[1]), 'estrada_emaus': P(-650.0, h_velho(-650.0, 80.0), 80.0),
     'mercado': P(-240.0, TY, -175.0), 'estoa_real': P(-236.0, TY, -191.0), 'arco_robinson': P(-318.0, h_velho(-318.0, -190.0), -190.0),
     'escadaria_sul': P(-248.0, yP, -222.0), 'siloe': P((SIL[0] + SIL[1]) / 2, ySil, (SIL[2] + SIL[3]) / 2), 'palacio_herodes': P(-578.0, ybP, -245.0)}
json.dump(L, open(os.path.join(AQUI, 'jerusalem_lugares.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)

bpy.ops.wm.save_as_mainfile(filepath=os.path.join(AQUI, 'jerusalem.blend'))
for o in bpy.context.view_layer.objects: o.select_set(o.name in col_exp.all_objects)
bpy.ops.export_scene.gltf(filepath=os.path.join(AQUI, 'jerusalem_maquete.glb'), use_selection=True, export_format='GLB', export_normals=False,
                          export_vertex_color='MATERIAL', export_meshopt_compression_enable=True)
print('MAQUETE ok', {o.name: len(o.data.polygons) for o in col_exp.objects})
