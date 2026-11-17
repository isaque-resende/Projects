# Betfagé: ajuste aplicado UMA VEZ sobre o betfage.blend (17/11/2026), a partir das marcas do usuário:
#   - tira as muretas altas soltas no morro e levanta muros de arrimo nas bordas dos patamares
#     (sobrado e eira, socalco da casa de cima, pátio da ínsula, planalto da carroça);
#   - estrada da aldeia com perfil suave e sem inclinação de lado (afastada 1 m do pátio da ínsula);
#   - caminhos de terra até as casas, escada de pedra até a casa de cima, rampa da carroça até a estrada
#     e ramal até a eira; a rota da carroça (JOGO_rota_carroca) para a animação;
#   - aplica as mudanças feitas à mão no Blender sem salvar (ínsula, um cipreste e uma rocha).
# Rodar:  blender -b betfage.blend -P ajuste_muros_caminhos.py -- [--salvar]
# Mundo do jogo (x, z) = Blender (x, -y); altura = Blender z.
import bpy, bmesh, math, json, random, sys
from mathutils import Vector, Matrix
from mathutils.kdtree import KDTree

ROOT = r"M:\Claude\github\Projects-animais\assets-vila"
G = {'__name__': 'gerador'}
exec(open(ROOT + r"\fase-betfage\betfage_blender.py", encoding='utf-8').read().split('# ---------------- cena ----------------')[0], G)
h_base, catmull, sm, xz, MEIA = G['h_base'], G['catmull'], G['sm'], G['xz'], G['MEIA']
HCASA, HC3, HEIRA = G['HCASA'], G['HC3'], G['HEIRA']
EX_, EZ_, EIRA_R = G['ex'], G['ez'], G['EIRA_R']
LOG = []
def log(*a): LOG.append(' '.join(str(x) for x in a)); print(*a)

