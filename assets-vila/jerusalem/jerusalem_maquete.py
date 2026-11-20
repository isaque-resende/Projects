# Jerusalém: a MAQUETE da cidade, para situar as fases (Monte das Oliveiras, Getsêmani, Betesda, templo).
# Não é o modelo final: só volumes facetados com cor de vértice, nos lugares certos, para conferir a geografia.
# O modelo bonito (kit de peças, texturas pedidas por prompt, peças do Tripo) vai substituir isto peça por peça,
# nos mesmos lugares.
#
# Uso:  blender -b --factory-startup -P jerusalem_maquete.py
# Grava jerusalem.blend, jerusalem_maquete.glb e jerusalem_lugares.json nesta pasta.
#
# As posições e o relevo vêm de relevo.py (o "mundo" = as coordenadas do Getsêmani; ver lá a tabela de distâncias).
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
NUCLEO_GS = (-176.0, 76.0, -62.0, 84.0)          # o terreno detalhado do Getsêmani (x0, x1, z0, z1)

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


def ameias(m, pts, y, cor, larg=1.0, alto=1.2, esp=0.8, passo=2.2):
    for (xa, za), (xb, zb) in zip(pts, pts[1:]):
        L = math.hypot(xb - xa, zb - za); n = max(1, int(L / passo)); ux, uz = (xb - xa) / L, (zb - za) / L
        for i in range(n):
            c = (i + 0.5) * L / n; cx, cz = xa + ux * c, za + uz * c
            hx_, hz_ = abs(ux * larg / 2) + abs(uz) * esp / 2, abs(uz * larg / 2) + abs(ux) * esp / 2
            caixa(m, cx - hx_, cx + hx_, y, y + alto, cz - hz_, cz + hz_, k(cor, rc.uniform(0.92, 1.02)), lados='+x -x +z -z +y')


def colunata(m, pts, y0, alto, larg, cor, passo=3.2, dentro=None):
    """Uma fileira de colunas (caixas finas) ao longo de pts, com o telhado de cedro por cima, `larg` para dentro."""
    for (xa, za), (xb, zb) in zip(pts, pts[1:]):
        L = math.hypot(xb - xa, zb - za); n = max(1, int(L / passo)); ux, uz = (xb - xa) / L, (zb - za) / L
        for i in range(n + 1):
            cx, cz = xa + ux * L * i / n, za + uz * L * i / n
            caixa(m, cx - 0.35, cx + 0.35, y0, y0 + alto, cz - 0.35, cz + 0.35, PAL['coluna'], lados='+x -x +z -z')
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
    if x < -140: base = hx('bba77e') if r < 0.6 else hx('c2bd7c')
    return k(base, rc.uniform(0.95, 1.03))


def cor_cidade(x, z):
    return k(hx('cdbb95') if (int(x / 11) + int(z / 11)) % 3 else hx('c4b089'), rc.uniform(0.94, 1.03))


gx0, gx1, gz0, gz1 = NUCLEO_GS
h_vale = lambda x, z: h_mundo(x, z) - 0.06
xs = grade(-170.0, 92.0, gx0, gx1, 4.0); zs = grade(-1100.0, 1100.0, gz0, gz1, 4.0)
dentro_gs = lambda a, b, c, d: a >= gx0 + 3 and b <= gx1 - 3 and c >= gz0 + 3 and d <= gz1 - 3
chao('Vale_Chao', xs, zs, h_vale, cor_campo, dentro_gs)
chao('Vale_Miolo', [x for x in xs if gx0 + 3 - 4.01 <= x <= gx1 - 3 + 4.01], [z for z in zs if gz0 + 3 - 4.01 <= z <= gz1 - 3 + 4.01], h_vale, cor_campo,
     lambda a, b, c, d: not dentro_gs(a, b, c, d))
chao('Leste_Chao', grade(92.0, 1100.0, 92.0, 92.0, 5.0), zs, h_vale, cor_campo)
chao('Cidade_Chao', grade(-1100.0, -150.0, -400.0, -150.0, 6.0), grade(-1100.0, 1100.0, -330.0, 200.0, 6.0), lambda x, z: h_mundo(x, z) - 0.15, cor_cidade)

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
ys = pe_muro(SUSA_Z) - 1
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
G0, G1 = PX - 9.0, PX + 9.0            # a porta inteira (duas torres e o corpo do meio)
for x0, x1 in [(TX1 - ESP, G1), (G0, AX1)]:
    caixa(mc, x0, x1, 8.0, TOPO_M, NZ, NZ + ESP, PAL['muro'], lados='+z -z +y', pedra='+z', fiada=1.1, comp=(1.6, 3.0))
    ameias(mc, [(x0, NZ + ESP - 0.4), (x1, NZ + ESP - 0.4)], TOPO_M, PAL['muro'])
