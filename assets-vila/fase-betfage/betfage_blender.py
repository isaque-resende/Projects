# Betfagé: modela a fase (terreno com socalcos, estrada, muros) e posiciona os assets como no diorama de referência.
# Coordenadas da fase em (a, b): a = rumo ao canto direito, b = rumo ao canto esquerdo; (0,0) = canto da frente.
# Mundo three.js: x = S/2 - b*S, z = S/2 - a*S, y = altura.  Blender: (x, -z, y).
import bpy, bmesh, mathutils, math, json, os, random, sys
from mathutils import Vector
from mathutils.kdtree import KDTree

ROOT = r"M:\Claude\github\Projects-animais\assets-vila"
OUT = ROOT + r"\fase-betfage"
SCR = r"C:\Users\isaqu\AppData\Local\Temp\claude\956e92763068254c\f51927a9-9486-4ab8-a8f5-2b0632db0d38\scratchpad"
RENDER = '--render' in sys.argv
EXPORT = '--export' in sys.argv
random.seed(7)

S = 22.0
def xz(a, b): return (S / 2 - b * S, S / 2 - a * S)
def ab(x, z): return ((S / 2 - z) / S, (S / 2 - x) / S)
def sm(e0, e1, x):
    k = (x - e0) / (e1 - e0); k = 0 if k < 0 else 1 if k > 1 else k
    return k * k * (3 - 2 * k)

# ---------------- layout ----------------
ESTRADA_AB = [(-0.6, -0.3), (-0.15, -0.02), (0.03, 0.06), (0.19, 0.08), (0.30, 0.16), (0.34, 0.30), (0.28, 0.46), (0.24, 0.60), (0.32, 0.76),
              (0.55, 0.86), (0.78, 0.94), (0.97, 1.0), (1.2, 1.1), (1.7, 1.35)]
ESTRADA = [xz(a, b) for a, b in ESTRADA_AB]
MEIA = 1.5                                           # meia largura da estrada
CASAS = [((0.535, 0.50), 0.0), ((0.715, 0.50), 0.0), ((0.525, 0.265), 0.0), ((0.705, 0.265), 0.0)]   # (a,b), rot
KCASA = (0.64, 0.85, 0.64)
CAMPO_AB = (0.81, 0.99, 0.08, 0.46)                    # a0,a1,b0,b1
EIRA_AB = (0.05, 0.72); EIRA_R = 2.4
FIGSECA_AB = (0.17, 0.38)

# curva da estrada amostrada
pts = [Vector((x, z, 0)) for x, z in ESTRADA]
def catmull(p0, p1, p2, p3, t):
    t2, t3 = t * t, t * t * t
    return 0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (-p0 + 3 * p1 - 3 * p2 + p3) * t3)
AMOS = []
for i in range(len(pts) - 1):
    p0 = pts[max(0, i - 1)]; p1 = pts[i]; p2 = pts[i + 1]; p3 = pts[min(len(pts) - 1, i + 2)]
    n = max(4, int((p2 - p1).length / 0.4))
    for k in range(n): AMOS.append(catmull(p0, p1, p2, p3, k / n))
AMOS.append(pts[-1])
KD = KDTree(len(AMOS))
for i, p in enumerate(AMOS): KD.insert(Vector((p.x, p.y, 0)), i)
KD.balance()
def dist_estrada(x, z):
    co, i, d = KD.find(Vector((x, z, 0))); return d, i

def h_base(x, z):
    a, b = ab(x, z); s = (a + b) / 2; d = a - b
    if s < 0: h = 2.0 * s
    elif s <= 1: h = 12.0 * s ** 1.25
    elif s <= 1.3: h = 12.0 + 15.0 * (s - 1) - 25.0 * (s - 1) ** 2      # passa do alto da subida e vira um espigão largo
    else: h = 14.25 - 2.5 * (s - 1.3)                                   # do outro lado o monte desce devagar (rumo a Jerusalém)
    dc = max(-1.3, min(1.3, d)); h -= 3.2 * dc * dc + 2.0 * (abs(d) - abs(dc))   # para os lados a encosta continua, sem cair
    h += 0.18 * math.sin(x * 0.37 + 1.1) * math.cos(z * 0.31 - 0.4) + 0.08 * math.sin(x * 0.9 + z * 0.7)
    return max(h, -3.0 + 0.4 * math.sin(x * 0.2) * math.cos(z * 0.23))

# altura da estrada: base suavizada ao longo do eixo
HR = [h_base(p.x, p.y) for p in AMOS]
for _ in range(25): HR = [HR[0]] + [(HR[i - 1] + 2 * HR[i] + HR[i + 1]) / 4 for i in range(1, len(HR) - 1)] + [HR[-1]]

