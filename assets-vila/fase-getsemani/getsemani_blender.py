# Getsêmani: gera a fase no Blender e grava getsemani.blend. Depois, quem manda é o .blend:
# mexa nele e rode o texto EXPORTAR_PARA_O_JOGO (aba Scripting > Run Script).
#
# Uso (só para criar a fase do zero):
#   blender -b --factory-startup -P getsemani_blender.py -- [--regerar-tudo]
# Se getsemani.blend já existe, ele NÃO é sobrescrito sem --regerar-tudo.
#
# Coordenadas do jogo (three.js): x (leste), y (altura); o norte é -z. No Blender: (x, -z, y), o norte é +y.
#
# O lugar (Mt 26.36-46; Mc 14.32-42; Lc 22.39-46; Jo 18.1-2):
#   - a trilha desce do Monte das Oliveiras pelo leste e entra no jardim por um portão na mureta;
#   - logo depois do portão, o lugar onde os oito ficaram sentados ("Sentai-vos aqui, enquanto vou ali orar");
#   - ao norte, a gruta da prensa de azeite (Gat-Shemanim, "prensa de azeite", que dá nome ao jardim);
#   - mais adiante, debaixo de uma oliveira antiga, Pedro, Tiago e João ("ficai aqui e vigiai comigo");
#   - um tiro de pedra adiante (Lc 22.41, uns 27 m), a ROCHA DA AGONIA: uma laje de calcário à flor da terra,
#     entre oliveiras antigas, de frente para o templo do outro lado do Cedrom. Ali Jesus orou de joelhos e
#     o seu suor ficou como grandes gotas de sangue caindo no chão (Lc 22.44).
#   - a oeste, a encosta cai para o vale do Cedrom; Jerusalém fica no alto, do outro lado.
#
# É a manhã do domingo da ressurreição: o discípulo passa pelo jardim, desce ao Cedrom e sobe na diagonal (noroeste)
# até o planalto ao norte do templo, onde fica o Tanque de Betesda, junto à Porta das Ovelhas (Jo 5.2).
# O relevo e a posição de tudo vêm de ../jerusalem/relevo.py (o mesmo da maquete da cidade, jerusalem_maquete.glb,
# que o jogo carrega por cima: o muro do templo, o santuário, a Antônia, o muro norte, a porta e Betesda).
import bpy, bmesh, math, json, os, random, sys
from mathutils import Vector, Matrix
from mathutils.kdtree import KDTree

ROOT = r"M:\Claude\github\Projects-animais\assets-vila"
OUT = os.path.join(ROOT, 'fase-getsemani')
BLEND = os.path.join(OUT, 'getsemani.blend')
ARGV = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
if os.path.exists(BLEND) and '--regerar-tudo' not in ARGV:
    raise SystemExit('getsemani.blend já existe: abra-o e use EXPORTAR_PARA_O_JOGO. Para recriar do zero, rode com --regerar-tudo.')
random.seed(33)


def sm(e0, e1, x):
    k = (x - e0) / (e1 - e0); k = 0 if k < 0 else 1 if k > 1 else k
    return k * k * (3 - 2 * k)


# ---------------- traçado ----------------
TRILHA = [(70, 2), (58, 0), (46, 2.5), (35, 1), (27, 1), (17, 2.5), (7, 0), (-3, -2.5), (-13, -4.5), (-19.5, -7.8),
          # passa ao sul da rocha, sai pelo vão da mureta oeste, desce ao Cedrom e sobe na diagonal até Betesda
          (-24.5, -11.6), (-30, -11.6), (-35, -9.6), (-40, -8.8), (-46, -11), (-52, -14), (-57, -17), (-61.5, -20), (-65, -22.5),
          (-71, -26), (-80, -31), (-90, -36), (-100, -40.5), (-108, -43.8), (-114, -45.2), (-120, -44.6)]
MEIA = 1.1
PORTAO = (27.0, 1.0)                    # o vão na mureta leste
OITO = (17.0, -5.5)                     # onde os oito ficaram
TRES = (-1.0, -6.0)                     # Pedro, Tiago e João
AGONIA = (-27.0, -8.0)                  # a rocha (um tiro de pedra adiante dos três: ~26 m)
GRUTA = (10.0, 15.5)                    # o centro do morrote da gruta (a boca abre para o sul, para a trilha)
JARDIM = (-40.0, 27.0, -20.0, 21.0)     # x0, x1, z0, z1 da mureta em volta
X0, X1, Z0, Z1, PASSO = -140.0, 76.0, -62.0, 40.0, 1.0      # o mesmo NUCLEO_GS da maquete (lá há um buraco do tamanho deste chão)
exec(open(os.path.join(ROOT, 'jerusalem', 'relevo.py'), encoding='utf-8').read())       # h_mundo, LEITO, BETESDA...

pts = [Vector((x, z, 0)) for x, z in TRILHA]


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


def dist_trilha(x, z):
    co, i, d = KD.find(Vector((x, z, 0))); return d, i


# ---------------- relevo ----------------
# o relevo é o do mundo (relevo.py): a encosta do Monte das Oliveiras, o vale do Cedrom e a outra encosta
h_base = h_mundo


HR = [h_base(p.x, p.y) for p in AMOS]
for _ in range(30): HR = [HR[0]] + [(HR[i - 1] + 2 * HR[i] + HR[i + 1]) / 4 for i in range(1, len(HR) - 1)] + [HR[-1]]


def dentro(x, z, m=0.0):
    return JARDIM[0] + m < x < JARDIM[1] - m and JARDIM[2] + m < z < JARDIM[3] - m


P_T = 1.1      # socalcos baixos dentro do jardim


def h_socalco(x, z):
    h = h_base(x, z)
    d, i = dist_trilha(x, z)
    m = sm(MEIA + 2.0, MEIA + 4.5, d) * (1 if dentro(x, z, 1.0) else 0)
    if m > 0:
        f = h / P_T; fl = math.floor(f); t = P_T * (fl + sm(0.6, 1.0, f - fl)); h = h + (t - h) * m * 0.7
    return h


