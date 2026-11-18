# ATENÇÃO (18/11): o original de Betfagé agora é o betfage.blend, mexido à mão. Este gerador ficou só como
# referência e como biblioteca (os ajuste*.py usam as funções do começo dele, até a linha "cena").
# Rodado direto, ele recria a fase do zero e perderia esse trabalho, por isso está travado:
#   - sem --regerar-tudo ele para antes de mexer em qualquer coisa;
#   - com --regerar-tudo ele monta a fase, mas grava em betfage_regerado.blend (nunca no betfage.blend)
#     e não exporta para o jogo.
# Betfagé: modela a fase (terreno com socalcos, estrada, muros) e posiciona os assets como no diorama de referência.
# Coordenadas da fase em (a, b): a = rumo ao canto direito, b = rumo ao canto esquerdo; (0,0) = canto da frente.
# Mundo three.js: x = S/2 - b*S, z = S/2 - a*S, y = altura.  Blender: (x, -z, y).
import bpy, bmesh, mathutils, math, json, os, random, sys
from mathutils import Vector, Matrix
from mathutils.kdtree import KDTree

ROOT = r"M:\Claude\github\Projects-animais\assets-vila"
OUT = ROOT + r"\fase-betfage"
SCR = r"C:\Users\isaqu\AppData\Local\Temp\claude\956e92763068254c\f51927a9-9486-4ab8-a8f5-2b0632db0d38\scratchpad"
RENDER = '--render' in sys.argv
EXPORT = '--export' in sys.argv
random.seed(7)

S = 26.0
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
INSULA_AB = (0.585, 0.43); INSULA_R = -math.pi / 2; INSULA_W, INSULA_D = 13.0, 10.83   # ínsula em L (após girar: largura em x, fundo em z)
CAMPO_AB = (1.00, 1.20, 0.02, 0.38)                    # a0,a1,b0,b1
EIRA_AB = (0.05, 0.72); EIRA_R = 2.4
FIGSECA_AB = (0.70, 1.045)        # figueira amaldiçoada: no socalco de cima, à esquerda da estrada
POCO_AB = (0.17, 0.38)           # poço onde antes ficava a figueira
JUM_AB = (0.48, 0.32)            # jumenta e jumentinho, entre a ínsula e a estrada
APRISCO_AB = (0.43, -0.02); APRISCO_K = 1.75; APRISCO_R = 0.52   # gira o vão (no -Y do modelo) para quase de frente à câmera
FORNO_AB = (0.37, 1.03)
COCHO_AB = (0.60, -0.05)         # bebedouro e cocho, ao lado do aprisco
CASA_AB = (0.25, 1.09); CASA_R = math.pi / 4; CASA_K = 1.0     # sobrado (casa nova de dois níveis com escada)
CASA2_AB = (0.50, 1.17); CASA3_AB = (0.99, 0.57)               # casa do alçapão (socalco de cima) e casa do varal (atrás da ínsula)   # casa avulsa à esquerda da eira

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
    else: h = 12.0 + 12.0 * (s - 1) - 3.0 * (s - 1) ** 2                 # depois do alto da estrada o monte segue subindo (o cume fica além)
    dc = max(-1.3, min(1.3, d)); h -= 3.2 * dc * dc - 2.5 * (abs(d) - abs(dc))   # para os lados a encosta torna a subir: morros em volta, sem céu
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
        f = h / P_T; fl = math.floor(f); t = P_T * (fl + sm(0.45, 1.0, f - fl)); h = h + (t - h) * m * 0.7
    return h

# plataformas: casas (em degraus), eira, trigal, carroça
ix, iz = xz(*INSULA_AB); HINS = round(h_base(ix, iz) / 0.5) * 0.5
pad_rect(ix, iz, INSULA_W / 2 + 0.9, INSULA_D / 2 + 0.9, 2.4, HINS)
ex, ez = xz(*EIRA_AB); HEIRA = h_socalco(ex, ez); pad_circ(ex, ez, EIRA_R + 0.9, 2.6, HEIRA)
a0, a1, b0, b1 = CAMPO_AB
cx0, cz1 = xz(a0, b0); cx1, cz0 = xz(a1, b1)
CAMPO = (min(cx0, cx1), max(cx0, cx1), min(cz0, cz1), max(cz0, cz1))
ccx, ccz = (CAMPO[0] + CAMPO[1]) / 2, (CAMPO[2] + CAMPO[3]) / 2
HCAMPO = h_base(ccx, ccz) - 0.3      # (só referência; o trigal acompanha o terreno)
CARRO_AB = (0.925, 0.10); crx, crz = xz(*CARRO_AB); HCARRO = h_socalco(crx, crz + 1.0); pad_rect(crx, crz + 1.0, 2.6, 3.6, 2.6, HCARRO)
# entre o trigal e a carroça, chão plano (o carregador vai e volta sem subir barranco)
apx, apz = xz(*APRISCO_AB); HAPR = h_base(apx, apz); pad_circ(apx, apz, 1.45 * APRISCO_K + 0.6, 2.2, HAPR)
cbx, cbz = xz(*COCHO_AB); HCB = h_base(cbx, cbz); pad_rect(cbx, cbz, 2.4, 1.6, 1.8, HCB)
pcx, pcz = xz(*POCO_AB); HPOCO = h_base(pcx, pcz); pad_circ(pcx, pcz, 1.6, 1.6, HPOCO); pad_circ(pcx + 0.707 * 2.5, pcz - 0.707 * 2.5, 1.3, 1.4, HPOCO)
jmx, jmz = xz(*JUM_AB); HJUM = HINS; pad_circ(jmx, jmz, 1.8, 1.6, HJUM)     # na altura do pátio da ínsula (senão rebaixa o pátio e a escada fica no ar)
fsx, fsz = xz(*FIGSECA_AB); HFIG = HR[dist_estrada(fsx, fsz)[1]]; pad_circ(fsx, fsz, 2.6, 2.0, HFIG)
csx, csz = xz(*CASA_AB); HCASA = h_socalco(csx, csz); pad_rect(csx, csz, 5.8, 5.8, 3.6, HCASA)
c2x, c2z = xz(*CASA2_AB); HC2 = HCASA; pad_rect(c2x, c2z, 4.3, 4.3, 3.6, HC2)
c3x, c3z = xz(*CASA3_AB); HC3 = h_socalco(c3x, c3z); pad_rect(c3x, c3z, 4.3, 4.3, 3.6, HC3)
FOX, FOZ = csx - 0.707 * 5.6 + 0.707 * 1.6, csz + 0.707 * 5.6 + 0.707 * 1.6          # forno à esquerda da casa (na tela), um pouco à frente
MPX, MPZ = FOX + 0.707 * 2.4 + 0.707 * 0.9, FOZ + 0.707 * 2.4 - 0.707 * 0.9          # mesa de pão ao lado
pad_circ(FOX, FOZ, 1.9, 1.8, HCASA); pad_circ(MPX, MPZ, 1.5, 1.6, HCASA)

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
if '--regerar-tudo' not in sys.argv:
    raise SystemExit("betfage_blender.py está travado: ele recria Betfagé do zero e apagaria o que foi feito à mão no "
                     "betfage.blend. Para mexer na fase, abra o betfage.blend e rode EXPORTAR_PARA_O_JOGO. "
                     "Para regerar mesmo assim (numa cópia), rode com --regerar-tudo.")
