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
        elif x > X_PORCH + 3.5: hi = Y_SAC
        else: hi = Y_SAC + (Y_POR - Y_SAC) * sm(X_PORCH + 3.5, X_PORCH, x)
        h = h + (hi - h) * w
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
def tom(c, k): return tuple(min(1, v * k) for v in c[:3]) + (1,)
COR = {'lajes': hexc('ddd2b8'), 'lajes2': hexc('d1c4a6'), 'herod': hexc('dccaa6'), 'claro': hexc('e9dfc8'), 'branco': hexc('f2ecdd'),
       'coluna': hexc('ebe2cc'), 'cedro': hexc('8d6a4c'), 'teto': hexc('b49a7a'), 'ouro': hexc('d8a640'), 'ouro2': hexc('b9862e'), 'bronze': hexc('9a7038'),
       'escuro': hexc('2e2620'), 'pedra_altar': hexc('cdc3ad'), 'verm': hexc('8e2f2a'), 'azul': hexc('3c4f86'), 'roxo': hexc('6a3a6e'), 'madeira': hexc('7a5634'),
       'pano': hexc('e8dcc0'), 'vime': hexc('c2a36c'), 'agua': hexc('5f8f8c'), 'antonia': hexc('c9b791')}


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
    def __init__(self): self.v, self.f, self.c = [], [], []

    def caixa(self, x0, x1, y0, y1, z0, z1, cor, var=0.04, fundo=False, blocos=False):
        b = len(self.v)
        for y in (y0, y1):
            for x, z in ((x0, z0), (x1, z0), (x1, z1), (x0, z1)): self.v.append((x, -z, y))
        fs = [((4, 5, 6, 7), 1.04), ((0, 1, 5, 4), 0.86), ((1, 2, 6, 5), 0.95), ((2, 3, 7, 6), 0.82), ((3, 0, 4, 7), 0.91)]
        if fundo: fs.append(((3, 2, 1, 0), 0.7))
        for ids, sh in fs:
            self.f.append(tuple(b + i for i in ids)); self.c.append(tom(cor, sh * (1 + random.uniform(-var, var))))
        if blocos: self.fiadas(x0, x1, y0, y1, z0, z1, cor)

    def fiadas(self, x0, x1, y0, y1, z0, z1, cor, alto=1.1):
        """linhas de junta (finas e escuras) nas quatro faces, para dar escala aos blocos"""
        y = y0 + alto
        while y < y1 - 0.2:
            for (xa, za, xb, zb, nx, nz) in ((x0, z0, x1, z0, 0, -1), (x1, z0, x1, z1, 1, 0), (x1, z1, x0, z1, 0, 1), (x0, z1, x0, z0, -1, 0)):
                e = 0.02; b = len(self.v)
                for yy in (y, y + 0.06):
                    self.v.append((xa + nx * e, -(za + nz * e), yy)); self.v.append((xb + nx * e, -(zb + nz * e), yy))
                self.f.append((b, b + 1, b + 3, b + 2)); self.c.append(tom(cor, 0.72))
            y += alto

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


CAIXAS = []                         # colisão: [x0, x1, z0, z1]
COLS = []                           # colunas (círculos de colisão)
def bloqueia(x0, x1, z0, z1): CAIXAS.append([round(min(x0, x1), 2), round(max(x0, x1), 2), round(min(z0, z1), 2), round(max(z0, z1), 2)])


# ---------------- o chão da esplanada (grade de 1 m) ----------------
GX = [float(x) for x in range(int(-PX), int(PX) + 1)]
GZ = [float(z) for z in range(int(-PZ), int(PZ) + 1)]
bm = bmesh.new(); vs = []
for x in GX: vs.append([bm.verts.new((x, -z, nivel(x, z))) for z in GZ])
for i in range(len(GX) - 1):
    for k in range(len(GZ) - 1):
        a, b, c, d = vs[i][k], vs[i + 1][k], vs[i + 1][k + 1], vs[i][k + 1]
        if (i + k) % 2 == 0: bm.faces.new((a, b, c)); bm.faces.new((a, c, d))
        else: bm.faces.new((a, b, d)); bm.faces.new((b, c, d))
bm.normal_update()
if sum(f.normal.z for f in bm.faces) < 0: bmesh.ops.reverse_faces(bm, faces=bm.faces[:])
me = bpy.data.meshes.new('Templo_Chao'); bm.to_mesh(me); bm.free()
ca = me.color_attributes.new('Col', 'BYTE_COLOR', 'CORNER')
for p in me.polygons:
    c = p.center; x, z = c.x, -c.y
    xi, zi = int(math.floor(x / 2.0)), int(math.floor(z / 2.0))
    base = COR['lajes'] if (xi + zi) % 2 else COR['lajes2']                    # lajes de 2 m
    if dentro(ENC, x, z) and x < X_GEDER: base = tom(COR['lajes2'], 0.97)
    col = tom(base, random.uniform(0.96, 1.03))
    for li in p.loop_indices: ca.data[li].color_srgb = col
