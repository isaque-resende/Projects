# O templo (o pátio de fora até o Pátio de Israel): gera a fase no Blender e grava templo.blend. Depois, quem manda é
# o .blend: mexa nele e rode o texto EXPORTAR_PARA_O_JOGO (aba Scripting > Run Script).
#
# Uso (só para criar a fase do zero):
#   blender -b --factory-startup -P templo_blender.py -- [--regerar-tudo]
#
# Coordenadas da fase (three.js): x (leste), y (altura); o norte é -z. A origem é o centro da esplanada, no chão do
# Pátio dos Gentios (y = 0). O templo daqui tem escala própria (de RPG: ~90 x 120 m, bem menor que o real, ~300 x 480 m,
# mas bem maior que o da maquete); a maquete entra só como a cidade em volta, com o templo dela tirado.
#
# O lugar (Josefo, Guerras V.5 e Antiguidades XV.11; a Mishná, Middot; Mc 11.15-17; Jo 10.23; At 3.2, 21.27-40):
#   - a esplanada cercada de pórticos de colunas: ao sul a Estoa Real (a mais alta, de quatro fileiras), a leste o
#     Pórtico de Salomão, a norte e a oeste pórticos simples; a noroeste, a Fortaleza Antônia;
#   - no Pátio dos Gentios, junto à Estoa Real, o mercado: cambistas, vendedores de pombas, ovelhas e bois (Jo 2.14);
#   - a balaustrada (o soreg), com a inscrição que proibia a passagem dos gentios, e o terraço;
#   - a Porta Formosa (a leste) leva ao Pátio das Mulheres, com as quatro câmaras dos cantos;
#   - os quinze degraus em semicírculo, onde os levitas cantavam, sobem à Porta de Nicanor;
#   - o Pátio de Israel: até aqui vai um israelita; uma mureta baixa o separa do Pátio dos Sacerdotes, com o altar dos
#     holocaustos (a rampa ao sul), a pia de bronze, o lugar do sacrifício e, no alto de doze degraus, o santuário.
import bpy, bmesh, math, json, os, random, sys
from mathutils import Vector, Matrix

ROOT = r"M:\Claude\github\Projects-animais\assets-vila"
OUT = os.path.join(ROOT, 'fase-templo')
BLEND = os.path.join(OUT, 'templo.blend')
ARGV = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
if os.path.exists(BLEND) and '--regerar-tudo' not in ARGV:
    raise SystemExit('templo.blend já existe: abra-o e use EXPORTAR_PARA_O_JOGO. Para recriar do zero, rode com --regerar-tudo.')
random.seed(31)


def sm(e0, e1, x):
    k = (x - e0) / (e1 - e0); k = 0 if k < 0 else 1 if k > 1 else k
    return k * k * (3 - 2 * k)


exec(open(os.path.join(ROOT, 'jerusalem', 'relevo.py'), encoding='utf-8').read())
LUGW = json.load(open(os.path.join(ROOT, 'jerusalem', 'jerusalem_lugares.json'), encoding='utf-8'))
# o centro do templo da maquete (no plano velho, o meio de TX0..TX1, TZ0..TZ1) e a altura da esplanada dela
_cx, _cz = para_mundo(*encolhe((-311.0 - 161.0) / 2, (-203.0 + 22.0) / 2))
MUNDO = [round(_cx, 3), round(KY * 26.0, 3), round(_cz, 3)]

# ---------------- a planta (metros; x leste, z sul) ----------------
PX, PZ = 45.0, 60.0                 # a esplanada: x de -45 a 45, z de -60 a 60
PROF = 7.0                          # a fundura dos pórticos do norte, leste e oeste
SUL_I = 48.0                        # a face de dentro da Estoa Real (ao sul)
H_PORT = 8.0                        # a altura dos pórticos
TER = (-34.0, 30.0, -30.0, 18.0)    # o terraço (o chel), com a balaustrada na borda
Y_TER = 1.0
ENC = (-29.0, 25.0, -25.0, 13.0)    # o muro dos pátios de dentro
EIXO = -6.0                         # o eixo leste-oeste do santuário (z)
X_NIC = 10.0                        # o muro da Porta de Nicanor (entre o Pátio das Mulheres e o de Israel)
Y_MUL, Y_ISR, Y_SAC, Y_POR = 2.0, 4.5, 5.0, 7.5
X_GEDER = 4.0                       # a mureta entre o Pátio de Israel e o dos Sacerdotes
ALTAR = (-6.0, 3.0, -10.5, -1.5)    # x0, x1, z0, z1; 4 m de altura, a rampa ao sul
X_PORCH = -13.5                     # a fachada do santuário (de frente para o leste)
PORTA_N = (-14.0, -PZ)              # a porta do norte (Tadi), junto à Antônia
PORTA_O = (-PX, 4.0)                # a porta do oeste (para a cidade alta, pelo viaduto)
ABERT_SOREG = [('l', EIXO, 3.5), ('n', 0.0, 2.0), ('n', -16.0, 2.0), ('s', 0.0, 2.0), ('s', -16.0, 2.0), ('n', 18.0, 2.0)]   # (lado, posição, meia largura)
PORTA_FORMOSA = (ENC[1], EIXO, 2.2)
PORTA_MUL_N = (18.0, ENC[2], 1.8)   # a porta do norte do Pátio das Mulheres


def dentro(r, x, z, m=0.0): return r[0] + m < x < r[1] - m and r[2] + m < z < r[3] - m


def nivel(x, z):
    """a altura do chão (sem os objetos): o pátio de fora, o terraço, o Pátio das Mulheres, os degraus, Israel, os sacerdotes"""
    if not dentro(TER, x, z, -0.8): return 0.0
    h = Y_TER * sm(-0.8, 0.8, min(x - TER[0], TER[1] - x, z - TER[2], TER[3] - z))
    if dentro(ENC, x, z, -0.6):
        w = sm(-0.6, 0.6, min(x - ENC[0], ENC[1] - x, z - ENC[2], ENC[3] - z))
        if x > X_NIC:                                         # o Pátio das Mulheres, e os quinze degraus subindo para oeste
            hi = Y_MUL
            if abs(z - EIXO) < 5.5 and x < 15.5: hi = Y_MUL + (Y_ISR - Y_MUL) * min(1.0, (15.5 - x) / 4.8)
        elif x > X_GEDER: hi = Y_ISR
        elif x > X_PORCH: hi = Y_SAC          # os degraus do santuário são peças: o chão fica plano embaixo deles
        else: hi = Y_POR
        h = h + (hi - h) * w
    return h


# ---------------- cena ----------------
bpy.ops.wm.read_factory_settings(use_empty=True)
sc = bpy.context.scene
def colecao(nome):
    c = bpy.data.collections.new(nome); sc.collection.children.link(c); return c
col_exp, col_prev, col_ref, col_colis, col_proto = colecao('Exportar'), colecao('Cenario_objetos'), colecao('Referencia_jogo'), colecao('Colisao'), colecao('Prototipos')


# ---------------- materiais: as texturas do usuário (só cor) vezes a cor de vértice (a luz suave pintada) ----------------
# O jogo tem sol e sombras de verdade; a cor de vértice leva só o que ele não faz: a sombra de contato no pé dos muros e
# perto deles no chão, a sombra debaixo dos pórticos e uma variação lenta de tom (para a textura não repetir à vista).
from mathutils import noise
import numpy as np
TEXD = os.path.join(OUT, 'texturas'); TEXJ = os.path.join(TEXD, 'jogo')
TEXS = {'muro': ('muro_herodiano_v3.webp', 1024, 13.0), 'branco': ('muro_herodiano_v3.webp', 1024, 13.0), 'lajes': ('lajes_patio_v2.webp', 1024, 8.0),
        'altar': ('pedra_altar_v1.webp', 1024, 3.6), 'madeira': ('lenha_v1.webp', 512, 1.6), 'ouro': ('ouro_v2.webp', 512, 4.0),
        'cortina': ('cortina_v1.webp', 512, 5.5), 'chama': ('chama_v1.webp', 512, 1.0)}
TILE = {k: v[2] for k, v in TEXS.items()}
IMGS = {}


def prepara_texturas():
    os.makedirs(TEXJ, exist_ok=True)
    for k, (arq, lado, _) in TEXS.items():
        im = bpy.data.images.load(os.path.join(TEXD, 'originais', arq))
        w, h = im.size; px = np.array(im.pixels[:], dtype=np.float32).reshape(h, w, 4)
        if k == 'branco': px[:, :, :3] = px[:, :, :3] * 0.55 + np.array([0.45, 0.44, 0.41], dtype=np.float32)   # a pedra do santuário, "muito branca" (Josefo)
        if k == 'chama': px[:, :, 3] = np.clip((np.max(1.0 - px[:, :, :3], axis=2) - 0.05) / 0.10, 0, 1)      # tira o fundo branco
        out = bpy.data.images.new('tmp_' + k, w, h, alpha=True); out.pixels[:] = px.ravel(); out.scale(lado, lado)
        cam_ = os.path.join(TEXJ, k + '.png'); out.filepath_raw = cam_; out.file_format = 'PNG'; out.save()
        bpy.data.images.remove(im); bpy.data.images.remove(out)
        IMGS[k] = bpy.data.images.load(cam_); IMGS[k].name = 'Tex_' + k


prepara_texturas()
MATS = {}


