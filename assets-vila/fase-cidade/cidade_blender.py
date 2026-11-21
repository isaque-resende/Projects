# A cidade alta: gera a fase no Blender e grava cidade.blend. Depois, quem manda é o .blend:
# mexa nele e rode o texto EXPORTAR_PARA_O_JOGO (aba Scripting > Run Script).
#
# Uso (só para criar a fase do zero):
#   blender -b --factory-startup -P cidade_blender.py -- [--regerar-tudo]
#
# Coordenadas da fase (three.js): x (leste), y (altura); o norte é -z. A origem é um ponto no meio da cidade alta, no
# mundo da maquete (../jerusalem), em escala 1:1: o primeiro muro (ao norte, com a Porta de Genat), o palácio de Herodes
# e as três torres (a oeste) e o viaduto para o templo (a nordeste) são os da maquete; as casas dela saem, e as daqui
# entram, ao longo das ruas.
#
# O lugar, na manhã do domingo:
#   - o Xisto, a praça de colunas junto ao viaduto que vem do templo (Josefo, Guerras II.16.3);
#   - o mercado de cima, na rua principal;
#   - o palácio de Herodes com as torres, onde ficava o governador na festa: o pretório, e na frente o Pavimento, em
#     hebraico Gabatá (Jo 18.28; 19.13);
#   - a casa do sumo sacerdote, com o pátio e o braseiro onde Pedro negou a Jesus (Jo 18.15-18, 25-27);
#   - a casa onde os discípulos estavam reunidos (a tradição a põe no sul da cidade alta), com a escada de fora para a
#     sala de cima (Mc 14.15; At 1.13);
#   - a Porta de Genat, no primeiro muro: dela sai a estrada que passa pelo Gólgota (Jo 20.3-4: Pedro e João correram
#     por ela ao sepulcro).
import bpy, bmesh, math, json, os, random, sys
from mathutils import Vector, Matrix
from mathutils.kdtree import KDTree

ROOT = r"M:\Claude\github\Projects-animais\assets-vila"
OUT = os.path.join(ROOT, 'fase-cidade')
BLEND = os.path.join(OUT, 'cidade.blend')
ARGV = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
if os.path.exists(BLEND) and '--regerar-tudo' not in ARGV:
    raise SystemExit('cidade.blend já existe: abra-o e use EXPORTAR_PARA_O_JOGO. Para recriar do zero, rode com --regerar-tudo.')
random.seed(37)


def sm(e0, e1, x):
    k = (x - e0) / (e1 - e0); k = 0 if k < 0 else 1 if k > 1 else k
    return k * k * (3 - 2 * k)


exec(open(os.path.join(ROOT, 'jerusalem', 'relevo.py'), encoding='utf-8').read())
LUGW = json.load(open(os.path.join(ROOT, 'jerusalem', 'jerusalem_lugares.json'), encoding='utf-8'))
CW = (-205.0, 85.0)                                  # a origem, no mundo da maquete
H0 = h_mundo(*CW)


def L(xo, zo):
    """um ponto do plano velho da maquete, aqui"""
    x, z = para_mundo(*encolhe(xo, zo)); return (x - CW[0], z - CW[1])


def hm(x, z): return h_mundo(CW[0] + x, CW[1] + z) - H0


# ---------------- o que vem da maquete (para a colisão e o traçado) ----------------
GEN = L(-489.0, -150.0)                              # a Porta de Genat
PONTE = L(-372.0, -147.5)                            # a ponta oeste do viaduto (o arco de Wilson)
MURO1 = [L(x, z) for x, z in ((-606.0, -150.0), (-489.0 - 4.5 - 12.1, -150.0))] , [L(x, z) for x, z in ((-489.0 + 4.5 + 12.1, -150.0), (-372.0, -148.0))]
PAL = [L(-600.0, -322.0), L(-556.0, -168.0)]          # a plataforma do palácio (dois cantos)
TORRES = [(L(-617.0, -160.0), L(-601.0, -144.0)), (L(-596.0, -162.0), L(-576.0, -144.0)), (L(-572.0, -158.0), L(-558.0, -144.0))]
PX0, PX1 = min(PAL[0][0], PAL[1][0]), max(PAL[0][0], PAL[1][0]); PZ0, PZ1 = min(PAL[0][1], PAL[1][1]), max(PAL[0][1], PAL[1][1])
X0, X1, Z0, Z1 = -64.0, 64.0, -66.0, 66.0
AREA = [PX1 + 1.0, 54.0, GEN[1] + 1.2, 58.0]          # do palácio até o vale; do muro (com a porta) até o sul

# ---------------- o traçado (metros, x leste, z sul) ----------------
ZR = GEN[1] + 9.0                                    # a rua principal corre ao sul do muro
RUAS = [  # (pontos, meia largura)
    ([(PONTE[0] + 2.0, PONTE[1] + 1.5), (PONTE[0] - 4.0, ZR), (GEN[0] + 6.0, ZR), (GEN[0], ZR - 3.0), (GEN[0], GEN[1] + 2.5)], 2.2),     # do viaduto à Porta de Genat
    ([(6.0, ZR), (6.0, 52.0)], 2.0),                                                                                                    # a rua do sul
    ([(PX1 + 2.0, 6.0), (46.0, 6.0)], 1.8),                                                                                              # a transversal
    ([(PX1 + 2.0, ZR + 12.0), (PX1 + 2.0, 40.0), (-20.0, 46.0), (6.0, 46.0)], 1.6),                                                      # ao longo do palácio, até o cenáculo
]
XISTO = (18.0, 40.0, ZR + 3.5, ZR + 18.0)             # a praça de colunas
MERCADO = (-14.0, 2.0, ZR + 3.0, ZR + 11.0)
GABATA = (PX1 + 1.0, PX1 + 11.0, -6.0, 4.0)          # o Pavimento, na frente do palácio
CAIFAS = (22.0, 42.0, 18.0, 38.0)                    # a casa do sumo sacerdote (com o pátio no meio)
CENACULO = (-24.0, -12.0, 30.0, 40.0)                # a casa da sala de cima

