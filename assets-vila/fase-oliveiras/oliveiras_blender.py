# Monte das Oliveiras: gera a fase no Blender (terreno, estrada, muretas, olivais, a prensa, o mirante da pregação,
# o cume e o lugar da panorâmica de Jerusalém) e grava oliveiras.blend. Depois, quem manda é o .blend:
# mexa nele e rode o texto EXPORTAR_PARA_O_JOGO (aba Scripting > Run Script).
#
# Uso (só para criar a fase do zero):
#   blender -b --factory-startup -P oliveiras_blender.py -- [--regerar-tudo] [--render]
# Se oliveiras.blend já existe, ele NÃO é sobrescrito sem --regerar-tudo (o trabalho feito à mão se perderia).
#
# Coordenadas do jogo (three.js): x, y (altura), z. No Blender: (x, -z, y).
# A estrada vem de Betfagé pelo leste (x alto), sobe até o cume (x = CUME_X) e desce para o oeste (x baixo),
# rumo ao vale do Cedrom e ao Getsêmani. Jerusalém fica no horizonte, a oeste.
import bpy, bmesh, math, json, os, random, sys
from mathutils import Vector, Matrix
from mathutils.kdtree import KDTree

ROOT = r"M:\Claude\github\Projects-animais\assets-vila"
OUT = os.path.join(ROOT, 'fase-oliveiras')
BLEND = os.path.join(OUT, 'oliveiras.blend')
ARGV = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
if os.path.exists(BLEND) and '--regerar-tudo' not in ARGV:
    raise SystemExit('oliveiras.blend já existe: abra-o e use EXPORTAR_PARA_O_JOGO. Para recriar do zero, rode com --regerar-tudo.')
random.seed(11)


def sm(e0, e1, x):
    k = (x - e0) / (e1 - e0); k = 0 if k < 0 else 1 if k > 1 else k
    return k * k * (3 - 2 * k)


# ---------------- traçado ----------------
ESTRADA = [(76, 5), (64, 1), (52, 4), (42, -1), (32, 2), (22, 0.5), (14, -0.5), (4, -3.5), (-6, 0), (-16, 5), (-26, 3.5),
           (-36, -2), (-48, 1), (-60, 5), (-74, 3), (-82, 2)]
MEIA = 1.4                     # meia largura da estrada
CUME_X = 17.0                  # o alto do monte (onde Jerusalém aparece)
H_CUME = 15.0
PRENSA = (-27.0, 11.5, math.radians(-8))     # x, z, giro: o pátio da prensa, ao norte da estrada
PREGA = (-3.0, -11.0)          # o mirante: uma laje de pedra de frente para o templo, ao sul da estrada
FIM_X = -74.0                  # dali em diante a estrada desce para o vale (saída para o Getsêmani)

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


# ---------------- relevo ----------------
def perfil(x):
    # altura ao longo do eixo leste-oeste: sobe de Betfagé até o cume e desce até o vale
    if x >= CUME_X:
        return H_CUME * (1 - sm(0, 1, (x - CUME_X) / (76 - CUME_X))) - 0.25 * max(0, x - 76)
    u = (CUME_X - x) / (CUME_X - FIM_X)
    h = H_CUME - 17.0 * sm(0, 1, min(u, 1.0) * 0.92 + 0.08 * min(u, 1.0) ** 2)
    if u > 1: h -= 0.45 * (FIM_X - x)          # depois do fim da estrada: o vale do Cedrom
    return h


def h_base(x, z):
    h = perfil(x)
    zz = z - 1.5
    h += 0.0105 * zz * zz * (0.55 + 0.45 * sm(-40, 30, x))     # morros dos lados (a oeste o vale abre para a vista)
    h += 0.28 * math.sin(x * 0.31 + 1.0) * math.cos(z * 0.27 - 0.6) + 0.1 * math.sin(x * 0.83 + z * 0.61)
    return h


HR = [h_base(p.x, p.y) for p in AMOS]
for _ in range(30): HR = [HR[0]] + [(HR[i - 1] + 2 * HR[i] + HR[i + 1]) / 4 for i in range(1, len(HR) - 1)] + [HR[-1]]

P_T = 1.5      # altura de cada socalco dos olivais