def material(k):
    if k in MATS: return MATS[k]
    m = bpy.data.materials.new('Templo_' + k); m.use_nodes = True; nt = m.node_tree; nt.nodes.clear()
    out = nt.nodes.new('ShaderNodeOutputMaterial'); bs = nt.nodes.new('ShaderNodeBsdfPrincipled')
    ca = nt.nodes.new('ShaderNodeVertexColor'); ca.layer_name = 'Col'
    if k in IMGS:
        tx = nt.nodes.new('ShaderNodeTexImage'); tx.image = IMGS[k]
        mx = nt.nodes.new('ShaderNodeMix'); mx.data_type = 'RGBA'; mx.blend_type = 'MULTIPLY'; mx.inputs[0].default_value = 1.0
        nt.links.new(tx.outputs['Color'], mx.inputs[6]); nt.links.new(ca.outputs['Color'], mx.inputs[7]); nt.links.new(mx.outputs[2], bs.inputs['Base Color'])
        if k == 'chama':
            r = nt.nodes.new('ShaderNodeMath'); r.operation = 'ROUND'
            nt.links.new(tx.outputs['Alpha'], r.inputs[0]); nt.links.new(r.outputs[0], bs.inputs['Alpha'])
            try: m.surface_render_method = 'DITHERED'
            except Exception: pass
    else:
        nt.links.new(ca.outputs['Color'], bs.inputs['Base Color'])
    bs.inputs['Roughness'].default_value = 0.92
    nt.links.new(bs.outputs['BSDF'], out.inputs['Surface'])
    m.use_backface_culling = k != 'chama'
    MATS[k] = m
    return m


def hexc(h): return tuple(int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)) + (1.0,)


class Cor(tuple):
    """uma cor que sabe o seu material: 'liso' (só a cor de vértice) ou uma textura (e então a cor vira só um tom)"""
    mat = 'liso'; tint = (1.0, 1.0, 1.0)


def C(h, mat='liso', tint=(1.0, 1.0, 1.0)):
    c = Cor(hexc(h)); c.mat = mat; c.tint = tint; return c


def tom(c, k):
    n = Cor(tuple(min(1, v * k) for v in c[:3]) + (1,)); n.mat = getattr(c, 'mat', 'liso')
    n.tint = tuple(min(1.0, v * k) for v in getattr(c, 'tint', (1.0, 1.0, 1.0))); return n


COR = {'lajes': C('ddd2b8', 'lajes'), 'lajes2': C('d1c4a6', 'lajes', (0.95, 0.94, 0.92)), 'herod': C('dccaa6', 'muro'), 'claro': C('e9dfc8', 'branco'),
       'branco': C('f2ecdd', 'branco'), 'coluna': C('ebe2cc'), 'cedro': C('8d6a4c'), 'teto': C('b49a7a', 'lajes', (0.84, 0.80, 0.74)),
       'ouro': C('d8a640', 'ouro'), 'ouro2': C('b9862e', 'ouro', (0.80, 0.74, 0.66)), 'bronze': C('9a7038'),
       'escuro': C('2e2620'), 'pedra_altar': C('cdc3ad', 'altar'), 'verm': C('8e2f2a'), 'azul': C('3c4f86'), 'roxo': C('6a3a6e'), 'madeira': C('7a5634'),
       'pano': C('e8dcc0'), 'vime': C('c2a36c'), 'agua': C('5f8f8c'), 'antonia': C('c9b791', 'muro', (0.95, 0.90, 0.82))}


def uv_plano(p, n, T):
    if abs(n.z) > 0.7: return (p.x / T, p.y / T)
    t = Vector((-n.y, n.x, 0.0)); t = t.normalized() if t.length > 1e-6 else Vector((1.0, 0.0, 0.0))
    return (p.dot(t) / T, p.z / T)


def cortes_v(y0, y1):
    """as alturas onde a parede é cortada: mais juntas perto do pé (onde fica a sombra de contato)"""
    zs = [y0]
    for d in (0.5, 1.4, 2.8):
        if y0 + d < y1 - 0.2: zs.append(y0 + d)
    y = y0 + 6.8
    while y < y1 - 0.5: zs.append(y); y += 4.0
    zs.append(y1)
    return zs


REG = []        # (objeto, [(material, cor, pé, uv, luz)] na ordem dos polígonos): a luz é pintada no fim (ilumina_tudo)


class Formas:
    def __init__(self, esc=1.0): self.F = []; self.esc = esc          # esc: aumenta a textura (os muros enormes da plataforma)

    def face(self, pts, mat, base, zb=None, uv=None, luz=True):
        self.F.append(([Vector(p) for p in pts], mat, base, zb, uv, luz))

    def desloca(self, d):
        self.F = [([p + d for p in pts], m, b, (zb + d.z if zb is not None else None), uv, l) for (pts, m, b, zb, uv, l) in self.F]

    def _cor(self, cor, var):
        mat = getattr(cor, 'mat', 'liso'); k = 1 + random.uniform(-var, var)
        b = getattr(cor, 'tint', (1.0, 1.0, 1.0)) if mat != 'liso' else cor[:3]
        return mat, tuple(min(1.0, v * k) for v in b)

    def grade(self, a, b, c, d, mat, base, nu, ts, zb):
        P = lambda u, t: (a.lerp(b, u)).lerp(d.lerp(c, u), t)
        for i in range(nu):
            for j in range(len(ts) - 1):
                u0, u1, t0, t1 = i / nu, (i + 1) / nu, ts[j], ts[j + 1]
                self.face([P(u0, t0), P(u1, t0), P(u1, t1), P(u0, t1)], mat, base, zb)

    def caixa(self, x0, x1, y0, y1, z0, z1, cor, var=0.04, fundo=False, blocos=False):
        x0, x1 = min(x0, x1), max(x0, x1); z0, z1 = min(z0, z1), max(z0, z1)
        mat, base = self._cor(cor, var)
        V_ = lambda x, z, y: Vector((x, -z, y))
        B = [V_(x0, z1, y0), V_(x1, z1, y0), V_(x1, z0, y0), V_(x0, z0, y0)]          # anti-horário visto de cima
        T = [V_(x0, z1, y1), V_(x1, z1, y1), V_(x1, z0, y1), V_(x0, z0, y1)]
        ts = [(y - y0) / (y1 - y0) for y in cortes_v(y0, y1)] if y1 - y0 > 1e-6 else [0.0, 1.0]
        for k in range(4):
            a, b = B[k], B[(k + 1) % 4]; L = (b - a).length
            if L < 1e-6 or y1 - y0 < 1e-6: continue
            self.grade(a, b, T[(k + 1) % 4], T[k], mat, base, max(1, round(L / 3.0)), ts, y0)
        nu, nv = max(1, round((x1 - x0) / 4.0)), max(1, round((z1 - z0) / 4.0))
        self.grade(T[0], T[1], T[2], T[3], mat, base, nu, [j / nv for j in range(nv + 1)], None)
        if fundo: self.face([B[3], B[2], B[1], B[0]], mat, base)

    def fiadas(self, *a, **k): pass          # as juntas agora vêm da textura

    def tronco(self, cx, cz, y0, y1, r0, r1, n, cor, var=0.03):
        mat, base = self._cor(cor, var)
        A = [Vector((cx + math.cos(2 * math.pi * (i + 0.5) / n) * r0, -cz + math.sin(2 * math.pi * (i + 0.5) / n) * r0, y0)) for i in range(n)]
        Bt = [Vector((cx + math.cos(2 * math.pi * (i + 0.5) / n) * max(r1, 0.001), -cz + math.sin(2 * math.pi * (i + 0.5) / n) * max(r1, 0.001), y1)) for i in range(n)]
        for i in range(n):
            j = (i + 1) % n; self.face([A[i], A[j], Bt[j], Bt[i]], mat, base, y0)
        if r1 > 0.01: self.face(Bt, mat, base)

    def plano(self, pts, cor):
        mat, base = self._cor(cor, 0.0)
        self.face([Vector((x, -z, y)) for x, y, z in pts], mat, base)

    def cria(self, nome, dupla=False, origem=None, colecao=None):
        vmap, verts, faces, info = {}, [], [], []
        for (pts, mat, base, zb, uv, luz) in self.F:
            idx = []
            for p in pts:
                q = p - origem if origem is not None else p
                key = (round(q.x, 4), round(q.y, 4), round(q.z, 4))
                if key not in vmap: vmap[key] = len(verts); verts.append(key)
                idx.append(vmap[key])
            if len(set(idx)) != len(idx) or len(idx) < 3: continue
            faces.append(idx); info.append((mat, base, zb, uv, luz))
        me = bpy.data.meshes.new(nome); me.from_pydata(verts, [], faces); me.update()
        mats = sorted(set(i[0] for i in info))
        for m in mats: me.materials.append(material(m))
        for p in me.polygons: p.material_index = mats.index(info[p.index][0])
        o = bpy.data.objects.new(nome, me); (colecao or col_exp).objects.link(o)
        if origem is not None: o.location = origem
        REG.append((o, info, self.esc))
        return o


def debaixo_teto(x, z): return any(x0 < x < x1 and z0 < z < z1 for (x0, x1, z0, z1) in TETOS.values())


def dist_obst(x, z):
    d = min(PX - abs(x), PZ - abs(z))
    for (x0, x1, z0, z1) in CAIXAS:
        dx = max(x0 - x, 0.0, x - x1); dz = max(z0 - z, 0.0, z - z1)
        if dx < d and dz < d: d = min(d, math.hypot(dx, dz))
    for (cx, cz, r) in COLS:
        if abs(cx - x) < d + r and abs(cz - z) < d + r: d = min(d, max(0.0, math.hypot(cx - x, cz - z) - r))
    return d


def pinta(q, n, zb, b):
    x, z, y = q.x, -q.y, q.z
    f = 1.0
    if n.z < -0.5: f = 0.70                                         # embaixo de teto, de laje, de lintel
    elif n.z > 0.5:
        if y < nivel(x, z) + 0.8: f = 0.80 + 0.20 * sm(0.1, 1.8, dist_obst(x, z))      # o chão perto dos muros e das colunas
    elif zb is not None: f = 0.70 + 0.30 * sm(0.0, 2.4, y - zb)    # o pé das paredes
    if y < H_PORT - 0.3 and debaixo_teto(x, z): f *= 0.84          # a sombra dos pórticos
    t = 1.0 + 0.06 * noise.noise(Vector((x * 0.06, z * 0.06, y * 0.05))) + 0.035 * noise.noise(Vector((x * 0.27 + 7.1, z * 0.27, y * 0.2)))
    fr = 1.0 - f                                                    # na sombra, puxa para o violeta frio
    return tuple(min(1.0, b[i] * f * t * (1.0 + fr * (-0.06, -0.04, 0.10)[i])) for i in range(3))


