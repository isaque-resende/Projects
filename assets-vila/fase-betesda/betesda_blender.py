# Tanque de Betesda: gera a fase no Blender e grava betesda.blend. Depois, quem manda é o .blend:
# mexa nele e rode o texto EXPORTAR_PARA_O_JOGO (aba Scripting > Run Script).
#
# Uso (só para criar a fase do zero):
#   blender -b --factory-startup -P betesda_blender.py -- [--regerar-tudo]
#
# Coordenadas da fase (three.js): x (leste), y (altura); o norte é -z. A origem é o ponto 'betesda' do mundo da maquete
# (../jerusalem/jerusalem_lugares.json), em escala 1:1: o jogo põe a maquete deslocada, e o muro norte da cidade, a Porta
# das Ovelhas, a Antônia e o templo aparecem no lugar (o muro passa a ~9 m ao sul da origem; a porta fica em ~(11, 9)).
# A Betesda da maquete (pequena, para a vista de longe) sai; aqui o tanque é desenhado na escala do jogador.
#
# O lugar (Jo 5.1-9; Ne 3.1, 3.32; 12.39):
#   - "junto à Porta das Ovelhas, um tanque, chamado em hebraico Betesda, o qual tem cinco alpendres" (Jo 5.2): dois
#     tanques cavados na rocha, com um dique no meio; os alpendres (pórticos de colunas) correm pelos quatro lados e pelo
#     dique: são cinco. A arqueologia achou isso mesmo ao norte do templo, junto à igreja de Santa Ana;
#   - "nestes jazia grande multidão de enfermos, cegos, coxos e paralíticos" (Jo 5.3): gente deitada em esteiras;
#   - o lugar do paralítico de 38 anos, que Jesus mandou levantar e levar o seu leito (Jo 5.5-9): uma esteira a menos;
#   - a Porta das Ovelhas: por ela entravam as ovelhas para os sacrifícios do templo; um curral junto a ela.
import bpy, bmesh, math, json, os, random, sys
from mathutils import Vector, Matrix
from mathutils.kdtree import KDTree

ROOT = r"M:\Claude\github\Projects-animais\assets-vila"
OUT = os.path.join(ROOT, 'fase-betesda')
BLEND = os.path.join(OUT, 'betesda.blend')
ARGV = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
if os.path.exists(BLEND) and '--regerar-tudo' not in ARGV:
    raise SystemExit('betesda.blend já existe: abra-o e use EXPORTAR_PARA_O_JOGO. Para recriar do zero, rode com --regerar-tudo.')
random.seed(23)


def sm(e0, e1, x):
    k = (x - e0) / (e1 - e0); k = 0 if k < 0 else 1 if k > 1 else k
    return k * k * (3 - 2 * k)


exec(open(os.path.join(ROOT, 'jerusalem', 'relevo.py'), encoding='utf-8').read())       # h_mundo
LUGW = json.load(open(os.path.join(ROOT, 'jerusalem', 'jerusalem_lugares.json'), encoding='utf-8'))
GW = LUGW['betesda']
H0 = h_mundo(GW[0], GW[2])
PORTA = (LUGW['porta_ovelhas'][0] - GW[0], LUGW['porta_ovelhas'][2] - GW[2])      # a Porta das Ovelhas, aqui (~ 11, 8.5)
MURO_Z = PORTA[1] + 0.8                                                             # a face de fora do muro norte

# ---------------- traçado ----------------
# a estrada corre ao longo do muro: do leste (vindo do Getsêmani, pelo Cedrom) até a porta e segue para oeste (o Gólgota)
ESTRADA = [(50.0, -2.0), (40.0, 1.5), (28.0, 3.4), (16.0, 3.6), (PORTA[0], 3.8), (0.0, 3.6), (-14.0, 3.2), (-28.0, 1.2), (-40.0, -3.0), (-50.0, -8.0)]
MEIA = 1.6
ENTRADA = [(PORTA[0], 4.0), (PORTA[0], 7.6)]       # da estrada até a soleira da porta
X_IN, X_OUT = 15.5, 19.5                           # os tanques vão de -X_IN a X_IN; os alpendres, até X_OUT
ZN0, ZN1 = -42.0, -25.5                            # o tanque do norte
ZS0, ZS1 = -21.5, -5.0                             # o tanque do sul
Z_OUT0, Z_OUT1 = -46.0, -1.0                       # os alpendres do norte e do sul
CURRAL = (27.0, -9.0, 4.0, 3.2)                    # centro x, z e meia largura, meia profundidade
X0, X1, Z0, Z1 = -74.0, 76.0, -82.0, 10.0
AREA = [-46.0, 48.0, -54.0, 6.4]


def catmull(p0, p1, p2, p3, t):
    t2, t3 = t * t, t * t * t
    return 0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (-p0 + 3 * p1 - 3 * p2 + p3) * t3)


def amostra(lista, passo=0.4):
    P = [Vector((x, z, 0)) for x, z in lista]; A = []
    for i in range(len(P) - 1):
        p0 = P[max(0, i - 1)]; p1 = P[i]; p2 = P[i + 1]; p3 = P[min(len(P) - 1, i + 2)]
        n = max(4, int((p2 - p1).length / passo))
        for k in range(n): A.append(catmull(p0, p1, p2, p3, k / n))
    A.append(P[-1]); return A


AMOS, AMOE = amostra(ESTRADA), amostra(ENTRADA)
KD = KDTree(len(AMOS) + len(AMOE))
for i, p in enumerate(AMOS + AMOE): KD.insert(Vector((p.x, p.y, 0)), i)
KD.balance()


def dist_cam(x, z):
    co, i, d = KD.find(Vector((x, z, 0))); return d - (MEIA if i < len(AMOS) else 1.4), i


# ---------------- relevo ----------------
def hm(x, z): return h_mundo(GW[0] + x, GW[2] + z) - H0       # o chão da maquete, aqui
def ruido(x, z): return 0.5 + 0.3 * math.sin(x * 0.21 + 3.1) * math.cos(z * 0.17 + 1.3) + 0.2 * math.sin(x * 0.05 - z * 0.07)


def fora_ret(x, z, ret):
    qx = max(ret[0] - x, 0, x - ret[1]); qz = max(ret[2] - z, 0, z - ret[3]); return math.hypot(qx, qz)


COMPLEXO = (-X_OUT, X_OUT, Z_OUT0, Z_OUT1)
DECK = sum(hm(x, z) for x in (-X_OUT, 0, X_OUT) for z in (Z_OUT0, -24, Z_OUT1)) / 9 + 0.25      # o piso dos alpendres


def dentro_tanque(x, z, m=0.0):
    return -X_IN + m < x < X_IN - m and (ZN0 + m < z < ZN1 - m or ZS0 + m < z < ZS1 - m)


FUNDO = DECK - 3.4                  # o fundo dos tanques; a água fica em DECK - 2.1


def h_base(x, z):
    h = hm(x, z) + 0.15 * (ruido(x * 0.5, z * 0.5) - 0.5)
    d = fora_ret(x, z, COMPLEXO)
    w = 1 - sm(0.0, 9.0, d)                                 # em volta do tanque, o chão vai até o pé do estilóbato
    h = h * (1 - w) + (DECK - 0.4) * w
    if d <= 0: h = DECK - 0.03                              # debaixo do piso: o jogador anda na altura dele
    if dentro_tanque(x, z, -0.6): h = FUNDO
    return h


