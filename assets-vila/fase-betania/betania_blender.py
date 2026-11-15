# Betânia montada no Blender: terreno (vila plana em y=0, morros em volta), caminhos, muretas, bosques por espécie, pedras.
# Mundo three.js: (x, y, z). Blender: (x, -z, y).
# Os objetos com lógica no jogo (casas com porta, forno, lagar, poço, aprisco, túmulo, barracas, parreira) entram na
# coleção "Referencia_jogo" só para ver o mapa inteiro aqui; quem os põe no jogo é a página (mesmas posições).
# Rodar: no Blender aberto (MCP) ou  blender -b -P betania_blender.py -- --export [--render]
import bpy, bmesh, math, json, os, random, sys
from mathutils import Vector
from mathutils.kdtree import KDTree

ROOT = r"M:\Claude\github\Projects-animais\assets-vila"
OUT = ROOT + r"\fase-betania"
ARGS = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
EXPORT = '--export' in ARGS or globals().get('EXPORTAR', False)
RENDER = '--render' in ARGS
random.seed(7)
def sm(e0, e1, x):
    k = (x - e0) / (e1 - e0); k = 0 if k < 0 else 1 if k > 1 else k
    return k * k * (3 - 2 * k)

# ---------------- o que o jogo já tem (mesmas posições da página) ----------------
CASAS = [(-3, -10.5, 0.1), (6.2, -11, -0.05)]
CASAS_NOVAS = [('Casa_Sobrado', 17.0, -12.0, -0.25), ('Casa_Alcapao', 25.0, -2.5, -0.55), ('Casa_Varal', -26.5, 18.0, 0.35 - math.pi / 2)]
BARRACAS = [('Barraca5', 10.2, -3.4, 0.15), ('Barraca2', 17.8, -3.0, -0.2)]     # feirinha ao sul da estrada, longe das portas
APRISCO = (-13.6, 8.4); FORNO = (1.2, -6.2); LAGAR = (-22.0, 11.5); POCO = (-4.6, 4.6)
LAV = (4.4, 15.6, 7.4, 13.4)
TUMULO = (-18.0, -11.5, -0.38)
PEDRA_TUM = (-13.54, -8.43); FRENTE_TUM = (0.929, 0.371)
PLACA = (-28.5, 5.6)
PATIOS = [(1.6, -6.1, 3.0), (-22.0, 11.5, 3.4), (10.2, -3.4, 2.6), (17.8, -3.0, 2.6), (1.4, -2.8, 4.4), (-2.8, -6.2, 2.6), (-4.6, 4.6, 2.2), (-13.6, 8.4, 3.6)]
# caminhos (iguais aos da página) + o do túmulo
L, F = PEDRA_TUM, FRENTE_TUM
CAMINHOS = [
    ([(-60, 3), (-30, 3.2), (-20, 2.8), (-10, 2.2), (-2, 0.8), (6, 0.4), (12, 1.0), (16, 1.6)], 1.5),
    ([(-2, 0.8), (-2.5, -3.5), (-2.7, -6.6)], 1.0),
    ([(6, 0.4), (6.1, -3.5), (6.3, -7.2)], 1.0),
    ([(12, 1.0), (14.2, -2.2), (14.6, -5.8)], 0.9),
    ([(-10, 2.2), (-7.6, 6.4), (-8.2, 10.6)], 0.9),
    ([(-10, 2.2), (-7.4, -2.4), (L[0] + F[0] * 3.6 + 0.4, L[1] + F[1] * 3.6 + 1.2), (L[0] + F[0] * 1.5, L[1] + F[1] * 1.5)], 0.85),
]
AREA = (-30, 30, -21, 23)          # onde o jogador anda (o chão aqui é plano, y = 0)

# curvas dos caminhos amostradas (catmull-rom, como na página)
def catmull(p0, p1, p2, p3, t):
    t2, t3 = t * t, t * t * t
    return 0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (-p0 + 3 * p1 - 3 * p2 + p3) * t3)