PADS = []
def pad_circ(x, z, r, f, y): PADS.append(('c', x, z, r, 0, f, y))
def pad_rect(x, z, hx, hz, f, y): PADS.append(('r', x, z, hx, hz, f, y))
def h_trilha_em(x, z): d, i = dist_trilha(x, z); return HR[i]


HOI = h_trilha_em(*OITO) - 0.1; pad_circ(OITO[0], OITO[1], 3.0, 2.2, HOI)
HTR = h_trilha_em(*TRES) - 0.1; pad_circ(TRES[0], TRES[1], 2.6, 2.0, HTR)
HAG = h_trilha_em(-19.0, -5.5) - 0.35; pad_circ(AGONIA[0], AGONIA[1], 3.6, 3.0, HAG)


def altura(x, z):
    h = h_socalco(x, z)
    d, i = dist_trilha(x, z)
    w = 1 - sm(MEIA + 0.3, MEIA + 2.2, d)
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
COR = {'grama': hexc('a3ad66'), 'grama2': hexc('96a35c'), 'seca': hexc('c2bd7c'), 'barranco': hexc('c4a774'), 'areia': hexc('dcc596'),
       'olival': hexc('a99c6c'), 'batido': hexc('d2bc90'), 'calcario': hexc('c9bd9e'), 'calc_lado': hexc('a39578'), 'leito': hexc('b5a985'), 'capim': hexc('a7a964'), 'liquen': hexc('aea986'), 'gruta_topo': hexc('8f9a58'), 'gruta': hexc('1c1510')}

# terreno
# grade de 1 m no jardim e na descida até o leito; de 2 m na outra encosta e nas pontas (onde só se passa)
GX = [float(x) for x in range(int(X0), -70, 2)] + [float(x) for x in range(-70, int(X1) + 1)]
GZ = [float(z) for z in range(int(Z0), -30, 2)] + [float(z) for z in range(-30, 30)] + [float(z) for z in range(30, int(Z1) + 1, 2)]      # (o norte é -z)
NX, NZ = len(GX) - 1, len(GZ) - 1
bm = bmesh.new(); vs = []
for i in range(NX + 1):
    linha = []
    for k in range(NZ + 1):
        x = GX[i]; z = GZ[k]
        linha.append(bm.verts.new((x, -z, altura(x, z))))
    vs.append(linha)
for i in range(NX):
    for k in range(NZ):
        a, b, c, d = vs[i][k], vs[i + 1][k], vs[i + 1][k + 1], vs[i][k + 1]
        if (i + k) % 2 == 0: bm.faces.new((a, b, c)); bm.faces.new((a, c, d))
        else: bm.faces.new((a, b, d)); bm.faces.new((b, c, d))
bm.normal_update()
if sum(f.normal.z for f in bm.faces) < 0: bmesh.ops.reverse_faces(bm, faces=bm.faces[:])
me = bpy.data.meshes.new('Getsemani_Terreno'); bm.to_mesh(me); bm.free()
ca = me.color_attributes.new('Col', 'BYTE_COLOR', 'CORNER')


def ruido(x, z): return 0.5 + 0.3 * math.sin(x * 0.21 + 3.1) * math.cos(z * 0.17 + 1.3) + 0.2 * math.sin(x * 0.05 - z * 0.07)


def no_pad(x, z, m=0.0):
    for t, px, pz, p1, p2, f, y in PADS:
        if t == 'c' and math.hypot(x - px, z - pz) < p1 + m: return True
        if t == 'r' and abs(x - px) < p1 + m and abs(z - pz) < p2 + m: return True
    return False


for p in me.polygons:
    c = p.center; x, z = c.x, -c.y; n = p.normal
    d, _ = dist_trilha(x, z)
    if d < MEIA + 0.3: col = COR['areia']
    elif no_pad(x, z): col = COR['batido']
    elif abs(x - LEITO) < 2.6 + 0.8 * math.sin(z * 0.37): col = tuple(min(1, v * (0.9 + random.random() * 0.12)) for v in COR['leito'][:3]) + (1,)
    elif x < -40 and not dentro(x, z):
        # as encostas do vale: manchas de capim seco, terra e pedra que seguem um ruído (e não a inclinação, que no
        # vale só depende de x e desenharia faixas retas); ao pé do muro, o barranco seco e pedregoso
        r = ruido(x * 0.55 + 7, z * 0.55) + (0.25 if x < -86 else 0.0) + (0.08 if abs(n.z) < 0.75 else 0.0)
        base = COR['grama2'] if r < 0.32 else COR['capim'] if r < 0.62 else COR['seca'] if r < 0.88 else COR['calcario']      # mais seco e pedregoso (a pedra aflora)
        col = tuple(min(1, v * (0.95 + random.random() * 0.06)) for v in base[:3]) + (1,)
    elif abs(n.z) < 0.6: col = COR['barranco']
    elif abs(n.z) < 0.8: col = COR['grama2']
    else:
        r = ruido(x, z); j = random.random() * 0.05
        if dentro(x, z): base = COR['olival'] if r < 0.5 else COR['grama2'] if r < 0.7 else COR['grama']      # o chão do olival, batido e sombreado
        else: base = COR['grama'] if r < 0.5 else COR['grama2'] if r < 0.7 else COR['seca']
        col = tuple(min(1, v * (0.97 + j)) for v in base[:3]) + (1,)
    for li in p.loop_indices: ca.data[li].color_srgb = col
terr = bpy.data.objects.new('Getsemani_Terreno', me); col_exp.objects.link(terr)
terr.data.materials.append(mat_vc('Terreno'))

