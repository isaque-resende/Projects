# Gólgota e o sepulcro: gera a fase no Blender e grava golgota.blend. Depois, quem manda é o .blend:
# mexa nele e rode o texto EXPORTAR_PARA_O_JOGO (aba Scripting > Run Script).
#
# Uso (só para criar a fase do zero):
#   blender -b --factory-startup -P golgota_blender.py -- [--regerar-tudo]
# Se golgota.blend já existe, ele NÃO é sobrescrito sem --regerar-tudo.
#
# Coordenadas da fase (three.js): x (leste), y (altura); o norte é -z. A origem é o pé do rochedo do Gólgota. No
# Blender: (x, -z, y), o norte é +y. A fase é um pedaço do "mundo" de ../jerusalem (a maquete), em escala 1:1: o ponto
# (0, 0) daqui é o 'golgota' de jerusalem_lugares.json; o jogo põe a maquete deslocada, e a cidade aparece no lugar certo
# (a Porta de Genat a ~70 m, a sudeste; o segundo muro, a leste).
#
# O lugar (Mt 27.33-61; Mc 15.22-47; Lc 23.33-56; Jo 19.17-42; 20.1-10):
#   - fora da porta (Hb 13.12), perto da cidade (Jo 19.20), junto a um caminho ("os que passavam", Mt 27.39): a estrada
#     que sai da Porta de Genat para Emaús atravessa a fase de sudeste a noroeste;
#   - o Gólgota, "o lugar da Caveira" (Jo 19.17): um rochedo de calcário que ficou de pé numa pedreira velha (é o que a
#     arqueologia achou debaixo da Igreja do Santo Sepulcro), com a face para a estrada gasta em cavidades que lembram
#     uma caveira; no alto, as três cruzes, vazias: é a manhã do domingo;
#   - "no lugar onde fora crucificado havia um horto, e no horto um sepulcro novo" (Jo 19.41): a oeste, a parede da
#     pedreira, uma crista de rocha onde se cavavam túmulos; num deles, o sepulcro novo de José de Arimateia, "aberto em
#     rocha" (Mc 15.46), com a pedra "muito grande" já revolvida (Mc 16.4). Na frente dele, o horto, com mureta.
import bpy, bmesh, math, json, os, random, sys
from mathutils import Vector, Matrix
from mathutils.kdtree import KDTree

ROOT = r"M:\Claude\github\Projects-animais\assets-vila"
OUT = os.path.join(ROOT, 'fase-golgota')
BLEND = os.path.join(OUT, 'golgota.blend')
ARGV = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
if os.path.exists(BLEND) and '--regerar-tudo' not in ARGV:
    raise SystemExit('golgota.blend já existe: abra-o e use EXPORTAR_PARA_O_JOGO. Para recriar do zero, rode com --regerar-tudo.')
random.seed(19)


def sm(e0, e1, x):
    k = (x - e0) / (e1 - e0); k = 0 if k < 0 else 1 if k > 1 else k
    return k * k * (3 - 2 * k)


exec(open(os.path.join(ROOT, 'jerusalem', 'relevo.py'), encoding='utf-8').read())       # h_mundo
LUGW = json.load(open(os.path.join(ROOT, 'jerusalem', 'jerusalem_lugares.json'), encoding='utf-8'))
GW = LUGW['golgota']                                    # o rochedo, no mundo da maquete
H0 = h_mundo(GW[0], GW[2])

# ---------------- traçado ----------------
ESTRADA = [(54, 57), (48, 46), (38, 36), (24, 20), (13, 5), (11, -8), (5, -22), (-10, -33), (-28, -40), (-44, -46)]     # da Porta de Genat (sudeste) para Emaús (noroeste)
MEIA = 1.5
CAMINHO = [(12.6, 2.0), (7.0, 8.8), (-3.0, 9.6), (-12.5, 6.0), (-21.0, 2.6), (-29.6, -1.4)]          # da estrada ao portão do horto e ao sepulcro
MEIA_C = 0.8
GOL = (-2.0, -8.0)                                      # o centro do monte do Gólgota
H_G, RW_G, RE_G, RZ_G = 11.0, 12.0, 13.0, 13.0          # a altura do monte e os meios-eixos (oeste, leste, norte-sul)
def XC(z): return 3.2 + 0.5 * math.sin(z * 0.45 + 1.0) + 0.25 * math.sin(z * 1.3)     # a linha do penhasco da face leste
CRISTA = [(-30.0, 40.0), (-33.0, 16.0), (-34.0, 0.0), (-35.0, -14.0), (-40.0, -30.0), (-48.0, -46.0)]   # o pé da parede da pedreira (de sul para norte)
SEP = (-33.4, -2.0)                                     # a porta do sepulcro (olha para o leste)
HORTO = (-31.0, -12.0, -14.0, 12.0)                     # x0, x1, z0, z1 (a oeste fica a parede de pedra)
PORTAO = (-12.0, 6.0)
X0, X1, Z0, Z1 = -72.0, 80.0, -66.0, 72.0
AREA = [-44.0, 58.0, -44.0, 58.0]       # a leste, o segundo muro (x ~ 63); ao sul, a Porta de Genat (~ 56, 63)


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


def trilha_monte():
    P = [(-3.0, 9.0)]
    for i in range(36):
        t = i / 35; th = math.radians(90 + 200 * t); r = 0.98 - 0.70 * t
        dx = math.cos(th); P.append((GOL[0] + dx * (RW_G if dx < 0 else RE_G) * r, GOL[1] + math.sin(th) * RZ_G * r))
    return P