def ilumina_tudo():
    for o, info, esc in REG:
        me = o.data; L = o.location.copy()
        ul = me.uv_layers.new(name='UVMap'); ca = me.color_attributes.new('Col', 'BYTE_COLOR', 'CORNER')
        cache = {}
        for p in me.polygons:
            mat, base, zb, uv, luz = info[p.index]; n = p.normal.copy()
            pts = [me.vertices[me.loops[li].vertex_index].co + L for li in p.loop_indices]
            fc = sum(pts, Vector()) / len(pts)
            for k, li in enumerate(p.loop_indices):
                q = pts[k]
                ul.data[li].uv = uv[k] if uv else (uv_plano(q, n, TILE[mat] * esc) if mat in TILE else (0.5, 0.5))
                b = base(q, fc) if callable(base) else base
                if luz:
                    chave = (me.loops[li].vertex_index, round(n.x, 2), round(n.y, 2), round(n.z, 2), zb, b) if not callable(base) else None
                    c = cache.get(chave) if chave else None
                    if c is None:
                        c = pinta(q, n, zb, b)
                        if chave: cache[chave] = c
                else: c = b
                ca.data[li].color_srgb = (c[0], c[1], c[2], 1.0)
        me.color_attributes.active_color_name = 'Col'


CAIXAS = []                         # colisão: [x0, x1, z0, z1]
COLS = []                           # colunas (círculos de colisão)
def bloqueia(x0, x1, z0, z1): CAIXAS.append([round(min(x0, x1), 2), round(max(x0, x1), 2), round(min(z0, z1), 2), round(max(z0, z1), 2)])


# ---------------- o chão da esplanada (grade de 1 m, com a textura das lajes) ----------------
GX = [float(x) for x in range(int(-PX), int(PX) + 1)]
GZ = [float(z) for z in range(int(-PZ), int(PZ) + 1)]
NV = {(x, z): nivel(x, z) for x in GX for z in GZ}
ch_ = Formas()
for i in range(len(GX) - 1):
    for k in range(len(GZ) - 1):
        x0, x1, z0, z1 = GX[i], GX[i + 1], GZ[k], GZ[k + 1]
        P = lambda x, z: Vector((x, -z, NV[(x, z)]))
        a, b, c, d = P(x0, z1), P(x1, z1), P(x1, z0), P(x0, z0)          # anti-horário visto de cima
        xm, zm = (x0 + x1) / 2, (z0 + z1) / 2
        base = (0.95, 0.94, 0.92) if dentro(ENC, xm, zm) and xm < X_GEDER else (1.0, 1.0, 1.0)
        if (i + k) % 2 == 0: ch_.face([a, b, c], 'lajes', base); ch_.face([a, c, d], 'lajes', base)
        else: ch_.face([a, b, d], 'lajes', base); ch_.face([b, c, d], 'lajes', base)
chao = ch_.cria('Templo_Chao')

# ---------------- a plataforma: os muros de fora (descem até o vale) e o parapeito ----------------
# cada lado numa malha (Lado_Norte...): o jogo deixa transparente o que tapar a vista da câmera (OCLUSORES)
OCLUSORES = {}
LADOS = {'Lado_Norte': (-PX - 2.5, PX + 2.5, -PZ - 2.5, -PZ), 'Lado_Sul': (-PX - 2.5, PX + 2.5, PZ, PZ + 2.5), 'Lado_Oeste': (-PX - 2.5, -PX, -PZ, PZ), 'Lado_Leste': (PX, PX + 2.5, -PZ, PZ)}
for nome, (x0, x1, z0, z1) in LADOS.items():
    pl = Formas(1.7); pl.caixa(x0, x1, -26.0, H_PORT + 1.5, z0, z1, COR['herod'], blocos=True)
    if nome in ('Lado_Norte', 'Lado_Sul'):        # pilastras na face de fora (como no muro de Herodes que ainda se vê)
        zz = (z0 - 0.4, z0) if nome == 'Lado_Norte' else (z1, z1 + 0.4)
        for x in [(-PX + 4 + i * 5.0) for i in range(int((2 * PX - 6) / 5.0) + 1)]: pl.caixa(x - 0.7, x + 0.7, 0.0, H_PORT + 1.0, zz[0], zz[1], tom(COR['herod'], 1.06))
    fx0, fx1, fz0, fz1 = {'Lado_Norte': (-PX, PX, -PZ, -PZ + 0.6), 'Lado_Sul': (-PX, PX, PZ - 0.6, PZ), 'Lado_Oeste': (-PX, -PX + 0.6, -PZ, PZ), 'Lado_Leste': (PX - 0.6, PX, -PZ, PZ)}[nome]
    pl.caixa(fx0, fx1, 0.0, H_PORT, fz0, fz1, tom(COR['herod'], 1.02))          # o muro do fundo do pórtico
    if nome == 'Lado_Norte': pl.plano([(PORTA_N[0] - 1.6, 0.0, -PZ + 0.62), (PORTA_N[0] + 1.6, 0.0, -PZ + 0.62), (PORTA_N[0] + 1.6, 4.2, -PZ + 0.62), (PORTA_N[0] - 1.6, 4.2, -PZ + 0.62)], COR['escuro'])
    if nome == 'Lado_Oeste': pl.plano([(-PX + 0.62, 0.0, PORTA_O[1] - 1.6), (-PX + 0.62, 0.0, PORTA_O[1] + 1.6), (-PX + 0.62, 4.2, PORTA_O[1] + 1.6), (-PX + 0.62, 4.2, PORTA_O[1] - 1.6)], COR['escuro'])
    pl.cria(nome); OCLUSORES[nome] = [min(x0, fx0), max(x1, fx1), min(z0, fz0), max(z1, fz1), -26.0, H_PORT + 1.5]

# ---------------- os pórticos: duas fileiras de colunas (quatro na Estoa Real) e os tetos de cedro ----------------
co = Formas()


def coluna(x, z, y0, alto, r=0.36):
    co.caixa(x - 0.55, x + 0.55, y0, y0 + 0.35, z - 0.55, z + 0.55, tom(COR['coluna'], 0.94))
    co.tronco(x, z, y0 + 0.35, y0 + alto - 0.45, r, r * 0.9, 10, COR['coluna'])
    co.caixa(x - 0.6, x + 0.6, y0 + alto - 0.45, y0 + alto, z - 0.6, z + 0.6, tom(COR['coluna'], 1.05))
    COLS.append((round(x, 2), round(z, 2), r + 0.12))


def fila(xa, za, xb, zb, y0, alto, passo=3.2, pula=None):
    L = math.hypot(xb - xa, zb - za); n = max(1, round(L / passo))
    for i in range(n + 1):
        x, z = xa + (xb - xa) * i / n, za + (zb - za) * i / n
        if pula and pula(x, z): continue
        coluna(x, z, y0, alto)


porta = lambda x, z: math.hypot(x - PORTA_N[0], z - PORTA_N[1]) < 3.5 or math.hypot(x - PORTA_O[0], z - PORTA_O[1]) < 3.5
I_N, I_L, I_O = -PZ + PROF, PX - PROF, -PX + PROF
fila(-PX + 1.0, I_N - 0.4, PX - 1.0, I_N - 0.4, 0, H_PORT); fila(-PX + 1.0, I_N - 3.6, PX - 1.0, I_N - 3.6, 0, H_PORT, pula=porta)         # norte
fila(I_L + 0.4, I_N, I_L + 0.4, SUL_I, 0, H_PORT); fila(I_L + 3.6, I_N, I_L + 3.6, SUL_I, 0, H_PORT)                                         # leste: o Pórtico de Salomão
fila(I_O - 0.4, I_N, I_O - 0.4, SUL_I, 0, H_PORT); fila(I_O - 3.6, I_N, I_O - 3.6, SUL_I, 0, H_PORT, pula=porta)                            # oeste
for k, zr in enumerate((SUL_I + 0.4, SUL_I + 3.4, SUL_I + 6.6, SUL_I + 9.6)):                                                               # a Estoa Real
    fila(-PX + 1.0, zr, PX - 1.0, zr, 0, H_PORT + (3.0 if k in (1, 2) else 0.0))
co.cria('Templo_Colunas')
TETOS = {'Teto_Norte': (-PX, PX, -PZ, I_N), 'Teto_Leste': (I_L, PX, I_N, SUL_I), 'Teto_Oeste': (-PX, I_O, I_N, SUL_I), 'Teto_Sul': (-PX, PX, SUL_I, PZ)}
for nome, (x0, x1, z0, z1) in TETOS.items():
    te = Formas(); y = H_PORT
    if nome == 'Teto_Sul':           # a Estoa Real: as naves dos lados e a do meio, mais alta (com janelas em cima)
        te.caixa(x0, x1, y, y + 0.6, z0 - 0.6, z0 + 3.0, COR['cedro'], fundo=True); te.caixa(x0, x1, y, y + 0.6, z1 - 3.0, z1, COR['cedro'], fundo=True)
        te.caixa(x0, x1, y + 3.0, y + 3.6, z0 + 2.4, z1 - 2.4, COR['cedro'], fundo=True)
        te.caixa(x0, x1, y + 0.6, y + 3.0, z0 + 2.6, z0 + 3.0, COR['claro']); te.caixa(x0, x1, y + 0.6, y + 3.0, z1 - 3.0, z1 - 2.6, COR['claro'])
        te.caixa(x0 - 0.2, x1 + 0.2, y + 0.6, y + 0.9, z0 - 0.8, z0 + 3.0, COR['teto']); te.caixa(x0 - 0.2, x1 + 0.2, y + 3.6, y + 3.9, z0 + 2.2, z1 - 2.2, COR['teto'])
    else:
        te.caixa(x0, x1, y, y + 0.6, z0, z1, COR['cedro'], fundo=True)
        te.caixa(x0 - 0.3 if x0 > -PX else x0, x1 + 0.3 if x1 < PX else x1, y + 0.6, y + 0.9, z0 - 0.3 if z0 > -PZ else z0, z1 + 0.3 if z1 < PZ else z1, COR['teto'])
    te.cria(nome); OCLUSORES[nome] = [x0, x1, z0, z1, H_PORT - 0.5, H_PORT + (4.0 if nome == 'Teto_Sul' else 1.0)]