AMOSTRAS = []      # (Vector(x, z, 0), meia largura, índice do caminho)
CURVAS = []
for ci, (pts, larg) in enumerate(CAMINHOS):
    P = [Vector((x, z, 0)) for x, z in pts]; am = []
    for i in range(len(P) - 1):
        p0 = P[max(0, i - 1)]; p1 = P[i]; p2 = P[i + 1]; p3 = P[min(len(P) - 1, i + 2)]
        n = max(4, int((p2 - p1).length / 0.35))
        for k in range(n): am.append(catmull(p0, p1, p2, p3, k / n))
    am.append(P[-1]); CURVAS.append((am, 1.45 * larg))
    for p in am: AMOSTRAS.append((p, 1.45 * larg, ci))
KD = KDTree(len(AMOSTRAS))
for i, (p, w, c) in enumerate(AMOSTRAS): KD.insert(p, i)
KD.balance()
def dist_cam(x, z):
    co, i, d = KD.find(Vector((x, z, 0))); return d - AMOSTRAS[i][1], AMOSTRAS[i][2]
def dist_estrada_jer(x, z):
    am, w = CURVAS[0]; return min(math.hypot(p.x - x, p.y - z) for p in am[::3]) - w

# ---------------- relevo ----------------
def fora(x, z):
    # distância para fora do retângulo arredondado da vila (negativo = dentro)
    qx = abs(x - 0) - 32.0; qz = abs(z - 1.0) - 24.0
    return math.hypot(max(qx, 0), max(qz, 0)) + min(max(qx, qz), 0)
def ruido(x, z): return 0.35 * math.sin(x * 0.21 + 1.3) * math.cos(z * 0.17 - 0.7) + 0.18 * math.sin(x * 0.53 + z * 0.41)
def h_tumulo(x, z):
    # barranco em volta do rochedo: sobe atrás e dos lados; na frente da boca o chão fica plano
    dx, dz = x - PEDRA_TUM[0], z - PEDRA_TUM[1]
    atras = -(dx * FRENTE_TUM[0] + dz * FRENTE_TUM[1]); lado = dx * -FRENTE_TUM[1] + dz * FRENTE_TUM[0]
    return 6.5 * sm(-1.0, 5.0, atras) * math.exp(-(lado / 15.0) ** 2) + 3.5 * sm(5, 18, atras) * math.exp(-(lado / 22.0) ** 2)
def h_base(x, z):
    d = fora(x, z)
    ht = h_tumulo(x, z)
    if d <= 0: return ht
    tras = sm(-12, 14, -(x + z))                          # atrás (longe da câmera): os morros sobem
    sobe = 6.0 * (1 - math.exp(-d / 8)) + 0.30 * d
    desce = -min(2.0, 0.07 * d)                            # na frente a encosta desce de leve (não tampa a câmera)
    h = (sobe * tras + desce * (1 - tras)) * sm(0, 4, d) + ruido(x, z) * sm(0, 6, d)
    # estrada para Jerusalém: vale suave que sobe para o oeste
    if x < -16:
        de = dist_estrada_jer(x, z); he = 0.085 * max(0.0, -22 - x)
        w = 1 - sm(1.5, 9.0, de); h = h * (1 - w) + he * w
    return max(h, ht)
def altura(x, z): return h_base(x, z)

# ---------------- cena ----------------
def limpa_cena():
    for o in list(bpy.data.objects): bpy.data.objects.remove(o, do_unlink=True)
    for c in list(bpy.data.collections): bpy.data.collections.remove(c)
    for blk in (bpy.data.meshes, bpy.data.materials, bpy.data.images, bpy.data.cameras, bpy.data.lights, bpy.data.curves):
        for b in list(blk):
            if b.users == 0: blk.remove(b)
limpa_cena()
sc = bpy.context.scene
def colecao(nome):
    c = bpy.data.collections.new(nome); sc.collection.children.link(c); return c
col_exp = colecao('Cenario_exportado')       # terreno, caminhos, muretas
col_veg = colecao('Vegetacao_e_pedras')      # vai para o layout (o jogo põe e instancia)
col_ref = colecao('Referencia_jogo')         # objetos com lógica: só para ver aqui (o jogo põe sozinho)
col_proto = colecao('Prototipos')

def mat_vc(nome):
    m = bpy.data.materials.new(nome); m.use_nodes = True
    nt = m.node_tree; bs = next(n for n in nt.nodes if n.type == 'BSDF_PRINCIPLED')
    ca = nt.nodes.new('ShaderNodeAttribute'); ca.attribute_name = 'Col'
    nt.links.new(ca.outputs['Color'], bs.inputs['Base Color']); bs.inputs['Roughness'].default_value = 1.0
    return m