AMOS, AMOC, AMOT = amostra(ESTRADA), amostra(CAMINHO), amostra(trilha_monte())
KD = KDTree(len(AMOS) + len(AMOC) + len(AMOT))
for i, p in enumerate(AMOS + AMOC + AMOT): KD.insert(Vector((p.x, p.y, 0)), i)
KD.balance()
NA = len(AMOS); NC = NA + len(AMOC)
MEIA_T = 0.75


def dist_cam(x, z):
    """distância até a borda da estrada ou do caminho (negativa = em cima), e o índice"""
    co, i, d = KD.find(Vector((x, z, 0))); return d - (MEIA if i < NA else MEIA_C if i < NC else MEIA_T), i


# ---------------- relevo ----------------
def hm(x, z): return h_mundo(GW[0] + x, GW[2] + z) - H0       # o chão da maquete, aqui


def x_crista(z):
    for (xa, za), (xb, zb) in zip(CRISTA, CRISTA[1:]):
        if zb <= z <= za: return xa + (xb - xa) * (z - za) / (zb - za)
    return CRISTA[0][0] if z > CRISTA[0][1] else CRISTA[-1][0]


def ruido(x, z): return 0.5 + 0.3 * math.sin(x * 0.21 + 3.1) * math.cos(z * 0.17 + 1.3) + 0.2 * math.sin(x * 0.05 - z * 0.07)


def fora_ret(x, z, m=0.0):
    qx = max(AREA[0] - 2 - x, 0, x - AREA[1] - 2); qz = max(AREA[2] - 2 - z, 0, z - AREA[3] - 2)
    return math.hypot(qx, qz)


def h_crista(x, z):
    """a parede da pedreira: sobe quase a prumo atrás da linha da crista e continua subindo, pedregosa, para oeste"""
    dw = x_crista(z) - x                                   # positivo = a oeste da linha
    rug = 0.45 * math.sin(z * 0.9 + 1.0) + 0.3 * math.sin(z * 2.3 + x * 0.7)
    alto = 4.4 + 1.3 * math.sin(z * 0.23 + 0.8) + 0.7 * math.sin(z * 0.61)      # a parede não tem a mesma altura em todo lugar
    return alto * sm(-0.4, 1.4 + 0.8 * (0.5 + 0.5 * math.sin(z * 0.37)), dw) + 2.6 * sm(2.0, 16.0, dw) + rug * sm(0.5, 2.5, dw)


def piso(x, z): return 0.35 * hm(x, z) + 0.12 * (ruido(x * 0.6, z * 0.6) - 0.5)       # o chão da pedreira, quase plano


def monte_r(x, z):
    dx, dz = x - GOL[0], z - GOL[1]; a = math.atan2(dz, dx)
    return math.hypot(dx / (RW_G if dx < 0 else RE_G), dz / RZ_G) * (1 + 0.06 * math.sin(a * 3 + 1.0) + 0.04 * math.sin(a * 7))


def monte_bruto(x, z):
    """o monte do Gólgota sem o corte: um domo de calcário com o alto chato e as camadas da rocha em degraus"""
    r = monte_r(x, z)
    if r >= 1: return 0.0
    base = H_G * min(1.0, 1.18 * (1 - r * r) ** 1.5)
    f = base - math.floor(base); deg = math.floor(base) + sm(0.45, 1.0, f)
    return max(0.0, 0.65 * deg + 0.35 * base + 0.3 * math.sin(x * 0.9 + z * 0.4) * sm(0.3, 0.45, r) * sm(0.0, 2.0, base))


def monte(x, z):
    """o monte com a face leste cortada pela pedreira: o terreno cai atrás do penhasco (Golgota_Face), que cobre o corte"""
    return monte_bruto(x, z) * (1 - sm(XC(z) - 2.0, XC(z) - 1.2, x))


def h_local(x, z):
    p = piso(x, z)
    baixa = 1 - 0.65 * (1 - sm(9.0, 18.0, math.hypot(x - SEP[0], z - SEP[1])))     # a parede mais baixa atrás do sepulcro: o monte do túmulo aparece
    return max(p, p + h_crista(x, z) * baixa, p + monte(x, z))


ADRO = (SEP[0] + 2.6, SEP[1], 2.6)          # o adro plano na frente do sepulcro


def h_base(x, z):
    h = h_local(x, z)
    w = sm(0.0, 16.0, fora_ret(x, z))
    return h * (1 - w) + hm(x, z) * w


HR = [h_base(p.x, p.y) for p in AMOS + AMOC]
for _ in range(25): HR = [HR[0]] + [(HR[i - 1] + 2 * HR[i] + HR[i + 1]) / 4 for i in range(1, len(HR) - 1)] + [HR[-1]]
# a trilha do monte: metade rampa contínua, metade o chão, alisado (vira um sulco/aterro que sobe sem degraus)
_L = [0.0]
for _a, _b in zip(AMOT, AMOT[1:]): _L.append(_L[-1] + (_b - _a).length)
_h0, _h1 = h_base(AMOT[0].x, AMOT[0].y), h_base(AMOT[-1].x, AMOT[-1].y)
HT = [0.5 * (_h0 + (_h1 - _h0) * l / _L[-1]) + 0.5 * h_base(p.x, p.y) for l, p in zip(_L, AMOT)]
for _ in range(40): HT = [HT[0]] + [(HT[i - 1] + 2 * HT[i] + HT[i + 1]) / 4 for i in range(1, len(HT) - 1)] + [HT[-1]]
HR += HT
HADRO = h_base(ADRO[0] + 1.5, ADRO[1])