AMR = []                                             # amostras das ruas: (Vector(x, z), meia largura)
for pts, w in RUAS:
    for (xa, za), (xb, zb) in zip(pts, pts[1:]):
        n = max(2, int(math.hypot(xb - xa, zb - za) / 0.5))
        for k in range(n + 1): AMR.append((Vector((xa + (xb - xa) * k / n, za + (zb - za) * k / n, 0)), w))
KD = KDTree(len(AMR))
for i, (p, w) in enumerate(AMR): KD.insert(p, i)
KD.balance()


def dist_rua(x, z):
    co, i, d = KD.find(Vector((x, z, 0))); return d - AMR[i][1]


def dentro(r, x, z, m=0.0): return r[0] + m < x < r[1] - m and r[2] + m < z < r[3] - m


PRACAS = [XISTO, MERCADO, GABATA]
# o chão: o relevo da maquete, mais liso; ruas e praças em degraus suaves
def h_base(x, z):
    return hm(x, z)                  # o mesmo chão da maquete: a borda emenda sem degrau


def altura(x, z): return h_base(x, z)


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
def tom(c, k): return tuple(min(1, v * k) for v in c[:3]) + (1,)
COR = {'lajes': hexc('d9d2c0'), 'lajes2': hexc('c9c0aa'), 'terra': hexc('c4a675'), 'muro': hexc('e3d6b8'), 'muro2': hexc('d6c7a5'), 'muro3': hexc('ecdfc2'),
       'escuro': hexc('3a2f26'), 'madeira': hexc('7a5634'), 'coluna': hexc('ebe2cc'), 'cedro': hexc('8d6a4c'), 'brasa': hexc('c4502a'), 'cinza': hexc('6e655a'),
       'grama': hexc('a3ad66'), 'telhado': hexc('cdbf9e')}
CASAS = [hexc(c) for c in ('e3d6b8', 'd9caa8', 'ecdfc2', 'd2c19c', 'e6d9bc')]


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


# ---------------- as peças com textura (o visual novo, o mesmo do templo e de Betesda) ----------------
# As texturas do usuário (só cor) vezes a cor de vértice. A cor de vértice leva a sombra de contato no pé das paredes,
# a sombra debaixo dos beirais e uma variação lenta de tom (para a textura não repetir à vista); o sol e as sombras de
# verdade vêm do jogo. As texturas próprias da cidade ficam em fase-cidade/texturas/originais; enquanto não chegam, vale
# a provisória do templo (fase-templo/texturas/originais).
from mathutils import noise
TEXC = os.path.join(OUT, 'texturas', 'originais'); TEXO = os.path.join(ROOT, 'fase-templo', 'texturas', 'originais'); TEXJ = os.path.join(OUT, 'texturas_jogo')
TEXS = {  # chave: (arquivo da cidade, provisória do templo, lado, metros por repetição)
    'reboco': ('reboco_v1.png', 'muro_herodiano_v3.webp', 1024, 5.0), 'terraco': ('terraco_v1.png', 'chao_pedreira_v1.png', 1024, 5.0),
    'reboco2': ('reboco_v2.png', 'muro_herodiano_v3.webp', 1024, 5.0), 'terraco2': ('terraco_v2.png', 'chao_pedreira_v1.png', 1024, 6.0),
    'porta': ('porta_v1.png', 'tabuas_v1.webp', 512, 1.0), 'muro': (None, 'muro_herodiano_v3.webp', 1024, 9.0),
    'lajes': (None, 'lajes_patio_v2.webp', 1024, 5.0), 'lajesN': (None, 'lajes_nobre_v1.webp', 1024, 4.0), 'terra': (None, 'chao_pedreira_v1.png', 1024, 6.0),
    'marmore': (None, 'marmore_v1.webp', 512, 3.0), 'capitel': (None, 'capitel_v1.webp', 512, 1.0), 'cedro': (None, 'cedro_v1.webp', 1024, 3.0)}
TILE = {k: v[3] for k, v in TEXS.items()}
IMGS, MATS = {}, {}


def prepara_texturas():
    os.makedirs(TEXJ, exist_ok=True)
    for k, (arq_c, arq_t, lado, _) in TEXS.items():
        cam = os.path.join(TEXC, arq_c) if arq_c and os.path.exists(os.path.join(TEXC, arq_c)) else os.path.join(TEXO, arq_t)
        if arq_c and not cam.startswith(TEXC): print('PROVISORIA', k, '->', arq_t)
        im = bpy.data.images.load(cam); w, h = im.size
        out = bpy.data.images.new('tmp_' + k, w, h, alpha=True); out.pixels[:] = im.pixels[:]; out.scale(lado, lado)
        dst = os.path.join(TEXJ, k + '.png'); out.filepath_raw = dst; out.file_format = 'PNG'; out.save()
        bpy.data.images.remove(im); bpy.data.images.remove(out)
        IMGS[k] = bpy.data.images.load(dst); IMGS[k].name = 'Tex_' + k


prepara_texturas()


def material(k, dupla=False):
    if (k, dupla) in MATS: return MATS[(k, dupla)]
    m = bpy.data.materials.new('Cidade_' + k + ('_d' if dupla else '')); m.use_nodes = True; nt = m.node_tree; nt.nodes.clear()
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


for k_, m_, t_ in (('lajes', 'lajes', (1, 1, 1)), ('lajes2', 'lajes', (0.95, 0.94, 0.92)), ('muro', 'muro', (1, 1, 1)), ('muro2', 'muro', (0.93, 0.91, 0.87)),
                   ('muro3', 'muro', (1.0, 0.98, 0.95)), ('madeira', 'cedro', (0.85, 0.8, 0.75)), ('coluna', 'marmore', (1, 1, 1)), ('cedro', 'cedro', (1, 1, 1)),
                   ('telhado', 'terraco', (1, 1, 1))):
    COR[k_] = C(COR[k_], m_, t_)