P_T = 1.9
PADS = []
def pad_rect(x, z, hx, hz, f, y): PADS.append(('r', x, z, hx, hz, f, y))
def pad_circ(x, z, r, f, y): PADS.append(('c', x, z, r, 0, f, y))

def h_socalco(x, z):
    h = h_base(x, z); a, b = ab(x, z); s = (a + b) / 2
    d, i = dist_estrada(x, z)
    m = sm(0.40, 0.48, s) * sm(MEIA + 0.4, MEIA + 1.4, d)
    if m > 0:
        f = h / P_T; fl = math.floor(f); t = P_T * (fl + sm(0.8, 1.0, f - fl)); h = h + (t - h) * m
    return h

# plataformas: casas (em degraus), eira, trigal, carroça
HCASA = []
for (a, b), r in CASAS:
    x, z = xz(a, b); y = round(h_base(x, z) / 0.5) * 0.5; HCASA.append(y)
    pad_rect(x, z, 7.24 * KCASA[0] / 2 + 0.7, 5.56 * KCASA[2] / 2 + 0.9, 2.2, y)
ex, ez = xz(*EIRA_AB); HEIRA = h_socalco(ex, ez); pad_circ(ex, ez, EIRA_R + 0.9, 2.6, HEIRA)
a0, a1, b0, b1 = CAMPO_AB
cx0, cz1 = xz(a0, b0); cx1, cz0 = xz(a1, b1)
CAMPO = (min(cx0, cx1), max(cx0, cx1), min(cz0, cz1), max(cz0, cz1))
ccx, ccz = (CAMPO[0] + CAMPO[1]) / 2, (CAMPO[2] + CAMPO[3]) / 2
HCAMPO = h_base(ccx, ccz) - 0.3
pad_rect(ccx, ccz, (CAMPO[1] - CAMPO[0]) / 2 + 0.6, (CAMPO[3] - CAMPO[2]) / 2 + 0.6, 2.4, HCAMPO)
CARRO_AB = (0.74, 0.03); crx, crz = xz(*CARRO_AB); HCARRO = h_base(crx, crz); pad_rect(crx, crz, 2.6, 2.2, 1.8, HCARRO)

def altura(x, z):
    h = h_socalco(x, z)
    d, i = dist_estrada(x, z)
    w = 1 - sm(MEIA + 0.2, MEIA + 2.2, d)
    if w > 0: h += (HR[i] - h) * w
    for t, px, pz, p1, p2, f, y in PADS:
        dd = max(0, math.hypot(x - px, z - pz) - p1) if t == 'c' else math.hypot(max(0, abs(x - px) - p1), max(0, abs(z - pz) - p2))
        w = 1 - sm(0, f, dd)
        if w > 0: h += (y - h) * w
    return h

# ---------------- cena ----------------
bpy.ops.wm.read_factory_settings(use_empty=True)
sc = bpy.context.scene
col_exp = bpy.data.collections.new('Exportar'); sc.collection.children.link(col_exp)
col_prev = bpy.data.collections.new('Previa'); sc.collection.children.link(col_prev)
col_proto = bpy.data.collections.new('Prototipos'); sc.collection.children.link(col_proto)

def mat_vc(nome):
    m = bpy.data.materials.new(nome); m.use_nodes = True
    nt = m.node_tree; bs = next(n for n in nt.nodes if n.type == 'BSDF_PRINCIPLED')
    ca = nt.nodes.new('ShaderNodeAttribute'); ca.attribute_name = 'Col'
    nt.links.new(ca.outputs['Color'], bs.inputs['Base Color'])
    bs.inputs['Roughness'].default_value = 1.0
    if 'Specular IOR Level' in bs.inputs: bs.inputs['Specular IOR Level'].default_value = 0.1
    return m

def hexc(h): return tuple(int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)) + (1.0,)
COR = {'grama': hexc('a9b46a'), 'grama2': hexc('9caa5f'), 'seca': hexc('c2bd7c'), 'barranco': hexc('c4a774'), 'areia': hexc('e6cf9c'),
       'campo': hexc('c8a86a'), 'eira': hexc('e3cc98')}

# terreno
EXT, PASSO = 56.0, 0.7
N = int(EXT * 2 / PASSO)
bm = bmesh.new()
vs = []
for i in range(N + 1):
    linha = []
    for k in range(N + 1):
        x = -EXT + i * PASSO; z = -EXT + k * PASSO
        linha.append(bm.verts.new((x, -z, altura(x, z))))
    vs.append(linha)
for i in range(N):
    for k in range(N):
        a, b, c, d = vs[i][k], vs[i + 1][k], vs[i + 1][k + 1], vs[i][k + 1]
        # diagonal alternada: facetado mais natural
        if (i + k) % 2 == 0: bm.faces.new((a, b, c)); bm.faces.new((a, c, d))
        else: bm.faces.new((a, b, d)); bm.faces.new((b, c, d))