chao = bpy.data.objects.new('Templo_Chao', me); col_exp.objects.link(chao); chao.data.materials.append(mat_vc('Chao'))

# ---------------- a plataforma: os muros de fora (descem até o vale) e o parapeito ----------------
# cada lado numa malha (Lado_Norte...): o jogo deixa transparente o que tapar a vista da câmera (OCLUSORES)
OCLUSORES = {}
LADOS = {'Lado_Norte': (-PX - 2.5, PX + 2.5, -PZ - 2.5, -PZ), 'Lado_Sul': (-PX - 2.5, PX + 2.5, PZ, PZ + 2.5), 'Lado_Oeste': (-PX - 2.5, -PX, -PZ, PZ), 'Lado_Leste': (PX, PX + 2.5, -PZ, PZ)}
for nome, (x0, x1, z0, z1) in LADOS.items():
    pl = Formas(); pl.caixa(x0, x1, -26.0, H_PORT + 1.5, z0, z1, COR['herod'], blocos=True)
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
an = Formas()
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

# ---------------- o Pátio dos Sacerdotes: o altar, a pia, o lugar do sacrifício ----------------
al = Formas()
a0, a1, b0, b1 = ALTAR; YA = Y_SAC + 4.0
al.caixa(a0, a1, Y_SAC - 0.2, Y_SAC + 1.0, b0, b1, COR['pedra_altar'], blocos=True)       # a base
al.caixa(a0 + 0.5, a1 - 0.5, Y_SAC + 1.0, YA, b0 + 0.5, b1 - 0.5, COR['pedra_altar'], blocos=True)
al.caixa(a0 + 0.9, a1 - 0.9, YA, YA + 0.25, b0 + 0.9, b1 - 0.9, tom(COR['escuro'], 1.6))  # a fogueira (brasas e lenha)
for (hx, hz) in ((a0 + 0.8, b0 + 0.8), (a1 - 0.8, b0 + 0.8), (a0 + 0.8, b1 - 0.8), (a1 - 0.8, b1 - 0.8)):
    al.caixa(hx - 0.35, hx + 0.35, YA, YA + 0.6, hz - 0.35, hz + 0.35, COR['pedra_altar'])        # os chifres
for i in range(10):     # a rampa, ao sul (sem degraus: Êx 20.26)
    z0_ = b1 + i * 0.9; y = YA - (i + 0.5) * (YA - Y_SAC) / 10
    al.caixa(-3.2, 0.2, Y_SAC - 0.2, y, z0_, z0_ + 0.92, COR['pedra_altar'], var=0.02)
for k in range(6):      # lenha empilhada
    al.caixa(a0 + 1.4 + k * 1.0, a0 + 1.8 + k * 1.0, YA + 0.25, YA + 0.55, b0 + 1.3, b1 - 1.3, COR['madeira'])
# a pia de bronze, a sudoeste do altar, entre o altar e o santuário
al.tronco(-9.0, 2.0, Y_SAC, Y_SAC + 1.0, 0.9, 0.7, 12, COR['bronze']); al.tronco(-9.0, 2.0, Y_SAC + 1.0, Y_SAC + 1.6, 1.3, 1.5, 12, COR['bronze'])
al.plano([(-9.0 + math.cos(2 * math.pi * i / 12) * 1.35, Y_SAC + 1.55, 2.0 + math.sin(2 * math.pi * i / 12) * 1.35) for i in range(12)], COR['agua'])
# o lugar do sacrifício, ao norte do altar: as argolas no chão, as mesas e as colunas baixas com ganchos
for i in range(6):
    for j in range(2): al.tronco(a0 + 0.8 + i * 1.4, b0 - 3.0 - j * 2.0, Y_SAC, Y_SAC + 0.08, 0.3, 0.3, 8, COR['bronze'])
for i in range(3): al.caixa(a0 + 1.0 + i * 3.0, a0 + 2.6 + i * 3.0, Y_SAC, Y_SAC + 0.9, b0 - 8.4, b0 - 7.6, COR['claro'])
for i in range(4): al.tronco(a0 + 0.5 + i * 2.8, b0 - 10.0, Y_SAC, Y_SAC + 2.4, 0.18, 0.18, 6, COR['pedra_altar'])
al.cria('Templo_Altar')