def hexc(h): return tuple(int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)) + (1.0,)
COR = {'grama': hexc('a9b46a'), 'grama2': hexc('9caa5f'), 'seca': hexc('bcc27c'), 'terra': hexc('d9bf8c'), 'patio': hexc('e3cc98'), 'barranco': hexc('c4a774')}

# terreno
EXT, PASSO = 78.0, 0.7
N = int(EXT * 2 / PASSO)
bm = bmesh.new(); vs = []
for i in range(N + 1):
    linha = []
    for k in range(N + 1):
        x = -EXT + i * PASSO; z = -EXT + k * PASSO
        linha.append(bm.verts.new((x, -z, altura(x, z))))
    vs.append(linha)
for i in range(N):
    for k in range(N):
        a, b, c, d = vs[i][k], vs[i + 1][k], vs[i + 1][k + 1], vs[i][k + 1]
        if (i + k) % 2 == 0: bm.faces.new((a, b, c)); bm.faces.new((a, c, d))
        else: bm.faces.new((a, b, d)); bm.faces.new((b, c, d))
bmesh.ops.reverse_faces(bm, faces=bm.faces[:])
me = bpy.data.meshes.new('Betania_Terreno'); bm.to_mesh(me); bm.free()
ca = me.color_attributes.new('Col', 'BYTE_COLOR', 'CORNER')
def manchas(x, z): return 0.5 + 0.5 * math.sin(x * 0.19 + 3.1) * math.cos(z * 0.15 + 1.3) * 0.7 + 0.2 * math.sin(x * 0.05 - z * 0.07)
for p in me.polygons:
    c = p.center; x, z = c.x, -c.y; n = p.normal
    dc, _ = dist_cam(x, z)
    terra = max(1 - sm(-0.7, 0.1, dc), max((1 - sm(r * 0.75 - 0.6, r * 0.75 + 0.3, math.hypot(x - px, z - pz))) for px, pz, r in PATIOS))
    if LAV[0] - 0.4 < x < LAV[1] + 0.4 and LAV[2] - 0.4 < z < LAV[3] + 0.4: terra = 1
    r = manchas(x, z); j = random.random() * 0.05
    base = COR['grama'] if r < 0.6 else COR['grama2'] if r < 0.85 else COR['seca']
    if abs(n.z) < 0.6: base = COR['barranco']
    col = tuple(base[i] * (1 - terra) + COR['patio'][i] * terra for i in range(3))
    col = tuple(min(1, v * (0.97 + j)) for v in col) + (1,)
    for li in p.loop_indices: ca.data[li].color_srgb = col
terr = bpy.data.objects.new('Betania_Terreno', me); col_exp.objects.link(terr)
terr.data.materials.append(mat_vc('Terreno'))

# caminhos: faixas coladas no chão
bm = bmesh.new()
for am, w in CURVAS:
    prev = None
    for i, p in enumerate(am):
        q = am[min(len(am) - 1, i + 1)] - am[max(0, i - 1)]; q.z = 0
        if q.length < 1e-6: continue
        q.normalize(); nx, nz = -q.y, q.x
        ww = w * (0.9 + 0.12 * math.sin(i * 0.2))
        row = []
        for jj in range(5):
            s = -1 + jj / 2; x = p.x + nx * ww * s; z = p.y + nz * ww * s
            row.append(bm.verts.new((x, -z, altura(x, z) + 0.03)))
        if prev:
            for jj in range(4): bm.faces.new((prev[jj], prev[jj + 1], row[jj + 1], row[jj]))
        prev = row
bm.normal_update()
for f_ in bm.faces:
    if f_.normal.z < 0: f_.normal_flip()
me = bpy.data.meshes.new('Betania_Caminhos'); bm.to_mesh(me); bm.free()
ca = me.color_attributes.new('Col', 'BYTE_COLOR', 'CORNER')
for p in me.polygons:
    v = 0.97 + random.random() * 0.04
    for li in p.loop_indices: ca.data[li].color_srgb = tuple(c * v for c in COR['terra'][:3]) + (1,)