bmesh.ops.reverse_faces(bm, faces=bm.faces[:])
me = bpy.data.meshes.new('Betfage_Terreno'); bm.to_mesh(me); bm.free()
ca = me.color_attributes.new('Col', 'BYTE_COLOR', 'CORNER')
def ruido(x, z): return 0.5 + 0.5 * math.sin(x * 0.21 + 3.1) * math.cos(z * 0.17 + 1.3) * 0.6 + 0.2 * math.sin(x * 0.05 - z * 0.07)
for p in me.polygons:
    c = p.center; x, z = c.x, -c.y
    n = p.normal
    d, _ = dist_estrada(x, z)
    if d < MEIA + 0.4: col = COR['areia']
    elif math.hypot(x - ex, z - ez) < EIRA_R + 1.0: col = COR['eira']
    elif CAMPO[0] - 0.3 < x < CAMPO[1] + 0.3 and CAMPO[2] - 0.3 < z < CAMPO[3] + 0.3: col = COR['campo']
    elif abs(n.z) < 0.5: col = COR['barranco']
    elif abs(n.z) < 0.75: col = COR['grama2']
    else:
        r = ruido(x, z); j = random.random() * 0.05
        base = COR['grama'] if r < 0.55 else COR['grama2'] if r < 0.75 else COR['seca']
        col = tuple(min(1, v * (0.97 + j)) for v in base[:3]) + (1,)
    for li in p.loop_indices: ca.data[li].color_srgb = col if hasattr(ca.data[li], 'color_srgb') else col
terr = bpy.data.objects.new('Betfage_Terreno', me); col_exp.objects.link(terr)
for p in me.polygons: p.use_smooth = False
terr.data.materials.append(mat_vc('Terreno'))

# estrada: faixa colada no relevo
bm = bmesh.new(); prev = None
L = len(AMOS)
for i, p in enumerate(AMOS):
    q = AMOS[min(L - 1, i + 1)] - AMOS[max(0, i - 1)]; q.z = 0; q.normalize()
    nx, nz = -q.y, q.x
    w = MEIA * (0.95 + 0.06 * math.sin(i * 0.15))
    row = []
    for j in range(5):
        s = -1 + j / 2; x = p.x + nx * w * s; z = p.y + nz * w * s
        row.append(bm.verts.new((x, -z, altura(x, z) + 0.04)))
    if prev:
        for j in range(4): bm.faces.new((prev[j], prev[j + 1], row[j + 1], row[j]))
    prev = row
bm.normal_update()
if sum(f.normal.z for f in bm.faces) < 0: bmesh.ops.reverse_faces(bm, faces=bm.faces[:])
me = bpy.data.meshes.new('Betfage_Estrada'); bm.to_mesh(me); bm.free()
ca = me.color_attributes.new('Col', 'BYTE_COLOR', 'CORNER')
for p in me.polygons:
    v = 0.97 + random.random() * 0.04
    for li in p.loop_indices: ca.data[li].color_srgb = tuple(c * v for c in COR['areia'][:3]) + (1,)
estr = bpy.data.objects.new('Betfage_Estrada', me); col_exp.objects.link(estr); estr.data.materials.append(mat_vc('Estrada'))

# ---------------- assets ----------------
PROTO = {}
def importa(arq):
    antes = set(bpy.data.objects)
    bpy.ops.import_scene.gltf(filepath=ROOT + '\\' + arq)
    novos = [o for o in bpy.data.objects if o not in antes]
    for o in novos:
        for c in list(o.users_collection): c.objects.unlink(o)
        col_proto.objects.link(o)
        if o.parent is None:
            o.location = (0, 0, 0); PROTO[(arq, o.name.split('.')[0])] = o
    return novos

LAYOUT = []        # para o jogo: {glb, no, p, r, k}
def copia(o, col):
    n = o.copy(); col.objects.link(n)
    for c in o.children:
        cc = copia(c, col); cc.parent = n
    return n
def poe(arq, no, x, z, r=0.0, k=1.0, y=None, afunda=0.05, exporta=False, jogo=True):
    o = PROTO.get((arq, no))
    if o is None: print('FALTA', arq, no); return None
    if y is None: y = altura(x, z)
    n = copia(o, col_exp if exporta else col_prev)
    n.location = (x, -z, y - afunda); n.rotation_mode = 'XYZ'
    rx, ry, rz = o.rotation_euler; n.rotation_euler = (rx, ry, rz + r)
    kk = k if isinstance(k, tuple) else (k, k, k)
    n.scale = (o.scale[0] * kk[0], o.scale[1] * kk[2], o.scale[2] * kk[1])
    if jogo and not exporta: LAYOUT.append({'glb': arq.replace('\\', '/'), 'no': no, 'p': [round(x, 3), round(y - afunda, 3), round(z, 3)], 'r': round(r, 3), 'k': round(k, 3)})
    return n