def altura(x, z):
    h = h_base(x, z)
    d, i = dist_cam(x, z)
    w = 1 - sm(0.3, 2.0, d)
    if w > 0: h += (HR[i] - h) * w
    da = math.hypot(x - ADRO[0], z - ADRO[1]) - ADRO[2]
    w = 1 - sm(0, 2.0, da)
    if w > 0: h += (HADRO - h) * w
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
       'batido': hexc('d2bc90'), 'pedreira': hexc('cfc2a2'), 'pedreira2': hexc('c3b593'), 'calcario': hexc('c9bd9e'), 'calc_lado': hexc('a39578'),
       'olival': hexc('a99c6c'), 'liquen': hexc('aea986'), 'escuro': hexc('3b3329'), 'cavidade': hexc('5a4e3e'), 'madeira': hexc('6b4a2e'),
       'madeira2': hexc('5a3e26'), 'titulo': hexc('ddd2b4'), 'tinta': hexc('3a2a1e'),
       'face': hexc('aca9a2'), 'face_topo': hexc('bbb6ab')}


def tom(c, k): return tuple(min(1, v * k) for v in c[:3]) + (1,)


def dentro_horto(x, z, m=0.0): return HORTO[0] + m < x < HORTO[1] - m and HORTO[2] + m < z < HORTO[3] - m


# terreno: grade de 1 m
GX = [float(x) for x in range(int(X0), int(X1) + 1)]
GZ = [float(z) for z in range(int(Z0), int(Z1) + 1)]
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
me = bpy.data.meshes.new('Golgota_Terreno'); bm.to_mesh(me); bm.free()
ca = me.color_attributes.new('Col', 'BYTE_COLOR', 'CORNER')
for p in me.polygons:
    c = p.center; x, z = c.x, -c.y; n = p.normal
    d, _ = dist_cam(x, z); r = ruido(x, z); j = 0.95 + random.random() * 0.07
    dw = x_crista(z) - x
    if d < 0.3: col = COR['areia']
    elif math.hypot(x - ADRO[0], z - ADRO[1]) < ADRO[2] + 0.5: col = COR['batido']
    elif abs(n.z) < 0.55: col = COR['calc_lado']                                    # a parede de pedra
    elif monte(x, z) > 0.4:                                                       # o monte: capim seco, mato e pedra nas camadas
        col = COR['capim'] if r < 0.35 else COR['seca'] if r < 0.6 else COR['grama2'] if r < 0.78 else COR['calcario']
    elif dentro_horto(x, z): col = COR['olival'] if r < 0.25 else COR['grama2'] if r < 0.6 else COR['grama']
    elif dw > 1.2:                                                                # em cima da crista: capim, mato e pedra
        col = COR['grama2'] if r < 0.45 else COR['capim'] if r < 0.7 else COR['calcario']
    elif fora_ret(x, z) > 4: col = COR['seca'] if r < 0.5 else COR['capim']
    else:                                                                         # o chão da pedreira: pedra batida com tufos
        col = COR['pedreira'] if r < 0.45 else COR['pedreira2'] if r < 0.78 else COR['seca'] if r < 0.9 else COR['capim']
    col = tom(col, j)
    for li in p.loop_indices: ca.data[li].color_srgb = col
terr = bpy.data.objects.new('Golgota_Terreno', me); col_exp.objects.link(terr); terr.data.materials.append(mat_vc('Terreno'))


def faixa(nome, A, meia, off, cor, i0):
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


faixa('Golgota_Trilha', AMOS, MEIA, 0.07, COR['areia'], 0)
faixa('Golgota_Trilha_Horto', AMOC, MEIA_C, 0.08, COR['batido'], NA)
faixa('Golgota_Trilha_Monte', AMOT, MEIA_T, 0.08, COR['batido'], NC)


# ---------------- malhas próprias (facetadas, cor de vértice) ----------------
def malha(nome, verts, faces, cores, dupla=False, col=None):
    me = bpy.data.meshes.new(nome); me.from_pydata(verts, [], faces); me.update()
    bm_ = bmesh.new(); bm_.from_mesh(me); bmesh.ops.recalc_face_normals(bm_, faces=bm_.faces[:])
    if sum(f.normal.z * f.calc_area() for f in bm_.faces) < 0: bmesh.ops.reverse_faces(bm_, faces=bm_.faces[:])
    bm_.to_mesh(me); bm_.free(); me.update()
    ca = me.color_attributes.new('Col', 'BYTE_COLOR', 'CORNER')
    for p in me.polygons:
        c = cores(p)
        for li in p.loop_indices: ca.data[li].color_srgb = c
    o = bpy.data.objects.new(nome, me); (col or col_exp).objects.link(o); o.data.materials.append(mat_vc('Mat_' + nome, dupla))
    return o