# a colisão dos pórticos: as colunas (círculos, no layout) e a borda da esplanada (naArea, no jogo)

# ---------------- a Fortaleza Antônia (a noroeste, fora da esplanada; a escada desce para o pórtico, At 21.35) ----------------
an = Formas(1.5)
AX0, AX1, AZ0, AZ1 = -44.0, -18.0, -84.0, -PZ - 2.5
an.caixa(AX0, AX1, -20.0, 16.0, AZ0, AZ1, COR['antonia'], blocos=True)
for tx, tz, alto in ((AX0, AZ0, 24.0), (AX1 - 6, AZ0, 22.0), (AX0, AZ1 - 6, 22.0), (AX1 - 6, AZ1 - 6, 28.0)):
    an.caixa(tx - 0.5, tx + 6.5, -20.0, alto, tz - 0.5, tz + 6.5, tom(COR['antonia'], 1.04), blocos=True)
    for i in range(4): an.caixa(tx - 0.5 + i * 2.0, tx + 0.5 + i * 2.0, alto, alto + 1.2, tz - 0.5, tz + 0.5, COR['antonia'])
for i in range(5):     # a escada da Antônia para o teto do pórtico do norte
    an.caixa(-27.0, -24.0, H_PORT + 0.9, 16.0 - i * 1.4, AZ1 + i * 1.0, AZ1 + (i + 1) * 1.0, tom(COR['antonia'], 1.0 + 0.03 * (i % 2)))
an.cria('Fortaleza_Antonia_Templo')

# ---------------- a balaustrada (soreg), o terraço e a placa ----------------
so = Formas()
tx0, tx1, tz0, tz1 = TER


def aberta(lado, p):
    return any(l == lado and abs(p - c) < w for l, c, w in ABERT_SOREG)


def borda(lado, a0, a1, fixo):
    """a balaustrada ao longo de um lado do terraço, em trechos de 1 m, com as aberturas (e os três degraus)"""
    a = a0
    while a < a1 - 1e-3:
        b = min(a1, a + 1.0); m = (a + b) / 2
        if lado in 'ns': x0, x1, z0, z1 = a, b, fixo - 0.2, fixo + 0.2
        else: x0, x1, z0, z1 = fixo - 0.2, fixo + 0.2, a, b
        if aberta(lado, m):
            for i in range(3):         # os degraus
                d = 0.45 * (i + 1); y = Y_TER * (3 - i) / 3
                if lado == 'n': so.caixa(x0, x1, -0.3, y, fixo - d, fixo - d + 0.45, COR['lajes'])
                elif lado == 's': so.caixa(x0, x1, -0.3, y, fixo + d - 0.45, fixo + d, COR['lajes'])
                elif lado == 'l': so.caixa(fixo + d - 0.45, fixo + d, -0.3, y, z0, z1, COR['lajes'])
                else: so.caixa(fixo - d, fixo - d + 0.45, -0.3, y, z0, z1, COR['lajes'])
        else:
            so.caixa(x0, x1, -0.3, Y_TER + 0.05, z0, z1, tom(COR['herod'], 0.97))          # a borda do terraço
            so.caixa(x0 + 0.05, x1 - 0.05, Y_TER, Y_TER + 1.3, z0 + 0.05, z1 - 0.05, COR['claro'], var=0.02)     # a balaustrada
            bloqueia(x0, x1, z0, z1)
        a = b


borda('n', tx0, tx1, tz0); borda('s', tx0, tx1, tz1); borda('l', tz0, tz1, tx1); borda('o', tz0, tz1, tx0)
# a placa de aviso, ao lado da abertura do leste (Josefo; uma delas foi achada inteira, em grego)
so.caixa(tx1 + 0.3, tx1 + 0.45, Y_TER, Y_TER + 1.3, EIXO - 5.3, EIXO - 4.0, COR['branco'])
for i in range(5): so.caixa(tx1 + 0.45, tx1 + 0.47, Y_TER + 0.3 + i * 0.2, Y_TER + 0.33 + i * 0.2, EIXO - 5.2, EIXO - 4.1 - 0.12 * (i % 2), COR['verm'], var=0.0)
so.cria('Templo_Soreg')

# ---------------- o muro dos pátios de dentro, as portas e as câmaras ----------------
MUROS_F = {k: Formas() for k in ('Muro_Norte', 'Muro_Sul', 'Muro_Leste', 'Muro_Oeste', 'Muro_Nicanor', 'Camaras')}
mu = Formas()           # o que não tapa a vista: os degraus e a mureta
ex0, ex1, ez0, ez1 = ENC; E_ = 1.4; H_M = 11.0


def muro_x(z, xa, xb, y0, abert=(), f=None):
    """um muro ao longo de x (em z fixo), com aberturas [(centro, meia largura)]"""
    cortes = sorted([(c - w, c + w) for c, w in abert]); a = xa
    for c0, c1 in cortes + [(xb, xb)]:
        if c0 > a: f.caixa(a, c0, y0, y0 + H_M, z - E_ / 2, z + E_ / 2, COR['herod'], blocos=True); bloqueia(a, c0, z - E_ / 2, z + E_ / 2)
        a = max(a, c1)


def muro_z(x, za, zb, y0, abert=(), f=None):
    cortes = sorted([(c - w, c + w) for c, w in abert]); a = za
    for c0, c1 in cortes + [(zb, zb)]:
        if c0 > a: f.caixa(x - E_ / 2, x + E_ / 2, y0, y0 + H_M, a, c0, COR['herod'], blocos=True); bloqueia(x - E_ / 2, x + E_ / 2, a, c0)
        a = max(a, c1)


MF = MUROS_F
muro_x(ez0, ex0, ex1, Y_TER - 0.2, [(PORTA_MUL_N[0], PORTA_MUL_N[2])], MF['Muro_Norte']); muro_x(ez1, ex0, ex1, Y_TER - 0.2, f=MF['Muro_Sul'])
muro_z(ex1, ez0, ez1, Y_TER - 0.2, [(EIXO, PORTA_FORMOSA[2])], MF['Muro_Leste']); muro_z(ex0, ez0, ez1, Y_TER - 0.2, f=MF['Muro_Oeste'])
muro_z(X_NIC, ez0, ez1, Y_MUL - 0.2, [(EIXO, 2.6)], MF['Muro_Nicanor'])
# a Porta Formosa (bronze de Corinto) e a de Nicanor, mais alta; as portas abertas
for (gx, y0, alto, cor, g) in ((ex1, Y_TER, 14.0, COR['bronze'], MF['Muro_Leste']), (X_NIC, Y_MUL, 16.0, COR['ouro2'], MF['Muro_Nicanor'])):
    for s in (-1, 1): g.caixa(gx - 1.6, gx + 1.6, y0 - 0.2, y0 + alto, EIXO + s * 2.4, EIXO + s * 4.4, tom(COR['claro'], 1.02), blocos=True)
    g.caixa(gx - 1.6, gx + 1.6, y0 + 7.0, y0 + alto, EIXO - 2.4, EIXO + 2.4, tom(COR['claro'], 1.02))
    g.caixa(gx - 1.7, gx + 1.7, y0 + alto, y0 + alto + 0.6, EIXO - 4.6, EIXO + 4.6, COR['claro'])
    for s in (-1, 1): g.caixa(gx + 1.6 - 0.1, gx + 1.6 + 0.05, y0, y0 + 6.8, EIXO + s * 2.4 - s * 0.1, EIXO + s * 2.4 + s * 1.6, cor, var=0.02)     # as folhas, abertas
MF['Muro_Norte'].caixa(PORTA_MUL_N[0] - 1.8, PORTA_MUL_N[0] + 1.8, Y_TER + 5.0, Y_TER + H_M, ez0 - E_ / 2, ez0 + E_ / 2, COR['herod'])
# as quatro câmaras dos cantos do Pátio das Mulheres (dos nazireus, da lenha, dos leprosos e do azeite)
for (cx0, cx1, cz0, cz1) in ((X_NIC + E_ / 2, X_NIC + 5.5, ez0 + E_ / 2, ez0 + 5.5), (X_NIC + E_ / 2, X_NIC + 5.5, ez1 - 5.5, ez1 - E_ / 2),
                             (ex1 - 5.5, ex1 - E_ / 2, ez0 + E_ / 2, ez0 + 5.5), (ex1 - 5.5, ex1 - E_ / 2, ez1 - 5.5, ez1 - E_ / 2)):
    MF['Camaras'].caixa(cx0, cx1, Y_MUL - 0.1, Y_MUL + 6.0, cz0, cz1, tom(COR['herod'], 0.98), blocos=True); bloqueia(cx0, cx1, cz0, cz1)
# os quinze degraus em semicírculo, da Porta de Nicanor para baixo (os cânticos dos degraus)
for i in range(15):
    r0 = 1.6 + i * 0.32; y = Y_ISR - (i + 1) * (Y_ISR - Y_MUL) / 15
    mu.caixa(X_NIC + E_ / 2, X_NIC + E_ / 2 + r0, Y_MUL - 0.3, y, EIXO - 2.6 - i * 0.18, EIXO + 2.6 + i * 0.18, tom(COR['lajes'], 1.0 + 0.025 * (i % 2)))