for arq in ['casa-porta\\muros_kit.glb', 'casa-porta\\casa_porta.glb', 'oliveiras\\oliveiras.glb', 'diorama-ciprestes\\ciprestes.glb', 'figueiras\\figueiras.glb',
            'casa-porta\\rochas.glb', 'colheita-trigo\\colheita.glb', 'casa-porta\\pastoril.glb', 'casa-porta\\oficios.glb', 'casa-porta\\objetos_casa.glb',
            'casa-porta\\arvores_tripo.glb', 'trigal\\trigo.glb']:
    importa(arq)
col_proto.hide_render = True; col_proto.hide_viewport = True

# muros de pedra seca (vão para o GLB do cenário)
MUROS = ['Muro_Reto1', 'Muro_Reto2', 'Muro_Reto3', 'Muro_Reto4']
def dims(o):
    bb = [o.matrix_world @ Vector(c) for c in o.bound_box]; return [max(v[i] for v in bb) - min(v[i] for v in bb) for i in range(3)]
DM = {}
for m in MUROS:
    o = PROTO[('casa-porta\\muros_kit.glb', m)]; bpy.context.view_layer.update(); DM[m] = dims(o)
OBST = []          # círculos de colisão (x, z, r) para o jogo
CASAS_W = [xz(a, b) for (a, b), r in CASAS]
def perto_casa(x, z, m):
    for cx, cz in CASAS_W:
        if abs(x - cx) < 7.24 * KCASA[0] / 2 + m and abs(z - cz) < 5.56 * KCASA[2] / 2 + m: return True
    return False
def no_campo(x, z, m=0): return CAMPO[0] - m < x < CAMPO[1] + m and CAMPO[2] - m < z < CAMPO[3] + m
def muro(xa, za, xb, zb, alt=0.9, i=0, base=None):
    m = MUROS[i % 4]; o = PROTO[('casa-porta\\muros_kit.glb', m)]
    L = math.hypot(xb - xa, zb - za); mx, mz = (xa + xb) / 2, (za + zb) / 2
    y = min(altura(xa, za), altura(xb, zb), altura(mx, mz)) - 0.1 if base is None else base
    n = copia(o, col_exp)
    n.location = (mx, -mz, y)
    yaw = math.atan2(-(zb - za), xb - xa)
    n.rotation_mode = 'XYZ'; n.rotation_euler = (o.rotation_euler[0], o.rotation_euler[1], o.rotation_euler[2] + yaw)
    sx = L / DM[m][0] * 1.06; sz = alt / DM[m][2]
    n.scale = (o.scale[0] * sx, o.scale[1], o.scale[2] * sz)
    s = 0.0
    while s <= L: OBST.append((round(xa + (xb - xa) * s / L, 2), round(za + (zb - za) * s / L, 2), 0.42)); s += 0.6
def muro_linha(pp, alt=0.9, vao=0.12, seg=2.3, filtro=None):
    # pp: lista (x, z); reamostra por comprimento
    tot = [0.0]
    for i in range(1, len(pp)): tot.append(tot[-1] + math.hypot(pp[i][0] - pp[i - 1][0], pp[i][1] - pp[i - 1][1]))
    if tot[-1] < 1: return
    n = max(1, round(tot[-1] / seg))
    def em(s):
        for i in range(1, len(pp)):
            if tot[i] >= s:
                k = (s - tot[i - 1]) / max(1e-6, tot[i] - tot[i - 1]); return (pp[i - 1][0] + (pp[i][0] - pp[i - 1][0]) * k, pp[i - 1][1] + (pp[i][1] - pp[i - 1][1]) * k)
        return pp[-1]
    for i in range(n):
        A = em(tot[-1] * i / n); B = em(tot[-1] * (i + 1) / n); mx, mz = (A[0] + B[0]) / 2, (A[1] + B[1]) / 2
        d, _ = dist_estrada(mx, mz)
        if random.random() < vao or d < MEIA + 0.35 or perto_casa(mx, mz, 0.6) or no_campo(mx, mz, 0.4) or math.hypot(mx - ex, mz - ez) < EIRA_R + 1.2: continue
        if filtro and not filtro(mx, mz): continue
        muro(A[0], A[1], B[0], B[1], alt, i)

# arrimo dos socalcos: curvas de nível do relevo base (no pé de cada barranco)
def mascara(x, z):
    a, b = ab(x, z); s = (a + b) / 2; d, _ = dist_estrada(x, z)
    return sm(0.40, 0.48, s) * sm(MEIA + 0.4, MEIA + 1.4, d)