HR = [h_base(p.x, p.y) for p in AMOS + AMOE]
for _ in range(25): HR = [HR[0]] + [(HR[i - 1] + 2 * HR[i] + HR[i + 1]) / 4 for i in range(1, len(HR) - 1)] + [HR[-1]]


def altura(x, z):
    h = h_base(x, z)
    if dentro_tanque(x, z, -0.6): return h
    d, i = dist_cam(x, z)
    w = 1 - sm(0.3, 2.0, d)
    if w > 0: h += (HR[i] - h) * w
    return h


# ---------------- cena ----------------
bpy.ops.wm.read_factory_settings(use_empty=True)
sc = bpy.context.scene
def colecao(nome):
    c = bpy.data.collections.new(nome); sc.collection.children.link(c); return c
col_exp, col_prev, col_ref, col_colis, col_proto = colecao('Exportar'), colecao('Cenario_objetos'), colecao('Referencia_jogo'), colecao('Colisao'), colecao('Prototipos')


def mat_vc(nome, dupla=False):
    m = bpy.data.materials.new(nome); m.use_nodes = True
    nt = m.node_tree; bs = next(n for n in nt.nodes if n.type == 'BSDF_PRINCIPLED')
    ca = nt.nodes.new('ShaderNodeAttribute'); ca.attribute_name = 'Col'
    nt.links.new(ca.outputs['Color'], bs.inputs['Base Color'])
    bs.inputs['Roughness'].default_value = 1.0
    if 'Specular IOR Level' in bs.inputs: bs.inputs['Specular IOR Level'].default_value = 0.1
    m.use_backface_culling = not dupla
    return m


def hexc(h): return tuple(int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)) + (1.0,)
COR = {'grama': hexc('a3ad66'), 'grama2': hexc('96a35c'), 'seca': hexc('c2bd7c'), 'capim': hexc('a7a964'), 'areia': hexc('dcc596'),
       'batido': hexc('d2bc90'), 'lajes': hexc('d8ccb0'), 'lajes2': hexc('cbbd9c'), 'calcario': hexc('c9bd9e'), 'calc_lado': hexc('a39578'),
       'muro': hexc('cdbd9a'), 'coluna': hexc('e6dcc4'), 'cedro': hexc('8d6a4c'), 'telha': hexc('a8826a'), 'agua': hexc('4f8a86'), 'agua2': hexc('5f9c94'),
       'fundo': hexc('7d7462'), 'limo': hexc('8a8d64')}


def tom(c, k): return tuple(min(1, v * k) for v in c[:3]) + (1,)


# terreno: grade de 1 m perto do tanque e da estrada; de 2 m longe
GX = [float(x) for x in range(int(X0), -50, 2)] + [float(x) for x in range(-50, 52)] + [float(x) for x in range(52, int(X1) + 1, 2)]
GZ = [float(z) for z in range(int(Z0), -60, 2)] + [float(z) for z in range(-60, int(Z1) + 1)]
NXg, NZg = len(GX) - 1, len(GZ) - 1
bm = bmesh.new(); vs = []
for i in range(NXg + 1):
    vs.append([bm.verts.new((GX[i], -GZ[k], altura(GX[i], GZ[k]))) for k in range(NZg + 1)])
for i in range(NXg):
    for k in range(NZg):
        a, b, c, d = vs[i][k], vs[i + 1][k], vs[i + 1][k + 1], vs[i][k + 1]
        if (i + k) % 2 == 0: bm.faces.new((a, b, c)); bm.faces.new((a, c, d))
        else: bm.faces.new((a, b, d)); bm.faces.new((b, c, d))
bm.normal_update()
if sum(f.normal.z for f in bm.faces) < 0: bmesh.ops.reverse_faces(bm, faces=bm.faces[:])
me = bpy.data.meshes.new('Betesda_Terreno'); bm.to_mesh(me); bm.free()
ca = me.color_attributes.new('Col', 'BYTE_COLOR', 'CORNER')
for p in me.polygons:
    c = p.center; x, z = c.x, -c.y; n = p.normal
    d, _ = dist_cam(x, z); r = ruido(x, z); j = 0.95 + random.random() * 0.07
    if dentro_tanque(x, z, -0.6): col = COR['fundo']
    elif d < 0.3: col = COR['areia']
    elif fora_ret(x, z, COMPLEXO) < 3.0: col = COR['batido']
    elif abs(n.z) < 0.6: col = COR['calc_lado']
    else: col = COR['grama2'] if r < 0.35 else COR['grama'] if r < 0.6 else COR['capim'] if r < 0.85 else COR['seca']
    col = tom(col, j)
    for li in p.loop_indices: ca.data[li].color_srgb = col
terr = bpy.data.objects.new('Betesda_Terreno', me); col_exp.objects.link(terr); terr.data.materials.append(mat_vc('Terreno'))


def faixa(nome, A, meia, off, cor):
    bm = bmesh.new(); prev = None; L = len(A)
    for i, p in enumerate(A):
        q = A[min(L - 1, i + 1)] - A[max(0, i - 1)]; q.z = 0; q.normalize(); nx, nz = -q.y, q.x
        w = meia * (0.92 + 0.08 * math.sin(i * 0.17)); row = []
        for j in range(5):
            s = -1 + j / 2; x = p.x + nx * w * s; z = p.y + nz * w * s
            row.append(bm.verts.new((x, -z, altura(x, z) + off)))
        if prev:
            for j in range(4): bm.faces.new((prev[j], prev[j + 1], row[j + 1], row[j]))
        prev = row
    bm.normal_update()
    if sum(f.normal.z for f in bm.faces) < 0: bmesh.ops.reverse_faces(bm, faces=bm.faces[:])
    me = bpy.data.meshes.new(nome); bm.to_mesh(me); bm.free()
    ca = me.color_attributes.new('Col', 'BYTE_COLOR', 'CORNER')
    for p in me.polygons:
        v = 0.96 + random.random() * 0.05
        for li in p.loop_indices: ca.data[li].color_srgb = tom(cor, v)
    o = bpy.data.objects.new(nome, me); col_exp.objects.link(o); o.data.materials.append(mat_vc('Mat_' + nome))


faixa('Betesda_Trilha', AMOS, MEIA, 0.07, COR['areia'])
faixa('Betesda_Trilha_Porta', AMOE, 1.4, 0.08, COR['lajes2'])


def malha(nome, verts, faces, cores, dupla=False):
    me = bpy.data.meshes.new(nome); me.from_pydata(verts, [], faces); me.update()
    bm_ = bmesh.new(); bm_.from_mesh(me); bmesh.ops.recalc_face_normals(bm_, faces=bm_.faces[:])
    if sum(f.normal.z * f.calc_area() for f in bm_.faces) < 0: bmesh.ops.reverse_faces(bm_, faces=bm_.faces[:])
    bm_.to_mesh(me); bm_.free(); me.update()
    ca = me.color_attributes.new('Col', 'BYTE_COLOR', 'CORNER')
    for p in me.polygons:
        c = cores(p)
        for li in p.loop_indices: ca.data[li].color_srgb = c
    o = bpy.data.objects.new(nome, me); col_exp.objects.link(o); o.data.materials.append(mat_vc('Mat_' + nome, dupla))
    return o