def h_socalco(x, z):
    h = h_base(x, z)
    d, i = dist_estrada(x, z)
    m = sm(MEIA + 2.5, MEIA + 5.5, d) * (1 - sm(56, 70, x))
    if m > 0:
        f = h / P_T; fl = math.floor(f); t = P_T * (fl + sm(0.55, 1.0, f - fl)); h = h + (t - h) * m * 0.8
    return h


PADS = []
def pad_circ(x, z, r, f, y): PADS.append(('c', x, z, r, 0, f, y))
def pad_rect(x, z, hx, hz, f, y): PADS.append(('r', x, z, hx, hz, f, y))


def h_estrada_em(x, z):
    d, i = dist_estrada(x, z); return HR[i]


HPR = h_estrada_em(PRENSA[0], PRENSA[1]) + 0.25; pad_rect(PRENSA[0], PRENSA[1], 4.6, 3.6, 2.6, HPR)
HPG = h_estrada_em(PREGA[0], PREGA[1]) - 0.4; pad_circ(PREGA[0], PREGA[1], 3.2, 2.4, HPG)
HCU = h_estrada_em(CUME_X, 0); pad_circ(CUME_X, -0.3, 4.0, 3.0, HCU)


def altura(x, z):
    h = h_socalco(x, z)
    d, i = dist_estrada(x, z)
    w = 1 - sm(MEIA + 0.3, MEIA + 2.4, d)
    if w > 0: h += (HR[i] - h) * w
    for t, px, pz, p1, p2, f, y in PADS:
        dd = max(0, math.hypot(x - px, z - pz) - p1) if t == 'c' else math.hypot(max(0, abs(x - px) - p1), max(0, abs(z - pz) - p2))
        w = 1 - sm(0, f, dd)
        if w > 0: h += (y - h) * w
    return h


# ---------------- cena ----------------
bpy.ops.wm.read_factory_settings(use_empty=True)
sc = bpy.context.scene
def colecao(nome):
    c = bpy.data.collections.new(nome); sc.collection.children.link(c); return c
col_exp, col_prev, col_ref, col_colis, col_proto = colecao('Exportar'), colecao('Cenario_objetos'), colecao('Referencia_jogo'), colecao('Colisao'), colecao('Prototipos')


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
       'olival': hexc('b9a774'), 'batido': hexc('d8c194'), 'pedra': hexc('cdbb94')}

# terreno
X0, X1, Z0, Z1, PASSO = -112.0, 92.0, -62.0, 62.0, 1.0
NX, NZ = int((X1 - X0) / PASSO), int((Z1 - Z0) / PASSO)
bm = bmesh.new(); vs = []
for i in range(NX + 1):
    linha = []
    for k in range(NZ + 1):
        x = X0 + i * PASSO; z = Z0 + k * PASSO
        linha.append(bm.verts.new((x, -z, altura(x, z))))
    vs.append(linha)
for i in range(NX):
    for k in range(NZ):
        a, b, c, d = vs[i][k], vs[i + 1][k], vs[i + 1][k + 1], vs[i][k + 1]
        if (i + k) % 2 == 0: bm.faces.new((a, b, c)); bm.faces.new((a, c, d))
        else: bm.faces.new((a, b, d)); bm.faces.new((b, c, d))
bm.normal_update()
if sum(f.normal.z for f in bm.faces) < 0: bmesh.ops.reverse_faces(bm, faces=bm.faces[:])
me = bpy.data.meshes.new('Oliveiras_Terreno'); bm.to_mesh(me); bm.free()
ca = me.color_attributes.new('Col', 'BYTE_COLOR', 'CORNER')


def ruido(x, z): return 0.5 + 0.3 * math.sin(x * 0.21 + 3.1) * math.cos(z * 0.17 + 1.3) + 0.2 * math.sin(x * 0.05 - z * 0.07)


def no_pad(x, z, m=0.0):
    for t, px, pz, p1, p2, f, y in PADS:
        if t == 'c' and math.hypot(x - px, z - pz) < p1 + m: return True
        if t == 'r' and abs(x - px) < p1 + m and abs(z - pz) < p2 + m: return True
    return False