# marching squares sobre h_base / P_T: a linha k + 0.8 é o pé de cada barranco
MS = 0.35; X0 = -S * 0.8; NMS = int(S * 1.6 / MS)
Q = [[h_base(X0 + i * MS, X0 + k * MS) / P_T for k in range(NMS + 1)] for i in range(NMS + 1)]
for nivel in range(1, 12):
    iso = nivel + 0.8
    segs = []
    for i in range(NMS):
        for k in range(NMS):
            c = [(i, k), (i + 1, k), (i + 1, k + 1), (i, k + 1)]
            pts = []
            for e in range(4):
                (ia, ka), (ib, kb) = c[e], c[(e + 1) % 4]
                va, vb = Q[ia][ka] - iso, Q[ib][kb] - iso
                if (va < 0) != (vb < 0):
                    t = va / (va - vb); pts.append((X0 + (ia + (ib - ia) * t) * MS, X0 + (ka + (kb - ka) * t) * MS))
            if len(pts) >= 2: segs.append((pts[0], pts[1]))
            if len(pts) == 4: segs.append((pts[2], pts[3]))
    # encadeia
    chave = lambda p: (round(p[0], 3), round(p[1], 3))
    adj = {}
    for j, (A, B) in enumerate(segs):
        adj.setdefault(chave(A), []).append(j); adj.setdefault(chave(B), []).append(j)
    usado = [False] * len(segs)
    for j in range(len(segs)):
        if usado[j]: continue
        usado[j] = True; cadeia = [segs[j][0], segs[j][1]]
        for lado in (0, 1):
            while True:
                fim = cadeia[-1] if lado == 0 else cadeia[0]
                prox = [m for m in adj.get(chave(fim), []) if not usado[m]]
                if not prox: break
                m = prox[0]; usado[m] = True
                A, B = segs[m]; nxt = B if chave(A) == chave(fim) else A
                if lado == 0: cadeia.append(nxt)
                else: cadeia.insert(0, nxt)
        # só dentro do quadrado (com um pouco de sobra) e na máscara dos socalcos; um pouco para baixo do barranco
        trecho = []
        for x, z in cadeia:
            a, b = ab(x, z)
            ok = -0.3 < a < 1.45 and -0.3 < b < 1.45 and mascara(x, z) > 0.6
            if ok:
                ga = (h_base(x + 0.1, z) - h_base(x - 0.1, z)) / 0.2; gb = (h_base(x, z + 0.1) - h_base(x, z - 0.1)) / 0.2; gl = math.hypot(ga, gb) or 1
                trecho.append((x - ga / gl * 0.25, z - gb / gl * 0.25))
            else:
                if len(trecho) > 3: muro_linha(trecho, alt=P_T * 0.78, vao=0.05)
                trecho = []
        if len(trecho) > 3: muro_linha(trecho, alt=P_T * 0.78, vao=0.05)
# muros baixos: beira da estrada embaixo, cercado das ovelhas, atrás do trigal
def ao_lado(i0, i1, lado, off=MEIA + 1.1):
    pp = []
    for i in range(i0, i1, 3):
        p = AMOS[i]; q = AMOS[min(L - 1, i + 1)] - AMOS[max(0, i - 1)]; q.z = 0; q.normalize()
        pp.append((p.x - q.y * off * lado, p.y + q.x * off * lado))
    muro_linha(pp, alt=0.75, vao=0.1)
def idx_ab(a, b):
    x, z = xz(a, b); return dist_estrada(x, z)[1]
ao_lado(idx_ab(0.06, 0.13), idx_ab(0.2, 0.25), 1)      # esquerda, embaixo
ao_lado(idx_ab(0.06, 0.13), idx_ab(0.16, 0.22), -1)    # direita, embaixo
ao_lado(idx_ab(0.28, 0.46), idx_ab(0.78, 0.94), -1, MEIA + 0.7)   # o muro comprido à esquerda da estrada, subindo
ao_lado(idx_ab(0.50, 0.83), idx_ab(0.85, 0.96), 1, MEIA + 0.7)
PASTO_AB = (0.30, -0.12)
px_, pz_ = xz(*PASTO_AB)
cerc = [(px_ + math.cos(t) * 2.4, pz_ + math.sin(t) * 2.0) for t in [i * 0.25 + 1.4 for i in range(20)]]
muro_linha(cerc, alt=0.7, vao=0.0, seg=2.0)
# atrás do trigal e das casas: um muro longo (o barranco de cima)
bt = [xz(a, 0.66) for a in [0.46 + i * 0.03 for i in range(22)]]
muro_linha([(x, z) for x, z in bt], alt=1.0, vao=0.05, filtro=lambda x, z: True)