class Caixas:
    """várias caixas (facetadas) numa malha só; cada uma com a sua cor e as faces sombreadas pela direção"""
    def __init__(self): self.v, self.f, self.c = [], [], []

    def caixa(self, cx, cz, y0, y1, lx, lz, cor, giro=0.0, var=0.06, sem_fundo=True):
        cs, sn = math.cos(giro), math.sin(giro)
        def P(u, w, y): return (cx + u * cs - w * sn, -(cz + u * sn + w * cs), y)
        b = len(self.v); hx_, hz_ = lx / 2, lz / 2
        for y in (y0, y1):
            for u, w in ((-hx_, -hz_), (hx_, -hz_), (hx_, hz_), (-hx_, hz_)): self.v.append(P(u, w, y))
        fs = [((4, 5, 6, 7), 1.04), ((0, 1, 5, 4), 0.84), ((1, 2, 6, 5), 0.95), ((2, 3, 7, 6), 0.8), ((3, 0, 4, 7), 0.9)]
        if not sem_fundo: fs.append(((3, 2, 1, 0), 0.7))
        for ids, sh in fs:
            self.f.append(tuple(b + i for i in ids)); self.c.append(tom(cor, sh * (1 + random.uniform(-var, var))))

    def cria(self, nome, col=None):
        C = self.c
        return malha(nome, self.v, self.f, lambda p: C[p.index], col=col)


# o Gólgota, "o lugar da Caveira": o monte está no próprio terreno (monte()); aqui, o penhasco da face leste, que a
# pedreira cortou quase a prumo, em camadas de calcário com beirais e reentrâncias, e as cavidades gastas pela erosão que
# lembram uma caveira (duas órbitas fundas, o nariz e a fenda da boca). Em cima, a borda vira para trás e cobre o corte
# do terreno.
def piso_monte(x, z): return piso(x, z) + monte_bruto(x, z)


FZ0 = GOL[1]
FY0 = piso(XC(FZ0) + 1.0, FZ0) - 0.5
FHC = piso_monte(XC(FZ0), FZ0) - FY0
CAV = [(FZ0 - 2.3, 0.53, 1.5, 1.05, 1.25), (FZ0 + 2.2, 0.51, 1.4, 1.1, 1.25), (FZ0 + 0.05, 0.33, 0.55, 0.7, 0.7),     # (z, altura, raio z, raio y, fundura)
       (FZ0 - 0.1, 0.17, 2.6, 0.32, 0.6), (FZ0 - 5.2, 0.27, 0.7, 0.5, 0.6), (FZ0 + 5.0, 0.64, 0.6, 0.42, 0.5)]


def cav(y, z):
    best = (0.0, 0.0)
    for i, (zc, fy, rz_, ry_, dp) in enumerate(CAV):
        dz, dy = (z - zc) / rz_, (y - FY0 - fy * FHC) / ry_
        a = math.atan2(dy, dz); q = math.hypot(dz, dy) * (1 + 0.16 * math.sin(a * 3 + i * 1.7) + 0.08 * math.sin(a * 5 + i))
        if q < 1:
            d = dp * (1 - q * q) ** 0.6
            if d > best[0]: best = (d, d / dp)
    return best


def off_face(y, z):
    """as camadas: cada uma termina num beiral que avança, e a de baixo começa recuada"""
    t = (y - FY0) / 0.95 + 0.3 * math.sin(y * 0.7 + z * 0.13) + 0.15 * math.sin(z * 0.41 + 2.0); L = math.floor(t); f = t - L
    h_ = math.sin(L * 12.9898 + 7.0) * 43758.5453; h_ -= math.floor(h_)               # cada camada com o seu beiral
    amp = (0.1 + 0.5 * h_) * (0.55 + 0.45 * math.sin(L * 2.7 + z * 0.35 + math.sin(z * 0.9 + L)))
    return amp * sm(0.5 + 0.3 * h_, 0.93, f) - 0.12 + 0.1 * math.sin(z * 1.7 + y * 0.8) + 0.07 * math.sin(z * 3.1 - L)


def face_golgota():
    rnd = random.Random(7)
    ZS = []; z = GOL[1] - RZ_G
    while z <= GOL[1] + RZ_G:
        if monte_bruto(XC(z), z) > 0.5: ZS.append(z)
        z += 0.3
    NV, LIP = 40, (0.6, 1.2, 1.8, 2.35)
    V, F = [], []
    for z in ZS:
        xc = XC(z); yb = piso(xc + 1.0, z) - 0.5; yt = piso_monte(xc, z)
        for k in range(NV + 1):
            y = yb + (yt - yb) * k / NV
            d = cav(y, z)[0] * sm(0.0, 0.12, (yt - y) / max(0.1, yt - yb))
            V.append((xc + 0.25 + (off_face(y, z) if k < NV else 0.0) - d, -z, y))
        for b in LIP: V.append((xc - b, -z, piso_monte(xc - b, z) + 0.05))
    NR = NV + 1 + len(LIP)
    for i in range(len(ZS) - 1):
        for k in range(NR - 1):
            a = i * NR + k; F.append((a, a + 1, a + NR + 1, a + NR))
    def cores(p):
        c = p.center; z, y = -c.y, c.z; n = p.normal
        r_ = cav(y, z)[1]
        if n.z > 0.55: base = COR['seca'] if rnd.random() < 0.12 else COR['face_topo']
        elif n.z < -0.3: base = tom(COR['face'], 0.72)
        else: base = COR['face']
        return tom(base, (0.9 + rnd.random() * 0.12) * (1 - 0.85 * r_ ** 0.8))
    return malha('Golgota_Face', V, F, cores), ZS


face, ZS_FACE = face_golgota()
bpy.context.view_layer.update()


def topo_em(x, z): return altura(x, z)