COR['terraco'] = C(COR['telhado'], 'terraco'); COR['terraco2'] = C(COR['telhado'], 'terraco2'); COR['porta'] = C(COR['madeira'], 'porta'); COR['lajesN'] = C(COR['lajes'], 'lajesN')
CASAS = [C(hexc('e3d6b8'), m, t) for m in ('reboco', 'reboco2') for t in ((1.0, 1.0, 1.0), (0.97, 0.94, 0.9), (1.0, 0.97, 0.92), (0.94, 0.92, 0.88), (1.0, 0.95, 0.87), (0.96, 0.96, 0.94))]


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


class Formas:
    """caixas (x0..x1, z0..z1), cilindros e planos com textura e luz pintada (ilumina_tudo, no fim)"""
    def __init__(self, dupla=False): self.F = []; self.dupla = dupla

    def face(self, pts, mat, base, zb=None, uv=None, luz=True):
        self.F.append(([Vector(p) for p in pts], mat, base, zb, uv, luz))

    def _cor(self, cor, var):
        mat = getattr(cor, 'mat', 'liso'); k = 1 + random.uniform(-var, var)
        b = getattr(cor, 'tint', (1.0, 1.0, 1.0)) if mat != 'liso' else cor[:3]
        return mat, tuple(min(1.0, v * k) for v in b)

    def caixa(self, x0, x1, y0, y1, z0, z1, cor, var=0.04, fundo=False):
        mat, base = self._cor(cor, var)
        Q = [(x0, z1), (x1, z1), (x1, z0), (x0, z0)]                               # anti-horário visto de cima (Blender: y = -z)
        B = [Vector((x, -z, y0)) for x, z in Q]; T = [Vector((x, -z, y1)) for x, z in Q]
        H = y1 - y0; cuts = [y0] + [y0 + d for d in (0.5, 1.4, 2.8) if y0 + d < y1 - 0.2] + [y1]
        for k in range(4):
            a, b = B[k], B[(k + 1) % 4]; L_ = (b - a).length; nu = max(1, round(L_ / 2.5))
            for i in range(nu):
                for j in range(len(cuts) - 1):
                    pa, pb = a.lerp(b, i / nu), a.lerp(b, (i + 1) / nu)
                    u0, u1 = Vector((0, 0, cuts[j] - y0)), Vector((0, 0, cuts[j + 1] - y0))
                    self.face([pa + u0, pb + u0, pb + u1, pa + u1], mat, base, y0)
        self.face(T, mat, base)
        if fundo: self.face(B[::-1], mat, base)

    def tronco(self, cx, cz, y0, y1, r0, r1, n, cor, var=0.03):
        mat, base = self._cor(cor, var)
        A = [Vector((cx + math.cos(2 * math.pi * (i + 0.5) / n) * r0, -cz + math.sin(2 * math.pi * (i + 0.5) / n) * r0, y0)) for i in range(n)]
        Bt = [Vector((cx + math.cos(2 * math.pi * (i + 0.5) / n) * max(r1, 0.001), -cz + math.sin(2 * math.pi * (i + 0.5) / n) * max(r1, 0.001), y1)) for i in range(n)]
        for i in range(n):
            j = (i + 1) % n; self.face([A[i], A[j], Bt[j], Bt[i]], mat, base, y0)
        if r1 > 0.01: self.face(Bt, mat, base)

    def plano(self, pts, cor, uv=None):
        mat, base = self._cor(cor, 0.0)
        P = [Vector((x, -z, y)) for x, y, z in pts]
        nz = newell(P)
        if nz.z < -1e-6 and abs(nz.normalized().z) > 0.7: P = P[::-1]          # piso sempre para cima
        self.face(P, mat, base, min(p.z for p in P) if abs(newell(P).normalized().z) < 0.5 else None, uv)

    def porta(self, pts):
        """uma porta: a textura inteira numa face só (pts de baixo-esquerda, anti-horário)"""
        self.plano(pts, COR['porta'], uv=[(0, 0), (1, 0), (1, 1), (0, 1)])

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
    if n.z < -0.5: f = 0.72                                                   # embaixo dos beirais
    elif zb is not None: f = 0.74 + 0.26 * sm(0.0, 2.0, y - zb)               # o pé das paredes
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


def chao_textura(o, mat, T):
    """o chão em grade: uma textura, a UV pelo mundo, a cor de vértice só com a variação lenta de tom"""
    me = o.data; me.materials.clear(); me.materials.append(material(mat))
    ul = me.uv_layers.new(name='UVMap'); ca = me.color_attributes.get('Col') or me.color_attributes.new('Col', 'BYTE_COLOR', 'CORNER')
    for p in me.polygons:
        for li in p.loop_indices:
            q = me.vertices[me.loops[li].vertex_index].co; ul.data[li].uv = (q.x / T, q.y / T)
            t = 1.0 + 0.07 * noise.noise(Vector((q.x * 0.06, q.y * 0.06, 0.3))) + 0.04 * noise.noise(Vector((q.x * 0.25 + 3.3, q.y * 0.25, 0.0)))
            ca.data[li].color_srgb = (min(1, t), min(1, t * 0.99), min(1, t * 0.97), 1.0)
    me.color_attributes.active_color_name = 'Col'


CAIXAS = []
def bloqueia(x0, x1, z0, z1): CAIXAS.append([round(min(x0, x1), 2), round(max(x0, x1), 2), round(min(z0, z1), 2), round(max(z0, z1), 2)])
OCLUSORES = {}

# ---------------- o chão (grade de 1 m) ----------------
GX = [float(x) for x in range(int(X0), int(X1) + 1)]
GZ = [float(z) for z in range(int(Z0), int(Z1) + 1)]
bm = bmesh.new(); vs = []
for x in GX: vs.append([bm.verts.new((x, -z, altura(x, z))) for z in GZ])
for i in range(len(GX) - 1):
    for k in range(len(GZ) - 1):
        a, b, c, d = vs[i][k], vs[i + 1][k], vs[i + 1][k + 1], vs[i][k + 1]
        if (i + k) % 2 == 0: bm.faces.new((a, b, c)); bm.faces.new((a, c, d))
        else: bm.faces.new((a, b, d)); bm.faces.new((b, c, d))