# casas: geminadas, em degraus
CASA_LAY = []
for ((a, b), r), y in zip(CASAS, HCASA):
    x, z = xz(a, b); poe('casa-porta\\casa_porta.glb', 'Casa2', x, z, r, KCASA, y=y, afunda=0, jogo=False)
    CASA_LAY.append({'p': [round(x, 3), y, round(z, 3)], 'r': r, 'k': list(KCASA)})

# árvores, pedras e objetos
def livre(x, z, r=1.0):
    d, _ = dist_estrada(x, z)
    return d > MEIA + 0.6 + r * 0.5 and not perto_casa(x, z, 0.8 + r * 0.4) and not no_campo(x, z, 0.4 + r * 0.4) and math.hypot(x - ex, z - ez) > EIRA_R + 1 + r * 0.4 and all(math.hypot(x - ox, z - oz) > oR + r * 0.6 for ox, oz, oR in OBST[::3])
ARV = []
def arvore(arq, no, x, z, k=1.0, raio=0.6, forca=False):
    if not forca and (not livre(x, z, raio * 1.6) or any(math.hypot(x - ax, z - az) < 3.0 for ax, az in ARV)): return False
    poe(arq, no, x, z, random.random() * 6.28, k, afunda=0.12); ARV.append((x, z)); OBST.append((round(x, 2), round(z, 2), raio)); return True
OLIV = [('oliveiras\\oliveiras.glb', n) for n in ['Oliveira1_Jovem', 'Oliveira2_Retorcida', 'Oliveira3_Vaso', 'Oliveira4_Ancia']]
CIP = ('diorama-ciprestes\\ciprestes.glb', 'Cipreste2_Esguio')
# o alto: três ciprestes e grandes pedras ao lado da estrada
for a, b, k in [(0.86, 1.02, 1.25), (0.91, 1.06, 1.15), (1.03, 0.9, 1.3)]:
    x, z = xz(a, b); arvore(*CIP, x, z, k, 0.4, forca=True)
for a, b, no, k in [(1.0, 0.84, 'Rocha6', 1.7), (1.03, 0.88, 'Rocha9', 1.5), (0.96, 0.82, 'Rocha3', 1.3), (0.99, 0.78, 'Rocha8', 1.1), (0.78, 1.0, 'Rocha6', 1.5), (0.82, 1.05, 'Rocha9', 1.2)]:
    x, z = xz(a, b); poe('casa-porta\\rochas.glb', no, x, z, random.random() * 6, k, afunda=0.15); OBST.append((round(x, 2), round(z, 2), 0.6 * k))
# olival à esquerda (nos socalcos) e algumas à direita no alto
for a, b in [(0.66, 1.02), (0.52, 0.99), (0.38, 0.96), (0.24, 0.93), (0.10, 0.90), (0.30, 0.80), (0.16, 0.79), (0.04, 0.78)]:
    x, z = xz(a, b); arvore(*OLIV[random.randrange(4)], x, z, 0.75 + random.random() * 0.15, 0.5)
for a, b in [(0.93, 0.66), (0.80, 0.72), (0.66, 0.70)]:
    x, z = xz(a, b); arvore(*OLIV[random.randrange(4)], x, z, 0.75, 0.5)
# figueiras com folhas e a seca
FIGS = ['Figueira2_Larga_SemFruta', 'Figueira1_Jovem_SemFruta', 'Figueira4_Grande_SemFruta', 'Figueira3_Encostada_SemFruta']
for i, (a, b) in enumerate([(0.44, 0.66), (0.30, 0.18), (0.55, 0.10)]):
    x, z = xz(a, b); arvore('figueiras\\figueiras.glb', FIGS[i % 4], x, z, 0.75, 0.5)
fsx, fsz = xz(*FIGSECA_AB); OBST.append((round(fsx, 2), round(fsz, 2), 0.4))
if RENDER:      # só na prévia: a figueira seca é provisória (no jogo é feita em código)
    mseca = bpy.data.materials.new('Seca'); mseca.use_nodes = True; next(n for n in mseca.node_tree.nodes if n.type == 'BSDF_PRINCIPLED').inputs['Base Color'].default_value = (0.55, 0.52, 0.48, 1)
    def galho(p0, p1, r):
        d = p1 - p0; bpy.ops.mesh.primitive_cylinder_add(vertices=5, radius=r, depth=d.length, location=(p0 + p1) / 2)
        o = bpy.context.object; o.rotation_mode = 'QUATERNION'; o.rotation_quaternion = d.to_track_quat('Z', 'Y'); o.data.materials.append(mseca)
        for c in list(o.users_collection): c.objects.unlink(o)
        col_prev.objects.link(o)
    base = Vector((fsx, -fsz, altura(fsx, fsz))); top = base + Vector((0, 0, 1.6)); galho(base, top, 0.22)
    for i in range(6):
        a = i * 1.05 + 0.3; p1 = top + Vector((math.cos(a) * 0.9, math.sin(a) * 0.9, 0.9 + (i % 2) * 0.3)); galho(top, p1, 0.1)
        for j in (-0.5, 0.6): galho(p1, p1 + Vector((math.cos(a + j) * 0.6, math.sin(a + j) * 0.6, 0.5)), 0.05)