class Formas:
    """caixas, cilindros e planos facetados, numa malha só, com a cor de cada face"""
    def __init__(self): self.v, self.f, self.c = [], [], []

    def caixa(self, cx, cz, y0, y1, lx, lz, cor, giro=0.0, var=0.05, fundo=False):
        cs, sn = math.cos(giro), math.sin(giro)
        def P(u, w, y): return (cx + u * cs - w * sn, -(cz + u * sn + w * cs), y)
        b = len(self.v); hx_, hz_ = lx / 2, lz / 2
        for y in (y0, y1):
            for u, w in ((-hx_, -hz_), (hx_, -hz_), (hx_, hz_), (-hx_, hz_)): self.v.append(P(u, w, y))
        fs = [((4, 5, 6, 7), 1.04), ((0, 1, 5, 4), 0.84), ((1, 2, 6, 5), 0.95), ((2, 3, 7, 6), 0.8), ((3, 0, 4, 7), 0.9)]
        if fundo: fs.append(((3, 2, 1, 0), 0.7))
        for ids, sh in fs:
            self.f.append(tuple(b + i for i in ids)); self.c.append(tom(cor, sh * (1 + random.uniform(-var, var))))

    def tronco(self, cx, cz, y0, y1, r0, r1, n, cor, var=0.03):
        b = len(self.v)
        for y, r in ((y0, r0), (y1, max(r1, 0.001))):
            for i in range(n):
                a = 2 * math.pi * (i + 0.5) / n; self.v.append((cx + math.cos(a) * r, -(cz + math.sin(a) * r), y))
        for i in range(n):
            j = (i + 1) % n; self.f.append((b + i, b + j, b + n + j, b + n + i)); self.c.append(tom(cor, (0.86 + 0.14 * math.cos(2 * math.pi * (i + 0.5) / n - 0.4)) * (1 + random.uniform(-var, var))))
        self.f.append(tuple(b + n + i for i in range(n))); self.c.append(tom(cor, 1.03))

    def plano(self, pts, cor):
        b = len(self.v)
        for x, y, z in pts: self.v.append((x, -z, y))
        self.f.append(tuple(range(b, b + len(pts)))); self.c.append(cor)

    def cria(self, nome, dupla=False):
        C = self.c
        return malha(nome, self.v, self.f, lambda p: C[p.index], dupla)


# ---------------- as peças com textura (o visual novo, o mesmo do templo) ----------------
# As texturas do usuário (só cor) vezes a cor de vértice. A cor de vértice leva a sombra de contato no pé das paredes e
# das colunas, a sombra debaixo dos alpendres e uma variação lenta de tom (para a textura não repetir à vista); o sol e as
# sombras de verdade vêm do jogo. As texturas originais ficam com as do templo (fase-templo/texturas/originais).
from mathutils import noise
import numpy as np
TEXO = os.path.join(ROOT, 'fase-templo', 'texturas', 'originais'); TEXJ = os.path.join(OUT, 'texturas_jogo')
TEXS = {'muro': ('muro_herodiano_v3.webp', 1024, 9.0), 'limo': ('pedra_limo_v1.png', 1024, 7.0), 'lajes': ('lajes_patio_v2.webp', 1024, 6.0),
        'marmore': ('marmore_v1.webp', 512, 3.0), 'capitel': ('capitel_v1.webp', 512, 1.0), 'cedro': ('cedro_v1.webp', 1024, 4.0),
        'telhas': ('telhas_v1.png', 1024, 4.0), 'muroP': ('muro_plataforma_v1.webp', 1024, 12.0), 'bronze': ('bronze_v1.webp', 512, 2.5)}
TILE = {k: v[2] for k, v in TEXS.items()}
IMGS, MATS = {}, {}


def prepara_texturas():
    os.makedirs(TEXJ, exist_ok=True)
    for k, (arq, lado, _) in TEXS.items():
        im = bpy.data.images.load(os.path.join(TEXO, arq)); w, h = im.size
        out = bpy.data.images.new('tmp_' + k, w, h, alpha=True); out.pixels[:] = im.pixels[:]; out.scale(lado, lado)
        cam_ = os.path.join(TEXJ, k + '.png'); out.filepath_raw = cam_; out.file_format = 'PNG'; out.save()
        bpy.data.images.remove(im); bpy.data.images.remove(out)
        IMGS[k] = bpy.data.images.load(cam_); IMGS[k].name = 'Tex_' + k


prepara_texturas()
# a esteira e a manta dos enfermos vão para o jogo à parte (o jogo as põe debaixo e por cima de cada um)
for k_, arq_ in (('esteira', 'esteira_v1.png'), ('manta', 'manta_v1.png')):
    im = bpy.data.images.load(os.path.join(TEXO, arq_)); w_, h_ = im.size
    out = bpy.data.images.new('tmp_' + k_, w_, h_); out.pixels[:] = im.pixels[:]; out.scale(512, 512)
    out.filepath_raw = os.path.join(OUT, k_ + '.jpg'); out.file_format = 'JPEG'; out.save()
    bpy.data.images.remove(im); bpy.data.images.remove(out)


def material(k, dupla=False):
    if (k, dupla) in MATS: return MATS[(k, dupla)]
    m = bpy.data.materials.new('Betesda_' + k + ('_d' if dupla else '')); m.use_nodes = True; nt = m.node_tree; nt.nodes.clear()
    out = nt.nodes.new('ShaderNodeOutputMaterial'); bs = nt.nodes.new('ShaderNodeBsdfPrincipled')
    ca = nt.nodes.new('ShaderNodeVertexColor'); ca.layer_name = 'Col'
    if k in IMGS:
        tx = nt.nodes.new('ShaderNodeTexImage'); tx.image = IMGS[k]
        mx = nt.nodes.new('ShaderNodeMix'); mx.data_type = 'RGBA'; mx.blend_type = 'MULTIPLY'; mx.inputs[0].default_value = 1.0
        nt.links.new(tx.outputs['Color'], mx.inputs[6]); nt.links.new(ca.outputs['Color'], mx.inputs[7]); nt.links.new(mx.outputs[2], bs.inputs['Base Color'])
    else: nt.links.new(ca.outputs['Color'], bs.inputs['Base Color'])
    bs.inputs['Roughness'].default_value = 0.92; nt.links.new(bs.outputs['BSDF'], out.inputs['Surface'])
    m.use_backface_culling = not dupla
    MATS[(k, dupla)] = m
    return m


class Cor(tuple):
    """uma cor que sabe o seu material: 'liso' (só a cor de vértice) ou uma textura (e então a cor vira só um tom)"""
    mat = 'liso'; tint = (1.0, 1.0, 1.0)


def C(c, mat, tint=(1.0, 1.0, 1.0)):
    n = Cor(c); n.mat = mat; n.tint = tint; return n


def tom(c, k):
    n = Cor(tuple(min(1, v * k) for v in c[:3]) + (1,)); n.mat = getattr(c, 'mat', 'liso')
    n.tint = tuple(min(1.0, v * k) for v in getattr(c, 'tint', (1.0, 1.0, 1.0))); return n