if EXPORT:
    raise SystemExit("betfage_blender.py: --export foi desligado. Exporte pelo betfage.blend (EXPORTAR_PARA_O_JOGO).")
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
EXT, PASSO = 72.0, 0.8
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
LONGE = False      # objetos ao longe: o jogo instancia (um desenho por modelo)
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
    if jogo and not exporta:
        LAYOUT.append({'glb': arq.replace('\\', '/'), 'no': no, 'p': [round(x, 3), round(y - afunda, 3), round(z, 3)], 'r': round(r, 3), 'k': round(k, 3), **({'f': 1} if LONGE else {})})
        # marcas para o exportador (exportar_betfage.py) ler o objeto de volta do .blend
        n['glb'] = arq.replace('\\', '/'); n['no'] = no; n['r0'] = rz; n['k0'] = o.scale[0]; n['afunda'] = afunda
        n['ordem'] = len(LAYOUT) - 1; n['x0'], n['z0'] = x, z
        if LONGE: n['f'] = 1
    return n

for arq in ['casa-porta\\muros_kit.glb', 'casa-porta\\insula.glb', 'diorama-ciprestes\\ciprestes.glb', 'casa-porta\\casa_porta.glb',
            'casa-porta\\rochas.glb', 'colheita-trigo\\colheita.glb', 'casa-porta\\pastoril.glb', 'casa-porta\\oficios.glb', 'casa-porta\\objetos_casa.glb',
            'casa-porta\\arvores_tripo.glb', 'trigal\\trigo.glb', 'casas\\casas_betfage.glb', 'casa-porta\\arvores_frondosas.glb', 'casa-porta\\arvores_par.glb', 'casa-porta\\muretas.glb', 'casa-porta\\tamareiras.glb',
            'flores\\plantas_betfage.glb']:
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
def perto_casa(x, z, m):
    if abs(x - ix) < INSULA_W / 2 + m and abs(z - iz) < INSULA_D / 2 + m: return True
    return False
def no_campo(x, z, m=0): return CAMPO[0] - m < x < CAMPO[1] + m and CAMPO[2] - m < z < CAMPO[3] + m
def muro(xa, za, xb, zb, alt=0.9, i=0, base=None, esp=None):
    # muretas da prancha: módulos de 2 m repetidos, sem esticar a pedra (ajuste máximo de 15% no comprimento e 25% na altura)
    L = math.hypot(xb - xa, zb - za); mx, mz = (xa + xb) / 2, (za + zb) / 2
    y = min(altura(xa, za), altura(xb, zb), altura(mx, mz)) - 0.1 if base is None else base
    topo = y + alt
    nome, hm = ('Mureta_Baixa', 0.72) if alt < 1.05 else ('Mureta_Alta', 1.32)
    sz = max(0.8, min(1.25, alt / hm)); y0 = topo - hm * sz          # se faltar altura, a base afunda no chão (nunca estica demais)
    o = PROTO[('casa-porta\\muretas.glb', nome)]
    yaw = math.atan2(-(zb - za), xb - xa)
    n = copia(o, col_exp); n.location = (mx, -mz, y0)
    n.rotation_mode = 'XYZ'; n.rotation_euler = (o.rotation_euler[0], o.rotation_euler[1], o.rotation_euler[2] + yaw + (math.pi if i % 2 else 0))
    n.scale = (o.scale[0] * L / 2.0, o.scale[1], o.scale[2] * sz)
    s = 0.0
    while s <= L: OBST.append((round(xa + (xb - xa) * s / L, 2), round(za + (zb - za) * s / L, 2), 0.42)); s += 0.6
ZONAS = [('c', apx, apz, 1.45 * APRISCO_K + 1.6), ('c', FOX, FOZ, 2.6), ('c', MPX, MPZ, 2.2), ('c', pcx, pcz, 2.4), ('c', pcx + 0.707 * 2.5, pcz - 0.707 * 2.5, 1.8), ('c', jmx, jmz, 2.8), ('c', fsx, fsz, 2.4), ('r', cbx, cbz, 2.6, 2.2),
         ('r', csx, csz, 7.0, 7.0), ('r', c2x, c2z, 6.2, 6.2), ('r', c3x, c3z, 6.2, 6.2), ('r', crx, crz, 3.8, 3.2), ('r', (crx + ccx) / 2, (crz + ccz) / 2, abs(crx - ccx) / 2 + 2.6, abs(crz - ccz) / 2 + 2.6)]
def na_zona(x, z, m=0.0):
    for zn in ZONAS:
        if zn[0] == 'c' and math.hypot(x - zn[1], z - zn[2]) < zn[3] + m: return True
        if zn[0] == 'r' and abs(x - zn[1]) < zn[3] + m and abs(z - zn[2]) < zn[4] + m: return True
    return False
def degrau(x, z):
    # atravessa o barranco pelo gradiente: desnível, pé, topo, meio e largura do barranco de verdade (terreno final)
    ga = (h_base(x + 0.1, z) - h_base(x - 0.1, z)) / 0.2; gb = (h_base(x, z + 0.1) - h_base(x, z - 0.1)) / 0.2; gl = math.hypot(ga, gb) or 1
    ux, uz = ga / gl, gb / gl
    perfil = [(k * 0.1, altura(x + ux * k * 0.1, z + uz * k * 0.1)) for k in range(-18, 19)]
    lo = min(h for _, h in perfil[:12]); hi = max(h for _, h in perfil[-12:])
    t1 = next((d for d, h in perfil if h > lo + 0.12), 0.0); t2 = next((d for d, h in perfil if h > hi - 0.12), 0.0)
    return hi - lo, lo, hi, (t1 + t2) / 2, max(0.0, t2 - t1), ux, uz