# eira: colheita.glb (o disco de pedra) com pilhas, sacos e cestos
poe('colheita-trigo\\colheita.glb', 'Eira', ex, ez, 0.3, (EIRA_R * 2) / 2.84, y=HEIRA, afunda=0.02)
for dx, dz, no, k in [(3.4, -2.6, 'Feixe_Pilha', 1.1), (4.2, -0.8, 'Feixe_Pilha', 1.0), (-3.2, -3.0, 'Cesto_Graos', 1.2), (-2.4, -3.8, 'Cesto_Espigas', 1.1)]:
    poe('colheita-trigo\\colheita.glb', no, ex + dx, ez + dz, random.random() * 6, k); OBST.append((round(ex + dx, 2), round(ez + dz, 2), 0.5))
for dx, dz in [(3.0, 1.6), (3.6, 2.2), (2.6, 2.4)]:
    poe('casa-porta\\objetos_casa.glb', 'Saco', ex + dx, ez + dz, random.random() * 6, 1.15)
# trigal: só alguns tufos na prévia (no jogo é instanciado)
TRIGO = ('trigal\\trigo.glb', 'Trigo_Maduro')
if RENDER:
    xx = CAMPO[0] + 0.3
    while xx < CAMPO[1] - 0.2:
        zz = CAMPO[2] + 0.3
        while zz < CAMPO[3] - 0.2:
            poe(*TRIGO, xx + random.random() * 0.3, zz + random.random() * 0.3, random.random() * 6, 1.0, y=HCAMPO, afunda=0.03, jogo=False); zz += 0.55
        xx += 0.55
# carroça, feixes em pé, prensa, cocho
poe('colheita-trigo\\colheita.glb', 'Carroca', crx, crz, -math.pi / 2, 1.0, y=HCARRO, afunda=0.02, jogo=False)
for a, b in [(0.88, 0.04), (0.91, 0.06), (0.89, 0.0), (0.94, 0.02), (0.85, 0.0)]:
    x, z = xz(a, b); poe('colheita-trigo\\colheita.glb', 'Feixe_EmPe', x, z, random.random() * 6, 1.0); OBST.append((round(x, 2), round(z, 2), 0.3))
prx, prz = xz(0.60, -0.04); poe('casa-porta\\oficios.glb', 'Lagar_Pedra', prx, prz, 0.6, 0.55); OBST.append((round(prx, 2), round(prz, 2), 1.2))
cox, coz = xz(0.40, 0.12); poe('casa-porta\\pastoril.glb', 'Cocho', cox, coz, 0.0, 0.7); OBST.append((round(cox, 2), round(coz, 2), 0.7))
# arredores da aldeia
for a, b, no in [(0.43, 0.40, 'Jarro_Alto'), (0.44, 0.43, 'Pote_Escuro'), (0.61, 0.15, 'Cesto_Alca'), (0.62, 0.40, 'Lenha'), (0.62, 0.20, 'Banquinho')]:
    x, z = xz(a, b); poe('casa-porta\\objetos_casa.glb', no, x, z, random.random() * 6, 1.2); OBST.append((round(x, 2), round(z, 2), 0.3))
# beira da estrada embaixo: árvores e pedras
for a, b in [(0.05, 0.28), (0.10, 0.44), (0.30, 0.10)]:
    x, z = xz(a, b); arvore('casa-porta\\arvores_tripo.glb', random.choice(['Arvore1', 'Arvore7', 'Arvore9']), x, z, 0.9, 0.4)
for a, b, no in [(0.08, 0.32, 'Rocha1'), (0.30, 0.15, 'Rocha3'), (0.06, 0.04, 'Rocha8')]:
    x, z = xz(a, b)
    if livre(x, z, 1): poe('casa-porta\\rochas.glb', no, x, z, random.random() * 6, 0.7); OBST.append((round(x, 2), round(z, 2), 0.5))