# trilha: faixa colada no relevo
bm = bmesh.new(); prev = None; L = len(AMOS)
for i, p in enumerate(AMOS):
    q = AMOS[min(L - 1, i + 1)] - AMOS[max(0, i - 1)]; q.z = 0; q.normalize()
    nx, nz = -q.y, q.x
    w = MEIA * (0.92 + 0.08 * math.sin(i * 0.17))
    row = []
    for j in range(5):
        s = -1 + j / 2; x = p.x + nx * w * s; z = p.y + nz * w * s
        row.append(bm.verts.new((x, -z, altura(x, z) + 0.07)))
    if prev:
        for j in range(4): bm.faces.new((prev[j], prev[j + 1], row[j + 1], row[j]))
    prev = row
bm.normal_update()
if sum(f.normal.z for f in bm.faces) < 0: bmesh.ops.reverse_faces(bm, faces=bm.faces[:])
me = bpy.data.meshes.new('Getsemani_Trilha'); bm.to_mesh(me); bm.free()
ca = me.color_attributes.new('Col', 'BYTE_COLOR', 'CORNER')
for p in me.polygons:
    v = 0.96 + random.random() * 0.05
    for li in p.loop_indices: ca.data[li].color_srgb = tuple(c * v for c in COR['areia'][:3]) + (1,)
tri = bpy.data.objects.new('Getsemani_Trilha', me); col_exp.objects.link(tri); tri.data.materials.append(mat_vc('Trilha'))


# ---------------- malhas próprias (facetadas, cor de vértice) ----------------
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


def tom(c, k): return tuple(min(1, v * k) for v in c[:3]) + (1,)


# a Rocha da Agonia: laje de calcário à flor da terra, larga e baixa, com o alto quase plano (dá para ajoelhar)
def rocha_agonia():
    cx, cz = AGONIA; N = 15; rnd = random.Random(7)
    raio = [(2.5 + 0.45 * math.sin(a * 2.0 + 0.6) + rnd.uniform(-0.25, 0.25)) for a in [2 * math.pi * i / N for i in range(N)]]
    anel = []        # (fração do raio, altura sobre o pad)
    for f, hh in [(0.0, 0.56), (0.42, 0.53), (0.74, 0.47), (0.93, 0.3), (1.1, -0.3)]:
        r_ = []
        for i in range(N):
            a = 2 * math.pi * i / N; R = raio[i] * f * (1.0 if f < 1.05 else 1.0)
            x = cx + math.cos(a) * R * 1.0; z = cz + math.sin(a) * R * 0.7         # mais comprida no leste-oeste
            y = HAG + hh + (rnd.uniform(-0.08, 0.08) if 0 < f < 1.05 else 0) - 0.1 * (x - cx) / 2.5 + 0.05 * math.sin(a * 3 + f * 4)
            r_.append((x, -z, y))
        anel.append(r_)
    verts = [anel[0][0]]; faces = []
    for r_ in anel[1:]: verts += r_
    for i in range(N): faces.append((0, 1 + i, 1 + (i + 1) % N))
    for k in range(1, len(anel) - 1):
        b0, b1 = 1 + (k - 1) * N, 1 + k * N
        for i in range(N):
            j = (i + 1) % N; faces.append((b0 + i, b1 + i, b1 + j)); faces.append((b0 + i, b1 + j, b0 + j))
    def cores(p):
        lado = p.normal.z < 0.75; k = 0.86 + rnd.random() * 0.16
        if not lado and rnd.random() < 0.18: return tom(COR['liquen'], k)
        return tom(COR['calc_lado'] if lado else COR['calcario'], k)
    o = malha('Rocha_Agonia', verts, faces, cores)
    o['ref'] = 'agonia'
    return o


# a gruta da prensa: um morrote de rocha cortado na frente (paredão) com a boca escura
def gruta():
    cx, cz = GRUTA; R, H = 7.5, 4.2; rnd = random.Random(5)
    nf = Vector((-0.3, -1.0)).normalized()        # a frente olha para o sul (z negativo), um pouco para oeste
    corte = 3.0
    NA, NR = 22, 6
    verts = [(cx, -cz, altura(cx, cz) + H)]; faces = []; frente = set()
    for k in range(1, NR + 1):
        for i in range(NA):
            a = 2 * math.pi * i / NA; r = R * k / NR * (1 + 0.12 * math.sin(a * 3 + 1.0) + 0.08 * math.sin(a * 7 + k)) + rnd.uniform(-0.3, 0.3) * (k < NR)
            x, z = cx + math.cos(a) * r, cz + math.sin(a) * r
            hh = H * (1 - (k / NR) ** 2) ** 0.7 + (rnd.uniform(-0.55, 0.45) if k < NR else -0.3)
            s = (x - cx) * nf.x + (z - cz) * nf.y
            if s > corte:       # a parte da frente é empurrada até o plano do paredão
                x -= (s - corte) * nf.x; z -= (s - corte) * nf.y; frente.add(len(verts))
                hh = max(-0.3, hh * 0.25 - 0.3) if k == NR else hh
            verts.append((x, -z, altura(x, z) + hh))
    for i in range(NA): faces.append((0, 1 + (i + 1) % NA, 1 + i))
    for k in range(1, NR):
        b0, b1 = 1 + (k - 1) * NA, 1 + k * NA
        for i in range(NA):
            j = (i + 1) % NA; faces.append((b0 + i, b1 + j, b1 + i)); faces.append((b0 + i, b0 + j, b1 + j))
    def cores(p):
        lado = p.normal.z < 0.7; k = 0.8 + rnd.random() * 0.18
        if not lado and p.normal.z > 0.8 and rnd.random() < 0.65: return tom(COR['gruta_topo'], k)     # mato por cima do morrote
        return tom(COR['calc_lado'] if lado else COR['calcario'], k)
    o = malha('Gruta_Morro', verts, faces, cores, dupla=True)
    # a boca: um arco escuro rente ao paredão
    bx, bz = cx + nf.x * (corte + 0.06), cz + nf.y * (corte + 0.06); tx, tz = -nf.y, nf.x
    yb = min(altura(bx + tx * s, bz + tz * s) for s in (-1.4, 0, 1.4)) - 0.1
    bv = [(bx, -bz, yb)]; arco = 12
    for i in range(arco + 1):
        a = math.pi * i / arco; s = -math.cos(a) * 1.45; y = yb + 0.1 + math.sin(a) * 2.05 * (1 + 0.06 * math.sin(i * 1.7))
        bv.append((bx + tx * s, -(bz + tz * s), y))
    bf = [(0, i + 1, i + 2) for i in range(arco)]
    boca = malha('Gruta_Boca', bv, bf, lambda p: COR['gruta'], dupla=True)
    return o, (bx, bz), nf