bm.normal_update()
if sum(f.normal.z for f in bm.faces) < 0: bmesh.ops.reverse_faces(bm, faces=bm.faces[:])
me = bpy.data.meshes.new('Cidade_Chao_Fase'); bm.to_mesh(me); bm.free()
ca = me.color_attributes.new('Col', 'BYTE_COLOR', 'CORNER')
for p in me.polygons:
    c = p.center; x, z = c.x, -c.y
    if dist_rua(x, z) < 0.2 or any(dentro(r, x, z) for r in PRACAS):
        xi, zi = int(math.floor(x / 1.5)), int(math.floor(z / 1.5)); base = COR['lajes'] if (xi + zi) % 2 else COR['lajes2']
    else: base = COR['terra']
    col = tom(base, random.uniform(0.95, 1.04))
    for li in p.loop_indices: ca.data[li].color_srgb = col
chao = bpy.data.objects.new('Cidade_Chao_Fase', me); col_exp.objects.link(chao)
chao_textura(chao, 'terra', TILE['terra'])
# as ruas: uma faixa lisa ao longo de cada traçado (a borda acompanha a rua, não a grade); as praças, um tapete em grade
_vs, _fs = [], []
def fita(pts, w):
    A = []
    for (xa, za), (xb, zb) in zip(pts, pts[1:]):
        n = max(2, int(math.hypot(xb - xa, zb - za) / 0.6))
        for k in range(n): A.append((xa + (xb - xa) * k / n, za + (zb - za) * k / n))
    A.append(pts[-1]); prev = None
    for i, (x, z) in enumerate(A):
        xa, za = A[max(0, i - 1)]; xb, zb = A[min(len(A) - 1, i + 1)]
        L_ = math.hypot(xb - xa, zb - za) or 1.0; nx, nz = -(zb - za) / L_, (xb - xa) / L_
        row = []
        for s in (-1.0, -0.5, 0.0, 0.5, 1.0):
            px, pz = x + nx * w * s, z + nz * w * s; row.append(len(_vs)); _vs.append((px, -pz, altura(px, pz) + 0.06))
        if prev:
            for j in range(4): _fs.append((prev[j], prev[j + 1], row[j + 1], row[j]))
        prev = row
for pts, w in RUAS: fita(pts, w + 0.25)
for (x0, x1, z0, z1) in (XISTO, MERCADO):
    nx_, nz_ = max(1, round(x1 - x0)), max(1, round(z1 - z0)); b0 = len(_vs)
    for i in range(nx_ + 1):
        for j in range(nz_ + 1):
            px, pz = x0 + (x1 - x0) * i / nx_, z0 + (z1 - z0) * j / nz_; _vs.append((px, -pz, altura(px, pz) + 0.06))
    for i in range(nx_):
        for j in range(nz_):
            a = b0 + i * (nz_ + 1) + j; _fs.append((a, a + nz_ + 1, a + nz_ + 2, a + 1))
mr = bpy.data.meshes.new('Cidade_Ruas'); mr.from_pydata(_vs, [], _fs); mr.update()
_bm = bmesh.new(); _bm.from_mesh(mr)
for f_ in _bm.faces:
    if f_.normal.z < 0: f_.normal_flip()
_bm.to_mesh(mr); _bm.free(); mr.update()
ruas = bpy.data.objects.new('Cidade_Ruas', mr); col_exp.objects.link(ruas); chao_textura(ruas, 'lajes', TILE['lajes'])

# ---------------- as casas: ao longo das ruas, em quarteirões (cada quarteirão numa malha, que some se tapar a vista) ----------------
LIVRES = [XISTO, MERCADO, GABATA, (CAIFAS[0] - 2, CAIFAS[1] + 2, CAIFAS[2] - 2, CAIFAS[3] + 2), (CENACULO[0] - 3, CENACULO[1] + 3, CENACULO[2] - 3, CENACULO[3] + 3),
          (PX0 - 4, PX1 + 1.5, PZ0 - 4, PZ1 + 4), (GEN[0] - 8, GEN[0] + 8, GEN[1] - 2, GEN[1] + 8)]


def casa_livre(x0, x1, z0, z1):
    for r in LIVRES:
        if x1 > r[0] and x0 < r[1] and z1 > r[2] and z0 < r[3]: return False
    for x, z in ((x0, z0), (x1, z0), (x0, z1), (x1, z1), ((x0 + x1) / 2, (z0 + z1) / 2), ((x0 + x1) / 2, z0), ((x0 + x1) / 2, z1), (x0, (z0 + z1) / 2), (x1, (z0 + z1) / 2)):
        if dist_rua(x, z) < 0.6: return False
    return dentro((X0 + 4, X1 - 4, GEN[1] + 4.5, Z1 - 4), x0, z0) and dentro((X0 + 4, X1 - 4, GEN[1] + 4.5, Z1 - 4), x1, z1)