# ---------------- sangria: mata e pedras fora do quadrado ----------------
ALTAS = OLIV + [CIP, ('diorama-ciprestes\\ciprestes.glb', 'Cipreste1_Redondo'), ('casa-porta\\arvores_tripo.glb', 'Arvore2'), ('casa-porta\\arvores_tripo.glb', 'Arvore5'), ('casa-porta\\arvores_tripo.glb', 'Arvore8')]
BAIXAS = [('casa-porta\\arvores_tripo.glb', n) for n in ['Arvore1', 'Arvore7', 'Arvore9']]
PEDRAS = [('casa-porta\\rochas.glb', n) for n in ['Rocha1', 'Rocha2', 'Rocha4', 'Rocha5', 'Rocha7', 'Rocha8']]
for lado in range(4):
    for i in range(34):
        t = (i + random.random() * 0.6) / 48 * 1.3 - 0.15
        for camada, (d0, d1, prob) in enumerate([(0.06, 0.15, 0.6), (0.15, 0.35, 0.5), (0.35, 0.7, 0.45)]):
            if random.random() > prob: continue
            dd = d0 + random.random() * (d1 - d0)
            if lado == 0: a, b = t, -dd           # borda da frente-direita (perto da câmera)
            elif lado == 1: a, b = -dd, t         # borda da frente-esquerda (perto da câmera)
            elif lado == 2: a, b = 1 + dd, t      # fundo-direita
            else: a, b = t, 1 + dd                # fundo-esquerda
            x, z = xz(a, b)
            d, _ = dist_estrada(x, z)
            if d < MEIA + 2.5: continue
            perto = lado < 2
            if perto and dd < 0.15 and random.random() < 0.7: continue
            if perto and random.random() < 0.3:
                if livre(x, z, 1): poe(*random.choice(PEDRAS), x, z, random.random() * 6, 0.7 + random.random() * 0.8, afunda=0.1); OBST.append((round(x, 2), round(z, 2), 0.6))
            else:
                arvore(*random.choice(BAIXAS if perto else ALTAS), x, z, 0.85 + random.random() * 0.35, 0.5)

# ---------------- câmera e luz para a prévia ----------------
cam = bpy.data.objects.new('Cam', bpy.data.cameras.new('Cam')); sc.collection.objects.link(cam); sc.camera = cam
cam.data.type = 'ORTHO'; cam.data.ortho_scale = 33
alvo = Vector((xz(0.5, 0.5)[0], -xz(0.5, 0.5)[1], 6.5))
el = math.radians(30); dirc = Vector((math.cos(el) * 0.7071, -math.cos(el) * 0.7071, math.sin(el)))
cam.location = alvo + dirc * 120; cam.rotation_euler = (-dirc).to_track_quat('-Z', 'Y').to_euler(); cam.data.clip_end = 400
sol = bpy.data.objects.new('Sol', bpy.data.lights.new('Sol', 'SUN')); sc.collection.objects.link(sol)
sol.data.energy = 2.4; sol.data.color = (1.0, 0.92, 0.8); sol.rotation_euler = (math.radians(50), 0, math.radians(-150))
sc.world = bpy.data.worlds.new('W'); sc.world.use_nodes = True
bg = next(n for n in sc.world.node_tree.nodes if n.type == 'BACKGROUND'); bg.inputs['Color'].default_value = (0.78, 0.82, 0.78, 1); bg.inputs['Strength'].default_value = 0.7
sc.render.resolution_x, sc.render.resolution_y = 900, 1200
for eng in ('BLENDER_EEVEE', 'BLENDER_EEVEE_NEXT'):
    try: sc.render.engine = eng; break
    except TypeError: pass

if RENDER:
    sc.render.filepath = SCR + '\\betfage_render.png'; bpy.ops.render.render(write_still=True)

if EXPORT:
    bpy.ops.object.select_all(action='DESELECT')
    for o in col_exp.all_objects: o.select_set(True)
    bpy.context.view_layer.objects.active = terr
    saida = OUT + '\\betfage_cenario.glb'
    bpy.ops.export_scene.gltf(filepath=saida, use_selection=True, export_format='GLB', export_normals=False, export_vertex_color='MATERIAL',
                              export_image_format='WEBP', export_image_quality=80, export_meshopt_compression_enable=True)
    a0, a1, b0, b1 = CAMPO_AB
    lay = {'S': S, 'estrada': [[round(p.x, 2), round(p.y, 2)] for p in AMOS[::3]], 'meia': MEIA, 'casas': CASA_LAY,
           'campo': {'x0': CAMPO[0], 'x1': CAMPO[1], 'z0': CAMPO[2], 'z1': CAMPO[3], 'y': HCAMPO},
           'eira': {'x': ex, 'z': ez, 'r': EIRA_R, 'y': HEIRA}, 'carro': {'x': crx, 'z': crz, 'y': HCARRO},
           'figseca': [fsx, fsz], 'pasto': [px_, pz_], 'cocho': [cox, coz], 'objetos': LAYOUT, 'obst': OBST}
    json.dump(lay, open(OUT + '\\betfage_layout.json', 'w'), separators=(',', ':'))
    print('EXPORT', os.path.getsize(saida), len(LAYOUT), len(OBST))
print('MUROS', len([o for o in col_exp.objects if o.name.startswith('Muro')]))
print('FIM', len(col_exp.all_objects), len(col_prev.all_objects))