for p in me.polygons:
    c = p.center; x, z = c.x, -c.y; n = p.normal
    d, _ = dist_estrada(x, z)
    if d < MEIA + 0.35: col = COR['areia']
    elif no_pad(x, z): col = COR['batido']
    elif abs(n.z) < 0.55: col = COR['barranco']
    elif abs(n.z) < 0.78: col = COR['grama2']
    else:
        r = ruido(x, z); j = random.random() * 0.05
        olival = d > MEIA + 4 and math.sin(x * 0.18) * math.cos(z * 0.2) > -0.35
        base = COR['olival'] if olival and r < 0.5 else COR['grama'] if r < 0.55 else COR['grama2'] if r < 0.72 else COR['seca']
        col = tuple(min(1, v * (0.97 + j)) for v in base[:3]) + (1,)
    for li in p.loop_indices: ca.data[li].color_srgb = col
terr = bpy.data.objects.new('Oliveiras_Terreno', me); col_exp.objects.link(terr)
terr.data.materials.append(mat_vc('Terreno'))

# estrada: faixa colada no relevo
bm = bmesh.new(); prev = None; L = len(AMOS)
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
me = bpy.data.meshes.new('Oliveiras_Estrada'); bm.to_mesh(me); bm.free()
ca = me.color_attributes.new('Col', 'BYTE_COLOR', 'CORNER')
for p in me.polygons:
    v = 0.97 + random.random() * 0.04
    for li in p.loop_indices: ca.data[li].color_srgb = tuple(c * v for c in COR['areia'][:3]) + (1,)
estr = bpy.data.objects.new('Oliveiras_Estrada', me); col_exp.objects.link(estr); estr.data.materials.append(mat_vc('Estrada'))

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


for arq in ['oliveiras\\oliveiras.glb', 'casa-porta\\rochas.glb', 'casa-porta\\muretas.glb', 'flores\\plantas_betfage.glb',
            'casa-porta\\objetos_casa.glb', 'pote-azeitonas\\pote_azeitonas.glb', 'prensa-azeite\\prensa.glb']:
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


def circulo(nome, x, z, r, dono=None):
    e = bpy.data.objects.new(nome, None); col_colis.objects.link(e)
    e.empty_display_type = 'CIRCLE'; e.empty_display_size = 1.0; e['colisao'] = 'circ'; e.hide_render = True; e.show_in_front = True
    e.matrix_world = Matrix.Translation((x, -z, altura(x, z) + 0.2)) @ Matrix.Rotation(math.pi / 2, 4, 'X') @ Matrix.Diagonal((r, r, r, 1))
    if dono is not None:
        e['dono'] = 1; e.parent = dono; e.matrix_parent_inverse = dono.matrix_world.inverted()
        dono['col_feita'] = dono.name
    return e


def empty_ref(nome, x, z, y=None, r=0.0, tipo='SINGLE_ARROW', tam=1.5):
    e = bpy.data.objects.new(nome, None); col_ref.objects.link(e)
    e.empty_display_type = tipo; e.empty_display_size = tam; e.show_in_front = True
    e.location = (x, -z, altura(x, z) if y is None else y); e.rotation_euler = (0, 0, r)
    return e


# zonas que ficam livres de árvores e muros (pátio da prensa, mirante, cume, chegadas)
ZONAS = [('r', PRENSA[0], PRENSA[1], 6.0, 5.0), ('c', PREGA[0], PREGA[1], 4.6), ('c', CUME_X, -0.3, 5.5)]
def na_zona(x, z, m=0.0):
    if CUME_X - 34 < x < CUME_X + 2 and abs(z + 0.3) < 4 + 0.45 * (CUME_X - x): return True     # do cume, a vista do templo fica livre
    for zn in ZONAS:
        if zn[0] == 'c' and math.hypot(x - zn[1], z - zn[2]) < zn[3] + m: return True
        if zn[0] == 'r' and abs(x - zn[1]) < zn[3] + m and abs(z - zn[2]) < zn[4] + m: return True
    return False


def inclin(x, z):
    gx = (altura(x + 0.5, z) - altura(x - 0.5, z)); gz = (altura(x, z + 0.5) - altura(x, z - 0.5)); return math.hypot(gx, gz)