def casa(f, x0, x1, z0, z1, alto, cor, patio=False):
    y0 = min(altura(x0, z0), altura(x1, z1), altura(x0, z1), altura(x1, z0)) - 0.4
    yt = max(altura(x0, z0), altura(x1, z1), altura(x0, z1), altura(x1, z0)) + alto
    if patio:     # a casa de pátio: quatro alas em volta de um pátio aberto
        e = min(x1 - x0, z1 - z0) * 0.3
        for (a, b, c, d) in ((x0, x1, z0, z0 + e), (x0, x1, z1 - e, z1), (x0, x0 + e, z0 + e, z1 - e), (x1 - e, x1, z0 + e, z1 - e)): f.caixa(a, b, y0, yt, c, d, cor)
        f.plano([(x0 + e, y0 + 0.45, z0 + e), (x1 - e, y0 + 0.45, z0 + e), (x1 - e, y0 + 0.45, z1 - e), (x0 + e, y0 + 0.45, z1 - e)], tom(COR['lajes'], 0.95))
        for (a, b, c, d) in ((x0, x1, z0, z0 + e), (x0, x1, z1 - e, z1), (x0, x0 + e, z0 + e, z1 - e), (x1 - e, x1, z0 + e, z1 - e)):
            f.plano([(a, yt + 0.02, c), (b, yt + 0.02, c), (b, yt + 0.02, d), (a, yt + 0.02, d)], tom(COR[random.choice(('terraco', 'terraco2'))], random.uniform(0.94, 1.03)))
    else:
        f.caixa(x0, x1, y0, yt, z0, z1, cor)
        f.plano([(x0, yt + 0.02, z0), (x1, yt + 0.02, z0), (x1, yt + 0.02, z1), (x0, yt + 0.02, z1)], tom(COR[random.choice(('terraco', 'terraco2'))], random.uniform(0.94, 1.03)))      # o terraço
        if random.random() < 0.35: f.caixa(x0 + 0.5, x0 + (x1 - x0) * 0.5, yt, yt + 2.6, z0 + 0.5, z0 + (z1 - z0) * 0.5, tom(cor, 0.97))     # o quarto de cima
    for (a, b, c, d) in ((x0, x1, z0, z0 + 0.25), (x0, x1, z1 - 0.25, z1), (x0, x0 + 0.25, z0, z1), (x1 - 0.25, x1, z0, z1)):
        f.caixa(a, b, yt, yt + 0.55, c, d, tom(cor, 1.02))       # o parapeito do terraço (Dt 22.8)
    # as portas: para a rua mais perto
    lados = [((x0 + x1) / 2, z0 - 0.02, 'n'), ((x0 + x1) / 2, z1 + 0.02, 's'), (x0 - 0.02, (z0 + z1) / 2, 'o'), (x1 + 0.02, (z0 + z1) / 2, 'l')]
    px_, pz_, ld = min(lados, key=lambda t: dist_rua(t[0], t[1]))
    yd = altura(px_, pz_)
    if ld in 'ns': f.porta([(px_ - 0.55, yd, pz_), (px_ + 0.55, yd, pz_), (px_ + 0.55, yd + 2.0, pz_), (px_ - 0.55, yd + 2.0, pz_)])
    else: f.porta([(px_, yd, pz_ - 0.55), (px_, yd, pz_ + 0.55), (px_, yd + 2.0, pz_ + 0.55), (px_, yd + 2.0, pz_ - 0.55)])
    for k in range(random.randint(0, 2)):        # janelinhas altas
        wx = x0 + (x1 - x0) * random.uniform(0.25, 0.75); wy = yt - 1.4
        f.plano([(wx - 0.3, wy, z0 - 0.02), (wx + 0.3, wy, z0 - 0.02), (wx + 0.3, wy + 0.6, z0 - 0.02), (wx - 0.3, wy + 0.6, z0 - 0.02)], COR['escuro'])
    bloqueia(x0, x1, z0, z1)
    return yt


QUART = {}
n_casas = 0
# as casas prontas (modelos do usuário): (arquivo, nó, largura x, fundo; a frente olha para -y no Blender = +z no jogo)
MODELOS = [('casa-porta\\casa_porta.glb', 'Casa2', 7.24, 5.56, 1.2), ('casas\\casas_betfage.glb', 'Casa_Sobrado', 6.96, 6.94, 1.2),
           ('casas\\casa_cottage.glb', 'Casa_Cottage', 8.5, 8.38, 1.15), ('casas\\casa_ia_20k.glb', 'CasaIA_export', 8.46, 8.41, 1.15),
           ('casas\\casas_betfage.glb', 'Casa_Alcapao', 3.65, 3.81, 1.5), ('casas\\casas_betfage.glb', 'Casa_Varal', 3.69, 4.0, 1.5)]
PRONTAS, USO = [], {m[1]: 0 for m in MODELOS}
GIRO = {'s': 0.0, 'n': math.pi, 'l': math.pi / 2, 'o': -math.pi / 2}


def casa_pronta(x0, x1, z0, z1):
    """se o lote dá de frente para a rua, põe ali uma casa pronta (a que couber e foi menos usada)"""
    if len(PRONTAS) >= 16: return False
    lados = [((x0 + x1) / 2, z0 - 0.6, 'n'), ((x0 + x1) / 2, z1 + 0.6, 's'), (x0 - 0.6, (z0 + z1) / 2, 'o'), (x1 + 0.6, (z0 + z1) / 2, 'l')]
    px_, pz_, ld = min(lados, key=lambda t: dist_rua(t[0], t[1]))
    if dist_rua(px_, pz_) > 3.5: return False
    op = []
    for arq, no, w, d, kmax in MODELOS:
        fx, fz = (w, d) if ld in 'ns' else (d, w)
        k = min((x1 - x0) / fx, (z1 - z0) / fz, kmax)
        if k >= 0.82: op.append((USO[no] + random.random() * 0.5, arq, no, k, fx * k, fz * k))
    if not op: return False
    _, arq, no, k, lx, lz = min(op)
    cx, cz = (x0 + x1) / 2, (z0 + z1) / 2
    # encostada na rua: a frente do modelo na beira do lote do lado da rua
    if ld == 's': cz = z1 - lz / 2
    elif ld == 'n': cz = z0 + lz / 2
    elif ld == 'l': cx = x1 - lx / 2
    else: cx = x0 + lx / 2
    y = min(altura(cx + sx * lx / 2, cz + sz * lz / 2) for sx in (-1, 1) for sz in (-1, 1)) - 0.06
    PRONTAS.append((arq, no, cx, cz, GIRO[ld], k, y)); USO[no] += 1
    bloqueia(cx - lx / 2 + 0.15, cx + lx / 2 - 0.15, cz - lz / 2 + 0.15, cz + lz / 2 - 0.15)
    return True