# a mureta (geder) entre Israel e os sacerdotes: um israelita para aqui
mu.caixa(X_GEDER - 0.25, X_GEDER + 0.25, Y_SAC - 0.4, Y_SAC + 0.55, ez0 + E_ / 2, ez1 - E_ / 2, COR['claro'])
bloqueia(X_GEDER - 0.25, X_GEDER + 0.25, ez0, ez1)
bloqueia(ex0, X_GEDER - 0.25, ez0, ez1)                     # o Pátio dos Sacerdotes inteiro (o jogador não entra)
mu.cria('Templo_Patios')
for nome, f in MUROS_F.items(): f.cria(nome)
OCLUSORES.update({'Muro_Norte': [ex0, ex1, ez0 - 1, ez0 + 1, 0.0, Y_TER + H_M], 'Muro_Sul': [ex0, ex1, ez1 - 1, ez1 + 1, 0.0, Y_TER + H_M],
                  'Muro_Leste': [ex1 - 1.8, ex1 + 1.8, ez0, ez1, 0.0, Y_TER + 14.6], 'Muro_Oeste': [ex0 - 1, ex0 + 1, ez0, ez1, 0.0, Y_TER + H_M],
                  'Muro_Nicanor': [X_NIC - 1.8, X_NIC + 1.8, ez0, ez1, 0.0, Y_MUL + 16.6], 'Camaras': [X_NIC, ex1, ez0, ez1, Y_MUL, Y_MUL + 6.0]})

# ---------------- o Pátio dos Sacerdotes: o altar dos holocaustos, o fogo, a pia e o lugar do sacrifício ----------------
# O altar e o santuário são feitos em coordenadas do Blender (x leste, y norte, z para cima), cada um com a origem no seu
# lugar (o centro do altar; o meio da fachada), no chão do Pátio dos Sacerdotes. Fontes das medidas (reduzidas):
#   - o altar (Mishná, Middot 3.1-4): a base (yesod); o rebordo (sovev); os quatro chifres; a linha vermelha no meio da
#     altura; a rampa ao sul, sem degraus (Êx 20.26); as pedras brutas, não lavradas pelo ferro (Êx 20.25), caiadas.
#   - no alto (Tamid 2): a pilha grande da lenha a leste, a segunda pilha (as brasas do incenso), o monte de cinzas no meio.
#   - o santuário (Middot 3.6 e 4; Josefo, Guerras V.5.4): os doze degraus em lances, o pórtico sem portas, a parede de
#     dentro coberta de ouro, a cortina bordada (azul, linho, escarlate e púrpura: o céu) e a videira de ouro com cachos.
YA = Y_SAC + 3.6
OA = Vector(((ALTAR[0] + ALTAR[1]) / 2, -(ALTAR[2] + ALTAR[3]) / 2, Y_SAC))
OS_ = Vector((X_PORCH, -EIXO, Y_SAC))
def mixc(a, b, t): return tuple(a[i] + (b[i] - a[i]) * t for i in range(3))
def mulc(a, b): return tuple(min(1.0, a[i] * b[i]) for i in range(3))
def J(p, amp): return p if amp <= 0 else p + noise.noise_vector(p * 1.9) * amp * sm(0.0, 0.25, p.z)


def grade_s(F, a, b, c, d, mat, nu, cortes, base, zb=None, jit=0.0, luz=True):
    a, b, c, d = Vector(a), Vector(b), Vector(c), Vector(d)
    P = lambda u, t: J((a.lerp(b, u)).lerp(d.lerp(c, u), t), jit)
    for i in range(nu):
        for j in range(len(cortes) - 1):
            u0, u1, t0, t1 = i / nu, (i + 1) / nu, cortes[j], cortes[j + 1]
            F.face([P(u0, t0), P(u1, t0), P(u1, t1), P(u0, t1)], mat, base, zb, None, luz)


def cortes_em(z0, z1, passo, extras=()):
    zs = sorted(set([z0, z1] + [z for z in extras if z0 < z < z1])); out = [zs[0]]
    for z in zs[1:]:
        n = max(1, round((z - out[-1]) / passo)); b0 = out[-1]
        for k in range(1, n + 1): out.append(b0 + (z - b0) * k / n)
    return [(z - z0) / (z1 - z0) for z in out]


def bloco_s(F, x0, x1, y0, y1, z0, z1, mat, base, mat_topo=None, bat=0.0, ch=0.05, jit=0.0, passo=0.6, extras=(), fundo=False, lados=(1, 1, 1, 1), topo=True, luz=True):
    zt = z1 - ch; d1 = bat * (zt - z0); d2 = d1 + ch
    B = [Vector((x0, y0, z0)), Vector((x1, y0, z0)), Vector((x1, y1, z0)), Vector((x0, y1, z0))]
    def ins(p, d, z): return Vector((p.x + (d if p.x == x0 else -d), p.y + (d if p.y == y0 else -d), z))
    T1 = [ins(p, d1, zt) for p in B]; T2 = [ins(p, d2, z1) for p in B]
    for k in range(4):
        if not lados[k]: continue
        a, b = B[k], B[(k + 1) % 4]; nu = max(1, round((b - a).length / passo))
        grade_s(F, a, b, T1[(k + 1) % 4], T1[k], mat, nu, cortes_em(z0, zt, passo * 0.85, extras), base, z0, jit, luz)
        if ch > 0: grade_s(F, T1[k], T1[(k + 1) % 4], T2[(k + 1) % 4], T2[k], mat, nu, [0, 1], base, z0, jit, luz)
    if topo:
        a, b, c, d = T2; nu = max(1, round((b - a).length / passo)); nv = max(1, round((d - a).length / passo))
        grade_s(F, a, b, c, d, mat_topo or mat, nu, [j / nv for j in range(nv + 1)], base, None, jit, luz)
    if fundo: F.face([B[3], B[2], B[1], B[0]], mat, base, None, None, luz)


def prisma_s(F, a, b, r, lados, mat, base=(1, 1, 1), rot=0.0, r2=None, luz=True):
    a, b = Vector(a), Vector(b); ax = (b - a).normalized()
    u = ax.cross(Vector((0, 0, 1))) if abs(ax.z) < 0.9 else ax.cross(Vector((1, 0, 0))); u.normalize(); w = ax.cross(u)
    r2 = r if r2 is None else r2; T = TILE.get(mat, 1.0); L = (b - a).length
    A = [a + (u * math.cos(rot + 2 * math.pi * k / lados) + w * math.sin(rot + 2 * math.pi * k / lados)) * r for k in range(lados)]
    Bp = [b + (u * math.cos(rot + 2 * math.pi * k / lados) + w * math.sin(rot + 2 * math.pi * k / lados)) * r2 for k in range(lados)]
    for k in range(lados):
        k2 = (k + 1) % lados
        F.face([A[k2], Bp[k2], Bp[k], A[k]], mat, base, None, [(k2 / lados * 0.6, 0), (k2 / lados * 0.6, L / T), (k / lados * 0.6, L / T), (k / lados * 0.6, 0)], luz)   # o veio ao longo
    ponta = mulc(base, (1.12, 1.04, 0.92))
    F.face(A[::-1], mat, ponta, None, [(0.5 + 0.08 * math.cos(-2 * math.pi * k / lados), 0.5 + 0.08 * math.sin(-2 * math.pi * k / lados)) for k in range(lados)], luz)
    F.face(Bp, mat, ponta, None, [(0.5 + 0.08 * math.cos(2 * math.pi * k / lados), 0.5 + 0.08 * math.sin(2 * math.pi * k / lados)) for k in range(lados)], luz)


# ---- o altar (em coordenadas locais; depois vai para OA) ----
F_al = Formas()
def cor_altar_l(p, fc=None, rampa=False):
    c = (1.0, 1.0, 1.0)
    if fc is not None and not rampa and 1.92 <= fc.z <= 2.06 and max(abs(fc.x), abs(fc.y)) > 3.9: c = (0.74, 0.20, 0.16)   # a linha vermelha
    c = mixc(c, (0.60, 0.56, 0.52), 0.35 * sm(2.9, 3.6, p.z) if p.z <= 3.55 else 0.25)                                        # a fuligem
    if p.z > 3.55:                                           # as cinzas no alto, mais escuras perto do fogo
        dfogo = min(Vector((p.x - 1.7, p.y, 0)).length, Vector((p.x, p.y - 0.3, 0)).length)
        c = mixc(c, (0.45, 0.43, 0.41), 0.75 * sm(2.4, 0.6, dfogo))
    if p.z < 0.5: c = mixc(c, (0.80, 0.72, 0.68), 0.5 * sm(0.5, 0.0, p.z))      # o pé, onde o sangue era derramado (Lv 4.7)
    return c
cor_altar = lambda p, fc: cor_altar_l(p - OA, fc - OA)
cor_rampa = lambda p, fc: cor_altar_l(p - OA, fc - OA, True)
bloco_s(F_al, -4.5, 4.5, -4.5, 4.5, 0.0, 0.45, 'altar', cor_altar, ch=0.08, jit=0.025)                                   # a base (yesod)
bloco_s(F_al, -4.1, 4.1, -4.1, 4.1, 0.45, 2.4, 'altar', cor_altar, bat=0.02, ch=0.07, jit=0.03, extras=(1.92, 2.06))    # até o rebordo
bloco_s(F_al, -3.7, 3.7, -3.7, 3.7, 2.4, 3.6, 'altar', cor_altar, bat=0.02, ch=0.07, jit=0.03)
for sx in (-1, 1):                                            # os quatro chifres, um em cada canto, afinando para cima
    for sy in (-1, 1):
        cx, cy = sx * 3.28, sy * 3.28
        bloco_s(F_al, cx - 0.38, cx + 0.38, cy - 0.38, cy + 0.38, 3.6, 4.45, 'altar', lambda p, fc: mixc((1, 1, 1), (0.72, 0.68, 0.62), 0.25 * sm(3.6, 4.4, p.z - OA.z)), bat=0.22, ch=0.10, jit=0.015, passo=0.3)