for xt in (-178.0, -255.0, -280.0):       # torres no muro norte
    caixa(mc, xt - 3.5, xt + 3.5, 8.0, TOPO_M + 4, NZ - 1, NZ + ESP + 3, k(PAL['muro'], 1.02), pedra='+z +x -x', fiada=1.1, comp=(1.6, 3.0))
    ameias(mc, [(xt - 3.4, NZ + ESP + 2.6), (xt + 3.4, NZ + ESP + 2.6)], TOPO_M + 4, PAL['muro'])
caixa(mc, TX1 - 7, TX1 + 1.5, -2.0, TOPO_M + 5, NZ - 4, NZ + ESP + 1.5, k(PAL['muro'], 1.02), pedra='+x +z')      # a torre do canto
# a Porta das Ovelhas: abre para o norte (para Betesda); torres dos lados, túnel com abóbada e portas abertas
HP = h_mundo(PX, NZ + ESP + 4) + 0.3          # a soleira
ABRE, MOLA = 1.9, 3.8
for x0, x1 in [(G0, PX - 2.8), (PX + 2.8, G1)]:
    caixa(mc, x0, x1, 8.0, TOPO_M + 5, NZ - 1, NZ + ESP + 4, k(PAL['muro'], 1.03), pedra='+z +x -x', fiada=1.1, comp=(1.6, 3.0))
    ameias(mc, [(x0 + 0.3, NZ + ESP + 3.6), (x1 - 0.3, NZ + ESP + 3.6)], TOPO_M + 5, PAL['muro'])
FZ = NZ + ESP + 2.0            # a face do corpo do meio (recuada 2 m das torres)


def furo_porta(v0, v1):
    y0 = 8.0 + v0
    if 8.0 + v1 <= HP or y0 >= HP + MOLA + ABRE: return None
    yy = max(y0, HP)
    w = ABRE if yy <= HP + MOLA else math.sqrt(max(0.0, ABRE ** 2 - (yy - HP - MOLA) ** 2))
    c = 2.8                     # a face +z vai de x1 (u = 0) para x0: o centro fica a 2,8 de x1
    return (c - w, c + w) if w > 0.05 else None


caixa(mc, PX - 2.8, PX + 2.8, 8.0, TOPO_M + 1.5, NZ - 1, FZ, k(PAL['muro'], 1.05), lados='+z +y', pedra='+z', fiada=0.8, comp=(1.1, 1.8), furos={'+z': furo_porta})
ameias(mc, [(PX - 2.5, FZ - 0.4), (PX + 2.5, FZ - 0.4)], TOPO_M + 1.5, PAL['muro'])
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
    y0 = min(pe_muro(z), pe_muro(z1)) - 2
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


tanque(-232.0, -168.0, 25.0, 36.0, h_mundo(-200, 30) + 0.3, 5.0)
BX, BZ = BETESDA
yb = max(h_mundo(BX + dx, BZ + dz) for dx in (-22, 0, 22) for dz in (-20, 0, 20)) + 0.4
tanque(BX - 20, BX + 20, BZ - 19, BZ - 2, yb, 6.0)       # os dois tanques, com o dique no meio
tanque(BX - 20, BX + 20, BZ + 2, BZ + 19, yb, 6.0)
# os cinco alpendres (Jo 5.2): os quatro lados e o do dique
colunata(tq, [(BX - 22, BZ - 21), (BX + 22, BZ - 21)], yb, 5.0, 3.5, PAL['coluna'], dentro=(0, -1))
colunata(tq, [(BX - 22, BZ + 21), (BX + 22, BZ + 21)], yb, 5.0, 3.5, PAL['coluna'], dentro=(0, 1))
colunata(tq, [(BX + 22, BZ - 21), (BX + 22, BZ + 21)], yb, 5.0, 3.5, PAL['coluna'], dentro=(1, 0))
colunata(tq, [(BX - 22, BZ - 21), (BX - 22, BZ + 21)], yb, 5.0, 3.5, PAL['coluna'], dentro=(-1, 0))
colunata(tq, [(BX - 20, BZ), (BX + 20, BZ)], yb, 5.0, 1.0, PAL['coluna'], dentro=(0, 1))
caixa(tq, BX - 20, BX + 20, yb - 6, yb + 0.1, BZ - 2, BZ + 2, PAL['lajes'], lados='+z -z +x -x +y')        # o dique
# o chão em volta do tanque, nivelado (as fases de perto vão refazer isto)
caixa(tq, BX - 27, BX + 27, yb - 3, yb - 0.05, BZ - 27, BZ - 21.6, k(PAL['lajes'], 0.98), lados='+x -x +z -z +y')
caixa(tq, BX - 27, BX + 27, yb - 3, yb - 0.05, BZ + 21.6, BZ + 27, k(PAL['lajes'], 0.98), lados='+x -x +z -z +y')
caixa(tq, BX + 21.6, BX + 27, yb - 3, yb - 0.05, BZ - 21.6, BZ + 21.6, k(PAL['lajes'], 0.98), lados='+x -x +z -z +y')
caixa(tq, BX - 27, BX - 21.6, yb - 3, yb - 0.05, BZ - 21.6, BZ + 21.6, k(PAL['lajes'], 0.98), lados='+x -x +z -z +y')
tq.cria()