rocha = rocha_agonia()
morro, BOCA, NF = gruta()

# ---------------- o vale do Cedrom: os monumentos, os túmulos cavados e o calcário à mostra ----------------
# As duas encostas do Cedrom eram cemitério (2Rs 23.6; Jr 31.40). Ao sul do jardim, no pé do Monte das Oliveiras e de
# frente para o templo, já estavam lá no tempo de Jesus os túmulos de pedra que ainda se veem: a coluna de Absalão
# (com o teto em cone), a fachada de colunas de Bene Hezir e o bloco de Zacarias (com a pirâmide), cortados na rocha.
# Pelo resto das encostas, túmulos simples, fachadas pequenas com a boca fechada por uma pedra. E o calcário aparece em
# camadas: no vale, a pedra está à flor da terra.
class Formas:
    def __init__(self): self.v, self.f, self.c = [], [], []

    def caixa(self, cx, cz, y0, y1, lx, lz, cor, giro=0.0, var=0.05):
        cs, sn = math.cos(giro), math.sin(giro)
        def P(u, w, y): return (cx + u * cs - w * sn, -(cz + u * sn + w * cs), y)
        b = len(self.v); hx_, hz_ = lx / 2, lz / 2
        for y in (y0, y1):
            for u, w in ((-hx_, -hz_), (hx_, -hz_), (hx_, hz_), (-hx_, hz_)): self.v.append(P(u, w, y))
        for ids, sh in [((4, 5, 6, 7), 1.04), ((0, 1, 5, 4), 0.84), ((1, 2, 6, 5), 0.95), ((2, 3, 7, 6), 0.8), ((3, 0, 4, 7), 0.9)]:
            self.f.append(tuple(b + i for i in ids)); self.c.append(tom(cor, sh * (1 + random.uniform(-var, var))))

    def tronco(self, cx, cz, y0, y1, r0, r1, n, cor, var=0.04):
        """cilindro, tronco de cone ou cone (r1 = 0), com n lados"""
        b = len(self.v)
        for y, r in ((y0, r0), (y1, max(r1, 0.001))):
            for i in range(n):
                a = 2 * math.pi * (i + 0.5) / n; self.v.append((cx + math.cos(a) * r, -(cz + math.sin(a) * r), y))
        for i in range(n):
            j = (i + 1) % n; self.f.append((b + i, b + j, b + n + j, b + n + i)); self.c.append(tom(cor, (0.86 + 0.14 * math.cos(2 * math.pi * (i + 0.5) / n - 0.4)) * (1 + random.uniform(-var, var))))
        self.f.append(tuple(b + n + i for i in range(n))); self.c.append(tom(cor, 1.03))

    def piramide(self, cx, cz, y0, y1, lado, cor):
        b = len(self.v); h = lado / 2
        for u, w in ((-h, -h), (h, -h), (h, h), (-h, h)): self.v.append((cx + u, -(cz + w), y0))
        self.v.append((cx, -cz, y1))
        for i, sh in zip(range(4), (0.84, 0.97, 0.8, 0.92)): self.f.append((b + i, b + (i + 1) % 4, b + 4)); self.c.append(tom(cor, sh))

    def cria(self, nome):
        C = self.c
        return malha(nome, self.v, self.f, lambda p: C[p.index])


MON = {'absalao': (-53.0, 22.0), 'hezir': (-50.0, 30.5), 'zacarias': (-51.5, 37.0)}
fm = Formas(); PEDRA_M = COR['calcario']; SOMBRA_M = hexc('3a3128')


def assento(x, z, lx, lz):
    return min(altura(x + a, z + b) for a in (-lx / 2, lx / 2) for b in (-lz / 2, lz / 2)) - 0.15


def bloco_colunas(cx, cz, y, L, alto):
    """um bloco quadrado com meias-colunas nas quatro faces, arquitrave e a cornija egípcia"""
    fm.caixa(cx, cz, y - 1.0, y + 0.45, L + 0.6, L + 0.6, PEDRA_M)                          # o degrau da base
    fm.caixa(cx, cz, y + 0.45, y + alto, L, L, PEDRA_M)
    for k in range(4):
        s = -L / 2 + L * (k + 0.5) / 4
        for px, pz in ((cx + L / 2 + 0.12, cz + s), (cx - L / 2 - 0.12, cz + s), (cx + s, cz + L / 2 + 0.12), (cx + s, cz - L / 2 - 0.12)):
            fm.tronco(px, pz, y + 0.45, y + alto - 0.6, 0.22, 0.22, 6, tom(PEDRA_M, 1.05))
    fm.caixa(cx, cz, y + alto - 0.6, y + alto - 0.2, L + 0.5, L + 0.5, tom(PEDRA_M, 1.06))     # a arquitrave
    fm.caixa(cx, cz, y + alto - 0.2, y + alto + 0.25, L + 1.0, L + 1.0, tom(PEDRA_M, 1.0))     # a cornija