cam_obj = bpy.data.objects.new('Betania_Caminhos', me); col_exp.objects.link(cam_obj); cam_obj.data.materials.append(mat_vc('Caminhos'))

# ---------------- assets ----------------
PROTO = {}
def importa(arq):
    antes = set(bpy.data.objects)
    bpy.ops.import_scene.gltf(filepath=ROOT + '\\' + arq)
    for o in [o for o in bpy.data.objects if o not in antes]:
        for c in list(o.users_collection): c.objects.unlink(o)
        col_proto.objects.link(o)
        if o.parent is None: o.location = (0, 0, 0); PROTO[(arq, o.name.split('.')[0])] = o
for arq in ['casa-porta\\muretas.glb', 'casa-porta\\rochas.glb', 'casa-porta\\arvores_tripo.glb', 'casa-porta\\arvores_frondosas.glb',
            'casa-porta\\arvores_par.glb', 'diorama-ciprestes\\ciprestes.glb', 'casa-porta\\tamareiras.glb', 'casa-porta\\casa_porta.glb',
            'casa-porta\\barracas.glb', 'casa-porta\\parreiras_tripo.glb', 'casa-porta\\pastoril.glb', 'casa-porta\\oficios.glb',
            'casa-porta\\tumulo_rocha.glb', 'casa-porta\\tumulo_pedra.glb', 'forno-pao\\forno.glb', 'lagar\\lagar.glb', 'casas\\casas_betfage.glb', 'casa-porta\\insula.glb', 'parreiras\\parreiras_v2.glb', 'cesto-uvas\\cesto_uvas.glb', 'flores\\flores.glb', 'flores\\plantas_betfage.glb']:
    importa(arq)
col_proto.hide_render = True; col_proto.hide_viewport = True

def copia(o, col):
    n = o.copy(); col.objects.link(n)
    for c in o.children: cc = copia(c, col); cc.parent = n
    return n
LAYOUT = []; LONGE = False
def poe(arq, no, x, z, r=0.0, k=1.0, y=None, afunda=0.05, col=None, jogo=True):
    o = PROTO.get((arq, no))
    if o is None: print('FALTA', arq, no); return None
    if y is None: y = altura(x, z)
    n = copia(o, col or col_veg)
    n.location = (x, -z, y - afunda); n.rotation_mode = 'XYZ'
    rx, ry, rz = o.rotation_euler; n.rotation_euler = (rx, ry, rz + r)
    n.scale = (o.scale[0] * k, o.scale[1] * k, o.scale[2] * k)
    if jogo: LAYOUT.append({'glb': arq.replace('\\', '/'), 'no': no, 'p': [round(x, 3), round(y - afunda, 3), round(z, 3)], 'r': round(r, 3), 'k': round(k, 3), **({'f': 1} if LONGE else {})})
    return n

# referência dos objetos do jogo (não exportados)
for x, z, r in CASAS:
    for no in ('Casa2', 'Casa2_Porta'):
        if ('casa-porta\\casa_porta.glb', no) in PROTO: poe('casa-porta\\casa_porta.glb', no, x, z, r, 1.0, y=0, afunda=0, col=col_ref, jogo=False)
for no_, x, z, r in CASAS_NOVAS: poe('casas\\casas_betfage.glb', no_, x, z, r, 1.0, y=0, afunda=0.02)
for no, x, z, r in BARRACAS: poe('casa-porta\\barracas.glb', no, x, z, r, 1.0, y=0, afunda=0, col=col_ref, jogo=False)
ap = poe('casa-porta\\pastoril.glb', 'Muro_Curvo', APRISCO[0], APRISCO[1], 0.0, 2.2, y=0, afunda=0, col=col_ref, jogo=False)
if ap: ap.scale.z *= 1.3 / 2.2
poe('casa-porta\\oficios.glb', 'Poco', POCO[0] + 0.2, POCO[1], 0, 0.8, y=0, afunda=0, col=col_ref, jogo=False)
tum = poe('casa-porta\\tumulo_rocha.glb', 'Tumulo_Rocha', TUMULO[0], TUMULO[1], TUMULO[2], 1.0, y=0, afunda=0, col=col_ref, jogo=False)
for nome, (x, z) in [('Forno_Corpo', FORNO), ('Lagar_Rocha', LAGAR)]:
    arq = 'forno-pao\\forno.glb' if nome.startswith('Forno') else 'lagar\\lagar.glb'
    poe(arq, nome, x, z, 0.4 if nome.startswith('Forno') else 0.7, 1.0, y=0, afunda=0, col=col_ref, jogo=False)