for qi, (qx0, qz0) in enumerate([(x, z) for x in range(int(X0) + 4, int(X1) - 4, 16) for z in range(int(GEN[1]) + 5, int(Z1) - 4, 16)]):
    f = Formas(); ret = [1e9, -1e9, 1e9, -1e9, 0, 0]; feitas = 0
    x = qx0
    while x < qx0 + 16 - 4:
        z = qz0; lx = random.uniform(6.0, 9.0)
        while z < qz0 + 16 - 4:
            lz = random.uniform(6.0, 9.0); a, b, c, d = x + 0.4, min(qx0 + 16, x + lx) - 0.4, z + 0.4, min(qz0 + 16, z + lz) - 0.4
            if b - a > 3.5 and d - c > 3.5 and casa_livre(a, b, c, d) and random.random() < 0.8 and casa_pronta(a, b, c, d): pass
            elif b - a > 3.5 and d - c > 3.5 and casa_livre(a, b, c, d):
                yt = casa(f, a, b, c, d, random.uniform(4.0, 6.5), random.choice(CASAS), patio=(b - a > 7.5 and d - c > 7.5 and random.random() < 0.6))
                ret = [min(ret[0], a), max(ret[1], b), min(ret[2], c), max(ret[3], d), -1.0, max(ret[5], yt + 3.0)]; feitas += 1
            z += lz
        x += lx
    if feitas:
        nome = 'Bloco_%02d' % qi; f.cria(nome); OCLUSORES[nome] = [round(v, 2) for v in ret]; n_casas += feitas

# ---------------- o Xisto: uma praça calçada com colunas em volta ----------------
xi = Formas()
x0, x1, z0, z1 = XISTO; COLS = []
for (xa, za, xb, zb) in ((x0, z0, x1, z0), (x0, z1, x1, z1), (x1, z0, x1, z1)):
    L_ = math.hypot(xb - xa, zb - za); n = max(1, round(L_ / 3.0))
    for i in range(n + 1):
        x, z = xa + (xb - xa) * i / n, za + (zb - za) * i / n; y = altura(x, z)
        xi.caixa(x - 0.45, x + 0.45, y - 0.3, y + 0.25, z - 0.45, z + 0.45, tom(COR['coluna'], 0.94))
        xi.tronco(x, z, y + 0.25, y + 4.2, 0.3, 0.27, 10, COR['coluna'])
        xi.caixa(x - 0.5, x + 0.5, y + 4.2, y + 4.6, z - 0.5, z + 0.5, tom(COR['coluna'], 1.05)); COLS.append((x, z))
for (xa, za, xb, zb) in ((x0, z0, x1, z0), (x0, z1, x1, z1), (x1, z0, x1, z1)):
    y = max(altura(xa, za), altura(xb, zb)) + 4.6
    if abs(za - zb) < 1e-3: xi.caixa(min(xa, xb) - 0.5, max(xa, xb) + 0.5, y, y + 0.5, za - 0.5, za + 0.5, COR['coluna'])
    else: xi.caixa(xa - 0.5, xa + 0.5, y, y + 0.5, min(za, zb) - 0.5, max(za, zb) + 0.5, COR['coluna'])
xi.cria('Xisto')

# ---------------- o Pavimento (Gabatá) na frente do palácio: lajes grandes, com o tribunal ----------------
ga = Formas()
x0, x1, z0, z1 = GABATA; yg = max(altura(x, z) for x in (x0, x1) for z in (z0, z1)) + 0.15
ga.plano([(x0, yg, z0), (x1, yg, z0), (x1, yg, z1), (x0, yg, z1)], COR['lajesN'])
ga.caixa(x0 - 0.2, x1, yg - 1.5, yg, z0 - 0.2, z0, COR['muro2']); ga.caixa(x0 - 0.2, x1, yg - 1.5, yg, z1, z1 + 0.2, COR['muro2']); ga.caixa(x1, x1 + 0.2, yg - 1.5, yg, z0, z1, COR['muro2'])
ga.caixa(x0 + 0.5, x0 + 3.0, yg, yg + 1.2, (z0 + z1) / 2 - 1.5, (z0 + z1) / 2 + 1.5, COR['muro3'])           # o tribunal (bema), de onde se julgava
ga.caixa(x0 + 1.0, x0 + 2.2, yg + 1.2, yg + 2.1, (z0 + z1) / 2 - 0.5, (z0 + z1) / 2 + 0.5, COR['madeira'])   # a cadeira
ga.cria('Gabata')
bloqueia(x0 + 0.5, x0 + 3.0, (z0 + z1) / 2 - 1.5, (z0 + z1) / 2 + 1.5)

# ---------------- a casa do sumo sacerdote: a casa grande com o pátio, o portão e o braseiro ----------------
cf = Formas()
x0, x1, z0, z1 = CAIFAS; yc = min(altura(x, z) for x in (x0, x1) for z in (z0, z1)) - 0.3; ytc = yc + 7.5; e = 4.5
for (a, b, c, d) in ((x0, x1, z0, z0 + e), (x0, x1, z1 - e, z1), (x1 - e, x1, z0 + e, z1 - e)):
    cf.caixa(a, b, yc, ytc, c, d, COR['muro3']); bloqueia(a, b, c, d)
for (a, b, c, d) in ((x0, x0 + 1.2, z0 + e, (z0 + z1) / 2 - 1.6), (x0, x0 + 1.2, (z0 + z1) / 2 + 1.6, z1 - e)):      # o muro do portão (oeste)
    cf.caixa(a, b, yc, yc + 4.5, c, d, COR['muro2']); bloqueia(a, b, c, d)
for s in (-1, 1): cf.caixa(x0 - 0.1, x0 + 0.1, yc, yc + 3.4, (z0 + z1) / 2 + s * 1.6 - (0.0 if s > 0 else -0.0), (z0 + z1) / 2 + s * 1.6 + s * 0.05, COR['madeira'])
yp = max(altura(x, z) for x in (x0 + e, x1 - e) for z in (z0 + e, z1 - e))
cf.plano([(x0 + 1.2, yp + 0.05, z0 + e), (x1 - e, yp + 0.05, z0 + e), (x1 - e, yp + 0.05, z1 - e), (x0 + 1.2, yp + 0.05, z1 - e)], tom(COR['lajes'], 0.97))
for (a, b, c, d) in ((x0, x1, z0, z0 + 0.3), (x0, x1, z1 - 0.3, z1), (x1 - 0.3, x1, z0, z1)): cf.caixa(a, b, ytc, ytc + 0.6, c, d, COR['muro3'])
BRASEIRO = ((x0 + x1) / 2 - 1.0, (z0 + z1) / 2)        # o braseiro (Jo 18.18), no meio do pátio
bx_, bz_ = BRASEIRO
cf.tronco(bx_, bz_, yp, yp + 0.5, 0.55, 0.65, 10, COR['cinza']); cf.tronco(bx_, bz_, yp + 0.45, yp + 0.55, 0.5, 0.5, 10, COR['brasa'])
cf.plano([(x1 - e - 0.02, yp, (z0 + z1) / 2 - 0.7), (x1 - e - 0.02, yp, (z0 + z1) / 2 + 0.7), (x1 - e - 0.02, yp + 2.3, (z0 + z1) / 2 + 0.7), (x1 - e - 0.02, yp + 2.3, (z0 + z1) / 2 - 0.7)], COR['escuro'])
cf.cria('Casa_SumoSacerdote'); OCLUSORES['Casa_SumoSacerdote'] = [x0, x1, z0, z1, yc, ytc + 0.6]
bloqueia(bx_ - 0.7, bx_ + 0.7, bz_ - 0.7, bz_ + 0.7)