# a rampa ao sul, sem degraus (Êx 20.26): sobe do chão até o alto, com um patamar curto junto ao altar
RY0, RYT, RY1 = -13.5, -4.5, -3.7
grade_s(F_al, (-1.7, RY0, 0), (1.7, RY0, 0), (1.7, RYT, 3.6), (-1.7, RYT, 3.6), 'altar', 5, [j / 14 for j in range(15)], cor_rampa, jit=0.02)
grade_s(F_al, (-1.7, RYT, 3.6), (1.7, RYT, 3.6), (1.7, RY1, 3.6), (-1.7, RY1, 3.6), 'altar', 5, [0, 1], cor_rampa, jit=0.0)
for sx in (-1.7, 1.7):
    a, b, c, d = Vector((sx, RY0, 0)), Vector((sx, RYT, 0)), Vector((sx, RYT, 3.6)), Vector((sx, RY0, 0.0))
    a2, b2, c2, d2 = Vector((sx, RYT, 0)), Vector((sx, RY1, 0)), Vector((sx, RY1, 3.6)), Vector((sx, RYT, 3.6))
    if sx > 0:
        grade_s(F_al, a, b, c, d, 'altar', 14, [0, 0.25, 0.5, 0.75, 1], cor_rampa, 0.0, 0.025); grade_s(F_al, a2, b2, c2, d2, 'altar', 1, [0, 0.25, 0.5, 0.75, 1], cor_rampa, 0.0, 0.025)
    else:
        grade_s(F_al, b, a, d, c, 'altar', 14, [0, 0.25, 0.5, 0.75, 1], cor_rampa, 0.0, 0.025); grade_s(F_al, b2, a2, d2, c2, 'altar', 1, [0, 0.25, 0.5, 0.75, 1], cor_rampa, 0.0, 0.025)
# o monte de cinzas no meio (o "tapuach")
def monte(F, cx, cy, z, r, h, n=10, cor=(0.66, 0.64, 0.61)):
    an = [2 * math.pi * k / n + random.uniform(-0.15, 0.15) for k in range(n)]
    rings = [[Vector((cx + math.cos(a) * r * f * random.uniform(0.9, 1.08), cy + math.sin(a) * r * f * random.uniform(0.9, 1.08), z + h * t)) for a in an] for f, t in ((1.0, 0.0), (0.7, 0.55), (0.32, 0.9))]
    for q in range(2):
        for k in range(n):
            k2 = (k + 1) % n; F.face([rings[q][k], rings[q][k2], rings[q + 1][k2], rings[q + 1][k]], 'liso', cor)
    top = Vector((cx, cy, z + h))
    for k in range(n): F.face([rings[-1][k], rings[-1][(k + 1) % n], top], 'liso', cor)
monte(F_al, 0.0, 0.3, 3.6, 1.1, 0.75)
# a lenha (figueira, nogueira, oliveira: Tamid 2.3), em fogueiras armadas em grade; as de baixo, mais queimadas
ZT = 3.6
def pilha(F, cx, cy, comp, camadas, n=4, r=0.11, queima=1.0):
    for k in range(camadas):
        z = ZT + r + k * 2 * r * 0.95
        for i in range(n):
            o = -comp * 0.38 + i * (comp * 0.76 / (n - 1)) + random.uniform(-0.05, 0.05)
            h = comp / 2 + random.uniform(-0.12, 0.12)
            cor = mixc((1.0, 1.0, 1.0), (0.36, 0.31, 0.30), 0.9 * queima * sm(camadas, 0, k + 0.5))
            a, b = ((cx - h, cy + o, z), (cx + h, cy + o, z)) if k % 2 == 0 else ((cx + o, cy - h, z), (cx + o, cy + h, z))
            prisma_s(F, a, b, r * random.uniform(0.85, 1.15), 6, 'madeira', cor, rot=random.uniform(0, 1))
pilha(F_al, 1.7, 0.0, 2.2, 6, n=5)          # a pilha grande, a leste
pilha(F_al, -1.7, -2.0, 1.3, 3, n=3)        # a segunda: as brasas para o incenso
pilha(F_al, -1.8, 2.1, 1.1, 2, n=3, queima=0.2)
F_al.desloca(OA); F_al.cria('Templo_Altar')
# as brasas (no jogo: sem luz, sempre acesas)
F_br = Formas()
for i in range(26):
    x, y = 1.7 + random.uniform(-0.9, 0.9), random.uniform(-0.9, 0.9); s = random.uniform(0.07, 0.14)
    bloco_s(F_br, x - s, x + s, y - s, y + s, ZT, ZT + s * 1.3, 'liso', mixc((1.0, 0.35, 0.06), (1.0, 0.75, 0.25), random.random()), ch=0.02, passo=1, luz=False)
for i in range(10):
    x, y = -1.7 + random.uniform(-0.5, 0.5), -2.0 + random.uniform(-0.5, 0.5); s = random.uniform(0.06, 0.1)
    bloco_s(F_br, x - s, x + s, y - s, y + s, ZT, ZT + s * 1.2, 'liso', (1.0, 0.45, 0.1), ch=0.02, passo=1, luz=False)
F_br.desloca(OA); F_br.cria('Altar_Brasas')
# o fogo: línguas facetadas (do miolo amarelo à ponta vermelha), cada uma um objeto com a origem no pé (o jogo as faz
# subir, balançar e mudar de altura), e alguns cartões com a chama recortada em volta
FOGO_C = [(1.0, 0.88, 0.42), (1.0, 0.60, 0.14), (0.94, 0.36, 0.08), (0.74, 0.16, 0.06)]
NF = [0]
def lingua(c, h, r, ang, curva, lados=6):
    c = Vector(c); dirc = Vector((math.cos(ang), math.sin(ang), 0)); an0 = random.uniform(0, 6.28); F = Formas(); aneis = []
    for t in (0.0, 0.18, 0.40, 0.62, 0.82):
        rr = r * (0.75 + 0.6 * math.sin(math.pi * min(1.0, t * 1.25))) * (1 - t) ** 0.7
        off = dirc * curva * h * t * t + Vector((0, 0, h * t))
        aneis.append([c + off + Vector((math.cos(an0 + 2 * math.pi * k / lados) * rr * random.uniform(0.85, 1.15), math.sin(an0 + 2 * math.pi * k / lados) * rr * random.uniform(0.85, 1.15), random.uniform(-0.04, 0.04) * h)) for k in range(lados)])
    ponta = c + dirc * curva * h * 1.05 + Vector((0, 0, h))
    def cor_t(p, fc, c=c, h=h):
        t = max(0.0, min(0.999, (p.z - c.z) / h)); i = min(2, int(t * 3)); return mixc(FOGO_C[i], FOGO_C[i + 1], t * 3 - i)
    for q in range(len(aneis) - 1):
        for k in range(lados):
            k2 = (k + 1) % lados; F.face([aneis[q][k], aneis[q][k2], aneis[q + 1][k2], aneis[q + 1][k]], 'liso', cor_t, None, None, False)
    for k in range(lados): F.face([aneis[-1][k], aneis[-1][(k + 1) % lados], ponta], 'liso', cor_t, None, None, False)
    F.cria('Altar_Fogo_%d' % NF[0], origem=c); NF[0] += 1
def cartao(c, w, h, ang):
    c = Vector(c); d = Vector((math.cos(ang), math.sin(ang), 0)) * (w / 2); F = Formas()
    F.face([c - d, c + d, c + d + Vector((0, 0, h)), c - d + Vector((0, 0, h))], 'chama', (1, 1, 1), None, [(0, 0), (1, 0), (1, 1), (0, 1)], False)
    F.cria('Altar_Chama_%d' % NF[0], origem=c); NF[0] += 1
for (dx, dy, h, r) in ((0, 0, 3.0, 0.55), (0.55, 0.45, 2.2, 0.42), (-0.6, -0.35, 2.4, 0.45), (0.45, -0.55, 1.8, 0.38), (-0.5, 0.55, 1.9, 0.38),
                       (0.0, 0.75, 1.3, 0.3), (0.8, -0.1, 1.4, 0.32), (-0.8, 0.1, 1.5, 0.32), (0.2, -0.8, 1.2, 0.28)):
    lingua(OA + Vector((1.7 + dx, dy, ZT + 0.2)), h, r, math.atan2(dy, dx) if (dx or dy) else 0.0, 0.18 + random.uniform(-0.05, 0.08))
for (dx, dy, h, w) in ((0.1, 0.05, 2.6, 1.6), (-0.3, 0.3, 1.9, 1.2), (0.4, -0.3, 1.8, 1.1)):
    a0_ = random.uniform(0, 3.14)
    for a_ in (a0_, a0_ + math.pi / 2): cartao(OA + Vector((1.7 + dx, dy, ZT + 0.3)), w, h, a_)
for (dx, dy, h, r) in ((0, 0, 0.9, 0.22), (0.25, 0.2, 0.6, 0.16), (-0.2, 0.15, 0.55, 0.15)):
    lingua(OA + Vector((-1.7 + dx, -2.0 + dy, ZT + 0.15)), h, r, 0.5, 0.15)

# a pia de bronze, ao sul, entre o altar e o santuário; o lugar do sacrifício, ao norte do altar (as argolas, as mesas, as colunas dos ganchos)
al = Formas()
PIA = (-7.5, 6.5)
al.tronco(PIA[0], PIA[1], Y_SAC, Y_SAC + 1.0, 0.9, 0.7, 12, COR['bronze']); al.tronco(PIA[0], PIA[1], Y_SAC + 1.0, Y_SAC + 1.6, 1.3, 1.5, 12, COR['bronze'])
al.plano([(PIA[0] + math.cos(2 * math.pi * i / 12) * 1.35, Y_SAC + 1.55, PIA[1] - math.sin(2 * math.pi * i / 12) * 1.35) for i in range(12)], COR['agua'])
a0, a1, b0, b1 = ALTAR
for i in range(6):
    for j in range(2): al.tronco(a0 + 0.8 + i * 1.4, b0 - 3.0 - j * 2.0, Y_SAC, Y_SAC + 0.08, 0.3, 0.3, 8, COR['bronze'])