# ---------------- zonas livres (nada de árvore, pedra ou muro em cima) ----------------
ZONAS = [(LAGAR[0], LAGAR[1] + 1.5, 5.0)] + [(x, z, 4.6) for x, z, r in CASAS] + [(x, z, 5.2 if 'Sobrado' in n_ else 3.6) for n_, x, z, r in CASAS_NOVAS] + [(x, z, 2.6) for _, x, z, _ in BARRACAS] + [
         (APRISCO[0], APRISCO[1], 4.2), (FORNO[0], FORNO[1], 2.6), (LAGAR[0], LAGAR[1], 3.2), (POCO[0], POCO[1], 2.6), (PLACA[0], PLACA[1], 1.4),
         (TUMULO[0], TUMULO[1], 8.0), (PEDRA_TUM[0] + FRENTE_TUM[0] * 2.5, PEDRA_TUM[1] + FRENTE_TUM[1] * 2.5, 3.0), (-3.6, 12.2, 2.0), (POCO[0] + 2.4, POCO[1] + 1.0, 1.4)]
def livre(x, z, r=0.5):
    if dist_cam(x, z)[0] < 0.8 + r * 0.5: return False
    if LAV[0] - 1.2 - r < x < LAV[1] + 1.2 + r and LAV[2] - 1.2 - r < z < LAV[3] + 1.2 + r: return False
    return all(math.hypot(x - zx, z - zz) > zr + r * 0.5 for zx, zz, zr in ZONAS)
REG = [(zx, zz, zr * 0.8) for zx, zz, zr in ZONAS]
def cabe(x, z, r, fator=0.92): return all(math.hypot(x - a, z - b) > (r + c) * fator for a, b, c in REG)

# ---------------- muretas ----------------
MUR = {}
for nome in ('Mureta_Baixa', 'Mureta_Alta', 'Mureta_Ponta'): MUR[nome] = PROTO.get(('casa-porta\\muretas.glb', nome))
def mureta(xa, za, xb, zb, nome='Mureta_Baixa'):
    o = MUR[nome]
    if o is None: return
    Lg = math.hypot(xb - xa, zb - za); nmod = max(1, round(Lg / 2.0))
    for i in range(nmod):
        x0 = xa + (xb - xa) * i / nmod; z0 = za + (zb - za) * i / nmod; x1 = xa + (xb - xa) * (i + 1) / nmod; z1 = za + (zb - za) * (i + 1) / nmod
        mx, mz = (x0 + x1) / 2, (z0 + z1) / 2
        y = min(altura(x0, z0), altura(x1, z1), altura(mx, mz)) - 0.08
        n = copia(o, col_exp); n.location = (mx, -mz, y); n.rotation_mode = 'XYZ'
        n.rotation_euler = (0, 0, math.atan2(-(z1 - z0), x1 - x0) + (math.pi if i % 2 else 0))
        n.scale = (Lg / nmod / 2.0, 1, 1)
        REG.append((mx, mz, 1.1))
# lavoura: mureta baixa no lado de trás e no lado esquerdo, com uma passagem
x0, x1, z0, z1 = LAV
# corte da estrada de Jerusalém, saindo da vila (os dois lados, onde o morro começa)
for lado in (1, -1):
    pts = [(x, 3.0 + lado * 2.9) for x in (-32.0, -36.0, -40.0, -44.0)]
    for a_, b_ in zip(pts, pts[1:]): mureta(a_[0], a_[1], b_[0], b_[1], 'Mureta_Baixa')