def muro_linha(pp, alt=0.9, vao=0.12, seg=2.0, filtro=None, arrimo=False):
    # pp: lista (x, z); reamostra por comprimento
    tot = [0.0]
    for i in range(1, len(pp)): tot.append(tot[-1] + math.hypot(pp[i][0] - pp[i - 1][0], pp[i][1] - pp[i - 1][1]))
    if tot[-1] < (3.5 if arrimo else 1): return
    n = max(1, round(tot[-1] / seg))
    def em(s):
        for i in range(1, len(pp)):
            if tot[i] >= s:
                k = (s - tot[i - 1]) / max(1e-6, tot[i] - tot[i - 1]); return (pp[i - 1][0] + (pp[i][0] - pp[i - 1][0]) * k, pp[i - 1][1] + (pp[i][1] - pp[i - 1][1]) * k)
        return pp[-1]
    plano = []
    for i in range(n):
        A = em(tot[-1] * i / n); B = em(tot[-1] * (i + 1) / n); mx, mz = (A[0] + B[0]) / 2, (A[1] + B[1]) / 2
        plano.append(None)
        d, _ = dist_estrada(mx, mz)
        if random.random() < vao or d < MEIA + 0.35 or perto_casa(mx, mz, 0.6) or no_campo(mx, mz, 0.4) or math.hypot(mx - ex, mz - ez) < EIRA_R + 1.2: continue
        if filtro and not filtro(mx, mz): continue
        if na_zona(mx, mz) or na_zona(A[0], A[1]) or na_zona(B[0], B[1]): continue
        if arrimo:
            dh, lo, hi, cm, larg, ux, uz = degrau(mx, mz)
            if dh < 0.8:
                if dh > 0.45 and i % 2 == 0:        # barranco baixo: marca o recorte com pedras alinhadas no alto, sem muro
                    for s_ in (0.15, 0.5, 0.85):
                        px_, pz_ = A[0] + (B[0] - A[0]) * s_ + ux * (cm + 0.35), A[1] + (B[1] - A[1]) * s_ + uz * (cm + 0.35)
                        if not na_zona(px_, pz_, 0.5): poe('casa-porta\\rochas.glb', random.choice(['Rocha1', 'Rocha4', 'Rocha7']), px_, pz_, math.atan2(-(B[1] - A[1]), B[0] - A[0]) + random.random() * 0.4, 0.6 + random.random() * 0.15, afunda=0.1)
                continue
            # o muro fica no meio do barranco, grosso o bastante para cobri-lo, do pé (enterrado 0,2) até um palmo acima do patamar de cima
            A = (A[0] + ux * cm, A[1] + uz * cm); B = (B[0] + ux * cm, B[1] + uz * cm)
            plano[-1] = (A, B, hi + 0.1 - (lo - 0.2), lo - 0.2, min(1.9, max(0.75, larg + 0.45)))
        else: plano[-1] = (A, B, alt, None, None)
    for i, p in enumerate(plano):
        if p is None: continue
        if arrimo and (i == 0 or plano[i - 1] is None) and (i == len(plano) - 1 or plano[i + 1] is None): continue
        muro(p[0][0], p[0][1], p[1][0], p[1][1], p[2], i, base=p[3], esp=p[4])

# arrimo dos socalcos: curvas de nível do relevo base (no pé de cada barranco)
def mascara(x, z):
    a, b = ab(x, z); s = (a + b) / 2; d, _ = dist_estrada(x, z)
    return sm(0.40, 0.48, s) * sm(MEIA + 0.4, MEIA + 1.4, d)
# marching squares sobre h_base / P_T: a linha k + 0.8 é o pé de cada barranco
MS = 0.35; X0 = -S * 0.8; NMS = int(S * 1.6 / MS)
Q = [[h_base(X0 + i * MS, X0 + k * MS) / P_T for k in range(NMS + 1)] for i in range(NMS + 1)]
for nivel in range(1, 12):
    iso = nivel + 0.94
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
                trecho.append((x - ga / gl * 0.05, z - gb / gl * 0.05))
            else:
                if len(trecho) > 3: muro_linha(trecho, alt=P_T * 0.78, vao=0.0, arrimo=True)
                trecho = []
        if len(trecho) > 3: muro_linha(trecho, alt=P_T * 0.78, vao=0.0, arrimo=True)
# muros baixos: beira da estrada embaixo, cercado das ovelhas, atrás do trigal
def ao_lado(i0, i1, lado, off=MEIA + 1.1):
    pp = []
    for i in range(i0, i1, 3):
        p = AMOS[i]; q = AMOS[min(L - 1, i + 1)] - AMOS[max(0, i - 1)]; q.z = 0; q.normalize()
        pp.append((p.x - q.y * off * lado, p.y + q.x * off * lado))
    muro_linha(pp, alt=0.75, vao=0.0, seg=2.6)
def idx_ab(a, b):
    x, z = xz(a, b); return dist_estrada(x, z)[1]
px_, pz_ = apx, apz

# casas: geminadas, em degraus
_ins = poe('casa-porta\insula.glb', 'Insula', ix, iz, INSULA_R, 1.0, y=HINS, afunda=0, jogo=False)
_ins.name = 'Insula_Jogo'; _ins['r0'] = PROTO[('casa-porta\\insula.glb', 'Insula')].rotation_euler.z
INSULA_LAY = {'p': [round(ix, 3), HINS, round(iz, 3)], 'r': INSULA_R}

def plano(x, z, r=0.5):
    for raio in [0.0] + [0.3 * i for i in range(1, 12)]:
        for k in range(1 if raio == 0 else 12):
            px, pz = x + math.cos(k * 0.5236) * raio, z + math.sin(k * 0.5236) * raio
            hs = [altura(px + math.cos(j * 1.047) * r, pz + math.sin(j * 1.047) * r) for j in range(6)] + [altura(px, pz)]
            if max(hs) - min(hs) < 0.12 and dist_estrada(px, pz)[0] > MEIA + 0.3 and not perto_casa(px, pz, 0.3): return px, pz
    return x, z