for k_, m_, t_ in (('calcario', 'muro', (1, 1, 1)), ('calc_lado', 'muro', (0.9, 0.88, 0.85)), ('muro', 'muro', (1, 1, 1)), ('limo', 'limo', (1, 1, 1)),
                   ('lajes', 'lajes', (1, 1, 1)), ('lajes2', 'lajes', (0.95, 0.94, 0.92)), ('coluna', 'marmore', (1, 1, 1)), ('cedro', 'cedro', (1, 1, 1)),
                   ('telha', 'telhas', (1, 1, 1))):
    COR[k_] = C(COR[k_], m_, t_)
COR['capitel'] = C(COR['coluna'], 'capitel')
COR['porta'] = C(COR['muro'], 'muroP'); COR['bronze'] = C(hexc('9a7038'), 'bronze')


def uv_plano(p, n, T):
    if abs(n.z) > 0.7: return (p.x / T, p.y / T)
    t = Vector((-n.y, n.x, 0.0)); t = t.normalized() if t.length > 1e-6 else Vector((1.0, 0.0, 0.0))
    return (p.dot(t) / T, p.z / T)


def newell(pts):
    n = Vector((0, 0, 0))
    for i in range(len(pts)):
        a, b = pts[i], pts[(i + 1) % len(pts)]
        n.x += (a.y - b.y) * (a.z + b.z); n.y += (a.z - b.z) * (a.x + b.x); n.z += (a.x - b.x) * (a.y + b.y)
    return n


REG = []


class FormasT:
    """as mesmas caixas, cilindros e planos, agora com textura e luz pintada (ilumina_tudo, no fim)"""
    def __init__(self, dupla=False): self.F = []; self.dupla = dupla

    def face(self, pts, mat, base, zb=None, uv=None, luz=True):
        self.F.append(([Vector(p) for p in pts], mat, base, zb, uv, luz))

    def _cor(self, cor, var):
        mat = getattr(cor, 'mat', 'liso'); k = 1 + random.uniform(-var, var)
        b = getattr(cor, 'tint', (1.0, 1.0, 1.0)) if mat != 'liso' else cor[:3]
        return mat, tuple(min(1.0, v * k) for v in b)

    def caixa(self, cx, cz, y0, y1, lx, lz, cor, giro=0.0, var=0.05, fundo=False, faixa=False):
        mat, base = self._cor(cor, var); cs, sn = math.cos(giro), math.sin(giro); hx_, hz_ = lx / 2, lz / 2
        P = lambda u, w, y: Vector((cx + u * cs - w * sn, -(cz + u * sn + w * cs), y))
        Q = [(-hx_, hz_), (hx_, hz_), (hx_, -hz_), (-hx_, -hz_)]                  # anti-horário visto de cima
        B = [P(u, w, y0) for u, w in Q]; T = [P(u, w, y1) for u, w in Q]
        H = y1 - y0; cuts = [y0] + [y0 + d for d in (0.5, 1.4, 2.8) if y0 + d < y1 - 0.2] + [y1]
        for k in range(4):
            a, b = B[k], B[(k + 1) % 4]; L = (b - a).length; nu = max(1, round(L / 2.5))
            ts = [0.0, 1.0] if faixa else [(c - y0) / H for c in cuts]
            for i in range(nu):
                for j in range(len(ts) - 1):
                    u0, u1, t0, t1 = i / nu, (i + 1) / nu, ts[j], ts[j + 1]
                    pa, pb = a.lerp(b, u0), a.lerp(b, u1)
                    up0, up1 = Vector((0, 0, H * t0)), Vector((0, 0, H * t1))
                    uv = [(u0 * L / H, t0), (u1 * L / H, t0), (u1 * L / H, t1), (u0 * L / H, t1)] if faixa else None
                    self.face([pa + up0, pb + up0, pb + up1, pa + up1], mat, base, y0, uv)
        self.face(T, mat, base)
        if fundo: self.face(B[::-1], mat, base)

    def tronco(self, cx, cz, y0, y1, r0, r1, n, cor, var=0.03):
        mat, base = self._cor(cor, var)
        A = [Vector((cx + math.cos(2 * math.pi * (i + 0.5) / n) * r0, -cz + math.sin(2 * math.pi * (i + 0.5) / n) * r0, y0)) for i in range(n)]
        Bt = [Vector((cx + math.cos(2 * math.pi * (i + 0.5) / n) * max(r1, 0.001), -cz + math.sin(2 * math.pi * (i + 0.5) / n) * max(r1, 0.001), y1)) for i in range(n)]
        for i in range(n):
            j = (i + 1) % n; self.face([A[i], A[j], Bt[j], Bt[i]], mat, base, y0)
        if r1 > 0.01: self.face(Bt, mat, base)

    def plano(self, pts, cor):
        mat, base = self._cor(cor, 0.0)
        P = [Vector((x, -z, y)) for x, y, z in pts]
        if newell(P).z < -1e-6 and abs(newell(P).normalized().z) > 0.7: P = P[::-1]          # piso sempre para cima
        self.face(P, mat, base, min(p.z for p in P) if abs(newell(P).normalized().z) < 0.5 else None)

    def cria(self, nome, dupla=None):
        dupla = self.dupla if dupla is None else dupla
        vmap, verts, faces, info = {}, [], [], []
        for (pts, mat, base, zb, uv, luz) in self.F:
            idx = []
            for p in pts:
                key = (round(p.x, 4), round(p.y, 4), round(p.z, 4))
                if key not in vmap: vmap[key] = len(verts); verts.append(key)
                idx.append(vmap[key])
            if len(set(idx)) != len(idx) or len(idx) < 3: continue
            faces.append(idx); info.append((mat, base, zb, uv, luz))
        me = bpy.data.meshes.new(nome); me.from_pydata(verts, [], faces); me.update()
        mats = sorted(set(i[0] for i in info))
        for m in mats: me.materials.append(material(m, dupla))
        for p in me.polygons: p.material_index = mats.index(info[p.index][0])
        o = bpy.data.objects.new(nome, me); col_exp.objects.link(o); REG.append((o, info))
        return o


def pinta(q, n, zb, b):
    x, z, y = q.x, -q.y, q.z
    f = 1.0
    if n.z < -0.5: f = 0.72                                                   # embaixo dos telhados
    elif n.z > 0.5 and abs(y - DECK) < 0.1:                                   # o piso perto das colunas e do parapeito
        d = min([math.hypot(x - a, z - c) - 0.4 for a, c in COLS] + [3.0])
        f = 0.82 + 0.18 * sm(0.0, 1.2, d)
    elif zb is not None: f = 0.72 + 0.28 * sm(0.0, 2.2, y - zb)               # o pé das paredes e das colunas
    if y < DECK + H_COL - 0.3 and any(x0 < x < x1 and z0 < z < z1 for (x0, x1, z0, z1) in TELHADOS.values()): f *= 0.86
    t = 1.0 + 0.06 * noise.noise(Vector((x * 0.07, z * 0.07, y * 0.05))) + 0.035 * noise.noise(Vector((x * 0.3 + 7.1, z * 0.3, y * 0.2)))
    fr = 1.0 - f
    return tuple(min(1.0, b[i] * f * t * (1.0 + fr * (-0.06, -0.04, 0.10)[i])) for i in range(3))