# as três cruzes, de frente para a estrada (leste). A do meio, mais alta e com o letreiro por cima (Jo 19.19, Mt 27.37);
# as dos lados, em T. Vazias: os corpos foram tirados na sexta, antes do sábado (Jo 19.31)
_xc = XC(GOL[1]) - 3.2
CRUZES = [(_xc, GOL[1] - 2.6, False), (_xc + 0.3, GOL[1], True), (_xc, GOL[1] + 2.6, False)]
cr = Caixas()
for x, z, meio in CRUZES:
    yb = topo_em(x, z) - 0.15
    alto = 4.0 if meio else 3.3
    cr.caixa(x, z, yb - 0.5, yb + alto, 0.26, 0.26, COR['madeira'])                       # a estaca
    yt = yb + alto - (0.75 if meio else 0.22)
    cr.caixa(x, z, yt - 0.22, yt, 0.22, 2.1 if meio else 1.9, COR['madeira2'])           # o travessão (patíbulo), norte-sul
    if meio:
        cr.caixa(x + 0.15, z, yt + 0.12, yt + 0.5, 0.05, 0.66, COR['titulo'], var=0.02)       # o letreiro
        for i, ly in enumerate((0.38, 0.27, 0.16)):
            cr.caixa(x + 0.18, z, yt + 0.12 + ly - 0.025, yt + 0.12 + ly + 0.01, 0.02, 0.5 - 0.06 * i, COR['tinta'], var=0.0)   # as três línguas (Jo 19.20)
    for a in (0.3, 2.4, 4.4):                                                            # cunhas de pedra no pé
        cr.caixa(x + math.cos(a) * 0.32, z + math.sin(a) * 0.32, yb - 0.1, yb + 0.22, 0.28, 0.22, COR['calcario'], giro=a)
cruzes = cr.cria('Cruzes')


# a parede da pedreira: túmulos antigos, fechados (uma face lisa cortada na rocha, com a pedra quadrada da boca)
pd = Caixas()
for zc, x_off in ((15.0, 0.0), (-16.5, 0.0), (26.0, 0.0)):
    xc = x_crista(zc) + 0.25 + x_off; y = altura(xc + 0.8, zc)
    pd.caixa(xc - 0.2, zc, y - 0.3, y + 2.6, 0.7, 2.8, COR['calcario'], var=0.03)             # a face cortada
    pd.caixa(xc + 0.2, zc, y - 0.1, y + 1.0, 0.25, 0.95, COR['calc_lado'], var=0.03)           # a pedra quadrada que fecha
# blocos cortados e deixados na pedreira, e degraus de corte no pé da parede
for x, z, lx, lz, h, g in ((-21.0, 25.0, 2.4, 1.2, 1.0, 0.2), (-18.0, 28.5, 1.8, 1.1, 0.9, -0.3), (-24.5, 31.0, 3.0, 1.4, 1.2, 0.1),
                           (-38.0, -24.0, 2.2, 1.2, 1.0, 0.5), (-34.5, -30.0, 1.6, 1.0, 0.8, 0.9), (16.0, -28.0, 2.0, 1.1, 0.9, 0.4)):
    y = altura(x, z); pd.caixa(x, z, y - 0.2, y + h, lx, lz, COR['pedreira'], giro=g, var=0.04)
for z0, z1 in ((18.0, 30.0), (-22.0, -12.0)):
    z = z0
    while z < z1:
        xc = x_crista(z); y = altura(xc + 2.0, z)
        pd.caixa(xc + 0.6, z, y - 0.3, y + 1.3, 1.6, 2.0, COR['pedreira2'], var=0.05)
        pd.caixa(xc + 1.6, z + 0.2, y - 0.3, y + 0.55, 1.2, 2.0, COR['pedreira'], var=0.05)
        z += 2.0
pedreira = pd.cria('Pedreira')

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


for arq in ['oliveiras\\oliveiras.glb', 'figueiras\\figueiras.glb', 'casa-porta\\rochas.glb', 'casa-porta\\muretas.glb', 'flores\\plantas_betfage.glb',
            'flores\\flores.glb', 'casa-porta\\tumulo_rocha.glb', 'casa-porta\\tumulo_pedra.glb', 'casa-porta\\objetos_casa.glb']:
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


# o sepulcro: o rochedo do túmulo (o mesmo de Betânia: 16 m, a porta de 0,9 x 1,7 m na face +x) encaixado na parede
# da pedreira; a boca fica em SEP. A pedra redonda (2 m) já foi rolada para o lado. O jogo põe os dois (sepulcro.js).
TR = PROTO[('casa-porta\\tumulo_rocha.glb', 'Tumulo_Rocha')]
BOCA_M = (5.0, 1.2)                      # a boca no modelo (x, z do jogo)
TUM = (SEP[0] - BOCA_M[0], SEP[1] - BOCA_M[1])
YT = altura(*TUM) - 0.25
tumulo = bpy.data.objects.new('Tumulo_Jogo', None); col_ref.objects.link(tumulo)
tumulo.empty_display_type = 'PLAIN_AXES'; tumulo.empty_display_size = 2.0; tumulo.show_in_front = True
tumulo.location = (TUM[0], -TUM[1], HADRO - 0.66)      # a soleira (0,66 m no modelo) fica na altura do adro
for o in list(col_proto.objects):
    if o.parent is None and (o.name.startswith('Tumulo_Rocha') or o.name.startswith('Tumulo_Boca')):
        n = copia(o, col_prev); n.parent = tumulo; n.location = o.location; n['tumulo'] = 1