# ---------------- árvores por espécie ----------------
CIP = ('diorama-ciprestes\\ciprestes.glb', 'Cipreste2_Esguio')
ESP = {
    'cedros':    ([CIP, CIP, ('diorama-ciprestes\\ciprestes.glb', 'Cipreste1_Redondo')], 0.95, 0.9, 1.3),
    'carvalhos': ([('casa-porta\\arvores_frondosas.glb', 'Arvore_Grande'), ('casa-porta\\arvores_frondosas.glb', 'Arvore_Pequena'), ('casa-porta\\arvores_par.glb', 'Arvores_Par')], 1.6, 0.5, 0.62),
    'oliveiras': ([('casa-porta\\arvores_tripo.glb', n) for n in ['Arvore1', 'Arvore2', 'Arvore3']], 1.35, 0.85, 1.1),
    'escuras':   ([('casa-porta\\arvores_tripo.glb', n) for n in ['Arvore7', 'Arvore8', 'Arvore9']], 1.25, 0.85, 1.1),
}
def bosque(cx, cz, R, n, esp, ok):
    lista, r0, k0, k1 = ESP[esp]; feitas = 0
    for j in range(n * 14):
        if feitas >= n: break
        ang = random.random() * 6.283; rr = R * math.sqrt(random.random()); x, z = cx + math.cos(ang) * rr, cz + math.sin(ang) * rr
        k = k0 + random.random() * (k1 - k0); r = r0 * k / ((k0 + k1) / 2)
        if not ok(x, z) or not cabe(x, z, r): continue
        poe(*random.choice(lista), x, z, random.random() * 6.28, k, afunda=0.12); REG.append((x, z, r)); feitas += 1
dentro = lambda x, z: livre(x, z, 0.6)
# dentro da vila: poucas e com sentido
poe('casa-porta\\tamareiras.glb', 'Tamareiras', -3.6, 12.2, 0.2, 0.7, afunda=0.05); REG.append((-3.6, 12.2, 1.6))
poe('casa-porta\\pastoril.glb', 'Cocho', POCO[0] + 2.4, POCO[1] + 1.0, math.pi / 4, 0.75, afunda=0.0); REG.append((POCO[0] + 2.4, POCO[1] + 1.0, 1.0))
for x, z, no, k in [(-7.4, -13.6, 'Cipreste2_Esguio', 0.8), (-8.6, -2.4, 'Cipreste1_Redondo', 0.75), (-11.0, -15.2, 'Cipreste2_Esguio', 0.85), (-6.2, -15.8, 'Cipreste2_Esguio', 0.75)]:
    poe('diorama-ciprestes\\ciprestes.glb', no, x, z, random.random() * 6, k, afunda=0.1); REG.append((x, z, 0.9))
bosque(19.5, 3.5, 2.8, 4, 'oliveiras', dentro)        # olival pequeno entre o lagar e a lavoura
bosque(27.0, 16.0, 3.4, 6, 'oliveiras', dentro)       # olival na borda da frente, à direita
bosque(-26.0, -16.0, 3.4, 5, 'cedros', dentro)        # cedros no barranco, atrás do túmulo
bosque(8.0, 19.5, 3.0, 4, 'escuras', dentro)          # bosquezinho na frente
bosque(-6.0, 20.5, 3.0, 4, 'carvalhos', dentro)       # carvalhos na frente
bosque(26.0, -15.0, 3.0, 5, 'escuras', dentro)        # canto de trás, à direita das casas
VINHA = []
for no_, dx, dz, r_ in [('Parreira2_Poste', -1.6, 3.2, 0.2), ('Parreira2_Poste', 0.2, 3.6, -0.3), ('Parreira2_Poste', 2.4, 3.0, 0.5),
                        ('Parreira1_Pergola', -3.6, 0.6, math.pi / 2), ('Parreira3_PergolaCurta', 2.9, 1.6, math.pi / 2 + 0.3)]:
    x_, z_ = LAGAR[0] + dx, LAGAR[1] + dz
    poe('parreiras\\parreiras_v2.glb', no_, x_, z_, r_, 1.0, afunda=0.05); REG.append((x_, z_, 1.0)); VINHA.append((x_, z_))
for dx, dz, r_ in [(2.0, 1.4, 0.3), (-2.1, 1.0, 1.2), (1.4, -2.0, 2.0)]:
    poe('cesto-uvas\\cesto_uvas.glb', 'CestoUvas', LAGAR[0] + dx, LAGAR[1] + dz, r_, 1.0, afunda=0.0); REG.append((LAGAR[0] + dx, LAGAR[1] + dz, 0.5))
