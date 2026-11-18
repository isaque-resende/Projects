# Betfagé: segundo ajuste aplicado UMA VEZ sobre o betfage.blend (18/11/2026), a partir das marcas do usuário:
#   - o trigal sai do pé do morro (fora da câmera) e vai para o planalto onde ficava a carroça; o planalto fica plano
#     e o muro do planalto ganha um trecho ao norte; a carroça desce para junto do muro, no alto da rampa;
#   - escada de pedra da casa de cima até o trigal (passa por um vão no muro, entre duas muretas);
#   - vão no muro da frente do pátio da ínsula, com rampa de terra da estrada até o pátio (os jumentinhos);
#   - aprisco um pouco mais para baixo (abre o caminho); sai a árvore junto do poço (o cocho aparece);
#   - forno e bancada para perto do sobrado (dentro do quadro);
#   - saem os ciprestes da subida para Jerusalém: duas figueiras de um lado e uma do outro; mais acima, duas e duas,
#     e uma delas é a figueira seca (JOGO_figseca).
# Rodar:  blender -b betfage.blend -P ajuste2_trigal_figueiras.py -- [--salvar]
# Mundo do jogo (x, z) = Blender (x, -y); altura = Blender z.
import bpy, bmesh, math, json, random, sys
from mathutils import Vector, Matrix

ROOT = r"M:\Claude\github\Projects-animais\assets-vila"
G = {'__name__': 'gerador'}
exec(open(ROOT + r"\fase-betfage\betfage_blender.py", encoding='utf-8').read().split('# ---------------- cena ----------------')[0], G)
sm, HC3 = G['sm'], G['HC3']
LOG = []
def log(*a): LOG.append(' '.join(str(x) for x in a)); print(*a)
log('HC3', HC3)