bpy.context.view_layer.update()
# o rochedo do túmulo não se atravessa: círculos ao longo da base dele (menos na frente da boca)
for zz in [SEP[1] + s for s in (-7.0, -5.0, -3.0, 3.0, 5.0, 7.0)]:
    circulo('COL_Tumulo_%d' % int(zz * 10), SEP[0] - 0.9, zz, 1.4, tumulo, y=HADRO)['fixo'] = 1
for zz in (-1.6, 0.0, 1.6):
    circulo('COL_Tumulo_Fundo_%d' % int(zz * 10), SEP[0] - 2.2, SEP[1] + zz, 1.4, tumulo, y=HADRO)['fixo'] = 1
empty_ref('JOGO_sepulcro', SEP[0], SEP[1], y=HADRO, r=0.0, tam=2.0)                  # a boca (a seta: para fora, leste)
empty_ref('JOGO_olhar', SEP[0] + 1.3, SEP[1], y=HADRO, r=-math.pi / 2, tam=1.5)     # onde se abaixa para olhar dentro

# colisão do Gólgota: a beira de cima do penhasco e o pé dele (o resto do monte se anda, pela trilha ou não)
for j, z in enumerate(ZS_FACE[::3]):
    hb = monte_bruto(XC(z), z)
    if hb > 1.2: circulo('COL_Golgota_alto_%d' % j, XC(z) - 1.6, z, 0.6, face, y=altura(XC(z) - 2.3, z))['fixo'] = 1
    circulo('COL_Golgota_pe_%d' % j, XC(z) + 1.0, z, 0.8, face)['fixo'] = 1
for x, z, meio in CRUZES: circulo('COL_Cruz_%d' % int(z * 10 + 500), x, z, 0.3, face, y=altura(x, z))['fixo'] = 1

# ---------------- mureta do horto (pedra seca), com o portão no leste ----------------
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
        muro(a[0], a[1], b[0], b[1])


hx0, hx1, hz0, hz1 = HORTO
lado(hx1, hz0, hx1, hz1, vao=(PORTAO[1] - 1.8, PORTAO[1] + 1.8))         # leste, com o portão
lado(hx1, hz0, x_crista(hz0) + 1.0, hz0)                                 # norte, até a parede de pedra
lado(hx1, hz1, x_crista(hz1) + 1.0, hz1)                                 # sul

# ---------------- árvores, pedras, moitas e flores ----------------
ARV = []
def arvore(arq, nome, x, z, k, perto=True, raio=0.45):
    n = poe(arq, nome, x, z, random.uniform(0, 6.28), k, afunda=0.12, longe=not perto)
    if n is not None and perto: circulo('COL_' + n.name, x, z, raio, n)
    ARV.append((x, z))


K_OLI = 4.0 / max(0.1, dims(PROTO[('oliveiras\\oliveiras.glb', 'Oliveira1_Jovem')])[2])
K_FIG = 3.6 / max(0.1, dims(PROTO[('figueiras\\figueiras.glb', 'Figueira1_Jovem_ComFruta')])[2])
LIVRE = [(SEP[0] + 3.0, SEP[1], 4.2), (PORTAO[0], PORTAO[1], 2.4), (GOL[0], GOL[1], 14.0), (XC(GOL[1]) + 4.0, GOL[1], 6.0)]
def livre(x, z, m=0.0):
    if dist_cam(x, z)[0] < 1.4 + m: return False
    if any(math.hypot(x - a, z - b) < r + m for a, b, r in LIVRE): return False
    return not any(math.hypot(x - a, z - b) < 3.4 for a, b in ARV)


# no horto: oliveiras e figueiras (abril: a figueira já tem folha e figo novo, Mc 13.28)
for x, z, t in ((-16.0, -9.0, 'o'), (-22.0, -10.5, 'o'), (-27.5, -8.0, 'f'), (-15.0, 0.5, 'f'), (-17.0, 9.5, 'o'), (-24.0, 8.5, 'o'), (-28.5, 6.5, 'f')):
    if not livre(x, z): continue
    if t == 'o': arvore('oliveiras\\oliveiras.glb', random.choice(['Oliveira2_Retorcida', 'Oliveira4_Ancia', 'Oliveira3_Vaso']), x, z, K_OLI * random.uniform(0.9, 1.1))
    else: arvore('figueiras\\figueiras.glb', random.choice(['Figueira1_Jovem_ComFruta', 'Figueira2_Larga_ComFruta']), x, z, K_FIG * random.uniform(0.9, 1.1))
# fora: pomares em cima da crista e longe da estrada
for _ in range(90):
    x, z = random.uniform(X0 + 6, X1 - 6), random.uniform(Z0 + 6, Z1 - 6)
    if dentro_horto(x, z, -2) or not livre(x, z, 1.0): continue
    dw = x_crista(z) - x
    if dw < 3 and fora_ret(x, z) < 1 and random.random() < 0.85: continue      # o chão da pedreira fica quase limpo
    perto = fora_ret(x, z) < 1 and abs(x) < 40 and abs(z) < 40
    if random.random() < 0.7: arvore('oliveiras\\oliveiras.glb', random.choice(['Oliveira1_Jovem', 'Oliveira2_Retorcida', 'Oliveira3_Vaso']), x, z, K_OLI * random.uniform(0.75, 1.05), perto)
    else: arvore('figueiras\\figueiras.glb', random.choice(['Figueira1_Jovem_ComFruta', 'Figueira3_Encostada_ComFruta']), x, z, K_FIG * random.uniform(0.8, 1.0), perto)