def ilumina_tudo():
    for o, info in REG:
        me = o.data
        ul = me.uv_layers.new(name='UVMap'); ca = me.color_attributes.new('Col', 'BYTE_COLOR', 'CORNER')
        for p in me.polygons:
            mat, base, zb, uv, luz = info[p.index]; n = p.normal.copy()
            for k, li in enumerate(p.loop_indices):
                q = me.vertices[me.loops[li].vertex_index].co
                ul.data[li].uv = uv[k] if uv else (uv_plano(q, n, TILE[mat]) if mat in TILE else (0.5, 0.5))
                c = pinta(q, n, zb, base) if luz else base
                ca.data[li].color_srgb = (c[0], c[1], c[2], 1.0)
        me.color_attributes.active_color_name = 'Col'


CAIXAS_PORTA = []
# ---------------- o tanque: as paredes de pedra, os degraus e o piso (a água é do jogo) ----------------
tq = FormasT(dupla=True)
AGUA = DECK - 2.1


def paredes(x0, x1, z0, z1):
    """as quatro paredes de dentro de um tanque, em fiadas de blocos grandes (a pedra é cortada na rocha e aparelhada)"""
    for (xa, za, xb, zb) in ((x0, z0, x1, z0), (x1, z0, x1, z1), (x1, z1, x0, z1), (x0, z1, x0, z0)):
        L = math.hypot(xb - xa, zb - za); ux, uz = (xb - xa) / L, (zb - za) / L
        y = FUNDO - 0.2
        fi = 0
        while y < DECK - 0.01:
            h = min(0.9, DECK - y); u = -random.uniform(0, 1.2) if fi % 2 else 0.0
            while u < L - 1e-3:
                u1 = min(L, u + random.uniform(1.2, 2.2)); a = max(0.0, u)
                cor = COR['limo'] if y + h < AGUA + 0.25 else COR['calcario']
                k_ = random.uniform(0.82, 0.98)
                tq.plano([(xa + ux * a, y, za + uz * a), (xa + ux * u1, y, za + uz * u1), (xa + ux * u1, y + h - 0.05, za + uz * u1), (xa + ux * a, y + h - 0.05, za + uz * a)], tom(cor, k_))
                u = u1
            y += h; fi += 1


for z0, z1 in ((ZN0, ZN1), (ZS0, ZS1)):
    paredes(-X_IN, X_IN, z0, z1)
    tq.plano([(-X_IN, FUNDO, z1), (X_IN, FUNDO, z1), (X_IN, FUNDO, z0), (-X_IN, FUNDO, z0)], tom(COR['limo'], 0.72))      # o fundo, de pedra com limo
# os degraus: uma escadaria larga na parede sul do tanque do sul e escadas nos cantos do tanque do norte
ESC = 9
for i in range(ESC):
    y = DECK - (i + 1) * (DECK - AGUA + 0.6) / ESC
    tq.caixa(0.0, ZS1 - 0.35 - i * 0.55, FUNDO - 0.2, y, 12.0, 0.55, tom(COR['calcario'], 1.0 + 0.03 * (i % 2)))
for sx in (-1, 1):
    for i in range(ESC):
        y = DECK - (i + 1) * (DECK - AGUA + 0.6) / ESC
        tq.caixa(sx * (X_IN - 1.0), ZN0 + 0.35 + i * 0.55, FUNDO - 0.2, y, 2.0, 0.55, tom(COR['calcario'], 1.0 + 0.03 * (i % 2)))
tq.cria('Betesda_Tanques', dupla=True)

# o piso dos alpendres e do dique: lajes, um pouco acima do chão (o estilóbato)
pi_ = FormasT(dupla=True)
for x0, x1, z0, z1 in ((-X_OUT, X_OUT, Z_OUT0, ZN0), (-X_OUT, X_OUT, ZS1, Z_OUT1), (-X_OUT, -X_IN, ZN0, ZS1), (X_IN, X_OUT, ZN0, ZS1), (-X_IN, X_IN, ZN1, ZS0)):
    x = x0
    while x < x1 - 1e-3:
        xb = min(x1, x + 2.0); z = z0
        while z < z1 - 1e-3:
            zb = min(z1, z + 2.0)
            pi_.plano([(x, DECK, z), (xb, DECK, z), (xb, DECK, zb), (x, DECK, zb)], tom(COR['lajes'] if (int(x / 2) + int(z / 2)) % 2 else COR['lajes2'], random.uniform(0.95, 1.04)))
            z = zb
        x = xb
# a borda do estilóbato por fora (o degrau de 0,3 m) e o parapeito baixo em volta da água
for (xa, za, xb, zb) in ((-X_OUT, Z_OUT0, X_OUT, Z_OUT0), (X_OUT, Z_OUT0, X_OUT, Z_OUT1), (X_OUT, Z_OUT1, -X_OUT, Z_OUT1), (-X_OUT, Z_OUT1, -X_OUT, Z_OUT0)):
    pi_.plano([(xa, DECK - 0.45, za), (xb, DECK - 0.45, zb), (xb, DECK, zb), (xa, DECK, za)], tom(COR['calc_lado'], 0.95))
for z0, z1 in ((ZN0, ZN1), (ZS0, ZS1)):
    for (cx, cz, lx, lz) in ((0, z0 - 0.15, 2 * X_IN, 0.3), (0, z1 + 0.15, 2 * X_IN, 0.3), (-X_IN - 0.15, (z0 + z1) / 2, 0.3, z1 - z0), (X_IN + 0.15, (z0 + z1) / 2, 0.3, z1 - z0)):
        if abs(cz - (ZS1 + 0.15)) < 0.01: continue                 # a escadaria fica aberta
        pi_.caixa(cx, cz, DECK - 0.05, DECK + 0.55, lx, lz, COR['muro'])
pi_.cria('Betesda_Piso')

# ---------------- os cinco alpendres: colunas e telhados (cada telhado numa malha: o jogo o deixa transparente
# quando o jogador está debaixo dele) ----------------
CO = FormasT(); COLS = []
H_COL = 4.2


H_VIGA = 0.55


def fila(xa, za, xb, zb, passo=2.6):
    L = math.hypot(xb - xa, zb - za); n = max(1, round(L / passo))
    # a viga de pedra que corre por cima dos capitéis, com a cornija um pouco mais larga em cima
    CO.caixa((xa + xb) / 2, (za + zb) / 2, DECK + H_COL, DECK + H_COL + H_VIGA - 0.12, L + 0.82, 0.62, COR['coluna'], giro=math.atan2(zb - za, xb - xa), var=0.0)
    CO.caixa((xa + xb) / 2, (za + zb) / 2, DECK + H_COL + H_VIGA - 0.12, DECK + H_COL + H_VIGA, L + 0.95, 0.78, tom(COR['coluna'], 1.03), giro=math.atan2(zb - za, xb - xa), var=0.0)
    for i in range(n + 1):
        x, z = xa + (xb - xa) * i / n, za + (zb - za) * i / n
        if any(abs(x - a) < 0.3 and abs(z - b) < 0.3 for a, b in COLS): continue
        CO.caixa(x, z, DECK, DECK + 0.3, 0.8, 0.8, tom(COR['coluna'], 0.95))                       # a base
        CO.tronco(x, z, DECK + 0.3, DECK + H_COL - 0.75, 0.28, 0.25, 8, COR['coluna'])
        CO.caixa(x, z, DECK + H_COL - 0.75, DECK + H_COL - 0.15, 0.6, 0.6, COR['capitel'], var=0.0, faixa=True)      # o capitel (acanto)
        CO.caixa(x, z, DECK + H_COL - 0.15, DECK + H_COL, 0.82, 0.82, tom(COR['coluna'], 1.03))                     # o ábaco
        COLS.append((x, z))