# ---------------- flores e moitas espinhosas (instanciadas no jogo) ----------------
LONGE = True
random.seed(17)
FLOR = ['Anemona', 'Asfodelo', 'Ciclame', 'Margarida', 'Tremoco']
def chao_livre(x, z, r=0.5): return livre(x, z, r) and cabe(x, z, r, 1.0) and abs(x) < 33 and -23 < z < 25
# canteiros: cada um de uma flor só, 4 a 7 touceiras juntas, nas beiradas dos caminhos e das casas
cant = 0
for i in range(600):
    if cant >= 22: break
    x, z = random.uniform(-30, 30), random.uniform(-20, 23)
    dc, _ = dist_cam(x, z)
    if not (0.9 < dc < 4.5) or not chao_livre(x, z, 0.6): continue
    flor = random.choice(FLOR); cant += 1
    for j in range(random.randint(4, 7)):
        a_, r_ = random.random() * 6.28, random.random() * 1.3
        px, pz = x + math.cos(a_) * r_, z + math.sin(a_) * r_
        if not chao_livre(px, pz, 0.25): continue
        poe('flores\\flores.glb', 'Flor_%s_%s' % (flor, random.choice(['Touceira', 'Tufo', 'Tufo'])), px, pz, random.random() * 6.28, 0.9 + random.random() * 0.4, afunda=0.02)
        REG.append((px, pz, 0.25))
# moitas espinhosas soltas e em pares, mais nas bordas; malvas floridas junto das casas e do poço
n_m = 0
for i in range(900):
    if n_m >= 46: break
    x, z = random.uniform(-31, 31), random.uniform(-21, 24)
    borda = max(abs(x) / 31, abs(z - 1) / 23)
    if random.random() > 0.35 + borda * 0.65 or not chao_livre(x, z, 0.7): continue
    g = random.random() < 0.55
    poe('flores\\plantas_betfage.glb', 'Moita_Espinhos_Grande' if g else 'Moita_Espinhos_Pequena', x, z, math.pi / 4 + (random.random() - 0.5) * 0.6, (0.8 + random.random() * 0.4) if g else (0.85 + random.random() * 0.3), afunda=0.03)
    REG.append((x, z, 0.7)); n_m += 1
for x, z in [(POCO[0] - 1.6, POCO[1] + 1.4), (-5.6, -7.4), (3.4, -8.0), (8.6, -8.4), (14.2, -7.6), (22.5, -6.0), (-21.5, 15.5), (-7.4, 12.8)]:
    if chao_livre(x, z, 0.4): poe('flores\\plantas_betfage.glb', 'Malva_Rosa', x, z, math.pi / 4 + (random.random() - 0.5) * 0.4, 0.65 + random.random() * 0.2, afunda=0.03); REG.append((x, z, 0.5))
LONGE = False

# fora da vila: matas por espécie, com clareiras; pedregais à parte
LONGE = True
random.seed(5)
def longe_ok(x, z): return fora(x, z) > 0.8 and dist_cam(x, z)[0] > 3.0 and all(math.hypot(x - zx, z - zz) > zr for zx, zz, zr in ZONAS)
centros = []
for i in range(900):
    x, z = random.uniform(-75, 70), random.uniform(-70, 70)
    d = fora(x, z)
    if d < 1.5 or d > 46 or (x + z) > 52: continue        # nada muito à frente da câmera
    if any(math.hypot(x - a, z - b) < 11 for a, b, _ in centros): continue
    centros.append((x, z, 'mata' if random.random() < 0.75 else 'pedra'))
    if len(centros) >= 62: break
ORDEM = ['cedros', 'carvalhos', 'oliveiras', 'escuras', 'carvalhos', 'cedros', 'oliveiras']
PEDRAS = [('casa-porta\\rochas.glb', n) for n in ['Rocha1', 'Rocha2', 'Rocha4', 'Rocha5', 'Rocha7', 'Rocha8']]
for ic, (cx, cz, tipo) in enumerate(centros):
    if tipo == 'mata':
        esp = ORDEM[ic % len(ORDEM)]; bosque(cx, cz, 5.0 if esp == 'carvalhos' else 4.2, random.randint(9, 14), esp, longe_ok)
    else:
        for j in range(random.randint(7, 11) * 3):
            ang = random.random() * 6.283; rr = 3.0 * math.sqrt(random.random()); x, z = cx + math.cos(ang) * rr, cz + math.sin(ang) * rr
            k = 0.9 + random.random() * 1.1
            if longe_ok(x, z) and cabe(x, z, 0.6 * k): poe(*random.choice(PEDRAS), x, z, random.random() * 6.28, k, afunda=0.2); REG.append((x, z, 0.6 * k))