# ---------------- a casa da sala de cima: dois andares, a escada de fora e a porta fechada ----------------
cn = Formas()
x0, x1, z0, z1 = CENACULO; yn = min(altura(x, z) for x in (x0, x1) for z in (z0, z1)) - 0.3; ytn = yn + 8.0
cn.caixa(x0, x1, yn, ytn, z0, z1, COR['muro3']); bloqueia(x0, x1, z0, z1)
for (a, b, c, d) in ((x0, x1, z0, z0 + 0.3), (x0, x1, z1 - 0.3, z1), (x0, x0 + 0.3, z0, z1), (x1 - 0.3, x1, z0, z1)): cn.caixa(a, b, ytn, ytn + 0.6, c, d, COR['muro3'])
for i in range(12):     # a escada de fora, subindo junto à face norte, para a porta da sala de cima
    cn.caixa(x0 + 0.5 + i * 0.75, x0 + 1.25 + i * 0.75, yn, yn + (i + 1) * 0.36, z0 - 1.3, z0, tom(COR['muro2'], 1.0 + 0.02 * (i % 2)))
bloqueia(x0 + 0.5, x0 + 9.5, z0 - 1.3, z0)
cn.porta([(x0 + 9.6, yn + 4.3, z0 - 0.02), (x0 + 10.8, yn + 4.3, z0 - 0.02), (x0 + 10.8, yn + 6.4, z0 - 0.02), (x0 + 9.6, yn + 6.4, z0 - 0.02)])   # a porta de cima, fechada (Jo 20.19)
cn.porta([(x1 + 0.02, yn + 0.3, (z0 + z1) / 2 - 0.6), (x1 + 0.02, yn + 0.3, (z0 + z1) / 2 + 0.6), (x1 + 0.02, yn + 2.4, (z0 + z1) / 2 + 0.6), (x1 + 0.02, yn + 2.4, (z0 + z1) / 2 - 0.6)])      # a porta de baixo
for k in range(3): cn.plano([(x0 + 2 + k * 3.5, ytn - 2.4, z0 - 0.02), (x0 + 2.6 + k * 3.5, ytn - 2.4, z0 - 0.02), (x0 + 2.6 + k * 3.5, ytn - 1.6, z0 - 0.02), (x0 + 2 + k * 3.5, ytn - 1.6, z0 - 0.02)], COR['escuro'])
cn.cria('Casa_Cenaculo'); OCLUSORES['Casa_Cenaculo'] = [x0, x1, z0 - 1.3, z1, yn, ytn + 0.6]
PORTA_CEN = (x1 + 1.0, (z0 + z1) / 2)

# ---------------- peças dos kits: algumas barracas no mercado, jarros e cestos ----------------
PROTO = {}
def importa(arq):
    antes = set(bpy.data.objects)
    bpy.ops.import_scene.gltf(filepath=os.path.join(ROOT, arq))
    for o in [o for o in bpy.data.objects if o not in antes]:
        for c in list(o.users_collection): c.objects.unlink(o)
        col_proto.objects.link(o)
        if o.parent is None: PROTO[(arq, o.name.split('.')[0])] = o


for arq in ['casa-porta\\barracas.glb', 'casa-porta\\objetos_casa.glb', 'oliveiras\\oliveiras.glb', 'figueiras\\figueiras.glb'] + sorted(set(m[0] for m in MODELOS)): importa(arq)
col_proto.hide_render = True; col_proto.hide_viewport = True
bpy.context.view_layer.update()


def copia(o, col):
    n = o.copy(); col.objects.link(n)
    for c in o.children:
        cc = copia(c, col); cc.parent = n
    return n


ORDEM = [0]
def poe(arq, no, x, z, r=0.0, k=1.0, y=None, afunda=0.0):
    o = PROTO.get((arq.replace('/', '\\'), no))
    if o is None: print('FALTA', arq, no); return None
    if y is None: y = altura(x, z)
    n = copia(o, col_prev); n.location = (x, -z, y - afunda); n.rotation_mode = 'XYZ'
    rx, ry, rz = o.rotation_euler; n.rotation_euler = (rx, ry, rz + r)
    n.scale = tuple(s * k for s in o.scale)
    n['glb'] = arq.replace('\\', '/'); n['no'] = no
    n['r0'] = rz; n['k0'] = o.scale[0]; n['afunda'] = afunda; n['ordem'] = ORDEM[0]; ORDEM[0] += 1
    n['x0'], n['z0'] = x, z
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


for arq, no, cx, cz, r, k, y in PRONTAS: poe(arq, no, cx, cz, r, k, y=y)
print('PRONTAS', len(PRONTAS), USO)
x0, x1, z0, z1 = MERCADO
for i, no in enumerate(('Barraca3', 'Barraca7', 'Barraca1', 'Barraca9')):
    x = x0 + 2.0 + i * 4.2; n = poe('casa-porta\\barracas.glb', no, x, z1 - 1.5, math.pi, 1.0)
    if n is not None: circulo('COL_' + n.name, x, z1 - 1.5, 1.4, n)