# aprisco (curral de pedra), bebedouro e cocho, poço, casa avulsa: entram antes das árvores para elas desviarem
ap = poe('casa-porta\\pastoril.glb', 'Muro_Curvo', apx, apz, APRISCO_R, APRISCO_K, y=HAPR, afunda=0.03, exporta=True, jogo=False)
# alarga o vão do curral (o modelo tem ~0,9 m): apaga as pedras a menos de 27° do -Y local
VAO = 27
for ob in [ap] + list(ap.children_recursive):
    if ob.type != 'MESH': continue
    ob.data = ob.data.copy(); bmv = bmesh.new(); bmv.from_mesh(ob.data)
    fora = [fc for fc in bmv.faces if abs(math.degrees(math.atan2(fc.calc_center_median().y, fc.calc_center_median().x)) + 90) < VAO]
    bmesh.ops.delete(bmv, geom=fora, context='FACES'); bmv.to_mesh(ob.data); bmv.free()
RM = 1.14 * APRISCO_K                                   # raio médio da parede
gc = -90 + math.degrees(APRISCO_R)                      # direção do vão no Blender (graus)
for k in range(40):
    ang = k * 9.0
    if abs((ang - gc + 180) % 360 - 180) < VAO + 4: continue
    bx, by = math.cos(math.radians(ang)) * RM, math.sin(math.radians(ang)) * RM
    OBST.append((round(apx + bx, 2), round(apz - by, 2), 0.38))
# porteira fechada: atravessa o vão de uma beira à outra
gcr = math.radians(gc); corda = 2 * RM * math.sin(math.radians(VAO)); dm_ = RM * math.cos(math.radians(VAO))
PK = (corda + 0.25) / 2.63
gx, gy = math.cos(gcr) * dm_, math.sin(gcr) * dm_
poe('casa-porta\\pastoril.glb', 'Porteira', apx + gx, apz - gy, gcr + math.pi / 2, PK, y=HAPR, afunda=0.0)
for s_ in (-0.4, -0.2, 0.0, 0.2, 0.4):
    OBST.append((round(apx + gx - math.sin(gcr) * corda * s_, 2), round(apz - gy - math.cos(gcr) * corda * s_, 2), 0.25))
# bebedouro e cocho afastados um do outro, com passagem entre eles
# comedouro dentro do aprisco, encostado no fundo (longe da porteira); as ovelhas ficam entre ele e a porteira
mjx, mjz = apx - math.cos(gcr) * 0.75, apz + math.sin(gcr) * 0.75
poe('casa-porta\\pastoril.glb', 'Cocho', mjx, mjz, gcr + math.pi / 2, 0.62, y=HAPR, afunda=0.0, exporta=False)
OBST.append((round(mjx, 2), round(mjz, 2), 0.55))
PASTO_C = (apx + math.cos(gcr) * 0.55, apz - math.sin(gcr) * 0.55)
# bebedouro dos bichos junto do poço
poe('casa-porta\\oficios.glb', 'Poco', pcx, pcz, 0.8, 1.0, y=HPOCO, afunda=0.0); OBST.append((round(pcx, 2), round(pcz, 2), 1.15))
bbx, bbz = plano(pcx + 0.707 * 2.5, pcz - 0.707 * 2.5, 0.9); poe('casa-porta\\pastoril.glb', 'Cocho', bbx, bbz, math.pi / 4, 0.75, afunda=0.0); OBST.append((round(bbx, 2), round(bbz, 2), 0.75))
# boca do poço: o modelo não tem fundo (aparecia a grama); um disco de água escura logo abaixo da borda
_hc = Vector((-0.292, 0.112, 0)); _hc.rotate(mathutils.Euler((0, 0, 0.8)))
_bm = bmesh.new(); _c = bmesh.ops.create_circle(_bm, cap_ends=True, segments=16, radius=0.5)
for _v in _bm.verts: _v.co += Vector((pcx + _hc.x, -pcz + _hc.y, HPOCO + 0.55))
_me = bpy.data.meshes.new('Poco_Agua'); _bm.to_mesh(_me); _bm.free()
_ca = _me.color_attributes.new('Col', 'BYTE_COLOR', 'CORNER')
for _l in _ca.data: _l.color_srgb = (0.13, 0.17, 0.17, 1)
_ag = bpy.data.objects.new('Poco_Agua', _me); col_exp.objects.link(_ag); _ag.data.materials.append(mat_vc('Agua'))
poe('casas\\casas_betfage.glb', 'Casa_Sobrado', csx, csz, CASA_R, 1.0, y=HCASA, afunda=0.02)
poe('casas\\casas_betfage.glb', 'Casa_Alcapao', c2x, c2z, math.pi / 4, 1.0, y=HC2, afunda=0.02)
poe('casas\\casas_betfage.glb', 'Casa_Varal', c3x, c3z, -math.pi / 4, 1.0, y=HC3, afunda=0.02)      # porta na face +x: gira para a câmera
CASA_OBST = []     # só para as árvores desviarem; no jogo a casa tem pisos e paredes de verdade (sobe a escada)
for cx_, cz_, hw in [(csx, csz, 3.5), (c2x, c2z, 1.9), (c3x, c3z, 2.0)]:
    for i in range(-3, 4):
        for k in range(-3, 4):
            CASA_OBST.append((cx_ + i * hw / 3, cz_ + k * hw / 3, 0.8))
fox, foz = FOX, FOZ; poe('casa-porta\\oficios.glb', 'Forno_Barro', fox, foz, math.pi / 4, 1.0, afunda=0.03)
OBST += [(round(fox - 0.39, 2), round(foz + 0.39, 2), 0.75), (round(fox + 0.45, 2), round(foz - 0.45, 2), 0.55)]
# mesa de pão: do lado direito do forno (eixo da tela)
mpx, mpz = MPX, MPZ; poe('casa-porta\\oficios.glb', 'Bancada', mpx, mpz, math.pi / 4, 0.85, afunda=0.02); OBST.append((round(mpx, 2), round(mpz, 2), 0.8))
OBST.append((round(fsx, 2), round(fsz, 2), 0.45)); CASA_OBST.append((fsx, fsz, 1.8))     # o jogador chega junto do tronco; árvores ficam longe
OBST.append((round(jmx, 2), round(jmz, 2), 1.6))     # lugar dos jumentos (o jogo põe os animais; árvores não nascem aí)