fila(-X_OUT + 0.4, Z_OUT0 + 0.4, X_OUT - 0.4, Z_OUT0 + 0.4); fila(-X_IN - 0.3, ZN0 - 0.3, X_IN + 0.3, ZN0 - 0.3)                     # norte
fila(-X_OUT + 0.4, Z_OUT1 - 0.4, X_OUT - 0.4, Z_OUT1 - 0.4); fila(-X_IN - 0.3, ZS1 + 0.3, X_IN + 0.3, ZS1 + 0.3)                     # sul
fila(-X_OUT + 0.4, Z_OUT0 + 0.4, -X_OUT + 0.4, Z_OUT1 - 0.4); fila(-X_IN - 0.3, ZN0 - 0.3, -X_IN - 0.3, ZS1 + 0.3)                  # oeste
fila(X_OUT - 0.4, Z_OUT0 + 0.4, X_OUT - 0.4, Z_OUT1 - 0.4); fila(X_IN + 0.3, ZN0 - 0.3, X_IN + 0.3, ZS1 + 0.3)                      # leste
fila(-X_IN - 0.3, ZN1 + 0.6, X_IN + 0.3, ZN1 + 0.6); fila(-X_IN - 0.3, ZS0 - 0.6, X_IN + 0.3, ZS0 - 0.6)                            # o dique (o quinto)
CO.cria('Betesda_Colunas')
TELHADOS = {'Telhado_Norte': (-X_OUT, X_OUT, Z_OUT0, ZN0), 'Telhado_Sul': (-X_OUT, X_OUT, ZS1, Z_OUT1), 'Telhado_Oeste': (-X_OUT, -X_IN, ZN0, ZS1),
            'Telhado_Leste': (X_IN, X_OUT, ZN0, ZS1), 'Telhado_Dique': (-X_IN, X_IN, ZN1, ZS0)}
for nome, (x0, x1, z0, z1) in TELHADOS.items():
    te = FormasT(); y = DECK + H_COL + H_VIGA
    te.caixa((x0 + x1) / 2, (z0 + z1) / 2, y, y + 0.45, x1 - x0 + 0.6, z1 - z0 + 0.6, COR['cedro'], fundo=True)        # a viga e o forro de cedro
    te.caixa((x0 + x1) / 2, (z0 + z1) / 2, y + 0.45, y + 0.75, x1 - x0 + 0.9, z1 - z0 + 0.9, COR['telha'])           # o terraço por cima
    te.cria(nome)

# ---------------- o curral, junto à Porta das Ovelhas (as ovelhas dos sacrifícios) ----------------
# ---------------- peças dos kits ----------------
PROTO = {}
def importa(arq):
    antes = set(bpy.data.objects)
    bpy.ops.import_scene.gltf(filepath=os.path.join(ROOT, arq))
    novos = [o for o in bpy.data.objects if o not in antes]
    for o in novos:
        for c in list(o.users_collection): c.objects.unlink(o)
        col_proto.objects.link(o)
        if o.parent is None: PROTO[(arq, o.name.split('.')[0])] = o
    for o in novos:
        if o.name.startswith('Icosphere'): bpy.data.objects.remove(o)
    return novos


for arq in ['oliveiras\\oliveiras.glb', 'figueiras\\figueiras.glb', 'casa-porta\\rochas.glb', 'casa-porta\\pastoril.glb', 'flores\\plantas_betfage.glb',
            'flores\\flores.glb', 'casa-porta\\objetos_casa.glb']:
    importa(arq)
col_proto.hide_render = True; col_proto.hide_viewport = True
bpy.context.view_layer.update()


def dims(o):
    bb = [o.matrix_world @ Vector(c) for c in o.bound_box]; return [max(v[i] for v in bb) - min(v[i] for v in bb) for i in range(3)]


def copia(o, col):
    n = o.copy(); col.objects.link(n)
    for c in o.children:
        cc = copia(c, col); cc.parent = n
    return n


ORDEM = [0]
def poe(arq, no, x, z, r=0.0, k=1.0, y=None, afunda=0.05, longe=False, planta=False):
    o = PROTO.get((arq.replace('/', '\\'), no))
    if o is None: print('FALTA', arq, no); return None
    if y is None: y = altura(x, z)
    n = copia(o, col_prev); n.location = (x, -z, y - afunda); n.rotation_mode = 'XYZ'
    rx, ry, rz = o.rotation_euler; n.rotation_euler = (rx, ry, rz + r)
    n.scale = tuple(s * k for s in o.scale)
    if planta: n['planta'] = no
    else: n['glb'] = arq.replace('\\', '/'); n['no'] = no
    n['r0'] = rz; n['k0'] = o.scale[0]; n['afunda'] = afunda; n['ordem'] = ORDEM[0]; ORDEM[0] += 1
    n['x0'], n['z0'] = x, z
    if longe: n['f'] = 1
    return n


def circulo(nome, x, z, r, dono=None, y=None, fixo=False):
    e = bpy.data.objects.new(nome, None); col_colis.objects.link(e)
    e.empty_display_type = 'CIRCLE'; e.empty_display_size = 1.0; e['colisao'] = 'circ'; e.hide_render = True; e.show_in_front = True
    e.matrix_world = Matrix.Translation((x, -z, (altura(x, z) if y is None else y) + 0.2)) @ Matrix.Rotation(math.pi / 2, 4, 'X') @ Matrix.Diagonal((r, r, r, 1))
    if fixo: e['fixo'] = 1
    if dono is not None:
        e['dono'] = 1; e.parent = dono; e.matrix_parent_inverse = dono.matrix_world.inverted()
        dono['col_feita'] = dono.name
    return e


def empty_ref(nome, x, z, y=None, r=0.0, tipo='SINGLE_ARROW', tam=1.5):
    e = bpy.data.objects.new(nome, None); col_ref.objects.link(e)
    e.empty_display_type = tipo; e.empty_display_size = tam; e.show_in_front = True
    e.location = (x, -z, altura(x, z) if y is None else y); e.rotation_euler = (0, 0, r)
    return e


# ---------------- a Porta das Ovelhas (Ne 3.1; Jo 5.2): duas torres de pedra herodiana, o arco, as folhas de bronze
# abertas para dentro e as ameias. Substitui o trecho do muro da maquete entre as torres (o jogo tira esse trecho de lá).
po = FormasT(); PX_, ZM_ = PORTA[0], MURO_Z; YG = altura(PX_, ZM_ - 1.0)
def ameias(F, x0, x1, z0, z1, y, passo=1.1):
    n = max(2, int((x1 - x0) / passo))
    for i in range(n):
        if i % 2 == 0: F.caixa(x0 + (i + 0.5) * (x1 - x0) / n, (z0 + z1) / 2, y, y + 0.8, (x1 - x0) / n, z1 - z0, COR['porta'], var=0.03)