for (x, z, no) in ((x0 + 3.5, z0 + 2.5, 'Jarro_Alto'), (x0 + 8.0, z0 + 2.2, 'Cesto_Oval'), (x0 + 12.5, z0 + 2.6, 'Saco'), (x1 - 2.0, z0 + 2.0, 'Pote_Escuro')):
    n = poe('casa-porta\\objetos_casa.glb', no, x, z, random.uniform(0, 6.28), 1.0)
    if n is not None: circulo('COL_' + n.name, x, z, 0.35, n)
# árvores nos pátios e nas praças (poucas: é uma cidade)
for (x, z, arq, no, k) in ((XISTO[0] + 4, XISTO[3] - 3, 'oliveiras\\oliveiras.glb', 'Oliveira3_Vaso', 1.0), ((CAIFAS[0] + CAIFAS[1]) / 2 + 3.0, (CAIFAS[2] + CAIFAS[3]) / 2 + 3.0, 'figueiras\\figueiras.glb', 'Figueira1_Jovem_ComFruta', 0.8),
                           (GABATA[1] - 1.5, GABATA[3] + 2.5, 'oliveiras\\oliveiras.glb', 'Oliveira1_Jovem', 0.9)):
    n = poe(arq, no, x, z, random.uniform(0, 6.28), k)
    if n is not None: circulo('COL_' + n.name, x, z, 0.45, n)

for i, (x, z) in enumerate(COLS): circulo('COL_Xisto_%d' % i, x, z, 0.4, bpy.data.objects['Xisto'], fixo=True)
# a colisão do que vem da maquete: o muro (com a Porta de Genat aberta), o palácio e as torres
for seg in MURO1:
    (xa, za), (xb, zb) = seg; bloqueia(xa, xb, min(za, zb) - 1.2, max(za, zb) + 1.2)
bloqueia(PX0, PX1, PZ0, PZ1)
for (a, b) in TORRES: bloqueia(a[0], b[0], a[1], b[1])

# ---------------- os lugares ----------------
empty_ref('JOGO_ponte', PONTE[0] - 1.0, PONTE[1] + 3.0, tam=2.0)           # de onde se chega do templo
empty_ref('JOGO_genat', GEN[0], GEN[1] + 3.0, tam=2.0)                     # a Porta de Genat (por dentro)
empty_ref('JOGO_xisto', (XISTO[0] + XISTO[1]) / 2, (XISTO[2] + XISTO[3]) / 2, tam=2.0)
empty_ref('JOGO_mercado', (MERCADO[0] + MERCADO[1]) / 2, (MERCADO[2] + MERCADO[3]) / 2, tam=2.0)
empty_ref('JOGO_gabata', (GABATA[0] + GABATA[1]) / 2, (GABATA[2] + GABATA[3]) / 2, y=yg, tam=2.0)
empty_ref('JOGO_braseiro', BRASEIRO[0], BRASEIRO[1], y=yp, tipo='SPHERE', tam=0.6)
empty_ref('JOGO_caifas', CAIFAS[0] - 1.5, (CAIFAS[2] + CAIFAS[3]) / 2, tam=2.0)     # o portão da casa
empty_ref('JOGO_cenaculo', PORTA_CEN[0], PORTA_CEN[1], tam=2.0)

ilumina_tudo()          # a luz suave pintada nas peças com textura
fixos = {'area': AREA, 'terreno': [X0, X1, Z0, Z1], 'mundo': [CW[0], H0, CW[1]], 'caixas': CAIXAS, 'muros': [], 'oclusores': OCLUSORES,
         'ruas': [[[round(x, 2), round(z, 2)] for x, z in pts] for pts, w in RUAS], 'cenaculo_r': list(CENACULO), 'caifas_r': list(CAIFAS), 'y_patio': round(yp, 3),
         'palacio': [PX0, PX1, PZ0, PZ1]}
t = bpy.data.texts.new('cidade_fixos'); t.write(json.dumps(fixos))
bt = bpy.data.texts.new('EXPORTAR_PARA_O_JOGO')
bt.write("# exporta o que está na cena para o jogo e salva o .blend\nRODAR_EXPORTACAO = True\nexec(open(r'" + os.path.join(OUT, 'exportar_cidade.py') + "', encoding='utf-8').read())\n")

try:
    antes = set(bpy.data.objects)
    bpy.ops.import_scene.gltf(filepath=os.path.join(ROOT, 'jerusalem', 'jerusalem_maquete.glb'))
    col_jer = colecao('Jerusalem_maquete_so_para_ver')
    for o in [o for o in bpy.data.objects if o not in antes]:
        for c in list(o.users_collection): c.objects.unlink(o)
        col_jer.objects.link(o)
        if o.parent is None: o.location = (o.location.x - CW[0], o.location.y + CW[1], o.location.z - H0)
        if o.name.startswith(('Casas_Cidade', 'Cidade_Chao', 'Arvores', 'Estradas')): o.hide_render = True; o.hide_set(True)
except Exception as e:
    print('sem maquete', e)

sol = bpy.data.lights.new('Sol', 'SUN'); sol.energy = 3.5; so_ = bpy.data.objects.new('Sol', sol); sc.collection.objects.link(so_); so_.rotation_euler = (math.radians(50), 0, math.radians(-110))
w = bpy.data.worlds.new('Ceu'); sc.world = w; w.use_nodes = True
bg = next(n for n in w.node_tree.nodes if n.type == 'BACKGROUND'); bg.inputs['Color'].default_value = (0.66, 0.77, 0.88, 1); bg.inputs['Strength'].default_value = 0.9
cam = bpy.data.cameras.new('Cam'); cam.lens = 24; co_ = bpy.data.objects.new('Cam', cam); sc.collection.objects.link(co_); sc.camera = co_
cam.clip_end = 1500
os.makedirs(OUT, exist_ok=True)
bpy.ops.wm.save_as_mainfile(filepath=BLEND)
print('FIM', len([o for o in bpy.data.objects if 'glb' in o]), 'objetos', n_casas, 'casas', len(CAIXAS), 'caixas', 'GEN', [round(v, 1) for v in GEN], 'PONTE', [round(v, 1) for v in PONTE], 'PAL', [round(v, 1) for v in (PX0, PX1, PZ0, PZ1)], 'H0 %.2f' % H0)