LONGE = False
# pedras pequenas enfileiradas na beira da estrada de Jerusalém e do caminho do túmulo
random.seed(21)
for ci in (0, 5):
    am, w = CURVAS[ci]
    for i in range(0, len(am) - 1, 6):
        p = am[i]; q = am[min(len(am) - 1, i + 1)] - am[max(0, i - 1)]; q.z = 0
        if q.length < 1e-6: continue
        q.normalize()
        for lado in (1, -1):
            if random.random() < 0.35: continue
            off = w + 0.35 + random.random() * 0.25; x, z = p.x - q.y * off * lado, p.y + q.x * off * lado
            if (ci == 0 and -16 < x < 18) or not cabe(x, z, 0.35, 1.0): continue
            poe(*random.choice(PEDRAS), x, z, random.random() * 6.28, 0.5 + random.random() * 0.3, afunda=0.08); REG.append((x, z, 0.35))
# o lugar das sepulturas: algumas pedras grandes junto ao rochedo
for dx, dz, k in [(-3.5, 6.0, 0.9)]:
    x, z = TUMULO[0] + dx, TUMULO[1] + dz
    if cabe(x, z, 0.5, 0.7): poe(*random.choice(PEDRAS), x, z, random.random() * 6, k, afunda=0.15); REG.append((x, z, 0.6 * k))

# ---------------- câmera do jogo e luz (para ver aqui) ----------------
camb = bpy.data.objects.new('Camera_jogo', bpy.data.cameras.new('Camera_jogo')); sc.collection.objects.link(camb); sc.camera = camb
camb.data.lens_unit = 'FOV'; camb.data.angle = math.radians(24 * 1.6); camb.data.clip_end = 600
dirc = Vector((1, 1.15, 1)).normalized(); d3 = Vector((dirc.x, -dirc.z, dirc.y))
alvo = Vector((0, -2, 0)); camb.location = alvo + d3 * 62; camb.rotation_euler = (-d3).to_track_quat('-Z', 'Y').to_euler()
sol = bpy.data.objects.new('Sol', bpy.data.lights.new('Sol', 'SUN')); sc.collection.objects.link(sol)
sol.data.energy = 3.0; sol.data.color = (1.0, 0.93, 0.82); sol.rotation_euler = (math.radians(48), 0, math.radians(-140))
sc.world = bpy.data.worlds.new('Ceu'); sc.world.use_nodes = True
bg = next(n for n in sc.world.node_tree.nodes if n.type == 'BACKGROUND'); bg.inputs['Color'].default_value = (0.78, 0.84, 0.86, 1); bg.inputs['Strength'].default_value = 0.8
for eng in ('BLENDER_EEVEE', 'BLENDER_EEVEE_NEXT'):
    try: sc.render.engine = eng; break
    except TypeError: pass
sc.render.resolution_x, sc.render.resolution_y = 1600, 1000

if RENDER:
    sc.render.filepath = OUT + '\\betania_previa.png'; bpy.ops.render.render(write_still=True)
if EXPORT:
    bpy.ops.object.select_all(action='DESELECT')
    for o in col_exp.all_objects: o.select_set(True)
    bpy.context.view_layer.objects.active = terr
    saida = OUT + '\\betania_cenario.glb'
    bpy.ops.export_scene.gltf(filepath=saida, use_selection=True, export_format='GLB', export_normals=False, export_vertex_color='MATERIAL',
                              export_image_format='WEBP', export_image_quality=80, export_meshopt_compression_enable=True)
    json.dump({'objetos': LAYOUT}, open(OUT + '\\betania_layout.json', 'w'), separators=(',', ':'))
    bpy.ops.wm.save_as_mainfile(filepath=OUT + '\\betania.blend')
    print('EXPORT', os.path.getsize(saida), len(LAYOUT))
print('FIM', len(col_exp.all_objects), len(col_veg.all_objects), len(col_ref.all_objects))