for sgn in (-1, 1):                                                    # as torres
    xa, xb = PX_ + sgn * 2.2, PX_ + sgn * 7.0
    cx, lx = (xa + xb) / 2, abs(xb - xa)
    po.caixa(cx, ZM_ + 1.0, YG - 2.5, YG + 12.0, lx, 5.0, COR['porta'], var=0.02)
    po.caixa(cx, ZM_ + 1.0, YG + 12.0, YG + 12.35, lx + 0.4, 5.4, tom(COR['porta'], 1.04), var=0.0)
    ameias(po, cx - lx / 2 - 0.2, cx + lx / 2 + 0.2, ZM_ - 1.7, ZM_ - 1.2, YG + 12.35)
    for k in range(2): po.caixa(cx, ZM_ - 1.45, YG + 7.0 + k * 2.4, YG + 7.9 + k * 2.4, 0.5, 0.12, COR['escuro'] if 'escuro' in COR else hexc('2e2620'), var=0.0)   # as seteiras
    CAIXAS_PORTA.append([round(min(xa, xb), 2), round(max(xa, xb), 2), round(ZM_ - 1.6, 2), round(ZM_ + 3.6, 2)])
po.caixa(PX_, ZM_ + 1.5, YG + 5.6, YG + 10.0, 4.4, 3.0, COR['porta'], var=0.02)               # o muro por cima da passagem
ameias(po, PX_ - 2.2, PX_ + 2.2, ZM_ - 0.05, ZM_ + 0.45, YG + 10.0)
r_ = 2.0; yA = YG + 3.6
for i in range(10):                                                    # o arco: as aduelas em fatias acompanhando a curva
    x0_, x1_ = PX_ - r_ + 2 * r_ * i / 10, PX_ - r_ + 2 * r_ * (i + 1) / 10; xc_ = (x0_ + x1_) / 2
    po.caixa(xc_, ZM_ + 1.5, yA + math.sqrt(max(0.0, r_ * r_ - (xc_ - PX_) ** 2)), YG + 5.6, x1_ - x0_, 3.0, tom(COR['porta'], 0.97), var=0.0)
for sgn in (-1, 1):                                                    # as folhas de bronze, abertas para dentro, encostadas na passagem
    po.caixa(PX_ + sgn * 1.92, ZM_ + 1.6, YG, YG + 4.8, 0.12, 1.9, COR['bronze'], var=0.0)
po.cria('Porta_Ovelhas')

# colisão: as colunas (círculos fixos, presos às colunas) e os tanques (caixas, no layout)
colunas = bpy.data.objects['Betesda_Colunas']
for i, (x, z) in enumerate(COLS): circulo('COL_Coluna_%d' % i, x, z, 0.4, colunas, y=DECK, fixo=True)
CAIXAS = [[-X_IN - 0.1, X_IN + 0.1, ZN0 - 0.1, ZN1 + 0.1], [-X_IN - 0.1, X_IN + 0.1, ZS0 - 0.1, ZS1 + 0.1]] + CAIXAS_PORTA      # os tanques e as torres da porta

# o curral: cercas em volta, a porteira para a estrada
cx_, cz_, hx_, hz_ = CURRAL
for (xa, za, xb, zb) in ((cx_ - hx_, cz_ - hz_, cx_ + hx_, cz_ - hz_), (cx_ + hx_, cz_ - hz_, cx_ + hx_, cz_ + hz_), (cx_ - hx_, cz_ - hz_, cx_ - hx_, cz_ + hz_),
                         (cx_ - hx_, cz_ + hz_, cx_ - 0.9, cz_ + hz_), (cx_ + 0.9, cz_ + hz_, cx_ + hx_, cz_ + hz_)):
    L = math.hypot(xb - xa, zb - za); n = max(1, round(L / 2.0))
    for i in range(n):
        x = xa + (xb - xa) * (i + 0.5) / n; z = za + (zb - za) * (i + 0.5) / n; g = math.atan2(-(zb - za), xb - xa)
        o = poe('casa-porta\\pastoril.glb', 'Cerca_Reta', x, z, g, L / n / 2.0, afunda=0.02)
CERCA = [[cx_ - hx_, cz_ - hz_, cx_ + hx_, cz_ - hz_], [cx_ + hx_, cz_ - hz_, cx_ + hx_, cz_ + hz_], [cx_ - hx_, cz_ - hz_, cx_ - hx_, cz_ + hz_],
         [cx_ - hx_, cz_ + hz_, cx_ - 0.9, cz_ + hz_], [cx_ + 0.9, cz_ + hz_, cx_ + hx_, cz_ + hz_]]
n = poe('casa-porta\\pastoril.glb', 'Cocho', cx_ + 1.8, cz_ - 2.2, 0.0, 1.0, afunda=0.02)
if n is not None: circulo('COL_Cocho', cx_ + 1.8, cz_ - 2.2, 0.6, n)

# ---------------- os enfermos: esteiras debaixo dos alpendres (o jogo deita gente nelas), jarros e cestos ----------------
ESTEIRAS = []          # x, z, giro (a cabeça para o lado de fora), quem ('' = a esteira vazia do paralítico)
def esteira(x, z, g, quem='e'):
    # (a esteira é do jogo: a textura de junco, com a manta por cima de quem está nela)
    ESTEIRAS.append([round(x, 2), round(z, 2), round(g, 3), quem])
    a0 = random.uniform(0, 6.28)
    for j in range(1 + (random.random() < 0.6)):
        a = a0 + j * 0.9; poe('casa-porta\\objetos_casa.glb', random.choice(['Jarra_Alca', 'Jarro_Alto', 'Cesto_Oval', 'Tigela_Funda', 'Prato', 'Saco']), x + math.cos(a) * 1.05, z + math.sin(a) * 1.05, random.uniform(0, 6.28), 1.0, y=DECK, afunda=0.0)


for x in (-12.5, -6.5, 1.0, 9.0):           # alpendre do norte
    esteira(x, Z_OUT0 + 2.0, 0.0)
for z in (-36.0, -29.0, -16.0, -9.0):       # oeste e leste
    esteira(-X_OUT + 2.0, z, math.pi / 2); esteira(X_OUT - 2.0, z + 3.0, math.pi / 2)
for x in (-10.0, 6.0):                      # o dique
    esteira(x, (ZN1 + ZS0) / 2, 0.0)
esteira(-11.0, Z_OUT1 - 2.0, 0.0)           # alpendre do sul
PARALITICO = (8.5, Z_OUT1 - 2.0)            # o lugar do paralítico, perto da escadaria: só o chão marcado, sem esteira
ESTEIRAS.append([PARALITICO[0], PARALITICO[1], 0.0, ''])

# ---------------- árvores, pedras, moitas e flores no planalto ----------------
ARV = []
K_OLI = 4.0 / max(0.1, dims(PROTO[('oliveiras\\oliveiras.glb', 'Oliveira1_Jovem')])[2])
K_FIG = 3.6 / max(0.1, dims(PROTO[('figueiras\\figueiras.glb', 'Figueira1_Jovem_ComFruta')])[2])