# ---------------- terreno (grade 181 x 181, passo 0,8) e polilinhas: como no primeiro ajuste ----------------
TER = bpy.data.objects['Betfage_Terreno']; ME = TER.data
NG, P0, PS = 181, -72.0, 0.8
H = [v.co.z for v in ME.vertices]
H_ORIG = list(H)
VX = [P0 + (i // NG) * PS for i in range(len(H))]
VZ = [P0 + (i % NG) * PS for i in range(len(H))]
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
def comp(pp):
    t = [0.0]
    for i in range(1, len(pp)): t.append(t[-1] + math.hypot(pp[i][0] - pp[i - 1][0], pp[i][1] - pp[i - 1][1]))
    return t
def proj(pp, x, z):
    best = None; T = comp(pp)
    for i in range(len(pp) - 1):
        ax, az = pp[i]; bx, bz = pp[i + 1]; dx, dz = bx - ax, bz - az; L2 = dx * dx + dz * dz or 1e-9
        u = max(0.0, min(1.0, ((x - ax) * dx + (z - az) * dz) / L2))
        px, pz = ax + dx * u, az + dz * u; d = math.hypot(x - px, z - pz)
        if best is None or d < best[0] - 1e-9:
            L = math.sqrt(L2); s = ((x - ax) * (-dz) + (z - az) * dx) / L
            best = (d, T[i] + u * L, s, i, u)
    d, sl, s, i, u = best
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

# ---------------- 1. o planalto da carroça fica plano: ali vai o trigal ----------------
HP = 2.8
CAMPO_N = {'x0': 7.6, 'x1': 13.0, 'z0': -16.6, 'z1': -12.4}
PLAT = (6.9, 13.3, -17.0, -9.4)
CAMPO_V = {'x0': 12.5, 'x1': 21.9, 'z0': -23.4, 'z1': -18.2}
for j in perto(PLAT[0] - 1.3, PLAT[1] + 1.3, PLAT[2] - 1.3, PLAT[3] + 1.3):
    x, z = VX[j], VZ[j]
    dx = max(0, PLAT[0] - x, x - PLAT[1]); dz = max(0, PLAT[2] - z, z - PLAT[3]); dd = math.hypot(dx, dz)
    if dd > 0 and (x > PLAT[1] or (z < PLAT[2] and x > 10.4)): continue      # do lado do muro do planalto, o muro segura
    w = 1 - sm(0, 1.2, dd)
    if w > 0: H[j] += (HP - H[j]) * w

# ---------------- 2. aprisco um pouco mais para baixo, num chão plano ----------------
AP_D = (1.5, 0.8)
AP = bpy.data.objects['Muro_Curvo.001']
vs = [AP.matrix_world @ v.co for v in AP.data.vertices]
apc = ((min(v.x for v in vs) + max(v.x for v in vs)) / 2, (min(-v.y for v in vs) + max(-v.y for v in vs)) / 2)
apr = (max(v.x for v in vs) - min(v.x for v in vs)) / 2
APN = (apc[0] + AP_D[0], apc[1] + AP_D[1]); HAP = 1.04
log('aprisco: centro', [round(c, 2) for c in apc], 'raio', round(apr, 2), '-> ', [round(c, 2) for c in APN])
for j in perto(APN[0] - 6, APN[0] + 6, APN[1] - 6, APN[1] + 6):
    dd = max(0, math.hypot(VX[j] - APN[0], VZ[j] - APN[1]) - (apr + 0.7)); w = 1 - sm(0, 1.5, dd)
    if w > 0: H[j] += (HAP - H[j]) * w

# ---------------- 3. caminhos novos: escada da casa de cima ao trigal; rampa da estrada ao pátio da ínsula ----------------
def ch(nome, pp, hs, meia, banda=1.2, tira=0.5, so_banda=None):
    T = comp(pp); meia = meia if isinstance(meia, list) else [meia] * len(pp)
    return {'nome': nome, 'pp': pp, 'T': T, 'hs': hs, 'meia': meia, 'banda': banda, 'tira': tira, 'so_banda': so_banda}
def perfil(c, x, z):
    d, s, lado, i, u = proj(c['pp'], x, z)
    return d, interp(c['hs'], c['T'], s), interp(c['meia'], c['T'], s)
def aplica_caminho(c, soNucleo=False):
    x0, x1, z0, z1 = caixa(c['pp'], max(c['meia']) + c['banda'] + 0.2)
    for j in perto(x0, x1, z0, z1):
        d, hp, mm = perfil(c, VX[j], VZ[j])
        if d <= mm + 0.15: H[j] = hp
        elif not soNucleo and d < mm + c['banda'] and (c['so_banda'] is None or c['so_banda'](VX[j], VZ[j])):
            H[j] += (hp - H[j]) * (1 - sm(mm + 0.15, mm + c['banda'], d))
ESC_B, ESC_T = (6.6, -13.0), (0.8, -16.9)
ESC2 = ch('escada_trigal', [ESC_B, ESC_T], [HP - 0.06, HC3 - 0.06], 0.9, 1.0, so_banda=lambda x, z: x > 4.7)
ENT_FIM = (-1.5, 5.2)
ENT = ch('entrada_patio', [(-1.5, 1.9), ENT_FIM], [5.0, alt(*ENT_FIM)], 0.8, 1.0)
NOVOS = [ESC2, ENT]
for c in NOVOS: aplica_caminho(c)

# ---------------- 4. muros refeitos (com os vãos) e muretas dos lados da escada ----------------
def mu(nome, pp, lado, alto, esp=1.1, so=None, lo_fn=None):
    return {'nome': nome, 'pp': pp, 'lado': lado, 'alto': alto, 'esp': esp, 'off': esp * 0.36, 'so': so, 'lo_fn': lo_fn}
# a escada cruza o muro da casa de cima: as muretas dos lados ficam a 1,45 m do eixo
ux_, uz_ = ESC_T[0] - ESC_B[0], ESC_T[1] - ESC_B[1]; L_ = math.hypot(ux_, uz_); ux_, uz_ = ux_ / L_, uz_ / L_
nx_, nz_ = -uz_, ux_
def cruza(sinal):      # onde a linha a 1,45 m do eixo cruza x = 4,6
    s = (ESC_B[0] + nx_ * 1.45 * sinal - 4.6) / -ux_
    return (4.6, ESC_B[1] + uz_ * s + nz_ * 1.45 * sinal)
def ponta(sinal, p=0.95):
    return (ESC_B[0] + ux_ * L_ * p + nx_ * 1.45 * sinal, ESC_B[1] + uz_ * L_ * p + nz_ * 1.45 * sinal)
CR_E, CR_D = cruza(1), cruza(-1)
z_vao = sorted([CR_E[1], CR_D[1]])
log('vao do muro da casa de cima: z', [round(v, 2) for v in z_vao])
lo_escada = lambda x, z: perfil(ESC2, x, z)[1]
MUROS = [
    mu('casa_de_cima', [(-5.2, -8.5), (4.6, -8.5), (4.6, z_vao[1])], -1, HC3, 0.95),
    mu('casa_de_cima_n', [(4.6, z_vao[0]), (4.6, -19.0)], -1, HC3, 0.95),
    mu('escada_trigal_e', [CR_E, ponta(1)], 1, HC3, 0.8, so=lambda x, z: x < 4.4, lo_fn=lo_escada),
    mu('escada_trigal_d', [CR_D, ponta(-1)], -1, HC3, 0.8, so=lambda x, z: x < 4.4, lo_fn=lo_escada),
    mu('patio_insula', [(4.8, -8.4), (7.8, -8.0), (8.0, -5.6), (8.0, 3.0), (-0.5, 3.0)], 1, 5.0),
    mu('planalto_carroca', [(11.8, -2.4), (12.2, -7.0), (13.7, -7.0), (13.7, -15.4), (13.6, -17.5), (10.6, -17.6)], -1, 'sonda'),
]
log('muretas da escada', [[round(v, 2) for v in p] for m in MUROS[2:4] for p in m['pp']])
def amostras_linha(m, A):
    T = comp(m['pp']); out = []; s = 0.0
    while s <= T[-1] + 1e-6:
        i = max(0, min(len(m['pp']) - 2, next((k for k in range(1, len(T)) if T[k] >= s - 1e-9), len(T) - 1) - 1))
        ax, az = m['pp'][i]; bx, bz = m['pp'][i + 1]; L = math.hypot(bx - ax, bz - az) or 1e-9
        nx, nz = -(bz - az) / L * m['lado'], (bx - ax) / L * m['lado']
        x, z = em(m['pp'], s)
        hi = alt(x + nx * 1.6, z + nz * 1.6, A) if m['alto'] == 'sonda' else m['alto']
        lo = m['lo_fn'](x - nx * 1.2, z - nz * 1.2) if m['lo_fn'] else max(hi - 3.2, alt(x - nx * 2.4, z - nz * 2.4, A))
        out.append((s, hi, lo)); s += 0.25
    return out
for m in MUROS: m['am'] = amostras_linha(m, list(H))
def hi_lo(m, s):
    am = m['am']; k = max(0, min(len(am) - 1, int(round(s / 0.25)))); return am[k][1], am[k][2]
for m in MUROS:
    T = comp(m['pp'])
    x0, x1, z0, z1 = caixa(m['pp'], 3.2)
    for j in perto(x0, x1, z0, z1):
        x, z = VX[j], VZ[j]
        if m['so'] and not m['so'](x, z): continue
        d, s, sl, i, u = proj(m['pp'], x, z)
        if (s <= 0.0 and u == 0 and i == 0 and d > 0.7) or (s >= T[-1] and d > 0.7): continue
        sg = sl * m['lado']
        if abs(sg) > 3.0: continue
        hi, lo = hi_lo(m, s)
        if sg > -0.1: H[j] = max(H[j], hi - max(0.0, sg - 2.2) * 1.0) if sg < 3.0 else H[j]
        else: H[j] = min(H[j], lo + max(0.0, -sg - 0.55) * 1.3)
for c in NOVOS: aplica_caminho(c, soNucleo=True)
for j, v in enumerate(ME.vertices): v.co.z = H[j]
ME.update()
log('terreno: vertices mudados', sum(1 for a, b in zip(H, H_ORIG) if abs(a - b) > 0.01))

# ---------------- 5. cores do chão: trigal novo com a terra do velho, o velho vira grama ----------------
def hexc(h): return tuple(int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)) + (1.0,)
COR = {'grama': hexc('a9b46a'), 'grama2': hexc('9caa5f'), 'seca': hexc('c2bd7c'), 'barranco': hexc('c4a774'), 'areia': hexc('e6cf9c')}
def ruido(x, z): return 0.5 + 0.5 * math.sin(x * 0.21 + 3.1) * math.cos(z * 0.17 + 1.3) * 0.6 + 0.2 * math.sin(x * 0.05 - z * 0.07)
rng = random.Random(1118); cad = ME.color_attributes['Col']
def no_rect(r, x, z, m=0.0): return r['x0'] - m < x < r['x1'] + m and r['z0'] - m < z < r['z1'] + m
ac = [0, 0, 0]; na = 0
for p in ME.polygons:
    c = p.center
    if no_rect(CAMPO_V, c.x, -c.y, -0.8):
        for li in p.loop_indices:
            col = cad.data[li].color_srgb; ac = [ac[k] + col[k] for k in range(3)]; na += 1
TERRA = tuple(v / max(1, na) for v in ac) + (1.0,)
log('cor da terra do trigal', [round(v, 3) for v in TERRA[:3]])
def em_caminho(x, z, m=0.0): return any(perfil(c, x, z)[0] < perfil(c, x, z)[2] + 0.35 + m for c in NOVOS)
nc_ = 0
for p in ME.polygons:
    vs_ = p.vertices; c = p.center; x, z = c.x, -c.y
    mudou = any(abs(H[v] - H_ORIG[v]) > 0.02 for v in vs_)
    if not (mudou or no_rect(CAMPO_V, x, z, 0.4) or no_rect(CAMPO_N, x, z, 0.4)): continue
    n = p.normal
    if no_rect(CAMPO_N, x, z, 0.2): col = tuple(min(1, v * (0.96 + rng.random() * 0.06)) for v in TERRA[:3]) + (1,)
    elif em_caminho(x, z): col = COR['areia']
    elif abs(n.z) < 0.5: col = COR['barranco']
    elif abs(n.z) < 0.75: col = COR['grama2']
    else:
        r = ruido(x, z); jj = rng.random() * 0.05
        base = COR['grama'] if r < 0.55 else COR['grama2'] if r < 0.75 else COR['seca']
        col = tuple(min(1, v * (0.97 + jj)) for v in base[:3]) + (1,)
    for li in p.loop_indices: cad.data[li].color_srgb = col
    nc_ += 1
log('faces repintadas', nc_)

# ---------------- 6. faixa de terra da rampa do pátio ----------------
COL_EXP = bpy.data.collections['Exportar']
mat = bpy.data.objects['Betfage_Estrada_Caminhos'].data.materials[0]
def faixa(nome, linhas_lista, cor, mult=(0.9, 0.96)):
    bm = bmesh.new()
    for linhas_ in linhas_lista:
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
velho = bpy.data.objects.get('Betfage_Estrada_Caminhos_2')
if velho: bpy.data.objects.remove(velho)
oc = bpy.data.objects.new('Betfage_Estrada_Caminhos_2', faixa('Betfage_Estrada_Caminhos_2', [linhas_caminho(ENT)], COR['areia']))
COL_EXP.objects.link(oc); oc.data.materials.append(mat)

# ---------------- 7. objetos ----------------
def tira(o):
    for c in list(o.children_recursive): bpy.data.objects.remove(c)
    bpy.data.objects.remove(o)
# muros velhos que serão refeitos
for o in [o for o in COL_EXP.objects if o.get('muro') in ('casa_de_cima', 'patio_insula', 'planalto_carroca')]: tira(o)
# saem: os ciprestes da subida, a árvore junto do poço
for n in ('Cipreste2_Esguio.001', 'Cipreste2_Esguio.002', 'Cipreste2_Esguio.003', 'Cipreste2_Esguio.004', 'Arvore9.001'):
    o = bpy.data.objects.get(n)
    if o: tira(o); log('saiu', n)
# figueiras: as sãs vêm do figueiras.glb (prévia no Blender = a malha do nó)
FIGS = [  # (nó, x, z, escala)
    ('Figueira4_Grande_ComFruta', -8.76, -8.09, 0.8), ('Figueira2_Larga_ComFruta', -9.68, -11.81, 0.65), ('Figueira1_Jovem_ComFruta', -14.97, -8.2, 1.0),
    ('Figueira3_Encostada_ComFruta', -14.21, -22.18, 0.8), ('Figueira4_Grande_ComFruta', -18.39, -16.85, 0.8), ('Figueira2_Larga_SemFruta', -19.69, -19.5, 0.65),
]
FIGSECA = (-12.63, -18.94)
antes = set(bpy.data.objects)
bpy.ops.import_scene.gltf(filepath=ROOT + r"\figueiras\figueiras.glb")
imp = [o for o in bpy.data.objects if o not in antes]
PROTO = {}
for o in imp:
    if o.type == 'MESH':
        nome = o.name.split('.')[0]
        if nome not in PROTO:
            me = o.data.copy(); me.name = 'Proto_' + nome
            me.transform(Matrix.Diagonal(o.matrix_world.to_scale().to_4d()))
            PROTO[nome] = me
for o in imp: bpy.data.objects.remove(o)
log('prototipos de figueira', sorted(PROTO))
COL_OBJ = bpy.data.collections['Cenario_objetos']; COL_COL = bpy.data.collections['Colisao']
def circulo(nome, x, z, y, r, dono):
    e = bpy.data.objects.new(nome, None); COL_COL.objects.link(e)
    e.empty_display_type = 'CIRCLE'; e.empty_display_size = 1.0; e['colisao'] = 'circ'; e.hide_render = True; e.show_in_front = True
    e.matrix_world = Matrix.Translation((x, -z, y)) @ Matrix.Rotation(math.pi / 2, 4, 'X') @ Matrix.Diagonal((r, r, r, 1))
    e['dono'] = 1; e.parent = dono; e.matrix_parent_inverse = dono.matrix_world.inverted()
bpy.context.view_layer.update()
def chao(x, z):
    ok, loc, *_ = TER.ray_cast(Vector((x, -z, 300)), Vector((0, 0, -1))); return loc.z if ok else alt(x, z)
rngf = random.Random(1811)
novas = []
for i, (no, x, z, k) in enumerate(FIGS):
    o = bpy.data.objects.new('%s.f%d' % (no, i + 1), PROTO[no]); COL_OBJ.objects.link(o)
    o['glb'] = 'figueiras/figueiras.glb'; o['no'] = no; o['r0'] = 0.0; o['k0'] = 1.0; o['afunda'] = 0.1
    o.location = (x, -z, chao(x, z) - 0.1); o.rotation_euler = (0, 0, rngf.random() * 6.283); o.scale = (k, k, k)
    o['x0'], o['z0'] = x, z
    bpy.context.view_layer.update()
    circulo('COL_' + o.name, x, z, o.location.z + 0.2, 0.45, o); o['col_feita'] = o.name
    novas.append(o)
fs = bpy.data.objects['JOGO_figseca']; fs.location = (FIGSECA[0], -FIGSECA[1], chao(*FIGSECA))
c69 = bpy.data.objects.get('COL_069')
if c69: c69.location = (FIGSECA[0], -FIGSECA[1], chao(*FIGSECA) + 0.2)
# andam: forno e bancada (para dentro do quadro), feixes em pé (saem do trigal novo), o aprisco inteiro
MOVE = {'Forno_Barro.001': (-11.8, 11.2), 'Bancada.001': (-11.0, 12.7),
        'Feixe_EmPe.001': (7.9, -10.5), 'Feixe_EmPe.002': (8.5, -10.95), 'Feixe_EmPe.003': (7.55, -11.15), 'Feixe_EmPe.004': (8.15, -11.5), 'Feixe_EmPe.005': (8.85, -11.45)}
for n in ('Muro_Curvo.001', 'Porteira.001', 'Cocho.001', 'JOGO_manjedoura', 'JOGO_pasto'):
    o = bpy.data.objects[n]; MOVE[n] = (o.location.x + AP_D[0], -o.location.y + AP_D[1])
for n, (x, z) in MOVE.items():
    o = bpy.data.objects[n]; o.location.x, o.location.y = x, -z
bpy.context.view_layer.update()
for n, (x, z) in MOVE.items():
    o = bpy.data.objects[n]
    if n == 'Muro_Curvo.001': o.location.z += HAP - 1.04
    else: o.location.z = chao(x, z) - o.get('afunda', 0.0 if n.startswith('JOGO') else 0.05)
    if 'x0' in o: o['x0'], o['z0'] = x, z
# carroça no alto da rampa, junto do muro; o trigal no planalto
CARRO_N = (10.4, -10.4)
ca = bpy.data.objects['Carroca_Jogo']; ca.location = (CARRO_N[0], -CARRO_N[1], chao(*CARRO_N) - ca.get('afunda', 0.02))
cp = bpy.data.objects['Campo_Trigal']; cpw = cp.matrix_world.inverted()
bb = [cp.matrix_world @ Vector(c) for c in cp.bound_box]
zc = sum(v.z for v in bb) / 8
for v in cp.data.vertices:
    w = cp.matrix_world @ v.co
    nxw = CAMPO_N['x0'] if w.x < (min(b.x for b in bb) + max(b.x for b in bb)) / 2 else CAMPO_N['x1']
    nzw = CAMPO_N['z0'] if -w.y < (min(-b.y for b in bb) + max(-b.y for b in bb)) / 2 else CAMPO_N['z1']
    v.co = cpw @ Vector((nxw, -nzw, HP + (w.z - zc)))
cp['y_ref'] = HP
# rota da carroça: começa no lugar novo
rc = bpy.data.objects['JOGO_rota_carroca']
bm = bmesh.new(); bm.from_mesh(rc.data); bm.verts.ensure_lookup_table()
v0 = bm.verts[0]; v0.co = rc.matrix_world.inverted() @ Vector((CARRO_N[0], -CARRO_N[1], chao(*CARRO_N) + 0.3))
if (rc.matrix_world @ bm.verts[1].co).y > -(-8.0):      # o segundo ponto velho (10,6, -8,6) ficava atrás do lugar novo
    bmesh.ops.dissolve_verts(bm, verts=[bm.verts[1]])
bm.to_mesh(rc.data); bm.free()
log('rota', [(round((rc.matrix_world @ v.co).x, 2), round(-(rc.matrix_world @ v.co).y, 2)) for v in rc.data.vertices][:4])
# quem é solto e caiu em trigal novo, caminho novo, muro novo, aprisco novo ou na copa das figueiras: sai
def em_muro(x, z, folga):
    for m in MUROS:
        d, s, sl, i, u = proj(m['pp'], x, z)
        if d > m['esp'] + folga + 0.3: continue
        if ((i == 0 and u <= 1e-9) or (i == len(m['pp']) - 2 and u >= 1 - 1e-9)) and d > 0.6: continue
        sg = sl * m['lado']
        if -m['esp'] - folga < sg < 0.2 + folga: return m['nome']
    return None
SOLTOS = ('Arvore', 'Cipreste', 'Rocha', 'Tamareira', 'Oliveira')
PONTOS = [(x, z, 1.2) for _, x, z, _ in FIGS] + [(FIGSECA[0], FIGSECA[1], 1.4), (APN[0], APN[1], apr + 0.6)]
saem = []
for nome_ in [o.name for o in bpy.data.objects]:
    o = bpy.data.objects.get(nome_)
    if o is None or o.parent is not None or ('glb' not in o and 'planta' not in o) or o in novas or nome_ in MOVE: continue
    x, z = o.location.x, -o.location.y
    solto = 'planta' in o or any(o.get('no', '').startswith(s) for s in SOLTOS)
    porque = None
    if no_rect(CAMPO_N, x, z, 0.4): porque = 'trigal'
    elif any(perfil(c, x, z)[0] < perfil(c, x, z)[2] + c['tira'] for c in NOVOS): porque = 'caminho'
    elif any(math.hypot(x - a, z - b) < r for a, b, r in PONTOS): porque = 'arvore/aprisco'
    else: porque = em_muro(x, z, 0.4)
    if porque:
        if solto: saem.append((o.name, porque)); tira(o)
        else: log('ATENCAO objeto fixo em', porque, o.name, round(x, 2), round(z, 2))
log('sairam', len(saem), saem)
bpy.context.view_layer.update()
ass = 0
for o in bpy.data.objects:
    if o.parent is not None or ('glb' not in o and 'planta' not in o) or o in novas or o.name in MOVE: continue
    x, z = o.location.x, -o.location.y
    if abs(alt(x, z) - alt(x, z, H_ORIG)) > 0.005 and not o.get('no', '').startswith('Casa_'):
        o.location.z = chao(x, z) - o.get('afunda', 0.05); ass += 1
        if 'x0' in o: o['x0'], o['z0'] = x, z
log('reassentados', ass)

# ---------------- 8. muros novos (muretas em fiadas, como no primeiro ajuste) ----------------
PM = bpy.data.objects['Mureta_Alta']
HM, EM_ = 1.318, 0.856
nm = 0; ncc = 0
for m in MUROS:
    pp = m['pp']
    for i in range(len(pp) - 1):
        ax, az = pp[i]; bx, bz = pp[i + 1]; L = math.hypot(bx - ax, bz - az)
        if L < 0.3: continue
        ux, uz = (bx - ax) / L, (bz - az) / L
        nx, nz = -uz * m['lado'], ux * m['lado']
        n = max(1, round(L / 2.0)); l = L / n
        s0 = comp(pp)[i]
        for k in range(n):
            ca_, cb = k * l, (k + 1) * l
            mx, mz = ax + ux * (ca_ + cb) / 2 - nx * m['off'], az + uz * (ca_ + cb) / 2 - nz * m['off']
            his = [hi_lo(m, s0 + c)[0] for c in (ca_, (ca_ + cb) / 2, cb)]
            topo = max(his) + 0.12
            base = min(alt(ax + ux * c - nx * o_, az + uz * c - nz * o_) for c in (ca_ - 0.5, ca_, (ca_ + cb) / 2, cb, cb + 0.5) for o_ in (-0.1, 0.15, 0.5, 0.9, 1.3)) - 0.25
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
            c = ca_
            while c <= cb + 1e-6:
                circulo('COL_%s_%d_%d' % (m['nome'], i, ncc), ax + ux * c - nx * m['off'], az + uz * c - nz * m['off'], topo - 0.3, m['esp'] / 2 + 0.05, dono); ncc += 1
                c += 0.6
log('muros refeitos: pecas', nm, 'circulos', ncc)

# ---------------- 9. escada de pedra (4 lances) ----------------
PE_ = bpy.data.objects['Mureta_Escada']
for o in [o for o in COL_EXP.objects if o.get('muro') == 'escada_trigal']: tira(o)
(ax, az), (bx, bz) = ESC2['pp']; L = math.hypot(bx - ax, bz - az); ux, uz = (bx - ax) / L, (bz - az) / L
h0, h1 = ESC2['hs'][0] + 0.06, ESC2['hs'][1] + 0.06
NE = 4; sub = (h1 - h0) / NE
for k in range(NE):
    cx, cz = ax + ux * L * (k + 0.5) / NE, az + uz * L * (k + 0.5) / NE
    e = PE_.copy(); COL_EXP.objects.link(e)
    e.location = (cx, -cz, h0 + k * sub - 0.02); e.rotation_mode = 'XYZ'; e.rotation_euler = (0, 0, math.atan2(-ux, -uz))
    e.scale = (0.9, (L / NE) / 2.5, sub / 0.87); e['muro'] = 'escada_trigal'
log('escada do trigal: comprimento', round(L, 2), 'desnivel', round(h1 - h0, 2), 'degraus de', round(sub / 6, 2), 'm')

# ---------------- 10. caminhos para o jogo (área de andar) ----------------
F = json.loads(bpy.data.texts['betfage_fixos'].as_string())
F['caminhos'] = [c for c in F.get('caminhos', []) if c[1][0] != [round(x, 2) for x in ESC_B] and c[1][0] != [-1.5, 1.9]]
F['caminhos'] += [[round(max(c['meia']), 2), [[round(x, 2), round(z, 2)] for x, z in c['pp']]] for c in NOVOS]
bpy.data.texts['betfage_fixos'].clear(); bpy.data.texts['betfage_fixos'].write(json.dumps(F))

# ---------------- conferências ----------------
for nome, (x, z) in (('trigal centro', (10.3, -14.3)), ('carroca', CARRO_N), ('boi parado', (10.4, -7.7)), ('aprisco', APN), ('pe da escada', ESC_B), ('topo da escada', ESC_T),
                     ('vao do patio', (-1.5, 2.6)), ('pe da rampa do patio', ENT_FIM), ('forno', (-11.8, 11.2)), ('figueira seca', FIGSECA)):
    log(nome, x, z, 'chao', round(alt(x, z), 2))
if '--salvar' in sys.argv:
    bpy.ops.wm.save_as_mainfile(filepath=ROOT + r"\fase-betfage\betfage.blend")
    log('SALVO', bpy.data.filepath)
open(r"C:\Users\isaqu\AppData\Local\Temp\claude\956e92763068254c\f51927a9-9486-4ab8-a8f5-2b0632db0d38\scratchpad\v3\ajuste2_log.txt", 'w', encoding='utf-8').write('\n'.join(LOG))