for i in range(3): al.caixa(a0 + 1.0 + i * 3.0, a0 + 2.6 + i * 3.0, Y_SAC, Y_SAC + 0.9, b0 - 8.4, b0 - 7.6, COR['claro'])
for i in range(4): al.tronco(a0 + 0.5 + i * 2.8, b0 - 10.0, Y_SAC, Y_SAC + 2.4, 0.18, 0.18, 6, COR['pedra_altar'])
al.cria('Templo_Sacrificio')

# ---------------- o santuário (em coordenadas locais; depois vai para OS_: o meio da fachada, no chão do pátio) ----------------
F_sa = Formas()
FX, YP = 0.0, Y_POR - Y_SAC; H = YP + 22.0; YD = 10.3
# os doze degraus (Middot 3.6), em quatro lances de três, com um patamar entre os lances, e as muretas escalonadas
x_, h_ = FX, YP
for g in range(4):
    for k in range(3):
        h_ -= YP / 12
        bloco_s(F_sa, x_, x_ + 0.32, -YD, YD, 0.0, h_, 'branco', (0.98, 0.97, 0.94), ch=0.04, passo=2.6, lados=(0, 1, 0, 0))
        for (ya, yb) in ((-11.0, -YD), (YD, 11.0)): bloco_s(F_sa, x_, x_ + 0.32, ya, yb, 0.0, h_ + 0.85, 'branco', (0.96, 0.95, 0.92), ch=0.06, passo=1.0)
        x_ += 0.32
    if g < 3:
        bloco_s(F_sa, x_, x_ + 0.55, -YD, YD, 0.0, h_, 'branco', (0.98, 0.97, 0.94), ch=0.04, passo=2.6, lados=(0, 1, 0, 0))
        for (ya, yb) in ((-11.0, -YD), (YD, 11.0)): bloco_s(F_sa, x_, x_ + 0.55, ya, yb, 0.0, h_ + 0.85, 'branco', (0.96, 0.95, 0.92), ch=0.06, passo=1.0)
        x_ += 0.55
bloco_s(F_sa, FX - 4.0, FX, -11.0, 11.0, 0.0, YP, 'lajes', (1, 1, 1), ch=0.0, passo=1.5)          # o piso do pórtico
bloco_s(F_sa, FX - 17.0, FX - 4.0, -6.8, 6.8, 0.0, YP, 'branco', (0.96, 0.95, 0.92), ch=0.0, passo=2.0)    # o embasamento do corpo
cor_mu = lambda p, fc: mixc((1, 1, 1), (0.88, 0.86, 0.82), 0.25 * sm(8, 0, p.z - OS_.z - YP))
bloco_s(F_sa, FX - 4.0, FX, -11.0, -3.2, YP, H, 'branco', cor_mu, ch=0.0, passo=1.5, jit=0.01)         # as duas alas do pórtico
bloco_s(F_sa, FX - 4.0, FX, 3.2, 11.0, YP, H, 'branco', cor_mu, ch=0.0, passo=1.5, jit=0.01)
bloco_s(F_sa, FX - 4.0, FX, -3.2, 3.2, YP + 14.0, H, 'branco', cor_mu, ch=0.0, passo=1.5, fundo=True, jit=0.01)   # sobre a abertura, sem portas
bloco_s(F_sa, FX - 17.0, FX - 4.0, -6.5, 6.5, YP, YP + 18.0, 'branco', cor_mu, ch=0.0, passo=2.0)        # o corpo: o Santo Lugar e o Santo dos Santos
bloco_s(F_sa, FX - 17.3, FX - 3.7, -6.8, 6.8, YP + 18.0, YP + 18.6, 'ouro', (1, 1, 1), ch=0.1, passo=2.0)
OURO, OURO2 = (1.0, 1.0, 1.0), (0.74, 0.68, 0.60)
for y in (-9.0, -5.6, 5.6, 9.0):                              # as meias-colunas com capitel de ouro
    bloco_s(F_sa, FX, FX + 0.55, y - 0.65, y + 0.65, YP, YP + 19.4, 'branco', cor_mu, ch=0.06, passo=1.2, jit=0.008)
    bloco_s(F_sa, FX - 0.05, FX + 0.85, y - 0.95, y + 0.95, YP + 19.4, YP + 20.3, 'ouro', OURO, bat=-0.15, ch=0.12, passo=1)
    bloco_s(F_sa, FX - 0.05, FX + 0.75, y - 0.85, y + 0.85, YP, YP + 0.5, 'branco', cor_mu, ch=0.08, passo=1.2)
bloco_s(F_sa, FX - 4.3, FX + 0.6, -11.4, 11.4, H - 0.2, H + 0.7, 'ouro', OURO, ch=0.15, passo=2)       # a cornija dourada
for i in range(19):                                            # as pontas de ouro no alto (Middot 4.6: contra as aves)
    y = -10.4 + i * (20.8 / 18); prisma_s(F_sa, (FX - 0.6, y, H + 0.7), (FX - 0.6, y, H + 1.9), 0.11, 4, 'ouro', OURO, r2=0.01)
# dentro do pórtico: a parede coberta de ouro e a porta do Santo Lugar, com a cortina
XI = FX - 3.0
for (ya, yb, za, zb) in ((-3.2, -2.5, YP, YP + 14), (2.5, 3.2, YP, YP + 14), (-2.5, 2.5, YP + 10.6, YP + 14)):
    F_sa.face([(XI, yb, zb), (XI, ya, zb), (XI, ya, za), (XI, yb, za)], 'ouro', OURO)
AZUL, LINHO, ESC, PURP, OUROC = (0.17, 0.22, 0.50), (0.88, 0.84, 0.74), (0.66, 0.15, 0.13), (0.34, 0.16, 0.40), (0.90, 0.72, 0.34)
FAIXAS = [(0.0, 0.05, ESC), (0.05, 0.075, OUROC), (0.075, 0.10, LINHO), (0.30, 0.33, ESC), (0.33, 0.345, OUROC), (0.62, 0.65, PURP), (0.65, 0.665, OUROC),
          (0.88, 0.905, LINHO), (0.905, 0.93, OUROC), (0.93, 1.0, ESC)]
CZ = sorted(set([0.0, 1.0] + [a for a, b, c in FAIXAS] + [b for a, b, c in FAIXAS] + [k / 10 for k in range(11)]))
TC = TILE['cortina']
for k in range(18):
    y0, y1 = -2.5 + 5.0 * k / 18, -2.5 + 5.0 * (k + 1) / 18
    x0, x1 = XI + 0.05 + (0.13 if k % 2 else 0.0), XI + 0.05 + (0.0 if k % 2 else 0.13)
    for j in range(len(CZ) - 1):
        ta, tb = CZ[j], CZ[j + 1]; za, zb = YP + ta * 10.4, YP + tb * 10.4; tm = (ta + tb) / 2
        c2 = next((c for a, b, c in FAIXAS if a <= tm < b), None)
        pts = [(x1, y1, zb), (x0, y0, zb), (x0, y0, za), (x1, y1, za)]
        if c2 is None: F_sa.face(pts, 'cortina', (1, 1, 1), None, [(y1 / TC, zb / TC), (y0 / TC, zb / TC), (y0 / TC, za / TC), (y1 / TC, za / TC)])
        else: F_sa.face(pts, 'liso', c2)
prisma_s(F_sa, (XI + 0.12, -2.7, YP + 10.5), (XI + 0.12, 2.7, YP + 10.5), 0.09, 6, 'ouro', OURO)     # a vara
# a videira de ouro sobre a porta de dentro, com os cachos pendurados (Josefo, Guerras V.5.4)
XV = XI + 0.25
vp = [Vector((XV, -3.0 + 6.0 * i / 24, YP + 11.6 + 0.28 * math.sin(i * 0.9))) for i in range(25)]
for i in range(24): prisma_s(F_sa, vp[i], vp[i + 1], 0.08, 5, 'ouro', OURO2)
def folha(F, c, s, ang):
    c = Vector(c); pts_ = []
    for k in range(7):
        a = math.pi * k / 6; r = s * (1.0 if k % 2 == 0 else 0.62)
        pts_.append(c + Vector((0.05 * math.sin(a), math.cos(a + ang) * r, math.sin(a + ang) * r + s * 0.2)))
    F.face(pts_ + [c], 'ouro', OURO); F.face((pts_ + [c])[::-1], 'ouro', OURO)
for i in range(1, 24, 2): folha(F_sa, vp[i] + Vector((0.04, 0, 0.05)), 0.42, random.uniform(-0.4, 0.4))
def cacho(F, c, n=10):
    c = Vector(c)
    for k in range(n):
        f = k / n; z = c.z - 0.1 - f * 0.7; r = 0.2 * (1 - f) + 0.05
        a = k * 2.4; p = Vector((c.x + 0.08, c.y + math.cos(a) * r, z + math.sin(a) * 0.03))
        prisma_s(F, p - Vector((0.07, 0, 0)), p + Vector((0.07, 0, 0)), 0.08, 5, 'ouro', mixc(OURO, OURO2, 0.5 * (k % 2)))
    prisma_s(F, c, c - Vector((0, 0, 0.14)), 0.03, 4, 'ouro', OURO2)
for i in range(3, 24, 4): cacho(F_sa, vp[i])
F_sa.desloca(OS_); F_sa.cria('Templo_Santuario')

# ---------------- o mercado no Pátio dos Gentios, junto à Estoa Real ----------------
me_ = Formas()
CAMBIO = [(-24.0 + i * 3.4, 29.0) for i in range(6)]          # as mesas dos cambistas
for (x, z) in CAMBIO:
    me_.caixa(x - 1.0, x + 1.0, 0.0, 0.85, z - 0.5, z + 0.5, COR['madeira'])
    me_.caixa(x - 0.95, x + 0.95, 0.85, 0.88, z - 0.45, z + 0.45, COR['roxo'], var=0.0)
    for k in range(3): me_.tronco(x - 0.6 + k * 0.5, z, 0.88, 0.94 + 0.04 * k, 0.12, 0.12, 8, COR['ouro'] if k % 2 else hexc('a7a7a2'))
    CIRC_M = None