# árvores, pedras e objetos
def livre(x, z, r=1.0):
    d, _ = dist_estrada(x, z)
    return d > MEIA + 0.6 + r * 0.5 and not perto_casa(x, z, 0.8 + r * 0.4) and not no_campo(x, z, 0.4 + r * 0.4) and math.hypot(x - ex, z - ez) > EIRA_R + 1 + r * 0.4 and not na_zona(x, z, 0.8) and all(math.hypot(x - ox, z - oz) > oR + r * 0.6 for ox, oz, oR in OBST + CASA_OBST)
ARV = []
def arvore(arq, no, x, z, k=1.0, raio=0.6, forca=False):
    if not forca and (not livre(x, z, raio * 1.6) or any(math.hypot(x - ax, z - az) < 3.0 for ax, az in ARV)): return False
    poe(arq, no, x, z, random.random() * 6.28, k, afunda=0.12); ARV.append((x, z)); OBST.append((round(x, 2), round(z, 2), raio)); return True
OLIV = [('casa-porta\\arvores_tripo.glb', n) for n in ['Arvore2', 'Arvore3', 'Arvore8', 'Arvore9']]
NOVAS = [('casa-porta\\arvores_frondosas.glb', 'Arvore_Grande'), ('casa-porta\\arvores_frondosas.glb', 'Arvore_Pequena'), ('casa-porta\\arvores_par.glb', 'Arvores_Par')]     # só árvores modeladas (nada de folha em cartão)
CIP = ('diorama-ciprestes\\ciprestes.glb', 'Cipreste2_Esguio')
# o alto: três ciprestes e grandes pedras ao lado da estrada
for a, b, k in [(0.86, 1.02, 1.25), (0.91, 1.06, 1.15), (1.03, 0.9, 1.3)]:
    x, z = xz(a, b); arvore(*CIP, x, z, k, 0.4, forca=True)
# pedras pequenas enfileiradas na beira da estrada (marcam o caminho)
random.seed(21)
PEQ = [('casa-porta\\rochas.glb', n) for n in ['Rocha1', 'Rocha2', 'Rocha4', 'Rocha5', 'Rocha7', 'Rocha8']]
for i in range(0, len(AMOS) - 1, 5):
    p = AMOS[i]; q = AMOS[min(len(AMOS) - 1, i + 1)] - AMOS[max(0, i - 1)]; q.z = 0
    if q.length < 1e-6: continue
    q.normalize()
    for lado in (1, -1):
        if random.random() < 0.3: continue
        off = MEIA + 0.35 + random.random() * 0.25
        x, z = p.x - q.y * off * lado, p.y + q.x * off * lado
        a_, b_ = ab(x, z)
        if not (-0.15 < a_ < 1.25 and -0.15 < b_ < 1.25) or na_zona(x, z, 0.6) or perto_casa(x, z, 0.8): continue
        poe(*random.choice(PEQ), x, z, random.random() * 6.28, 0.55 + random.random() * 0.3, afunda=0.08); OBST.append((round(x, 2), round(z, 2), 0.35))
# olival à esquerda (nos socalcos) e algumas à direita no alto
ESP = {
    'cedros':    ([CIP, CIP, ('diorama-ciprestes\\ciprestes.glb', 'Cipreste1_Redondo')], 0.95, 0.9, 1.3),
    'carvalhos': ([('casa-porta\\arvores_frondosas.glb', 'Arvore_Grande'), ('casa-porta\\arvores_frondosas.glb', 'Arvore_Pequena'), ('casa-porta\\arvores_par.glb', 'Arvores_Par')], 1.6, 0.5, 0.62),
    'oliveiras': ([('casa-porta\\arvores_tripo.glb', n) for n in ['Arvore1', 'Arvore2', 'Arvore3']], 1.35, 0.85, 1.1),
    'escuras':   ([('casa-porta\\arvores_tripo.glb', n) for n in ['Arvore7', 'Arvore8', 'Arvore9']], 1.25, 0.85, 1.1),
}
def bosque_esp(cx_, cz_, R, n, esp, ok, reg=None):
    lista, r0, k0, k1 = ESP[esp]; feitas = 0; reg = ARV_R if reg is None else reg
    for j in range(n * 12):
        if feitas >= n: break
        ang = random.random() * 6.283; rr = R * math.sqrt(random.random()); x, z = cx_ + math.cos(ang) * rr, cz_ + math.sin(ang) * rr
        k = k0 + random.random() * (k1 - k0); r = r0 * k / ((k0 + k1) / 2)
        if not ok(x, z) or any(math.hypot(x - a_, z - b_) < (r + c_) * 0.92 for a_, b_, c_ in reg): continue
        poe(*random.choice(lista), x, z, random.random() * 6.28, k, afunda=0.12); reg.append((x, z, r)); ARV.append((x, z)); OBST.append((round(x, 2), round(z, 2), 0.5)); feitas += 1
ARV_R = [(x_, z_, r_ * 0.9) for x_, z_, r_ in OBST + CASA_OBST]
dentro_ok = lambda x, z: livre(x, z, 0.5)
bosque_esp(*xz(0.60, 1.17), 3.6, 7, 'carvalhos', dentro_ok)     # carvalhos acima da figueira, à esquerda da estrada
bosque_esp(*xz(0.86, 0.80), 3.2, 7, 'cedros', dentro_ok)        # cedros atrás da ínsula
bosque_esp(*xz(0.04, 0.98), 3.0, 6, 'oliveiras', dentro_ok)     # olival no canto esquerdo, atrás do forno
# tamareira junto do poço
tmx, tmz = pcx - 0.707 * 2.6 + 0.707 * 0.4, pcz + 0.707 * 2.6 + 0.707 * 0.4
if livre(tmx, tmz, 0.4): poe('casa-porta\\tamareiras.glb', 'Tamareiras', tmx, tmz, 0.6, 0.8, afunda=0.1); OBST.append((round(tmx, 2), round(tmz, 2), 0.6))
# figueiras com folhas e a seca
if False:
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
poe('casas\\casas_betfage.glb', 'Peneira_Graos', ex, ez, 3 * math.pi / 4, 5.0, y=HEIRA, afunda=0.01)     # eira nova: 5 m x 3,3 m
for dx, dz, no, k in [(3.4, -2.6, 'Feixe_Pilha', 1.1), (4.2, -0.8, 'Feixe_Pilha', 1.0), (-3.2, -3.0, 'Cesto_Graos', 1.2), (-2.4, -3.8, 'Cesto_Espigas', 1.1)]:
    x, z = plano(ex + dx, ez + dz); poe('colheita-trigo\\colheita.glb', no, x, z, random.random() * 6, k); OBST.append((round(x, 2), round(z, 2), 0.5))