# ---------------- terreno: grade 181 x 181, passo 0,8 ----------------
TER = bpy.data.objects['Betfage_Terreno']; ME = TER.data
NG, P0, PS = 181, -72.0, 0.8
H = [v.co.z for v in ME.vertices]
H_ORIG = list(H)
VX = [P0 + (i // NG) * PS for i in range(len(H))]
VZ = [P0 + (i % NG) * PS for i in range(len(H))]
assert abs(ME.vertices[NG].co.x - (P0 + PS)) < 1e-3 and abs(-ME.vertices[1].co.y - (P0 + PS)) < 1e-3
def alt(x, z, A=None):
    A = A or H
    fi = (x - P0) / PS; fk = (z - P0) / PS
    i = max(0, min(NG - 2, int(math.floor(fi)))); k = max(0, min(NG - 2, int(math.floor(fk))))
    u, v = fi - i, fk - k
    a, b, c, d = A[i * NG + k], A[(i + 1) * NG + k], A[i * NG + k + 1], A[(i + 1) * NG + k + 1]
    return a * (1 - u) * (1 - v) + b * u * (1 - v) + c * (1 - u) * v + d * u * v
def perto(x0, x1, z0, z1):
    i0, i1 = max(0, int((x0 - P0) / PS)), min(NG - 1, int((x1 - P0) / PS) + 1)
    k0, k1 = max(0, int((z0 - P0) / PS)), min(NG - 1, int((z1 - P0) / PS) + 1)
    for i in range(i0, i1 + 1):
        for k in range(k0, k1 + 1): yield i * NG + k

# ---------------- polilinhas ----------------
def comp(pp):
    t = [0.0]
    for i in range(1, len(pp)): t.append(t[-1] + math.hypot(pp[i][0] - pp[i - 1][0], pp[i][1] - pp[i - 1][1]))
    return t
def proj(pp, x, z):
    # (distância, posição ao longo, lado com sinal [+ = esquerda da direção], índice do trecho, fração)
    best = None; T = comp(pp)
    for i in range(len(pp) - 1):
        ax, az = pp[i]; bx, bz = pp[i + 1]; dx, dz = bx - ax, bz - az; L2 = dx * dx + dz * dz or 1e-9
        u = max(0.0, min(1.0, ((x - ax) * dx + (z - az) * dz) / L2))
        px, pz = ax + dx * u, az + dz * u; d = math.hypot(x - px, z - pz)
        if best is None or d < best[0] - 1e-9:
            L = math.sqrt(L2); s = ((x - ax) * (-dz) + (z - az) * dx) / L
            best = (d, T[i] + u * L, s, i, u)
    d, sl, s, i, u = best[0], best[1], best[2], best[3], best[4]
    # no vértice entre dois trechos o lado vem da média das duas normais (senão a quina de fora sai do lado errado)
    j = i if u <= 1e-9 else i + 1 if u >= 1 - 1e-9 else None
    if j is not None and 0 < j < len(pp) - 1:
        (ax, az), (vx, vz), (bx, bz) = pp[j - 1], pp[j], pp[j + 1]
        l1 = math.hypot(vx - ax, vz - az) or 1e-9; l2 = math.hypot(bx - vx, bz - vz) or 1e-9
        nx = -(vz - az) / l1 - (bz - vz) / l2; nz = (vx - ax) / l1 + (bx - vx) / l2; nl = math.hypot(nx, nz) or 1e-9
        s = math.copysign(d, (x - vx) * nx / nl + (z - vz) * nz / nl)
    return (d, sl, s, i, u)
def em(pp, s):
    T = comp(pp)
    for i in range(1, len(pp)):
        if T[i] >= s - 1e-9:
            k = (s - T[i - 1]) / max(1e-9, T[i] - T[i - 1]); return (pp[i - 1][0] + (pp[i][0] - pp[i - 1][0]) * k, pp[i - 1][1] + (pp[i][1] - pp[i - 1][1]) * k)
    return pp[-1]
def caixa(pp, m):
    return min(p[0] for p in pp) - m, max(p[0] for p in pp) + m, min(p[1] for p in pp) - m, max(p[1] for p in pp) + m
def interp(vals, T, s):
    for i in range(1, len(T)):
        if T[i] >= s - 1e-9:
            k = (s - T[i - 1]) / max(1e-9, T[i] - T[i - 1]); return vals[i - 1] + (vals[i] - vals[i - 1]) * k
    return vals[-1]

# ---------------- 1. estrada nova (mais para a frente diante do pátio da ínsula) ----------------
EAB = [list(p) for p in G['ESTRADA_AB']]
def ab_de(x, z): return [(13 - z) / 26, (13 - x) / 26]
EAB[4] = ab_de(8.84, 6.25); EAB[5] = ab_de(5.2, 6.05); EAB[6] = ab_de(1.04, 6.7)
pts = [Vector((x, z, 0)) for x, z in [xz(a, b) for a, b in EAB]]
AM = []
for i in range(len(pts) - 1):
    p0 = pts[max(0, i - 1)]; p1 = pts[i]; p2 = pts[i + 1]; p3 = pts[min(len(pts) - 1, i + 2)]
    n = max(4, int((p2 - p1).length / 0.4))
    for k in range(n): AM.append(catmull(p0, p1, p2, p3, k / n))
AM.append(pts[-1])
KDA = KDTree(len(AM))
for i, p in enumerate(AM): KDA.insert(Vector((p.x, p.y, 0)), i)
KDA.balance()
def de(x, z):
    co, i, d = KDA.find(Vector((x, z, 0))); return d, i
HR = [h_base(p.x, p.y) for p in AM]
for _ in range(25): HR = [HR[0]] + [(HR[i - 1] + 2 * HR[i] + HR[i + 1]) / 4 for i in range(1, len(HR) - 1)] + [HR[-1]]
# perfil novo da estrada na aldeia: pontos de altura e o resto igual ao de antes
CHAVES = [(11.2, 9.6, None), (10.4, 7.0, 1.25), (8.0, 5.95, 1.9), (5.2, 6.05, 2.6), (1.0, 6.7, 3.3), (-2.6, 6.8, 3.75), (-5.3, 5.9, 4.3),
          (-6.8, 4.7, 4.8), (-7.6, 3.2, 5.2), (-8.3, 1.6, 5.6), (-8.9, 0.0, 6.1), (-9.5, -1.6, 6.75), (-10.0, -2.9, 7.4), (-10.5, -4.6, 8.2),
          (-11.1, -6.2, 8.9), (-11.6, -7.7, 9.6), (-12.1, -9.4, 10.4), (-12.5, -10.9, None)]
KI = [(de(x, z)[1], h) for x, z, h in CHAVES]
KI = [(i, HR[i] if h is None else h) for i, h in KI]
I0, I1 = KI[0][0], KI[-1][0]
TR = list(HR)
for (ia, ha), (ib, hb) in zip(KI, KI[1:]):
    for i in range(ia, ib + 1): TR[i] = ha + (hb - ha) * (i - ia) / max(1, ib - ia)
for _ in range(8): TR = [TR[0]] + [(TR[i - 1] + 2 * TR[i] + TR[i + 1]) / 4 for i in range(1, len(TR) - 1)] + [TR[-1]]
def t_estrada(x, z): return TR[de(x, z)[1]]
log('estrada: amostras', len(AM), 'trecho refeito', I0, I1)

# ---------------- 2. ínsula no lugar novo (mexida à mão) e almofadas ----------------
INS = bpy.data.objects['Insula_Jogo']
INS_DX, INS_DZ = 0.691 - INS.location.x, -0.906 - (-INS.location.y)
INS.location = (0.691, 0.906, 5.0)
def na_insula(x, z, m=0.0):
    # planta em L (medida no modelo): bloco do fundo e a ala da esquerda
    return (-2.3 - m < x < 7.19 + m and -6.32 - m < z < -2.2 + m) or (-5.82 - m < x < -2.4 + m and -6.32 - m < z < 4.51 + m)
for j in perto(-9, 11, -10, 8):
    x, z = VX[j], VZ[j]
    dd = math.hypot(max(0, abs(x - 0.69) - 7.4), max(0, abs(z + 0.91) - 6.3))
    w = 1 - sm(0, 1.6, dd)
    if w > 0: H[j] += (5.0 - H[j]) * w

# ---------------- 3. estrada no relevo: no meio, a altura do perfil; nas beiras, mistura ----------------
def aplica_estrada(soN=False):
    for j in range(len(H)):
        x, z = VX[j], VZ[j]
        if not (-22 < x < 20 and -20 < z < 16): continue
        d, i = de(x, z)
        if i < I0 - 8 or i > I1 + 8 or d > MEIA + 1.8: continue
        if d <= MEIA + 0.2: H[j] = TR[i]
        elif not soN: H[j] += (TR[i] - H[j]) * (1 - sm(MEIA + 0.2, MEIA + 1.8, d))
aplica_estrada()

# ---------------- 4. caminhos, rampa, escada ----------------
def ch(nome, pp, hs, meia, banda=1.2, tira=0.5):
    T = comp(pp)
    hs = [t_estrada(*pp[i]) if h == 'estrada' else h for i, h in enumerate(hs)]
    meia = meia if isinstance(meia, list) else [meia] * len(pp)
    return {'nome': nome, 'pp': pp, 'T': T, 'hs': hs, 'meia': meia, 'banda': banda, 'tira': tira}
CAM = [
    ch('caminho_sobrado', [(-7.6, 5.6), (-10.0, 7.6), (-14.2, 11.1), (-15.4, 11.4)], ['estrada', 4.62, 4.5, 4.48], 0.65),
    ch('caminho_alcapao', [(-9.0, 2.5), (-11.2, 2.6), (-13.6, 2.3)], ['estrada', 4.56, 4.5], 0.65),
    ch('caminho_fundos', [(-7.4, -1.4), (-6.5, -4.6), (-4.6, -6.6), (-2.6, -7.0), (4.4, -7.0), (6.9, -7.0)], ['estrada', 5.25, 5.02, 5.0, 5.0, 5.0], 0.65),
    ch('rampa_carroca', [(10.8, -9.2), (10.6, -7.0), (10.3, -2.4), (10.0, 1.8), (9.9, 4.7)], [2.81, 2.62, 1.15, 1.1, 1.38], [1.3, 1.3, 1.25, 1.0, 1.1], 1.0),
    ch('ramal_eira', [(1.6, 6.6), (0.2, 8.0), (-1.0, 9.1)], ['estrada', 2.95, 2.45], 1.1, 1.0),
]
ESCADA = ch('escada', [(-6.15, -5.45), (-6.15, -10.75)], [5.12 - 0.06, 7.80 - 0.06], 0.9, 1.0)
def perfil(c, x, z):
    d, s, lado, i, u = proj(c['pp'], x, z)
    return d, interp(c['hs'], c['T'], s), interp(c['meia'], c['T'], s)
def aplica_caminho(c, soNucleo=False):
    x0, x1, z0, z1 = caixa(c['pp'], max(c['meia']) + c['banda'] + 0.2)
    for j in perto(x0, x1, z0, z1):
        d, hp, mm = perfil(c, VX[j], VZ[j])
        if d <= mm + 0.15: H[j] = hp
        elif not soNucleo and d < mm + c['banda']: H[j] += (hp - H[j]) * (1 - sm(mm + 0.15, mm + c['banda'], d))
for c in CAM + [ESCADA]: aplica_caminho(c)
# o canto da eira junto da estrada fica no nível da eira (o muro segura a estrada em cima)
for j in perto(EX_ - 5, EX_ + 5, EZ_ - 5, EZ_ + 5):
    d = math.hypot(VX[j] - EX_, VZ[j] - EZ_); w = 1 - sm(4.0, 4.6, d)
    if w > 0: H[j] += (HEIRA - H[j]) * w
# o cocho que ficava no meio da estrada nova vai um pouco para baixo, num chãozinho plano
COCHO_NOVO = (5.9, 9.7)
for j in perto(3, 9, 7, 12):
    dd = max(0, math.hypot(VX[j] - COCHO_NOVO[0], VZ[j] - COCHO_NOVO[1]) - 0.9); w = 1 - sm(0, 1.0, dd)
    if w > 0: H[j] += (2.12 - H[j]) * w

# ---------------- 5. muros de arrimo (o chão vira degrau: em cima fica no nível, embaixo corta) ----------------
# lado: -1 = o patamar de cima fica à direita de quem anda pela linha; +1 = à esquerda. alto: número ou 'sonda' (lê o chão 1,6 m para dentro)
def mu(nome, pp, lado, alto, esp=1.1):
    return {'nome': nome, 'pp': pp, 'lado': lado, 'alto': alto, 'esp': esp, 'off': esp * 0.36}
road_sul = []
for i in range(len(AM)):
    p = AM[i]
    if -6.3 <= p.x <= -3.6 and I0 < i < I1:
        q = AM[min(len(AM) - 1, i + 1)] - AM[max(0, i - 1)]; q.z = 0; q.normalize()
        road_sul.append((p.x + q.y * (MEIA + 0.75), p.y - q.x * (MEIA + 0.75)))
road_sul = road_sul[::3][::-1]          # de oeste para leste, como o resto da linha
MUROS = [
    mu('sobrado_eira', [(-22.8, 10.5), (-22.3, 14.6), (-15.0, 14.8), (-13.5, 13.6), (-9.0, 13.6), (-8.4, 12.0), (-8.4, 7.6), (-6.6, 7.0)] + road_sul, -1, 'sonda'),
    mu('eira_frente', [(-9.2, 15.3), (-6.0, 15.8), (-3.4, 15.6), (-1.5, 14.2)], -1, HEIRA),
    mu('casa_de_cima', [(-5.2, -8.5), (4.6, -8.5), (4.6, -19.0)], -1, HC3, 0.95),
    mu('patio_insula', [(4.8, -8.4), (7.8, -8.0), (8.0, -5.6), (8.0, 3.0), (-2.4, 3.0)], 1, 5.0),
    mu('planalto_carroca', [(11.8, -2.4), (12.2, -7.0), (13.7, -7.0), (13.7, -15.4), (12.4, -15.6)], -1, 'sonda'),
]
def amostras_linha(m, A):
    # ao longo da linha (a cada 0,25 m): altura de cima e de baixo
    T = comp(m['pp']); out = []; s = 0.0
    while s <= T[-1] + 1e-6:
        i = max(0, min(len(m['pp']) - 2, next((k for k in range(1, len(T)) if T[k] >= s - 1e-9), len(T) - 1) - 1))
        ax, az = m['pp'][i]; bx, bz = m['pp'][i + 1]; L = math.hypot(bx - ax, bz - az) or 1e-9
        nx, nz = -(bz - az) / L * m['lado'], (bx - ax) / L * m['lado']        # normal para o lado de cima
        x, z = em(m['pp'], s)
        hi = alt(x + nx * 1.6, z + nz * 1.6, A) if m['alto'] == 'sonda' else m['alto']
        lo = max(hi - 3.2, alt(x - nx * 2.4, z - nz * 2.4, A))
        out.append((s, hi, lo)); s += 0.25
    return out
for m in MUROS:
    m['am'] = amostras_linha(m, list(H))
def hi_lo(m, s):
    am = m['am']; k = max(0, min(len(am) - 1, int(round(s / 0.25)))); return am[k][1], am[k][2]
for m in MUROS:
    T = comp(m['pp'])
    x0, x1, z0, z1 = caixa(m['pp'], 3.2)
    for j in perto(x0, x1, z0, z1):
        x, z = VX[j], VZ[j]
        d, s, sl, i, u = proj(m['pp'], x, z)
        if (s <= 0.0 and u == 0 and i == 0 and d > 0.7) or (s >= T[-1] and d > 0.7): continue     # além das pontas
        sg = sl * m['lado']
        if abs(sg) > 3.0: continue
        hi, lo = hi_lo(m, s)
        if sg > -0.1:
            H[j] = max(H[j], hi - max(0.0, sg - 2.2) * 1.0) if sg < 3.0 else H[j]
        else:
            H[j] = min(H[j], lo + max(0.0, -sg - 0.55) * 1.3)

# ---------------- 6. o meio dos caminhos e da estrada volta ao nível exato; a ínsula assenta no plano ----------------
aplica_estrada(soN=True)
for c in CAM + [ESCADA]: aplica_caminho(c, soNucleo=True)
for j in perto(-7, 9, -8, 6):
    if na_insula(VX[j], VZ[j], -0.15): H[j] = 5.0

# grava o relevo
for j, v in enumerate(ME.vertices): v.co.z = H[j]
ME.update()
mud = sum(1 for a, b in zip(H, H_ORIG) if abs(a - b) > 0.01)
log('terreno: vertices mudados', mud)

# ---------------- 7. cores do chão onde mudou ----------------
def hexc(h): return tuple(int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)) + (1.0,)
COR = {'grama': hexc('a9b46a'), 'grama2': hexc('9caa5f'), 'seca': hexc('c2bd7c'), 'barranco': hexc('c4a774'), 'areia': hexc('e6cf9c')}
def ruido(x, z): return 0.5 + 0.5 * math.sin(x * 0.21 + 3.1) * math.cos(z * 0.17 + 1.3) * 0.6 + 0.2 * math.sin(x * 0.05 - z * 0.07)
rng = random.Random(1117); cad = ME.color_attributes['Col']
CAMPO = {'x0': 12.5, 'x1': 21.9, 'z0': -23.4, 'z1': -18.2}
def em_caminho(x, z, m=0.0):
    if de(x, z)[0] < MEIA + 0.4 + m and -22 < x < 20 and -20 < z < 16: return True
    return any(perfil(c, x, z)[0] < perfil(c, x, z)[2] + 0.35 + m for c in CAM + [ESCADA])
for p in ME.polygons:
    vs = p.vertices
    if not any(abs(H[v] - H_ORIG[v]) > 0.02 for v in vs):
        c = p.center
        if not (-24 < c.x < 16 and -16 < -c.y < 18 and em_caminho(c.x, -c.y)): continue
    c = p.center; x, z = c.x, -c.y; n = p.normal
    if math.hypot(x - EX_, z - EZ_) < EIRA_R + 1.0: continue
    if CAMPO['x0'] - 0.3 < x < CAMPO['x1'] + 0.3 and CAMPO['z0'] - 0.3 < z < CAMPO['z1'] + 0.3: continue
    if em_caminho(x, z): col = COR['areia']
    elif abs(n.z) < 0.5: col = COR['barranco']
    elif abs(n.z) < 0.75: col = COR['grama2']
    else:
        r = ruido(x, z); jj = rng.random() * 0.05
        base = COR['grama'] if r < 0.55 else COR['grama2'] if r < 0.75 else COR['seca']
        col = tuple(min(1, v * (0.97 + jj)) for v in base[:3]) + (1,)
    for li in p.loop_indices: cad.data[li].color_srgb = col

# ---------------- 8. malha da estrada e dos caminhos ----------------
COL_EXP = bpy.data.collections['Exportar']
def faixa(nome, linhas, cor, mult=(0.97, 1.01), varias=False):
    bm = bmesh.new()
    for linhas_ in (linhas if varias else [linhas]):
        prev = None; novas = []
        for row_pts in linhas_:
            row = [bm.verts.new((x, -z, alt(x, z) + 0.04)) for x, z in row_pts]
            if prev:
                for j in range(len(row) - 1): novas.append(bm.faces.new((prev[j], prev[j + 1], row[j + 1], row[j])))
            prev = row
        bm.normal_update()
        if sum(f.normal.z for f in novas) < 0: bmesh.ops.reverse_faces(bm, faces=novas)
    me = bpy.data.meshes.new(nome); bm.to_mesh(me); bm.free()
    ca = me.color_attributes.new('Col', 'BYTE_COLOR', 'CORNER')
    for p in me.polygons:
        v = mult[0] + rng.random() * (mult[1] - mult[0])
        for li in p.loop_indices: ca.data[li].color_srgb = tuple(c * v for c in cor[:3]) + (1,)
    return me
linhas = []
for i, p in enumerate(AM):
    q = AM[min(len(AM) - 1, i + 1)] - AM[max(0, i - 1)]; q.z = 0; q.normalize()
    nx, nz = -q.y, q.x; w = MEIA * (0.95 + 0.06 * math.sin(i * 0.15))
    linhas.append([(p.x + nx * w * s, p.y + nz * w * s) for s in (-1, -0.5, 0, 0.5, 1)])
EST = bpy.data.objects['Betfage_Estrada']; me_velha = EST.data
mat = me_velha.materials[0]
EST.data = faixa('Betfage_Estrada', linhas, COR['areia']); EST.data.materials.append(mat); bpy.data.meshes.remove(me_velha)
bmc = []
def linhas_caminho(c, passo=0.5):
    T = c['T']; out = []; s = 0.0
    while True:
        x, z = em(c['pp'], min(s, T[-1]))
        a, b = em(c['pp'], max(0, min(s, T[-1]) - 0.2)), em(c['pp'], min(T[-1], min(s, T[-1]) + 0.2))
        dx, dz = b[0] - a[0], b[1] - a[1]; L = math.hypot(dx, dz) or 1; nx, nz = -dz / L, dx / L
        w = interp(c['meia'], T, min(s, T[-1])) * (0.92 + 0.08 * math.sin(s * 1.3))
        out.append([(x + nx * w * k, z + nz * w * k) for k in (-1, 0, 1)])
        if s >= T[-1]: break
        s += passo
    return out
velho = bpy.data.objects.get('Betfage_Estrada_Caminhos')
if velho: bpy.data.objects.remove(velho)
mec = faixa('Betfage_Estrada_Caminhos', [linhas_caminho(c) for c in CAM], COR['areia'], (0.9, 0.96), varias=True)
oc = bpy.data.objects.new('Betfage_Estrada_Caminhos', mec); COL_EXP.objects.link(oc); oc.data.materials.append(mat)

# ---------------- 9. objetos: muretas velhas saem; quem cai em muro, caminho ou estrada sai; o resto assenta no chão ----------------
def tira(o):
    for c in list(o.children_recursive): bpy.data.objects.remove(c)
    bpy.data.objects.remove(o)
for o in [o for o in COL_EXP.objects if o.name.startswith('Mureta_Alta')]: tira(o)
# mudanças feitas à mão (autosave do Blender aberto, não salvas)
MAO = {'Cipreste1_Redondo.001': (-15.17, -3.473), 'Rocha2.003': (1.814, 2.35)}
# objetos fixos que ficavam em cima de caminho ou muro novo: andam um pouco
MOVE = {'Banquinho.001': (8.9, -10.3), 'Cesto_Espigas.001': (-9.6, 10.2), 'Cesto_Graos.001': (-10.3, 10.6), 'Lenha.001': (-3.3, -9.7),
        'Feixe_EmPe.001': (12.4, -13.3), 'Feixe_EmPe.002': (12.95, -12.6), 'Feixe_EmPe.003': (12.5, -12.0), 'Feixe_EmPe.004': (12.95, -13.9), 'Feixe_EmPe.005': (12.2, -14.4)}
for nome, (x, z) in list(MAO.items()) + list(MOVE.items()):
    o = bpy.data.objects.get(nome)
    if o: o.location.x, o.location.y = x, -z
cc = next((o for o in bpy.data.objects if o.get('no') == 'Cocho' and o.parent is None and abs(o.location.x - 4.89) < 0.1), None)
if cc: cc.location.x, cc.location.y = COCHO_NOVO[0], -COCHO_NOVO[1]
def em_muro(x, z, folga):
    for m in MUROS:
        d, s, sl, i, u = proj(m['pp'], x, z)
        if d > m['esp'] + folga + 0.3: continue
        if ((i == 0 and u <= 1e-9) or (i == len(m['pp']) - 2 and u >= 1 - 1e-9)) and d > 0.6: continue
        sg = sl * m['lado']
        if -m['esp'] - folga < sg < 0.2 + folga: return m['nome']
    return None
SOLTOS = ('Arvore', 'Cipreste', 'Rocha', 'Tamareira', 'Oliveira')
saem = []
for nome_ in [o.name for o in bpy.data.objects]:
    o = bpy.data.objects.get(nome_)
    if o is None or o.parent is not None or ('glb' not in o and 'planta' not in o): continue
    if o.name in MAO or o.name in MOVE: continue
    x, z = o.location.x, -o.location.y
    solto = 'planta' in o or any(o.get('no', '').startswith(s) for s in SOLTOS)
    porque = None
    if -22 < x < 20 and -20 < z < 16 and de(x, z)[0] < MEIA + 0.3 and G['dist_estrada'](x, z)[0] >= MEIA + 0.3: porque = 'estrada'
    elif any(perfil(c, x, z)[0] < perfil(c, x, z)[2] + c['tira'] for c in CAM + [ESCADA]): porque = 'caminho'
    else: porque = em_muro(x, z, 0.5)
    if porque:
        if solto: saem.append((o.name, porque)); tira(o)
        else: log('ATENCAO objeto fixo em', porque, o.name, round(x, 2), round(z, 2))
log('sairam', len(saem), saem)
bpy.context.view_layer.update()
def chao(x, z):
    ok, loc, *_ = TER.ray_cast(Vector((x, -z, 300)), Vector((0, 0, -1))); return loc.z if ok else alt(x, z)
ass = 0
for o in bpy.data.objects:
    if o.parent is not None or ('glb' not in o and 'planta' not in o): continue
    x, z = o.location.x, -o.location.y
    if o.name in MAO or o.name in MOVE or (cc and o == cc) or abs(alt(x, z) - alt(x, z, H_ORIG)) > 0.005:
        y = chao(x, z) - o.get('afunda', 0.05)
        if o.get('no', '').startswith('Casa_'): continue
        o.location.z = y; ass += 1
    if 'x0' in o: o['x0'], o['z0'] = x, z
log('reassentados', ass)

# ---------------- 10. muros novos (muretas da prancha, em fiadas) ----------------
PM = bpy.data.objects['Mureta_Alta']; PC_ = bpy.data.objects['Muro_Pilar']
HM, EM_ = 1.318, 0.856
COL_COL = bpy.data.collections['Colisao']
def circulo(nome, x, z, y, r, dono):
    e = bpy.data.objects.new(nome, None); COL_COL.objects.link(e)
    e.empty_display_type = 'CIRCLE'; e.empty_display_size = 1.0; e['colisao'] = 'circ'; e.hide_render = True; e.show_in_front = True
    e.matrix_world = Matrix.Translation((x, -z, y)) @ Matrix.Rotation(math.pi / 2, 4, 'X') @ Matrix.Diagonal((r, r, r, 1))
    e['dono'] = 1; e.parent = dono; e.matrix_parent_inverse = dono.matrix_world.inverted()
nm = 0; nc = 0
for m in MUROS:
    pp = m['pp']
    for i in range(len(pp) - 1):
        ax, az = pp[i]; bx, bz = pp[i + 1]; L = math.hypot(bx - ax, bz - az)
        if L < 0.3: continue
        ux, uz = (bx - ax) / L, (bz - az) / L
        nx, nz = -uz * m['lado'], ux * m['lado']                     # para cima
        n = max(1, round(L / 2.0)); l = L / n
        s0 = comp(pp)[i]
        for k in range(n):
            ca, cb = k * l, (k + 1) * l
            mx, mz = ax + ux * (ca + cb) / 2 - nx * m['off'], az + uz * (ca + cb) / 2 - nz * m['off']
            his = [hi_lo(m, s0 + c)[0] for c in (ca, (ca + cb) / 2, cb)]
            topo = max(his) + 0.12
            base = min(alt(ax + ux * c - nx * o_, az + uz * c - nz * o_) for c in (ca - 0.5, ca, (ca + cb) / 2, cb, cb + 0.5) for o_ in (-0.1, 0.15, 0.5, 0.9, 1.3)) - 0.25
            Ht = topo - base
            if Ht < 0.35: continue
            fi = max(1, math.ceil(Ht / 1.55)); hf = Ht / fi
            yaw = math.atan2(-uz, ux)
            dono = None
            for f in range(fi):
                w = PM.copy(); COL_EXP.objects.link(w)
                w.location = (mx, -mz, base + f * hf); w.rotation_mode = 'XYZ'
                w.rotation_euler = (0, 0, yaw + (math.pi if (k + f + i) % 2 else 0))
                w.scale = ((l + m['esp'] * 0.55) / 2.0, m['esp'] / EM_, hf / HM)
                w['muro'] = m['nome']; nm += 1
                if dono is None: dono = w
            bpy.context.view_layer.update()
            c = ca
            while c <= cb + 1e-6:
                circulo('COL_%s_%d_%d' % (m['nome'], i, nc), ax + ux * c - nx * m['off'], az + uz * c - nz * m['off'], topo - 0.3, m['esp'] / 2 + 0.05, dono); nc += 1
                c += 0.6
log('muros novos: pecas', nm, 'circulos', nc)

# ---------------- 11. escada de pedra até a casa de cima ----------------
PE_ = bpy.data.objects['Mureta_Escada']
(ax, az), (bx, bz) = ESCADA['pp']; L = math.hypot(bx - ax, bz - az); ux, uz = (bx - ax) / L, (bz - az) / L
NE = 2; sub = (7.80 - 5.12) / NE          # o patamar de cima de cada lance fica a 0,87 da altura da peça: é ali que o próximo começa
for k in range(NE):
    cx, cz = ax + ux * L * (k + 0.5) / NE, az + uz * L * (k + 0.5) / NE
    e = PE_.copy(); COL_EXP.objects.link(e)
    e.location = (cx, -cz, 5.12 + k * sub - 0.02); e.rotation_mode = 'XYZ'; e.rotation_euler = (0, 0, math.atan2(-ux, -uz))
    e.scale = (0.9, (L / NE) / 2.5, sub / 0.87); e['muro'] = 'escada'
log('escada: degraus de', round(sub / 6, 2), 'm')

# ---------------- 12. referências para o jogo: rota da carroça e caminhos (área de andar) ----------------
ROTA = [(10.4, -11.0), (10.6, -8.6), (10.5, -6.6), (10.3, -2.4), (10.0, 1.8), (9.9, 4.6)]
i_a, i_b = de(9.2, 6.2)[1], de(1.6, 6.6)[1]
for i in range(i_a, i_b, -1 if i_b < i_a else 1):
    if i % 4 == 0: ROTA.append((round(AM[i].x, 2), round(AM[i].y, 2)))
ROTA += [(1.6, 6.6), (0.75, 7.5), (-0.1, 8.35)]       # a carroça para no ramal, ao lado das pilhas de feixes da eira
velho = bpy.data.objects.get('JOGO_rota_carroca')
if velho: bpy.data.objects.remove(velho)
bm = bmesh.new(); vv = [bm.verts.new((x, -z, chao(x, z) + 0.3)) for x, z in ROTA]
for a, b in zip(vv, vv[1:]): bm.edges.new((a, b))
mr = bpy.data.meshes.new('JOGO_rota_carroca'); bm.to_mesh(mr); bm.free()
orr = bpy.data.objects.new('JOGO_rota_carroca', mr); bpy.data.collections['Referencia_jogo'].objects.link(orr); orr.hide_render = True
F = json.loads(bpy.data.texts['betfage_fixos'].as_string())
F['estrada'] = [[round(p.x, 2), round(p.y, 2)] for p in AM[::3]]
F['caminhos'] = [[round(max(c['meia']), 2), [[round(x, 2), round(z, 2)] for x, z in c['pp']]] for c in CAM + [ESCADA]]
bpy.data.texts['betfage_fixos'].clear(); bpy.data.texts['betfage_fixos'].write(json.dumps(F))

# ---------------- conferências ----------------
for nome, ppx in (('estrada perto do patio', [(5.2, 6.05), (1.0, 6.7), (8.0, 5.95)]),):
    for x, z in ppx: log(nome, x, z, 'centro', round(alt(x, z), 2), 'lados', round(alt(x, z - 1.4), 2), round(alt(x, z + 1.4), 2))
ap = bpy.data.objects.get('Muro_Curvo.001')
if ap:
    vs = [ap.matrix_world @ v.co for v in ap.data.vertices]
    log('aprisco: menor x', round(min(v.x for v in vs), 2), 'entre z 0 e 3:', round(min(v.x for v in vs if 0 < -v.y < 3), 2))
po = bpy.data.objects.get('Poco_Agua')
if po:
    vs = [po.matrix_world @ v.co for v in po.data.vertices]; log('poco: z min', round(min(-v.y for v in vs), 2))
car = bpy.data.objects['Carroca']; bb = [Vector(c) for c in car.bound_box]
log('carroca proto', [round(max(v[i] for v in bb) - min(v[i] for v in bb), 2) for i in range(3)])
if '--salvar' in sys.argv:
    bpy.ops.wm.save_as_mainfile(filepath=ROOT + r"\fase-betfage\betfage.blend")
    log('SALVO', bpy.data.filepath)
open(r"C:\Users\isaqu\AppData\Local\Temp\claude\956e92763068254c\f51927a9-9486-4ab8-a8f5-2b0632db0d38\scratchpad\v2\ajuste_log.txt", 'w', encoding='utf-8').write('\n'.join(LOG))