def livre(x, z, m=0.0):
    if dist_cam(x, z)[0] < 1.6 + m or fora_ret(x, z, COMPLEXO) < 4 + m or fora_ret(x, z, (cx_ - hx_, cx_ + hx_, cz_ - hz_, cz_ + hz_)) < 2 + m: return False
    if z > MURO_Z - 4: return False
    return not any(math.hypot(x - a, z - b) < 4.0 for a, b in ARV)


for _ in range(400):
    if len(ARV) >= 34: break
    x, z = random.uniform(X0 + 6, X1 - 6), random.uniform(Z0 + 6, MURO_Z - 5)
    if not livre(x, z): continue
    perto = fora_ret(x, z, AREA) < 1
    if random.random() < 0.75: n = poe('oliveiras\\oliveiras.glb', random.choice(['Oliveira1_Jovem', 'Oliveira2_Retorcida', 'Oliveira3_Vaso', 'Oliveira4_Ancia']), x, z, random.uniform(0, 6.28), K_OLI * random.uniform(0.8, 1.1), afunda=0.12, longe=not perto)
    else: n = poe('figueiras\\figueiras.glb', random.choice(['Figueira1_Jovem_ComFruta', 'Figueira2_Larga_ComFruta']), x, z, random.uniform(0, 6.28), K_FIG * random.uniform(0.85, 1.05), afunda=0.12, longe=not perto)
    if n is not None and perto: circulo('COL_' + n.name, x, z, 0.45, n)
    ARV.append((x, z))
ROCHAS = ['Rocha%d' % i for i in range(1, 10)]
for _ in range(70):
    x, z = random.uniform(X0 + 4, X1 - 4), random.uniform(Z0 + 4, MURO_Z - 3)
    if not livre(x, z, -1.0): continue
    perto = fora_ret(x, z, AREA) < 1; k = random.uniform(0.5, 1.4)
    n = poe('casa-porta\\rochas.glb', random.choice(ROCHAS), x, z, random.uniform(0, 6.28), k, afunda=0.2 * k, longe=not perto)
    if n is not None and perto and k > 0.7: circulo('COL_' + n.name, x, z, 0.3 * k + 0.1, n)
for _ in range(180):
    x, z = random.uniform(X0 + 4, X1 - 4), random.uniform(Z0 + 4, MURO_Z - 2)
    if dist_cam(x, z)[0] < 0.5 or fora_ret(x, z, COMPLEXO) < 1.5: continue
    if random.random() < 0.45:
        poe('flores\\flores.glb', random.choice(['Flor_Anemona_Mancha', 'Flor_Margarida_Mancha', 'Flor_Asfodelo_Tufo', 'Flor_Tremoco_Touceira', 'Flor_Ciclame_Tufo']), x, z, random.uniform(0, 6.28), random.uniform(0.8, 1.15), afunda=0.02, planta=True)
    else:
        poe('flores\\plantas_betfage.glb', random.choice(['Moita_Espinhos_Pequena', 'Malva_Rosa', 'Moita_Espinhos_Grande']), x, z, random.uniform(0, 6.28), random.uniform(0.7, 1.05), afunda=0.05, planta=True)

# ---------------- os lugares ----------------
empty_ref('JOGO_porta', PORTA[0], MURO_Z - 1.2, r=math.pi, tam=2.0)                 # a soleira da Porta das Ovelhas (a seta: para dentro, sul)
empty_ref('JOGO_tanque', 0.0, (ZN1 + ZS0) / 2, y=DECK, tipo='SPHERE', tam=0.8)          # o meio do dique
empty_ref('JOGO_paralitico', PARALITICO[0], PARALITICO[1], y=DECK, tipo='SPHERE', tam=0.6)
empty_ref('JOGO_curral', cx_, cz_, tam=2.0)
empty_ref('JOGO_leste', AMOS[0].x, AMOS[0].y, tam=2.0)                                  # a ponta leste: o Getsêmani
empty_ref('JOGO_oeste', AMOS[-1].x, AMOS[-1].y, tam=2.0)                                # a ponta oeste: o Gólgota

# a maquete de Jerusalém, deslocada para cá, só para ver no Blender (o jogo põe a dele)
try:
    antes = set(bpy.data.objects)
    bpy.ops.import_scene.gltf(filepath=os.path.join(ROOT, 'jerusalem', 'jerusalem_maquete.glb'))
    col_jer = colecao('Jerusalem_maquete_so_para_ver')
    for o in [o for o in bpy.data.objects if o not in antes]:
        for c in list(o.users_collection): c.objects.unlink(o)
        col_jer.objects.link(o)
        if o.parent is None: o.location = (o.location.x - GW[0], o.location.y + GW[2], o.location.z - H0)
        if o.name.startswith(('Tanques', 'Cidade_Chao', 'Vale_', 'Leste_')): o.hide_render = True; o.hide_set(True)
except Exception as e:
    print('sem maquete', e)

ilumina_tudo()          # a luz suave pintada nas peças com textura
fixos = {'estrada': [[round(p.x, 2), round(p.y, 2)] for p in AMOS[::3]] + [[round(AMOS[-1].x, 2), round(AMOS[-1].y, 2)]], 'meia': MEIA,
         'muros': CERCA, 'area': AREA, 'terreno': [X0, X1, Z0, Z1], 'mundo': [GW[0], H0, GW[2]], 'caixas': CAIXAS,
         'telhados': {k: list(v) for k, v in TELHADOS.items()}, 'deck': round(DECK, 3), 'agua': round(AGUA, 3),
         'esteiras': ESTEIRAS, 'muro_z': round(MURO_Z, 2), 'complexo': list(COMPLEXO), 'cercado': list(CURRAL)}
t = bpy.data.texts.new('betesda_fixos'); t.write(json.dumps(fixos))
bt = bpy.data.texts.new('EXPORTAR_PARA_O_JOGO')
bt.write("# exporta o que está na cena para o jogo e salva o .blend\nRODAR_EXPORTACAO = True\nexec(open(r'" + os.path.join(OUT, 'exportar_betesda.py') + "', encoding='utf-8').read())\n")

sol = bpy.data.lights.new('Sol', 'SUN'); sol.energy = 3.5; so = bpy.data.objects.new('Sol', sol); sc.collection.objects.link(so); so.rotation_euler = (math.radians(50), 0, math.radians(-110))
w = bpy.data.worlds.new('Ceu'); sc.world = w; w.use_nodes = True
bg = next(n for n in w.node_tree.nodes if n.type == 'BACKGROUND'); bg.inputs['Color'].default_value = (0.66, 0.77, 0.88, 1); bg.inputs['Strength'].default_value = 0.9
cam = bpy.data.cameras.new('Cam'); cam.lens = 24; co = bpy.data.objects.new('Cam', cam); sc.collection.objects.link(co); sc.camera = co
cam.clip_end = 1500

os.makedirs(OUT, exist_ok=True)
bpy.ops.wm.save_as_mainfile(filepath=BLEND)
print('FIM', len([o for o in bpy.data.objects if 'glb' in o]), 'objetos', len(COLS), 'colunas', len(ESTEIRAS), 'esteiras', 'DECK %.2f H0 %.2f' % (DECK, H0), 'porta', PORTA)