# a coluna (o "pilar") de Absalão: o bloco, o ático, o tambor e o teto em cone côncavo, com a flor no alto
ax_, az_ = MON['absalao']; ya = assento(ax_, az_, 6.4, 6.4)
bloco_colunas(ax_, az_, ya, 5.2, 5.6)
fm.caixa(ax_, az_, ya + 5.85, ya + 7.1, 4.0, 4.0, PEDRA_M)
fm.tronco(ax_, az_, ya + 7.1, ya + 8.3, 1.75, 1.75, 14, PEDRA_M)
fm.tronco(ax_, az_, ya + 8.3, ya + 8.55, 1.9, 1.9, 14, tom(PEDRA_M, 1.05))
for (r0, r1, h0, h1) in ((1.75, 1.0, 8.55, 9.9), (1.0, 0.45, 9.9, 11.4), (0.45, 0.14, 11.4, 12.6)):
    fm.tronco(ax_, az_, ya + h0, ya + h1, r0, r1, 14, PEDRA_M)
fm.tronco(ax_, az_, ya + 12.6, ya + 13.2, 0.3, 0.0, 8, tom(PEDRA_M, 1.08))
# Bene Hezir: uma fachada cortada no paredão, de frente para o vale (oeste), com duas colunas entre as pilastras
hx_, hz_ = MON['hezir']; yh = assento(hx_ - 0.5, hz_, 2.0, 7.0)
fm.caixa(hx_ + 0.6, hz_, yh - 0.8, yh + 6.0, 2.6, 7.6, tom(PEDRA_M, 0.97))                  # a rocha em volta
fm.caixa(hx_ - 0.72, hz_, yh, yh + 3.9, 0.12, 4.4, SOMBRA_M, var=0.0)                         # o pórtico (escuro)
for s in (-2.6, 2.6): fm.caixa(hx_ - 0.85, hz_ + s, yh, yh + 4.4, 0.5, 0.9, tom(PEDRA_M, 1.05))  # as pilastras
for s in (-0.85, 0.85): fm.tronco(hx_ - 1.0, hz_ + s, yh, yh + 3.9, 0.3, 0.3, 8, tom(PEDRA_M, 1.07))   # as duas colunas
fm.caixa(hx_ - 0.9, hz_, yh + 3.9, yh + 4.9, 0.7, 6.4, tom(PEDRA_M, 1.04))                   # a arquitrave dórica
# Zacarias: um bloco inteiro de rocha (separado do paredão por um corredor), com colunas e a pirâmide em cima
zx_, zz_ = MON['zacarias']; yz = assento(zx_, zz_, 6.0, 6.0)
bloco_colunas(zx_, zz_, yz, 5.0, 5.2)
fm.piramide(zx_, zz_, yz + 5.45, yz + 9.0, 5.4, tom(PEDRA_M, 1.02))
fm.caixa(zx_ + 4.6, zz_, yz - 0.8, yz + 6.2, 2.0, 9.0, tom(PEDRA_M, 0.95))                   # o paredão de trás


def perto_monumento(x, z, m=0.0): return any(math.hypot(x - a, z - b) < 6.5 + m for a, b in MON.values())


# túmulos simples nas duas encostas: a face lisa cortada na pedra e a boca, quase sempre fechada por uma pedra quadrada
rt_ = random.Random(29); n_t = 0
for _ in range(400):
    if n_t >= 22: break
    leste = rt_.random() < 0.6
    x = rt_.uniform(-58.0, -43.0) if leste else rt_.uniform(-96.0, -69.0)
    z = rt_.uniform(-58.0, 36.0)
    if dist_trilha(x, z)[0] < MEIA + 4.0 or perto_monumento(x, z, 2) or (leste and dentro(x, z, -4)): continue
    s = -1 if leste else 1                                   # para onde a face olha: oeste (leste do vale) ou leste
    y = altura(x + s * 0.8, z) - 0.25
    if altura(x - s * 1.0, z) - y < 0.8: continue            # só onde a encosta é íngreme o bastante para um corte
    x -= s * 0.9                                             # metido na encosta: só a face aparece
    fm.caixa(x, z, y - 1.2, y + 2.1, 2.2, 2.4, tom(PEDRA_M, 0.98))
    if rt_.random() < 0.75: fm.caixa(x + s * 1.13, z, y, y + 0.95, 0.12, 0.9, tom(COR['calc_lado'], 0.9))   # a pedra que fecha
    else: fm.caixa(x + s * 1.12, z, y, y + 0.95, 0.04, 0.75, SOMBRA_M, var=0.0)                               # aberto
    n_t += 1
# o calcário em camadas: lajes baixas e compridas, deitadas na encosta
for _ in range(400):
    if n_t >= 22 + 40: break
    leste = rt_.random() < 0.5
    x = rt_.uniform(-60.0, -42.0) if leste else rt_.uniform(-104.0, -66.0)
    z = rt_.uniform(-60.0, 38.0)
    if dist_trilha(x, z)[0] < MEIA + 2.0 or perto_monumento(x, z, 1) or (leste and dentro(x, z, -3)): continue
    y = altura(x, z); L = rt_.uniform(3.0, 7.0)
    fm.caixa(x, z, y - 0.8, y + rt_.uniform(0.12, 0.35), rt_.uniform(0.8, 1.4), L, tom(COR['calc_lado'], rt_.uniform(0.95, 1.08)), giro=rt_.uniform(-0.25, 0.25))
    n_t += 1
cedrom = fm.cria('Cedrom_Pedra')
CEDROM_PEDRAS = n_t

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
            'casa-porta\\objetos_casa.glb', 'prensa-azeite\\prensa.glb']:
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


def circulo(nome, x, z, r, dono=None, y=None):
    e = bpy.data.objects.new(nome, None); col_colis.objects.link(e)
    e.empty_display_type = 'CIRCLE'; e.empty_display_size = 1.0; e['colisao'] = 'circ'; e.hide_render = True; e.show_in_front = True
    e.matrix_world = Matrix.Translation((x, -z, (altura(x, z) if y is None else y) + 0.2)) @ Matrix.Rotation(math.pi / 2, 4, 'X') @ Matrix.Diagonal((r, r, r, 1))
    if dono is not None:
        e['dono'] = 1; e.parent = dono; e.matrix_parent_inverse = dono.matrix_world.inverted()
        dono['col_feita'] = dono.name
    return e