# ---------------- o santuário ----------------
sa = Formas()
FR = X_PORCH; YB = Y_POR
for i in range(12):     # os doze degraus até o pórtico
    sa.caixa(FR + i * 0.33, FR + 0.33 + i * 0.33, Y_SAC - 0.2, YB - i * (YB - Y_SAC) / 12, EIXO - 11.0, EIXO + 11.0, tom(COR['lajes'], 1.0 + 0.025 * (i % 2)))
sa.caixa(FR - 4.0, FR, YB - 0.2, YB + 22.0, EIXO - 11.0, EIXO - 3.2, COR['branco'], blocos=True)       # o pórtico (100 côvados de largura e de altura)
sa.caixa(FR - 4.0, FR, YB - 0.2, YB + 22.0, EIXO + 3.2, EIXO + 11.0, COR['branco'], blocos=True)
sa.caixa(FR - 4.0, FR, YB + 14.0, YB + 22.0, EIXO - 3.2, EIXO + 3.2, COR['branco'], blocos=True)       # em cima da entrada (sem portas)
sa.plano([(FR - 3.0, YB, EIXO - 3.2), (FR - 3.0, YB, EIXO + 3.2), (FR - 3.0, YB + 14.0, EIXO + 3.2), (FR - 3.0, YB + 14.0, EIXO - 3.2)], COR['escuro'])
# a cortina bordada da porta do Santo Lugar, ao fundo do pórtico (azul, púrpura e escarlate: Josefo, Guerras V.5.4)
for k, c in enumerate((COR['azul'], COR['roxo'], COR['verm'], COR['azul'])):
    sa.plano([(FR - 2.95, YB + 0.2, EIXO - 2.4 + k * 1.2), (FR - 2.95, YB + 0.2, EIXO - 1.2 + k * 1.2), (FR - 2.95, YB + 10.0, EIXO - 1.2 + k * 1.2), (FR - 2.95, YB + 10.0, EIXO - 2.4 + k * 1.2)], c)
sa.caixa(FR - 3.0, FR - 2.9, YB + 10.0, YB + 10.5, EIXO - 2.6, EIXO + 2.6, COR['ouro'])
sa.caixa(FR - 17.0, FR - 4.0, YB - 0.2, YB + 18.0, EIXO - 6.5, EIXO + 6.5, COR['branco'], blocos=True)   # o corpo (o Santo Lugar e o Santo dos Santos)
sa.caixa(FR - 17.3, FR - 3.7, YB + 18.0, YB + 18.6, EIXO - 6.8, EIXO + 6.8, COR['ouro'])
sa.caixa(FR - 4.3, FR + 0.3, YB + 22.0, YB + 22.7, EIXO - 11.3, EIXO + 11.3, COR['ouro'])
for i in range(18):     # as pontas de ouro no alto (para as aves não pousarem)
    z_ = EIXO - 10.5 + i * 1.24; sa.caixa(FR - 2.2, FR - 1.8, YB + 22.7, YB + 23.8, z_ - 0.12, z_ + 0.12, COR['ouro'])
for z_ in (EIXO - 9.0, EIXO - 5.5, EIXO + 5.5, EIXO + 9.0):      # meias-colunas com capitel de ouro
    sa.caixa(FR, FR + 0.6, YB, YB + 19.5, z_ - 0.7, z_ + 0.7, tom(COR['branco'], 1.03))
    sa.caixa(FR, FR + 0.8, YB + 19.5, YB + 20.5, z_ - 0.9, z_ + 0.9, COR['ouro'])
# a videira de ouro sobre a entrada (Josefo): uma faixa de folhas e cachos
for i in range(14):
    z_ = EIXO - 3.6 + i * 0.55; y_ = YB + 14.3 + 0.4 * math.sin(i * 1.3)
    sa.caixa(FR + 0.02, FR + 0.18, y_, y_ + 0.5, z_ - 0.25, z_ + 0.25, COR['ouro'] if i % 3 else COR['ouro2'])
sa.cria('Templo_Santuario')

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
empty_ref('JOGO_altar', (ALTAR[0] + ALTAR[1]) / 2, (ALTAR[2] + ALTAR[3]) / 2, y=YA + 0.3, tipo='SPHERE', tam=0.8)
empty_ref('JOGO_soreg', TER[1] + 2.0, EIXO - 4.6, tam=1.5)                           # a placa de aviso
empty_ref('JOGO_salomao', I_L + 2.0, -4.0, tam=2.0)                                 # o Pórtico de Salomão
empty_ref('JOGO_mercado', -6.0, 31.0, tam=2.0)

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