ROCHAS = ['Rocha%d' % i for i in range(1, 10)]
# pedras: muitas em cima da crista e na borda da parede (o "monte" de pedra), poucas no chão da pedreira
for _ in range(150):
    z = random.uniform(-50, 46); dw = random.uniform(-1.0, 14.0) if random.random() < 0.75 else random.uniform(-30, -3)
    x = x_crista(z) - dw
    if not livre(x, z, 0.4) or dentro_horto(x, z, -0.5) or math.hypot(x - SEP[0], z - SEP[1]) < 8.5: continue
    perto = abs(x) < 42 and abs(z) < 40 and dw < 2
    k = random.uniform(0.9, 2.2) if dw > -0.5 else random.uniform(0.4, 0.9)
    n = poe('casa-porta\\rochas.glb', random.choice(ROCHAS), x, z, random.uniform(0, 6.28), k, afunda=0.25 * k, longe=not perto)
    if n is not None and perto and k > 0.6: circulo('COL_' + n.name, x, z, 0.3 * k + 0.1, n)
# a parede: pedras grandes encostadas e meio enterradas no pé e na face (a parede vira uma cadeia de rochedos)
for _ in range(70):
    z = random.uniform(-48, 44); x = x_crista(z) + random.uniform(-1.2, 0.6)
    if math.hypot(x - SEP[0], z - SEP[1]) < 9.0 or (HORTO[2] + 1 < z < HORTO[3] - 1 and random.random() < 0.5): continue
    k = random.uniform(1.6, 3.0)
    n = poe('casa-porta/rochas.glb', random.choice(ROCHAS), x, z, random.uniform(0, 6.28), k, afunda=0.35 * k, longe=not (abs(z) < 40))
    if n is not None and abs(z) < 40: circulo('COL_' + n.name, x + 0.6, z, 0.25 * k + 0.2, n)
# o Gólgota: lascas que caíram do penhasco, no pé dele; pedras soltas pelas encostas; três oliveiras velhas no alto
for zz in (-8.5, -5.6, -3.4, 0.9, 3.4, 6.2, 8.8):
    z = GOL[1] + zz; x = XC(z) + 1.9 + random.uniform(0.0, 1.0)
    if dist_cam(x, z)[0] < 0.8: continue
    k = random.uniform(0.7, 1.3)
    n = poe('casa-porta\\rochas.glb', random.choice(ROCHAS), x, z, random.uniform(0, 6.28), k, afunda=0.15)
    if n is not None: circulo('COL_' + n.name, x, z, 0.4 * k + 0.1, n)
for _ in range(140):
    a = random.uniform(0, 6.28); rr = random.uniform(0.3, 0.95); dx = math.cos(a)
    x, z = GOL[0] + dx * (RW_G if dx < 0 else RE_G) * rr, GOL[1] + math.sin(a) * RZ_G * rr
    if x > XC(z) - 2.6 or dist_cam(x, z)[0] < 0.9 or any(math.hypot(x - cx_, z - cz_) < 2.2 for cx_, cz_, _ in CRUZES): continue
    k = random.uniform(0.45, 1.4)
    n = poe('casa-porta\\rochas.glb', random.choice(ROCHAS), x, z, random.uniform(0, 6.28), k, afunda=0.3 * k)
    if n is not None and k > 0.8: circulo('COL_' + n.name, x, z, 0.3 * k + 0.1, n)
for x, z in ((GOL[0] - 4.5, GOL[1] - 2.4), (GOL[0] - 3.5, GOL[1] + 4.6), (GOL[0] - 0.5, GOL[1] - 6.4)):
    if dist_cam(x, z)[0] > 1.2: arvore('oliveiras\\oliveiras.glb', random.choice(['Oliveira2_Retorcida', 'Oliveira4_Ancia']), x, z, K_OLI * random.uniform(0.85, 1.0))
# mato pelas encostas do monte
for _ in range(70):
    a = random.uniform(0, 6.28); rr = random.uniform(0.3, 0.98); dx = math.cos(a)
    x, z = GOL[0] + dx * (RW_G if dx < 0 else RE_G) * rr, GOL[1] + math.sin(a) * RZ_G * rr
    if x > XC(z) - 2.5 or dist_cam(x, z)[0] < 0.4 or math.hypot(x - CRUZES[1][0], z - CRUZES[1][1]) < 3.6: continue
    poe('flores\\plantas_betfage.glb', random.choice(['Moita_Espinhos_Pequena', 'Moita_Espinhos_Grande', 'Malva_Rosa', 'Moita_Espinhos_Pequena']), x, z, random.uniform(0, 6.28), random.uniform(0.6, 1.0), afunda=0.05, planta=True)
# tufos de capim e moitas nos beirais do penhasco
for _ in range(40):
    z = random.choice(ZS_FACE); L = random.randint(1, 9); y = FY0 + (L + 0.93) * 0.95
    if y > piso_monte(XC(z), z) - 0.6 or cav(y, z)[0] > 0.05: continue
    x = XC(z) + 0.25 + off_face(y - 0.02, z) - 0.2
    poe('flores\\plantas_betfage.glb', random.choice(['Moita_Espinhos_Pequena', 'Malva_Rosa', 'Moita_Espinhos_Pequena']), x, z, random.uniform(0, 6.28), random.uniform(0.5, 0.8), y=y, afunda=0.03, planta=True)