poe('casas\\casas_betfage.glb', 'Trilho_Debulhar', ex - 1.2, ez + 1.2, 3 * math.pi / 4 + 0.4, 1.15, y=HEIRA + 0.1, afunda=0.0); OBST.append((round(ex - 1.2, 2), round(ez + 1.2, 2), 0.6))
for dx, dz in [(3.0, 1.6), (3.6, 2.2), (2.6, 2.4)]:
    x, z = plano(ex + dx, ez + dz, 0.35); poe('casa-porta\\objetos_casa.glb', 'Saco', x, z, random.random() * 6, 1.15)
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
_car = poe('colheita-trigo\\colheita.glb', 'Carroca', crx, crz, -math.pi / 2, 1.0, y=HCARRO, afunda=0.02, jogo=False)
_car.name = 'Carroca_Jogo'; _car['afunda'] = 0.02           # no jogo a carroça é outra (a do kit), posta neste lugar
for a, b in [(0.86, 0.02), (0.88, 0.0), (0.85, -0.01), (0.89, 0.04), (0.87, 0.05)]:
    x, z = xz(a, b); poe('colheita-trigo\\colheita.glb', 'Feixe_EmPe', x, z, random.random() * 6, 1.0); OBST.append((round(x, 2), round(z, 2), 0.3))
cox, coz = jmx, jmz
# arredores da aldeia
for a, b, no in [(0.87, 0.25, 'Cesto_Alca'), (0.80, 0.62, 'Lenha'), (0.86, 0.21, 'Banquinho')]:
    x, z = plano(*xz(a, b)); poe('casa-porta\\objetos_casa.glb', no, x, z, random.random() * 6, 1.2); OBST.append((round(x, 2), round(z, 2), 0.3))
# beira da estrada embaixo: árvores e pedras
for a, b in [(0.05, 0.28), (0.10, 0.44), (0.30, 0.10)]:
    x, z = xz(a, b); arvore('casa-porta\\arvores_tripo.glb', random.choice(['Arvore1', 'Arvore7', 'Arvore9']), x, z, 0.9, 0.4)


# ---------------- sangria: mata e pedras fora do quadrado ----------------
ALTAS = OLIV + [CIP, ('diorama-ciprestes\\ciprestes.glb', 'Cipreste1_Redondo'), ('casa-porta\\arvores_tripo.glb', 'Arvore3')]
BAIXAS = [('casa-porta\\arvores_tripo.glb', n) for n in ['Arvore1', 'Arvore7', 'Arvore9']]
PEDRAS = [('casa-porta\\rochas.glb', n) for n in ['Rocha1', 'Rocha2', 'Rocha4', 'Rocha5', 'Rocha7', 'Rocha8']]
REG = []           # (x, z, r) de tudo que já está no chão de fora: árvore não nasce em pedra, nem pedra em árvore
def cabe(x, z, r): return all(math.hypot(x - a_, z - b_) > r + c_ for a_, b_, c_ in REG)
def grupo(cx_, cz_, R, n, tipo, lista, k0, k1, ok):
    for j in range(n * 3):
        if n <= 0: break
        ang = random.random() * 6.283; rr = R * math.sqrt(random.random())
        x, z = cx_ + math.cos(ang) * rr, cz_ + math.sin(ang) * rr
        k = k0 + random.random() * (k1 - k0); r = (0.62 if tipo == 'mata' else 0.6) * k     # copas encostam (mata fechada), mas tronco não nasce em pedra
        if not ok(x, z) or not cabe(x, z, r): continue
        arq_, no_ = random.choice(lista); kk = k * (0.55 if ('frondosas' in arq_ or 'arvores_par' in arq_) else 1.0)
        poe(arq_, no_, x, z, random.random() * 6.28, kk, afunda=0.15 if tipo == 'mata' else 0.2)
        REG.append((x, z, r)); OBST.append((round(x, 2), round(z, 2), 0.5 if tipo == 'mata' else 0.6 * k)); n -= 1
for x_, z_, r_ in OBST + CASA_OBST + ARV_R: REG.append((x_, z_, r_ * 0.8))
# perto da câmera (bordas da frente): bosquezinhos baixos e montes de pedra, bem separados
random.seed(3)
def perto_ok(x, z):
    a, b = ab(x, z)
    return (a < -0.05 or b < -0.05) and a > -0.75 and b > -0.75 and dist_estrada(x, z)[0] > MEIA + 2.2 and math.hypot(x - ex, z - ez) > 7.0 and not na_zona(x, z, 1.5)
cs = []
for i in range(300):
    a, b = random.uniform(-0.7, 1.15), random.uniform(-0.7, 1.15)
    x, z = xz(a, b)
    if not perto_ok(x, z) or any(math.hypot(x - p_, z - q_) < 8 for p_, q_ in cs): continue
    cs.append((x, z))
    if random.random() < 0.65: bosque_esp(x, z, 3.2, random.randint(5, 8), random.choice(['escuras', 'oliveiras']), perto_ok, REG)


# ---------------- moitas espinhosas e malvas (instanciadas no jogo), sempre de frente para a câmera ----------------
PLANTAS = []
FRENTE = math.pi / 4          # no three.js, girar pi/4 põe a frente do modelo (+z) virada para a câmera
def poe_planta(e, ordem):
    # a planta também vira objeto no Blender (marcado "planta"), para poder ser movida e exportada de volta
    nome, x, y, z, r, k = e
    o = PROTO.get(('flores\\plantas_betfage.glb', nome))
    if o is None: print('FALTA planta', nome); return
    n = copia(o, col_prev); n.location = (x, -z, y); n.rotation_mode = 'XYZ'
    rx, ry, rz = o.rotation_euler; n.rotation_euler = (rx, ry, rz + r); n.scale = tuple(s * k for s in o.scale)
    n['planta'] = nome; n['r0'] = rz; n['k0'] = o.scale[0]; n['afunda'] = 0.04; n['ordem'] = ordem; n['x0'], n['z0'] = x, z