def empty_ref(nome, x, z, y=None, r=0.0, tipo='SINGLE_ARROW', tam=1.5):
    e = bpy.data.objects.new(nome, None); col_ref.objects.link(e)
    e.empty_display_type = tipo; e.empty_display_size = tam; e.show_in_front = True
    e.location = (x, -z, altura(x, z) if y is None else y); e.rotation_euler = (0, 0, r)
    return e


def perto_gruta(x, z, m=0.0): return math.hypot(x - GRUTA[0], z - GRUTA[1]) < 8.0 + m or math.hypot(x - BOCA[0] - NF.x * 2, z - BOCA[1] - NF.y * 2) < 3.5 + m
ZONAS = [('c', OITO[0], OITO[1], 3.4), ('c', TRES[0], TRES[1], 2.4), ('c', AGONIA[0], AGONIA[1], 4.2), ('c', PORTAO[0], PORTAO[1], 3.0)]
def na_zona(x, z, m=0.0):
    if perto_gruta(x, z, m) or perto_monumento(x, z, m): return True
    if x < AGONIA[0] and abs(z - AGONIA[1]) < 3 + 0.5 * (AGONIA[0] - x): return True       # da rocha, a vista do templo fica livre
    for zn in ZONAS:
        if math.hypot(x - zn[1], z - zn[2]) < zn[3] + m: return True
    return False


# círculos de colisão da rocha (o jogador ajoelha ao lado, não sobe) e do morro da gruta (a boca fica livre)
for a in range(0, 360, 30):
    rx, rz = AGONIA[0] + math.cos(math.radians(a)) * 1.7, AGONIA[1] + math.sin(math.radians(a)) * 1.1
    circulo('COL_Rocha_%d' % a, rx, rz, 1.05, rocha)['fixo'] = 1      # vários por dono: não se juntam no pé dele
for i in range(26):
    a = 2 * math.pi * i / 26; x, z = GRUTA[0] + math.cos(a) * 5.4, GRUTA[1] + math.sin(a) * 5.4
    s = (x - GRUTA[0]) * NF.x + (z - GRUTA[1]) * NF.y
    if s > 2.2: x -= (s - 2.2) * NF.x; z -= (s - 2.2) * NF.y
    circulo('COL_Gruta_%d' % i, x, z, 2.2, morro)['fixo'] = 1
circulo('COL_Gruta_c', GRUTA[0], GRUTA[1], 4.0, morro)['fixo'] = 1

# ---------------- mureta em volta do jardim (pedra seca, módulos de 2 m), com o portão no leste ----------------
MUROS = []
MUR = PROTO[('casa-porta\\muretas.glb', 'Mureta_Baixa')]
def muro(xa, za, xb, zb):
    L = math.hypot(xb - xa, zb - za); mx, mz = (xa + xb) / 2, (za + zb) / 2
    ya, yb, ym = altura(xa, za), altura(xb, zb), altura(mx, mz)
    y = min((ya + yb) / 2, ym) - 0.12
    yaw = math.atan2(-(zb - za), xb - xa); ang = math.atan2(yb - ya, L)
    n = copia(MUR, col_exp)
    n.matrix_world = (Matrix.Translation((mx, -mz, y)) @ Matrix.Rotation(yaw, 4, 'Z') @ Matrix.Rotation(-ang, 4, 'Y')
                      @ MUR.rotation_euler.to_matrix().to_4x4() @ Matrix.Diagonal((MUR.scale[0] * L / 2.0, MUR.scale[1], MUR.scale[2], 1)))
    MUROS.append([round(xa, 2), round(za, 2), round(xb, 2), round(zb, 2)])


def lado(xa, za, xb, zb, vao=None):
    L = math.hypot(xb - xa, zb - za); n = max(1, round(L / 2.0))
    for i in range(n):
        a = (xa + (xb - xa) * i / n, za + (zb - za) * i / n); b = (xa + (xb - xa) * (i + 1) / n, za + (zb - za) * (i + 1) / n)
        if vao and vao[0] < (a[1] + b[1]) / 2 < vao[1]: continue
        if random.random() < 0.06: continue        # alguns trechos caídos
        muro(a[0], a[1], b[0], b[1])


jx0, jx1, jz0, jz1 = JARDIM
lado(jx1, jz0, jx1, jz1, vao=(PORTAO[1] - 2.6, PORTAO[1] + 2.6))      # leste, com o portão
lado(jx1, jz1, jx0, jz1); lado(jx0, jz1, jx0, jz0, vao=(-8.8 - 2.6, -8.8 + 2.6)); lado(jx0, jz0, jx1, jz0)      # o oeste, com a saída para o Cedrom

# ---------------- oliveiras ----------------
oli = PROTO[('oliveiras\\oliveiras.glb', 'Oliveira1_Jovem')]; H_OLI = dims(oli)[2]
K_OLI = 4.2 / max(0.1, H_OLI)
ANTIGAS = ['Oliveira4_Ancia', 'Oliveira2_Retorcida', 'Oliveira4_Ancia', 'Oliveira3_Vaso']
NOVAS = ['Oliveira1_Jovem', 'Oliveira2_Retorcida', 'Oliveira3_Vaso', 'Oliveira4_Ancia']
ARV = []
def oliveira(px, pz, nome, k, perto):
    n = poe('oliveiras\\oliveiras.glb', nome, px, pz, random.uniform(0, 6.28), k, afunda=0.12, longe=not perto)
    if n is not None and perto: circulo('COL_' + n.name, px, pz, 0.5 if k > K_OLI * 1.1 else 0.45, n)
    ARV.append((px, pz))