# ---------------- muretas à beira da estrada (pedra seca, módulos de 2 m) ----------------
MUROS = []       # segmentos (x0, z0, x1, z1): a colisão vai como fileiras de círculos no jogo
MUR = PROTO[('casa-porta\\muretas.glb', 'Mureta_Baixa')]
def muro(xa, za, xb, zb, i):
    # um módulo de 2 m, inclinado junto com o chão (na subida, a mureta acompanha a ladeira em vez de ficar enterrada de um lado)
    L = math.hypot(xb - xa, zb - za); mx, mz = (xa + xb) / 2, (za + zb) / 2
    ya, yb, ym = altura(xa, za), altura(xb, zb), altura(mx, mz)
    y = min((ya + yb) / 2, ym) - 0.12
    yaw = math.atan2(-(zb - za), xb - xa); ang = math.atan2(yb - ya, L)
    n = copia(MUR, col_exp)
    n.matrix_world = (Matrix.Translation((mx, -mz, y)) @ Matrix.Rotation(yaw, 4, 'Z') @ Matrix.Rotation(-ang, 4, 'Y')
                      @ MUR.rotation_euler.to_matrix().to_4x4() @ Matrix.Diagonal((MUR.scale[0] * L / 2.0, MUR.scale[1], MUR.scale[2], 1)))
    MUROS.append([round(xa, 2), round(za, 2), round(xb, 2), round(zb, 2)])


for lado in (-1, 1):
    passo, acum, ant, i = 2.0, 0.0, None, 0
    for j in range(len(AMOS)):
        p = AMOS[j]; q = AMOS[min(L - 1, j + 1)] - AMOS[max(0, j - 1)]; q.z = 0; q.normalize()
        off = MEIA + 1.35
        cur = (p.x - q.y * off * lado, p.y + q.x * off * lado)
        if ant is None: ant = cur; continue
        if math.hypot(cur[0] - ant[0], cur[1] - ant[1]) < passo: continue
        mx, mz = (ant[0] + cur[0]) / 2, (ant[1] + cur[1]) / 2
        ok = (mx < 60 and random.random() > 0.14 and not na_zona(mx, mz, 1.0) and dist_estrada(mx, mz)[0] > MEIA + 0.9
              and abs(altura(ant[0], ant[1]) - altura(cur[0], cur[1])) < 0.9 and mx > FIM_X + 3)
        if ok: muro(ant[0], ant[1], cur[0], cur[1], i); i += 1
        ant = cur

# ---------------- olivais ----------------
oli = PROTO[('oliveiras\\oliveiras.glb', 'Oliveira1_Jovem')]; H_OLI = dims(oli)[2]
K_OLI = 4.2 / max(0.1, H_OLI)            # oliveira adulta com ~4,2 m
VAR = ['Oliveira1_Jovem', 'Oliveira2_Retorcida', 'Oliveira3_Vaso', 'Oliveira4_Ancia']
print('OLIVEIRA altura do modelo', round(H_OLI, 2), 'escala', round(K_OLI, 2))
ARV = []
x = X0 + 3
while x < X1 - 3:
    z = Z0 + 3 + (2.6 if int((x - X0) / 5.2) % 2 else 0)
    while z < Z1 - 3:
        px, pz = x + random.uniform(-1.3, 1.3), z + random.uniform(-1.3, 1.3)
        d, _ = dist_estrada(px, pz)
        dens = math.sin(px * 0.11 + 0.7) * math.cos(pz * 0.13 - 0.2)          # clareiras entre os olivais
        if d > MEIA + 3.2 and not na_zona(px, pz, 1.5) and dens > -0.45 and inclin(px, pz) < 0.9 and not (px > 64 and abs(pz) < 20):
            perto = d < 16 and -80 < px < 76 and abs(pz) < 26
            k = K_OLI * random.uniform(0.7, 1.05)
            n = poe('oliveiras\\oliveiras.glb', random.choice(VAR), px, pz, random.uniform(0, 6.28), k, afunda=0.12, longe=not perto)
            if n is not None and perto: circulo('COL_' + n.name, px, pz, 0.45, n)
            ARV.append((px, pz))
        z += 5.2
    x += 5.2