def planta(nome, x, z, k, r_obst=0.0):
    if not livre(x, z, 0.6) or na_zona(x, z, 0.4) or any(math.hypot(x - p[1], z - p[3]) < 1.1 for p in PLANTAS): return False
    PLANTAS.append([nome, round(x, 2), round(altura(x, z) - 0.04, 3), round(z, 2), round(FRENTE + (random.random() - 0.5) * 0.6, 3), round(k, 2)])
    poe_planta(PLANTAS[-1], len(PLANTAS) - 1)
    if r_obst: OBST.append((round(x, 2), round(z, 2), r_obst))
    return True
random.seed(11)
n_m = n_f = 0
for i in range(900):
    a, b = -0.08 + random.random() * 1.2, -0.08 + random.random() * 1.2
    x, z = xz(a, b)
    d, _ = dist_estrada(x, z)
    if n_m < 34:
        g = random.random() < 0.55
        if planta('Moita_Espinhos_Grande' if g else 'Moita_Espinhos_Pequena', x, z, (0.75 + random.random() * 0.45) if g else (0.8 + random.random() * 0.35), 0.45 if g else 0.0): n_m += 1
    elif n_f < 12 and d < MEIA + 3.5:      # malvas floridas à beira da estrada
        if planta('Malva_Rosa', x, z, 0.62 + random.random() * 0.22): n_f += 1
# algumas malvas junto da casa, do poço e da ínsula
for x, z in [(csx + 3.0, csz + 3.2), (pcx + 1.7, pcz + 1.0), (ix + 7.2, iz + 5.0), (ix - 7.0, iz + 4.6)]:
    planta('Malva_Rosa', x, z, 0.72)

# ---------------- ao longe: pequenas matas agrupadas e pedregais, no fundo, nos lados e além do alto ----------------
LONGE = True
random.seed(5)
MATA = [('casa-porta\\arvores_tripo.glb', n) for n in ['Arvore1', 'Arvore2', 'Arvore3', 'Arvore7', 'Arvore8', 'Arvore9']] + NOVAS * 3 + [CIP, CIP, ('diorama-ciprestes\\ciprestes.glb', 'Cipreste1_Redondo')]
REG += []
def longe_ok(x, z):
    a, b = ab(x, z)
    return (a > 1.12 or b > 1.12) and dist_estrada(x, z)[0] > MEIA + 3.0 and not na_zona(x, z, 1.5)
centros = []
for i in range(600):
    a, b = random.uniform(-0.6, 2.4), random.uniform(-0.6, 2.4)
    if not (a > 1.15 or b > 1.15) or a + b > 3.6: continue
    x, z = xz(a, b)
    if not longe_ok(x, z) or any(math.hypot(x - cx_, z - cz_) < 13 for cx_, cz_, _ in centros): continue
    centros.append((x, z, 'mata' if random.random() < 0.7 else 'pedra'))
    if len(centros) >= 34: break
ORDEM = ['cedros', 'carvalhos', 'oliveiras', 'escuras', 'carvalhos', 'cedros', 'oliveiras']
for ic, (cx_, cz_, tipo) in enumerate(centros):
    if tipo == 'mata':
        esp = ORDEM[ic % len(ORDEM)]
        bosque_esp(cx_, cz_, 5.0 if esp == 'carvalhos' else 4.2, random.randint(9, 14), esp, longe_ok, REG)
    else: grupo(cx_, cz_, 3.0, random.randint(7, 11), 'pedra', PEDRAS, 0.9, 2.0, longe_ok)
LONGE = False

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

# ---------------- trigal no plano, ao pé do morro (antes ficava na encosta) ----------------
# O campo vai para onde havia um bosque à direita da carroça. O chão ali é nivelado (um patamar com borda suave),
# o bosque que ocupava o lugar sai, e a encosta onde o campo ficava volta a ser grama.
if '--sem-mudanca' not in sys.argv:
    NOVO = (12.5, 21.9, -23.4, -18.2)                       # x0, x1, z0, z1
    ncx, ncz, nhx, nhz = (NOVO[0] + NOVO[1]) / 2, (NOVO[2] + NOVO[3]) / 2, (NOVO[1] - NOVO[0]) / 2, (NOVO[3] - NOVO[2]) / 2
    amostras = [altura(NOVO[0] + (NOVO[1] - NOVO[0]) * i / 8, NOVO[2] + (NOVO[3] - NOVO[2]) * k / 5) for i in range(9) for k in range(6)]
    HN = round(sum(amostras) / len(amostras), 2)
    FALHA = 2.6                                              # largura da borda que liga o patamar ao terreno em volta
    PADS.append(('r', ncx, ncz, nhx + 0.6, nhz + 0.6, FALHA, HN))
    def na_area(x, z, m): return NOVO[0] - m < x < NOVO[1] + m and NOVO[2] - m < z < NOVO[3] + m
    def no_velho(x, z, m=0.3): return CAMPO[0] - m < x < CAMPO[1] + m and CAMPO[2] - m < z < CAMPO[3] + m
    # 1. terreno e estrada: refaz a altura dos vértices perto do patamar
    for o in (terr, estr):
        for v in o.data.vertices:
            x, z = v.co.x, -v.co.y
            if na_area(x, z, 0.6 + FALHA + 0.2): v.co.z = altura(x, z) + (0.04 if o is estr else 0.0)
        o.data.update()
    # 2. cores do chão: o campo novo ganha a cor de terra do trigal; o velho e a borda do patamar voltam à regra da grama
    rng = random.Random(99); cad = terr.data.color_attributes['Col']
    for p in terr.data.polygons:
        c = p.center; x, z = c.x, -c.y
        if not (no_velho(x, z) or na_area(x, z, 0.6 + FALHA + 0.3)): continue
        n = p.normal; d, _ = dist_estrada(x, z)
        if d < MEIA + 0.4: continue
        if na_area(x, z, 0.3): col = COR['campo']
        elif abs(n.z) < 0.5: col = COR['barranco']
        elif abs(n.z) < 0.75: col = COR['grama2']
        else:
            r = ruido(x, z); j = rng.random() * 0.05
            base = COR['grama'] if r < 0.55 else COR['grama2'] if r < 0.75 else COR['seca']
            col = tuple(min(1, v * (0.97 + j)) for v in base[:3]) + (1,)
        for li in p.loop_indices: cad.data[li].color_srgb = col
    # 3. o bosque e as plantas que ocupavam o lugar saem; quem está na borda do patamar volta a assentar no chão
    def tira(o):
        for c in list(o.children_recursive): bpy.data.objects.remove(c)
        bpy.data.objects.remove(o)
    saem = 0
    for o in list(col_prev.objects) + list(col_exp.objects):
        if o.name not in bpy.data.objects or o.parent is not None: continue
        if o.name.startswith(('Betfage_', 'Poco_Agua')) or o.name in ('Insula_Jogo', 'Carroca_Jogo'): continue
        x, z = o.location.x, -o.location.y
        if na_area(x, z, 2.2 if 'glb' in o else 1.2): tira(o); saem += 1; continue
        if na_area(x, z, 0.6 + FALHA) and ('glb' in o or 'planta' in o): o.location.z = altura(x, z) - o.get('afunda', 0.05)
    OBST[:] = [c for c in OBST if not na_area(c[0], c[1], 1.6)]
    PLANTAS[:] = [e for e in PLANTAS if not na_area(e[1], e[3], 1.2)]
    CAMPO = (NOVO[0], NOVO[1], NOVO[2], NOVO[3]); HCAMPO = HN
    print('TRIGAL novo', CAMPO, 'altura', HN, 'tirados', saem)