GAIOLAS = (5.0, 13.0, 27.5, 30.0)                              # as gaiolas das pombas, empilhadas
for i in range(5):
    x = GAIOLAS[0] + i * 1.6
    for j in range(1 + (i % 3)): me_.caixa(x, x + 1.4, j * 0.75, j * 0.75 + 0.7, GAIOLAS[2], GAIOLAS[2] + 1.0, COR['vime'], var=0.06)
CURRAL_OV = (16.0, 25.0, 23.0, 31.0)
CURRAL_BOI = (27.0, 36.0, 23.0, 32.0)
for (x0, x1, z0, z1) in (CURRAL_OV, CURRAL_BOI):
    for (xa, za, xb, zb) in ((x0, z0, x1, z0), (x1, z0, x1, z1), (x0, z1, x1, z1), (x0, z0, x0, z1)):
        if abs(za - zb) < 1e-3: me_.caixa(min(xa, xb), max(xa, xb), 0.55, 0.75, za - 0.06, za + 0.06, COR['madeira'])
        else: me_.caixa(xa - 0.06, xa + 0.06, 0.55, 0.75, min(za, zb), max(za, zb), COR['madeira'])
    for x in (x0, x1):
        for z in (z0, z1): me_.caixa(x - 0.12, x + 0.12, 0.0, 1.0, z - 0.12, z + 0.12, COR['madeira'])
    me_.caixa(x0 + 0.8, x0 + 2.4, 0.0, 0.5, z0 + 0.8, z0 + 1.4, tom(COR['claro'], 0.9))      # o cocho
me_.cria('Templo_Mercado')
CERCAS = []
for (x0, x1, z0, z1) in (CURRAL_OV, CURRAL_BOI):
    CERCAS += [[x0, z0, x1, z0], [x1, z0, x1, z1], [x0, z1, x1, z1], [x0, z0, x0, z1]]
for (x, z) in CAMBIO: bloqueia(x - 1.0, x + 1.0, z - 0.5, z + 0.5)
bloqueia(GAIOLAS[0], GAIOLAS[0] + 8.0, GAIOLAS[2], GAIOLAS[2] + 1.0)

# ---------------- peças dos kits: as nove barracas, cestos e jarros ----------------
PROTO = {}
def importa(arq):
    antes = set(bpy.data.objects)
    bpy.ops.import_scene.gltf(filepath=os.path.join(ROOT, arq))
    novos = [o for o in bpy.data.objects if o not in antes]
    for o in novos:
        for c in list(o.users_collection): c.objects.unlink(o)
        col_proto.objects.link(o)
        if o.parent is None: PROTO[(arq, o.name.split('.')[0])] = o
    return novos


for arq in ['casa-porta\\barracas.glb', 'casa-porta\\objetos_casa.glb']: importa(arq)
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
    if y is None: y = nivel(x, z)
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
    e.matrix_world = Matrix.Translation((x, -z, (nivel(x, z) if y is None else y) + 0.2)) @ Matrix.Rotation(math.pi / 2, 4, 'X') @ Matrix.Diagonal((r, r, r, 1))
    if fixo: e['fixo'] = 1
    if dono is not None:
        e['dono'] = 1; e.parent = dono; e.matrix_parent_inverse = dono.matrix_world.inverted()
        dono['col_feita'] = dono.name
    return e


def empty_ref(nome, x, z, y=None, r=0.0, tipo='SINGLE_ARROW', tam=1.5):
    e = bpy.data.objects.new(nome, None); col_ref.objects.link(e)
    e.empty_display_type = tipo; e.empty_display_size = tam; e.show_in_front = True
    e.location = (x, -z, nivel(x, z) if y is None else y); e.rotation_euler = (0, 0, r)
    return e


# as nove barracas, em duas fileiras na frente da Estoa Real, com a frente para o norte (para o pátio)
BARRACAS = []
for i in range(9):
    linha = i // 5; x = -26.0 + (i % 5) * 6.0 + (3.0 if linha else 0.0); z = 36.0 + linha * 6.0
    n = poe('casa-porta\\barracas.glb', 'Barraca%d' % (i + 1), x, z, math.pi, 1.0)
    if n is not None: circulo('COL_' + n.name, x, z, 1.5, n)
    BARRACAS.append([x, z])
for (x, z, no) in ((-20.0, 33.5, 'Cesto_Oval'), (-14.0, 33.6, 'Jarro_Alto'), (-8.0, 33.4, 'Saco'), (-2.0, 33.5, 'Cesto_Raso'), (4.0, 33.6, 'Jarra_Alca'), (-17.0, 39.6, 'Pote_Escuro')):
    n = poe('casa-porta\\objetos_casa.glb', no, x, z, random.uniform(0, 6.28), 1.0)
    if n is not None: circulo('COL_' + n.name, x, z, 0.35, n)

# colisão das colunas: círculos fixos, presos à malha das colunas
colunas = bpy.data.objects['Templo_Colunas']
for i, (x, z, r) in enumerate(COLS): circulo('COL_Col_%d' % i, x, z, r, colunas, y=0.0, fixo=True)

# ---------------- os lugares ----------------
empty_ref('JOGO_norte', PORTA_N[0], PORTA_N[1] + 3.0, r=math.pi, tam=2.0)          # a porta do norte (Tadi): vem de Betesda
empty_ref('JOGO_oeste', PORTA_O[0] + 3.0, PORTA_O[1], r=-math.pi / 2, tam=2.0)       # a porta do oeste: para a cidade alta
empty_ref('JOGO_formosa', PORTA_FORMOSA[0] + 2.5, EIXO, tam=2.0)
empty_ref('JOGO_nicanor', X_NIC + 1.0, EIXO, y=Y_ISR, tam=2.0)
empty_ref('JOGO_israel', 7.0, EIXO, y=Y_ISR, tam=2.0)                              # de onde se vê o altar e o santuário
empty_ref('JOGO_altar', (ALTAR[0] + ALTAR[1]) / 2 + 1.7, (ALTAR[2] + ALTAR[3]) / 2, y=YA + 0.3, tipo='SPHERE', tam=0.8)     # o fogo da pilha grande
empty_ref('JOGO_soreg', TER[1] + 2.0, EIXO - 4.6, tam=1.5)                           # a placa de aviso
empty_ref('JOGO_salomao', I_L + 2.0, -4.0, tam=2.0)                                 # o Pórtico de Salomão
empty_ref('JOGO_mercado', -6.0, 31.0, tam=2.0)

ilumina_tudo()          # a luz suave pintada em tudo, agora que os muros, as colunas e os tetos existem
fixos = {'oclusores': OCLUSORES, 'area': [-PX + 1.0, PX - 1.0, -PZ + 1.0, PZ - 1.0], 'terreno': [-PX - 3, PX + 3, -PZ - 3, PZ + 3], 'mundo': MUNDO, 'caixas': CAIXAS,
         'muros': CERCAS, 'tetos': {k: list(v) for k, v in TETOS.items()}, 'h_port': H_PORT, 'eixo': EIXO,
         'niveis': {'terraco': Y_TER, 'mulheres': Y_MUL, 'israel': Y_ISR, 'sacerdotes': Y_SAC, 'porch': Y_POR}, 'ter': list(TER), 'enc': list(ENC),
         'x_nic': X_NIC, 'x_geder': X_GEDER, 'x_porch': X_PORCH, 'altar_r': list(ALTAR), 'y_altar': YA,
         'curral_ov': list(CURRAL_OV), 'curral_boi': list(CURRAL_BOI), 'gaiolas': list(GAIOLAS), 'cambio': CAMBIO, 'barracas': BARRACAS}
t = bpy.data.texts.new('templo_fixos'); t.write(json.dumps(fixos))
bt = bpy.data.texts.new('EXPORTAR_PARA_O_JOGO')
bt.write("# exporta o que está na cena para o jogo e salva o .blend\nRODAR_EXPORTACAO = True\nexec(open(r'" + os.path.join(OUT, 'exportar_templo.py') + "', encoding='utf-8').read())\n")

# a maquete (a cidade em volta), deslocada, só para ver no Blender
try:
    antes = set(bpy.data.objects)
    bpy.ops.import_scene.gltf(filepath=os.path.join(ROOT, 'jerusalem', 'jerusalem_maquete.glb'))
    col_jer = colecao('Jerusalem_maquete_so_para_ver')
    for o in [o for o in bpy.data.objects if o not in antes]:
        for c in list(o.users_collection): c.objects.unlink(o)
        col_jer.objects.link(o)
        if o.parent is None: o.location = (o.location.x - MUNDO[0], o.location.y + MUNDO[2], o.location.z - MUNDO[1])
        if o.name.startswith(('Templo_Muros', 'Santuario', 'Porticos', 'Mercado_Templo', 'Fortaleza_Antonia', 'Tanques')): o.hide_render = True; o.hide_set(True)
except Exception as e:
    print('sem maquete', e)

sol = bpy.data.lights.new('Sol', 'SUN'); sol.energy = 3.5; so_ = bpy.data.objects.new('Sol', sol); sc.collection.objects.link(so_); so_.rotation_euler = (math.radians(50), 0, math.radians(-110))
w = bpy.data.worlds.new('Ceu'); sc.world = w; w.use_nodes = True
bg = next(n for n in w.node_tree.nodes if n.type == 'BACKGROUND'); bg.inputs['Color'].default_value = (0.66, 0.77, 0.88, 1); bg.inputs['Strength'].default_value = 0.9
cam = bpy.data.cameras.new('Cam'); cam.lens = 24; co_ = bpy.data.objects.new('Cam', cam); sc.collection.objects.link(co_); sc.camera = co_
cam.clip_end = 1500
os.makedirs(OUT, exist_ok=True)
bpy.ops.wm.save_as_mainfile(filepath=BLEND)
print('FIM', len([o for o in bpy.data.objects if 'glb' in o]), 'objetos', len(COLS), 'colunas', len(CAIXAS), 'caixas', 'MUNDO', MUNDO)