# ================= as casas =================
cs = M('Casas_Cidade')
LIVRE = [(TX0 - 3, TX1 + 3, TZ0 - 3, TZ1 + 3), (AX0 - 5, AX1 + 5, AZ0 - 5, AZ1 + 5), (BX - 32, BX + 32, BZ - 32, BZ + 32),
         (TX0, TX1 + 3, TZ1, NZ + 6), (PX - 6, PX + 6, NZ, NZ + 40)]


def livre(x0, x1, z0, z1):
    for a, b, c, d in LIVRE:
        if x1 > a and x0 < b and z1 > c and z0 < d: return False
    return True


def casa(x, z, lx, lz, alto):
    x0, x1, z0, z1 = x - lx / 2, x + lx / 2, z - lz / 2, z + lz / 2
    if not livre(x0, x1, z0, z1): return
    y0 = min(h_mundo(x0, z0), h_mundo(x1, z1), h_mundo(x0, z1), h_mundo(x1, z0)) - 0.6
    cor = rc.choice(CASAS); yt = y0 + 0.6 + alto
    caixa(cs, x0, x1, y0, yt, z0, z1, cor)
    if rc.random() < 0.3: caixa(cs, x0 + 0.6, x0 + lx * 0.5, yt, yt + 2.4, z0 + 0.6, z0 + lz * 0.5, k(cor, 0.97))
    if rc.random() < 0.6: cs.quad([(x1 + 0.02, y0 + 0.6, z - 0.5), (x1 + 0.02, y0 + 0.6, z + 0.5), (x1 + 0.02, y0 + 2.5, z + 0.5), (x1 + 0.02, y0 + 2.5, z - 0.5)], PAL['escuro'], (1, 0, 0))


def bairro(x0, x1, z0, z1, passo, alto, prob=0.8):
    x = x1 - passo / 2
    while x > x0:
        z = z0 + passo / 2
        while z < z1:
            if rc.random() < prob: casa(x + rc.uniform(-1, 1), z + rc.uniform(-1, 1), passo * rc.uniform(0.55, 0.85), passo * rc.uniform(0.55, 0.85), rc.uniform(*alto))
            z += passo
        x -= passo


bairro(-560.0, -318.0, -240.0, 60.0, 12.0, (4.0, 8.0), 0.8)        # a cidade alta e a cidade baixa (a oeste do templo)
bairro(-300.0, -168.0, -340.0, -210.0, 12.0, (3.0, 5.5), 0.7)      # o Ofel e a Cidade de Davi (ao sul)
bairro(-480.0, -275.0, 48.0, 190.0, 14.0, (3.0, 5.0), 0.35)       # Bezeta (fora do muro, ainda pouco construída; o lado de Betesda fica aberto)
cs.cria()

# ================= os lugares (para as fases) =================
L = {'mundo': 'coordenadas do Getsêmani (x leste, y altura, z norte)', 'oliveiras': OLIVEIRAS,
     'santuario': [SX, BASE, SZ], 'fachada': [FR, BASE + 39, SZ], 'susa': [TX1 + 2, pe_muro(SUSA_Z), SUSA_Z],
     'quina_ne': [TX1, TOPO, TZ1], 'porta_ovelhas': [PX, HP, NZ + ESP + 2.5], 'betesda': [BX, yb, BZ], 'antonia': [(AX0 + AX1) / 2, TOPO_A, (AZ0 + AZ1) / 2],
     'nucleo_getsemani': list(NUCLEO_GS)}
json.dump(L, open(os.path.join(AQUI, 'jerusalem_lugares.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)

bpy.ops.wm.save_as_mainfile(filepath=os.path.join(AQUI, 'jerusalem.blend'))
for o in bpy.context.view_layer.objects: o.select_set(o.name in col_exp.all_objects)
bpy.ops.export_scene.gltf(filepath=os.path.join(AQUI, 'jerusalem_maquete.glb'), use_selection=True, export_format='GLB', export_normals=False,
                          export_vertex_color='MATERIAL', export_meshopt_compression_enable=True)
print('MAQUETE ok', {o.name: len(o.data.polygons) for o in col_exp.objects})