# ---------------- pedras e moitas ----------------
ROCHAS = ['Rocha%d' % i for i in range(1, 10)]
for _ in range(170):
    px, pz = random.uniform(X0 + 4, X1 - 4), random.uniform(-40, 40)
    d, _i = dist_estrada(px, pz)
    if d < MEIA + 0.8 or na_zona(px, pz, 0.8) or any(math.hypot(px - a, pz - b) < 1.6 for a, b in ARV[:: 1]): continue
    perto = d < 12 and abs(pz) < 24
    k = random.uniform(0.5, 1.2) if perto else random.uniform(0.9, 1.8)
    n = poe('casa-porta\\rochas.glb', random.choice(ROCHAS), px, pz, random.uniform(0, 6.28), k, afunda=0.12, longe=not perto)
    if n is not None and perto and k > 0.75: circulo('COL_' + n.name, px, pz, 0.3 * k + 0.1, n)
for _ in range(260):
    px, pz = random.uniform(-84, 76), random.uniform(-26, 26)
    d, _i = dist_estrada(px, pz)
    if d < MEIA + 0.6 or na_zona(px, pz, 0.3): continue
    nome = random.choice(['Moita_Espinhos_Pequena', 'Moita_Espinhos_Pequena', 'Malva_Rosa', 'Moita_Espinhos_Grande'])
    poe('flores\\plantas_betfage.glb', nome, px, pz, random.uniform(0, 6.28), random.uniform(0.7, 1.1), afunda=0.05, planta=True)

# ---------------- a prensa de azeite e o pátio ----------------
px, pz, pr = PRENSA
prensa = bpy.data.objects.new('Prensa_Jogo', None); col_ref.objects.link(prensa)
prensa.empty_display_type = 'PLAIN_AXES'; prensa.empty_display_size = 2.0; prensa.show_in_front = True
prensa.location = (px, -pz, HPR); prensa.rotation_euler = (0, 0, pr)
for o in list(col_proto.objects):
    if o.name.startswith('Prensa_') and o.parent is None:
        n = copia(o, col_prev); n.parent = prensa
        n.location = (o.location.x, o.location.y - 56.0, o.location.z)       # o kit vem com o centro em (0, 56) no Blender
        n['prensa'] = 1
prensa['glb'] = 'prensa-azeite/prensa.glb'
# o pátio: cestos e jarros num canto, o pote de azeitonas, e um murinho atrás
def no_patio(lx, lz):
    c, s = math.cos(-pr), math.sin(-pr)          # o giro do Blender (em torno de Z, com z do jogo = -y) é o oposto no plano do jogo
    return px + lx * c - lz * s, pz + lx * s + lz * c        # (giro no plano, como no Blender: z do jogo = -y)
for lx, lz, arq, no, k in [(3.6, -2.4, 'casa-porta\\objetos_casa.glb', 'Jarro_Alto', 1.0), (3.9, -1.7, 'casa-porta\\objetos_casa.glb', 'Jarra_Alca', 1.0),
                           (3.2, -2.9, 'casa-porta\\objetos_casa.glb', 'Cesto_Oval', 1.0), (-4.6, -2.6, 'pote-azeitonas\\pote_azeitonas.glb', 'PoteAzeitonas', 1.0),
                           (-4.9, -1.6, 'casa-porta\\objetos_casa.glb', 'Cesto_Raso', 1.0), (-4.2, -3.3, 'casa-porta\\objetos_casa.glb', 'Saco', 1.0)]:
    gx, gz = no_patio(lx, lz)
    n = poe(arq, no, gx, gz, random.uniform(0, 6.28), k, y=HPR, afunda=0.02)
    if n is not None: circulo('COL_' + n.name, gx, gz, 0.35, n)
for i, (ax, bx) in enumerate([(-4.4, -2.4), (-2.4, -0.4), (-0.4, 1.6), (1.6, 3.6)]):
    a = no_patio(ax, 4.2); b = no_patio(bx, 4.2)        # atrás da prensa (o lado da estrada fica aberto)
    muro(a[0], a[1], b[0], b[1], i)