# as antigas em volta da rocha, dos lados norte e sul: o leste (por onde se chega) e o oeste (o templo) ficam abertos
for a, r_ in [(62, 6.2), (95, 6.8), (128, 6.0), (-62, 7.2), (-97, 6.8), (-130, 7.2)]:
    px, pz = AGONIA[0] + math.cos(math.radians(a)) * r_, AGONIA[1] + math.sin(math.radians(a)) * r_
    oliveira(px, pz, random.choice(ANTIGAS[:2]), K_OLI * random.uniform(1.15, 1.35), True)
# a dos três
oliveira(TRES[0] - 1.6, TRES[1] - 2.6, 'Oliveira4_Ancia', K_OLI * 1.35, True)
x = X0 + 3
while x < X1 - 3:
    z = Z0 + 3 + (2.7 if int((x - X0) / 5.4) % 2 else 0)
    while z < Z1 - 3:
        px, pz = x + random.uniform(-1.4, 1.4), z + random.uniform(-1.4, 1.4)
        d, _ = dist_trilha(px, pz)
        ok = d > MEIA + 2.6 and not na_zona(px, pz, 1.2) and not any(math.hypot(px - a, pz - b) < 4.2 for a, b in ARV)
        borda = min(abs(px - jx0), abs(px - jx1), abs(pz - jz0), abs(pz - jz1))
        if ok and borda > 1.6 and px > -58:
            if dentro(px, pz):
                oliveira(px, pz, random.choice(ANTIGAS), K_OLI * random.uniform(0.95, 1.25), True)
            elif random.random() < 0.55:
                perto = d < 14 and -30 < pz < 48 and px > -62
                oliveira(px, pz, random.choice(NOVAS), K_OLI * random.uniform(0.7, 1.05), perto)
        z += 5.4
    x += 5.4

# ---------------- pedras e moitas ----------------
ROCHAS = ['Rocha%d' % i for i in range(1, 10)]
for _ in range(120):
    px, pz = random.uniform(X0 + 30, X1 - 4), random.uniform(-45, 45)
    d, _i = dist_trilha(px, pz)
    if d < MEIA + 0.8 or na_zona(px, pz, 0.8) or any(math.hypot(px - a, pz - b) < 1.6 for a, b in ARV): continue
    perto = d < 12 and abs(pz) < 24
    k = random.uniform(0.45, 1.0) if perto else random.uniform(0.9, 1.7)
    n = poe('casa-porta\\rochas.glb', random.choice(ROCHAS), px, pz, random.uniform(0, 6.28), k, afunda=0.12, longe=not perto)
    if n is not None and perto and k > 0.7: circulo('COL_' + n.name, px, pz, 0.3 * k + 0.1, n)
# pedras no leito do Cedrom (seco nesta época: cascalho e pedras roladas)
for _ in range(55):
    px, pz = LEITO + random.uniform(-2.4, 2.4), random.uniform(-60, 38)
    d, _i = dist_trilha(px, pz)
    if d < MEIA + 0.8: continue
    perto = d < 12
    k = random.uniform(0.35, 0.8)
    n = poe('casa-porta/rochas.glb', random.choice(ROCHAS), px, pz, random.uniform(0, 6.28), k, afunda=0.15, longe=not perto)
    if n is not None and perto and k > 0.6: circulo('COL_' + n.name, px, pz, 0.3 * k + 0.1, n)
# pedras e moitas nas encostas do vale (o lado da cidade é mais seco e pedregoso)
for _ in range(60):
    px, pz = random.uniform(-110, -42), random.uniform(-60, 38)
    d, _i = dist_trilha(px, pz)
    if d < MEIA + 1.0 or perto_monumento(px, pz): continue
    perto = d < 10
    k = random.uniform(0.5, 1.2) if perto else random.uniform(0.8, 1.9)
    n = poe('casa-porta/rochas.glb', random.choice(ROCHAS), px, pz, random.uniform(0, 6.28), k, afunda=0.2, longe=not perto)
    if n is not None and perto and k > 0.7: circulo('COL_' + n.name, px, pz, 0.3 * k + 0.1, n)
for _ in range(60):
    px, pz = random.uniform(-110, -42), random.uniform(-60, 38)
    d, _i = dist_trilha(px, pz)
    if d < MEIA + 0.6 or perto_monumento(px, pz): continue
    nome = random.choice(['Moita_Espinhos_Pequena', 'Moita_Espinhos_Pequena', 'Malva_Rosa'])
    poe('flores\\plantas_betfage.glb', nome, px, pz, random.uniform(0, 6.28), random.uniform(0.7, 1.15), afunda=0.05, planta=True)
for _ in range(200):
    px, pz = random.uniform(-60, 72), random.uniform(-30, 30)
    d, _i = dist_trilha(px, pz)
    if d < MEIA + 0.6 or na_zona(px, pz, 0.3): continue
    if dentro(px, pz) and random.random() < 0.6: continue          # o chão do jardim é mais limpo
    nome = random.choice(['Moita_Espinhos_Pequena', 'Moita_Espinhos_Pequena', 'Malva_Rosa', 'Moita_Espinhos_Grande'])
    poe('flores\\plantas_betfage.glb', nome, px, pz, random.uniform(0, 6.28), random.uniform(0.7, 1.05), afunda=0.05, planta=True)

# ---------------- os lugares ----------------
# os oito: pedras baixas para sentar, numa roda
for i, a in enumerate(range(0, 360, 50)):
    px, pz = OITO[0] + math.cos(math.radians(a)) * 2.4, OITO[1] + math.sin(math.radians(a)) * 2.4
    n = poe('casa-porta\\rochas.glb', random.choice(['Rocha2', 'Rocha4', 'Rocha6']), px, pz, random.uniform(0, 6.28), 0.55, y=HOI, afunda=0.1)
    if n is not None: circulo('COL_' + n.name, px, pz, 0.32, n)