# ---------------- para o .blend: referências, colisão e o botão de exportar ----------------
def ponto(nome, x, z, y, rz=0.0, tipo='PLAIN_AXES', tam=0.6):
    e = bpy.data.objects.new(nome, None); col_ref.objects.link(e)
    e.empty_display_type = tipo; e.empty_display_size = tam; e.location = (x, -z, y); e.rotation_euler = (0, 0, rz)
    return e
col_ref = bpy.data.collections.new('Referencia_jogo'); sc.collection.children.link(col_ref)
ponto('JOGO_figseca', fsx, fsz, altura(fsx, fsz), tipo='SINGLE_ARROW', tam=2.0)
ponto('JOGO_pasto', PASTO_C[0], PASTO_C[1], HAPR)
ponto('JOGO_cocho', cox, coz, HJUM, tipo='CIRCLE', tam=1.0)
ponto('JOGO_manjedoura', mjx, mjz, HAPR, rz=gcr + math.pi / 2, tipo='ARROWS')
# o trigal: um retângulo (só desenho) do tamanho do campo
bmq = bmesh.new()
for x, z in [(CAMPO[0], CAMPO[2]), (CAMPO[1], CAMPO[2]), (CAMPO[1], CAMPO[3]), (CAMPO[0], CAMPO[3])]: bmq.verts.new((x, -z, HCAMPO + 0.3))
bmq.faces.new(bmq.verts[:]); meq = bpy.data.meshes.new('Campo_Trigal'); bmq.to_mesh(meq); bmq.free()
cpo = bpy.data.objects.new('Campo_Trigal', meq); col_ref.objects.link(cpo); cpo.display_type = 'WIRE'; cpo.hide_render = True; cpo['y_ref'] = HCAMPO
# medidas que só mudam regerando a fase
fx = bpy.data.texts.new('betfage_fixos')
fx.write(json.dumps({'S': S, 'estrada': [[round(p.x, 2), round(p.y, 2)] for p in AMOS[::3]], 'meia': MEIA, 'eira_r': EIRA_R}))
# círculos de colisão, cada um preso ao objeto dono quando há um (árvore, pedra, planta, muro...)
col_col = bpy.data.collections.new('Colisao'); sc.collection.children.link(col_col)
donos = [o for o in list(col_prev.objects) + list(col_exp.objects) if o.parent is None and ('glb' in o or 'planta' in o or o.name.startswith(('Mureta', 'Muro_', 'Poco_Agua')))]
for o in donos: o['col_feita'] = o.name
bpy.context.view_layer.update()
def caixa_xz(o):
    bb = [o.matrix_world @ Vector(c) for c in o.bound_box]; return min(v.x for v in bb), max(v.x for v in bb), min(-v.y for v in bb), max(-v.y for v in bb)
CX = {o.name: caixa_xz(o) for o in donos}
for i, (x, z, r) in enumerate(OBST):
    exato = [o for o in donos if abs(o.location.x - x) < 0.03 and abs(-o.location.y - z) < 0.03]
    if exato: dono = exato[0]
    else:
        dentro = [o for o in donos if CX[o.name][0] - 0.3 < x < CX[o.name][1] + 0.3 and CX[o.name][2] - 0.3 < z < CX[o.name][3] + 0.3]
        dono = min(dentro, key=lambda o: math.hypot(o.location.x - x, -o.location.y - z)) if dentro else None
    e = bpy.data.objects.new('COL_%03d' % i + ('_' + dono.name if dono else ''), None); col_col.objects.link(e)
    e.empty_display_type = 'CIRCLE'; e.empty_display_size = 1.0; e['colisao'] = 'circ'; e.hide_render = True; e.show_in_front = True
    e.matrix_world = Matrix.Translation((x, -z, altura(x, z) + 0.2)) @ Matrix.Rotation(math.pi / 2, 4, 'X') @ Matrix.Diagonal((r, r, r, 1))
    if dono is not None:
        e['dono'] = 1; e.parent = dono; e.matrix_parent_inverse = dono.matrix_world.inverted()
# o botão de exportar (aba Scripting > EXPORTAR_PARA_O_JOGO > Run Script)
bt = bpy.data.texts.new('EXPORTAR_PARA_O_JOGO')
bt.write("# exporta o que está na cena para o jogo e salva o .blend\nRODAR_EXPORTACAO = True\nexec(open(r'" + OUT + "\\exportar_betfage.py', encoding='utf-8').read())\n")
col_prev.name = 'Cenario_objetos'; col_exp.name = 'Exportar'

if RENDER:
    sc.render.filepath = SCR + '\\betfage_render.png'; bpy.ops.render.render(write_still=True)

if '--blend' in sys.argv or EXPORT:
    bpy.ops.wm.save_as_mainfile(filepath=OUT + '\\betfage_regerado.blend')   # nunca sobrescreve o original
if EXPORT:
    g = {'__name__': 'exportar_betfage'}
    exec(open(OUT + '\\exportar_betfage.py', encoding='utf-8').read(), g)
    g['exporta'](salvar=True)
print('MUROS', len([o for o in col_exp.objects if o.name.startswith('Muro')]))
print('FIM', len(col_exp.all_objects), len(col_prev.all_objects))