# ---------------- o mirante da pregação ----------------
gx, gz = PREGA
laje = poe('casa-porta\\rochas.glb', 'Rocha2', gx - 0.6, gz - 0.2, 0.4, 1.6, y=HPG, afunda=0.35)
if laje is not None: circulo('COL_' + laje.name, gx - 0.6, gz - 0.2, 0.75, laje)
for (dx, dz, nome, k) in [(1.4, 1.6, 'Rocha5', 0.8), (-2.2, 1.8, 'Rocha8', 0.7), (0.4, -2.4, 'Rocha4', 0.9)]:
    n = poe('casa-porta\\rochas.glb', nome, gx + dx, gz + dz, random.uniform(0, 6.28), k, y=HPG, afunda=0.15)
    if n is not None: circulo('COL_' + n.name, gx + dx, gz + dz, 0.3 * k + 0.1, n)
empty_ref('JOGO_pregacao', gx + 0.6, gz + 0.4, y=HPG, r=math.pi / 2, tam=2.0)    # o lugar do gatilho (a seta aponta o templo, a oeste)

# ---------------- pontos de referência ----------------
cu = empty_ref('JOGO_cume', CUME_X, -0.3, y=HCU, r=math.pi / 2, tam=2.5)
empty_ref('JOGO_vista', -150.0, 0.0, y=HCU + 2.0, tipo='SPHERE', tam=4.0)    # para onde a câmera olha na revelação (o templo)
# panorâmica: um arco largo no horizonte a oeste. Aqui só marca o lugar; a imagem entra no jogo.
PAN = {'cx': CUME_X, 'cz': -0.3, 'r': 420.0, 'a0': math.radians(160), 'a1': math.radians(200), 'y0': -60.0, 'y1': 60.0}     # longe e estreito: a cidade abaixo da linha dos olhos, do outro lado do vale
bm = bmesh.new(); prev = None
for i in range(33):
    a = PAN['a0'] + (PAN['a1'] - PAN['a0']) * i / 32
    x, z = PAN['cx'] + math.cos(a) * PAN['r'], PAN['cz'] + math.sin(a) * PAN['r']
    row = [bm.verts.new((x, -z, PAN['y0'])), bm.verts.new((x, -z, PAN['y1']))]
    if prev: bm.faces.new((prev[0], row[0], row[1], prev[1]))
    prev = row
me = bpy.data.meshes.new('Panorama_Jerusalem'); bm.to_mesh(me); bm.free()
pan = bpy.data.objects.new('Panorama_Jerusalem', me); col_ref.objects.link(pan); pan.display_type = 'WIRE'; pan.hide_render = True
for k_, v_ in PAN.items(): pan[k_] = v_

# textos: medidas fixas e o botão de exportar
fixos = {'estrada': [[round(p.x, 2), round(p.y, 2)] for p in AMOS[::3]] + [[round(AMOS[-1].x, 2), round(AMOS[-1].y, 2)]], 'meia': MEIA, 'muros': MUROS,
         'area': [X0 + 6, X1 - 6, -30, 30]}
t = bpy.data.texts.new('oliveiras_fixos'); t.write(json.dumps(fixos))
bt = bpy.data.texts.new('EXPORTAR_PARA_O_JOGO')
bt.write("# exporta o que está na cena para o jogo e salva o .blend\nRODAR_EXPORTACAO = True\nexec(open(r'" + os.path.join(OUT, 'exportar_oliveiras.py') + "', encoding='utf-8').read())\n")

# luz e câmera para as prévias
sol = bpy.data.lights.new('Sol', 'SUN'); sol.energy = 3.5; so = bpy.data.objects.new('Sol', sol); sc.collection.objects.link(so); so.rotation_euler = (math.radians(50), 0, math.radians(-30))
w = bpy.data.worlds.new('Ceu'); sc.world = w; w.use_nodes = True
bg = next(n for n in w.node_tree.nodes if n.type == 'BACKGROUND'); bg.inputs['Color'].default_value = (0.82, 0.86, 0.84, 1); bg.inputs['Strength'].default_value = 0.9
cam = bpy.data.cameras.new('Cam'); cam.lens = 24; co = bpy.data.objects.new('Cam', cam); sc.collection.objects.link(co); sc.camera = co
cam.clip_end = 900

os.makedirs(OUT, exist_ok=True)
bpy.ops.wm.save_as_mainfile(filepath=BLEND)
print('FIM', len([o for o in bpy.data.objects if 'glb' in o]), 'objetos', len(MUROS), 'muros', len(ARV), 'oliveiras')