empty_ref('JOGO_oito', OITO[0], OITO[1], y=HOI, r=0.0, tam=2.0)
# os três: pedras ao pé da oliveira antiga
for dx, dz, nome in [(1.2, 0.8, 'Rocha2'), (-0.6, 1.4, 'Rocha4'), (0.4, -1.2, 'Rocha6')]:
    n = poe('casa-porta\\rochas.glb', nome, TRES[0] + dx, TRES[1] + dz, random.uniform(0, 6.28), 0.6, y=HTR, afunda=0.1)
    if n is not None: circulo('COL_' + n.name, TRES[0] + dx, TRES[1] + dz, 0.34, n)
empty_ref('JOGO_tres', TRES[0], TRES[1], y=HTR, tam=2.0)
# a rocha: o lugar onde se ajoelha fica a leste dela, de frente para oeste (o templo)
empty_ref('JOGO_agonia', AGONIA[0] + 3.2, AGONIA[1] + 0.4, y=HAG, r=math.pi / 2, tam=2.0)
empty_ref('JOGO_rocha', AGONIA[0], AGONIA[1], y=HAG + 0.78, tipo='SPHERE', tam=0.6)
# a gruta: a prensa na boca, cestos e jarros em volta
px, pz = BOCA[0] + NF.x * 2.2, BOCA[1] + NF.y * 2.2; pr = math.atan2(-NF.y, NF.x) - math.pi / 2
HPR = altura(px, pz)
prensa = bpy.data.objects.new('Prensa_Jogo', None); col_ref.objects.link(prensa)
prensa.empty_display_type = 'PLAIN_AXES'; prensa.empty_display_size = 2.0; prensa.show_in_front = True
prensa.location = (px, -pz, HPR); prensa.rotation_euler = (0, 0, pr)
for o in list(col_proto.objects):
    if o.name.startswith('Prensa_') and o.parent is None:
        n = copia(o, col_prev); n.parent = prensa
        n.location = (o.location.x, o.location.y - 56.0, o.location.z)       # o kit vem com o centro em (0, 56) no Blender
        n['prensa'] = 1
prensa['glb'] = 'prensa-azeite/prensa.glb'
circulo('COL_Prensa', px, pz, 1.6, prensa, y=HPR)
tx, tz = -NF.y, NF.x
for s, f, arq, no in [(2.6, 0.8, 'casa-porta\\objetos_casa.glb', 'Jarro_Alto'), (3.1, 0.3, 'casa-porta\\objetos_casa.glb', 'Jarra_Alca'),
                      (-2.7, 0.6, 'casa-porta\\objetos_casa.glb', 'Cesto_Oval'), (-3.1, 1.4, 'casa-porta\\objetos_casa.glb', 'Saco')]:
    gx, gz = BOCA[0] + tx * s + NF.x * f, BOCA[1] + tz * s + NF.y * f
    n = poe(arq, no, gx, gz, random.uniform(0, 6.28), 1.0, afunda=0.02)
    if n is not None: circulo('COL_' + n.name, gx, gz, 0.35, n)
empty_ref('JOGO_portao', PORTAO[0], PORTAO[1], tam=2.0)
# o Cedrom: onde a trilha cruza o leito; a Porta das Ovelhas: a soleira, no alto da escada (a seta aponta para dentro)
_ic = min(range(len(AMOS)), key=lambda i: abs(AMOS[i].x - LEITO))
empty_ref('JOGO_cedrom', AMOS[_ic].x, AMOS[_ic].y, tam=2.0)
# o fim da trilha: o planalto ao norte do templo, a leste de Betesda e da Porta das Ovelhas (a seta aponta o oeste)
empty_ref('JOGO_betesda', AMOS[-1].x, AMOS[-1].y, r=math.pi / 2, tam=2.0)


fixos = {'estrada': [[round(p.x, 2), round(p.y, 2)] for p in AMOS[::3]] + [[round(AMOS[-1].x, 2), round(AMOS[-1].y, 2)]], 'meia': MEIA, 'muros': MUROS,
         'area': [-134.0, X1 - 8, -58, 26], 'jardim': list(JARDIM)}
t = bpy.data.texts.new('getsemani_fixos'); t.write(json.dumps(fixos))
bt = bpy.data.texts.new('EXPORTAR_PARA_O_JOGO')
bt.write("# exporta o que está na cena para o jogo e salva o .blend\nRODAR_EXPORTACAO = True\nexec(open(r'" + os.path.join(OUT, 'exportar_getsemani.py') + "', encoding='utf-8').read())\n")

# luz e câmera para as prévias
sol = bpy.data.lights.new('Sol', 'SUN'); sol.energy = 3.5; so = bpy.data.objects.new('Sol', sol); sc.collection.objects.link(so); so.rotation_euler = (math.radians(50), 0, math.radians(-30))
w = bpy.data.worlds.new('Ceu'); sc.world = w; w.use_nodes = True
bg = next(n for n in w.node_tree.nodes if n.type == 'BACKGROUND'); bg.inputs['Color'].default_value = (0.82, 0.86, 0.84, 1); bg.inputs['Strength'].default_value = 0.9
cam = bpy.data.cameras.new('Cam'); cam.lens = 24; co = bpy.data.objects.new('Cam', cam); sc.collection.objects.link(co); sc.camera = co
cam.clip_end = 900

os.makedirs(OUT, exist_ok=True)
bpy.ops.wm.save_as_mainfile(filepath=BLEND)
print('FIM', len([o for o in bpy.data.objects if 'glb' in o]), 'objetos', CEDROM_PEDRAS, 'pedras do Cedrom', len(MUROS), 'muros', len(ARV), 'oliveiras',
      'rocha a %.1f m dos tres' % math.hypot(AGONIA[0] - TRES[0], AGONIA[1] - TRES[1]))