# moitas espinhosas e malvas fora do horto; flores de primavera no horto e em cima da crista
for _ in range(160):
    x, z = random.uniform(X0 + 4, X1 - 4), random.uniform(Z0 + 4, Z1 - 4)
    if dist_cam(x, z)[0] < 0.4 or math.hypot(x - CRUZES[1][0], z - CRUZES[1][1]) < 3.6 or XC(z) - 2.4 < x < XC(z) + 1.8 or math.hypot(x - SEP[0] - 2.5, z - SEP[1]) < 3.5: continue
    if dentro_horto(x, z):
        poe('flores\\flores.glb', random.choice(['Flor_Anemona_Touceira', 'Flor_Margarida_Touceira', 'Flor_Asfodelo_Tufo', 'Flor_Anemona_Tufo', 'Flor_Ciclame_Tufo']), x, z, random.uniform(0, 6.28), random.uniform(0.8, 1.2), afunda=0.02, planta=True)
    elif x_crista(z) - x > 2 and random.random() < 0.5:
        poe('flores\\flores.glb', random.choice(['Flor_Asfodelo_Mancha', 'Flor_Anemona_Mancha', 'Flor_Margarida_Mancha']), x, z, random.uniform(0, 6.28), random.uniform(0.8, 1.1), afunda=0.02, planta=True)
    else:
        poe('flores\\plantas_betfage.glb', random.choice(['Moita_Espinhos_Pequena', 'Moita_Espinhos_Pequena', 'Malva_Rosa', 'Moita_Espinhos_Grande']), x, z, random.uniform(0, 6.28), random.uniform(0.7, 1.05), afunda=0.05, planta=True)

# ---------------- os lugares ----------------
empty_ref('JOGO_golgota', CRUZES[1][0] - 3.0, CRUZES[1][1], r=math.pi / 2, tam=2.0)   # no alto do monte, atrás das cruzes
empty_ref('JOGO_cruzes', CRUZES[1][0], CRUZES[1][1], y=topo_em(CRUZES[1][0], CRUZES[1][1]), tipo='SPHERE', tam=0.6)
empty_ref('JOGO_portao', PORTAO[0], PORTAO[1], tam=2.0)
# o fim da estrada: a sudeste, para a Porta de Genat (a cidade); a noroeste, para Emaús
empty_ref('JOGO_cidade', AMOS[0].x, AMOS[0].y, tam=2.0)
empty_ref('JOGO_emaus', AMOS[-1].x, AMOS[-1].y, tam=2.0)

# a maquete de Jerusalém, deslocada para cá, só para ver no Blender (o jogo põe a dele)
try:
    antes = set(bpy.data.objects)
    bpy.ops.import_scene.gltf(filepath=os.path.join(ROOT, 'jerusalem', 'jerusalem_maquete.glb'))
    col_jer = colecao('Jerusalem_maquete_so_para_ver')
    for o in [o for o in bpy.data.objects if o not in antes]:
        for c in list(o.users_collection): c.objects.unlink(o)
        col_jer.objects.link(o)
        if o.parent is None: o.location = (o.location.x - GW[0], o.location.y + GW[2], o.location.z - H0)
        if o.name.startswith('Golgota'): o.hide_render = True; o.hide_set(True)
except Exception as e:
    print('sem maquete', e)

fixos = {'estrada': [[round(p.x, 2), round(p.y, 2)] for p in AMOS[::3]] + [[round(AMOS[-1].x, 2), round(AMOS[-1].y, 2)]], 'meia': MEIA,
         'caminho': [[round(p.x, 2), round(p.y, 2)] for p in AMOC[::3]] + [[round(AMOC[-1].x, 2), round(AMOC[-1].y, 2)]],
         'muros': MUROS, 'area': AREA, 'horto': list(HORTO), 'terreno': [X0, X1, Z0, Z1], 'mundo': [GW[0], H0, GW[2]]}
t = bpy.data.texts.new('golgota_fixos'); t.write(json.dumps(fixos))
bt = bpy.data.texts.new('EXPORTAR_PARA_O_JOGO')
bt.write("# exporta o que está na cena para o jogo e salva o .blend\nRODAR_EXPORTACAO = True\nexec(open(r'" + os.path.join(OUT, 'exportar_golgota.py') + "', encoding='utf-8').read())\n")

sol = bpy.data.lights.new('Sol', 'SUN'); sol.energy = 3.5; so = bpy.data.objects.new('Sol', sol); sc.collection.objects.link(so); so.rotation_euler = (math.radians(50), 0, math.radians(-110))
w = bpy.data.worlds.new('Ceu'); sc.world = w; w.use_nodes = True
bg = next(n for n in w.node_tree.nodes if n.type == 'BACKGROUND'); bg.inputs['Color'].default_value = (0.66, 0.77, 0.88, 1); bg.inputs['Strength'].default_value = 0.9
cam = bpy.data.cameras.new('Cam'); cam.lens = 24; co = bpy.data.objects.new('Cam', cam); sc.collection.objects.link(co); sc.camera = co
cam.clip_end = 1500

os.makedirs(OUT, exist_ok=True)
bpy.ops.wm.save_as_mainfile(filepath=BLEND)
print('FIM', len([o for o in bpy.data.objects if 'glb' in o]), 'objetos', len(MUROS), 'muros', len(ARV), 'arvores',
      'sepulcro a %.1f m do Golgota' % math.hypot(SEP[0] - GOL[0], SEP[1] - GOL[1]), 'H0 %.2f' % H0)
