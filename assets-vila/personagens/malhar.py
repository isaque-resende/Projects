# Clipe "Malhar": o NPC levanta a palha com o forcado e joga para o alto (a eira de Betfagé).
# Uso: blender -b --factory-startup -P malhar.py -- personagem.glb saida_anim.glb pasta_previas [variante]
import bpy, sys, math, os
from mathutils import Vector, Matrix, Quaternion

argv = sys.argv[sys.argv.index('--') + 1:]
ENT, SAI, PREV = argv[0], argv[1], argv[2]
VAR = argv[3] if len(argv) > 3 else 'a'
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=ENT)
sc = bpy.context.scene
sc.render.fps = 24
for o in list(bpy.data.objects):
    if o.name.startswith('Icosphere'): bpy.data.objects.remove(o)
arm = next(o for o in bpy.data.objects if o.type == 'ARMATURE')
malha = next(o for o in bpy.data.objects if o.type == 'MESH')
if arm.animation_data:
    arm.animation_data.action = None
    for t in list(arm.animation_data.nla_tracks): arm.animation_data.nla_tracks.remove(t)
B = arm.data.bones
K = B['upperarm_l'].head_local.z / 1.251          # escala do personagem (o robusto é a medida)
print('K', K)

# ---- osso do forcado: eixo Y ao longo do cabo (para os dentes), X para a direita do personagem, Z para cima
bpy.context.view_layer.objects.active = arm
bpy.ops.object.mode_set(mode='EDIT')
eb = arm.data.edit_bones.new('garfo'); eb.parent = arm.data.edit_bones['root']
eb.head = (0, 0, 0); eb.tail = (0, -0.3, 0)
eb.matrix = Matrix(((-1, 0, 0, 0), (0, -1, 0, 0), (0, 0, 1, 0), (0, 0, 0, 1)))   # colunas: X=(-1,0,0), Y=(0,-1,0), Z=(0,0,1)
eb.length = 0.3
bpy.ops.object.mode_set(mode='OBJECT')
print('GARFO rest', [tuple(round(c, 2) for c in col) for col in arm.data.bones['garfo'].matrix_local.to_3x3().col])

# ---- o forcado (cabo de 1,35 m, travessa e 4 dentes), no espaço do osso
L, LD = 1.35 * K, 0.30 * K
def cilindro(nome, a, b, r):
    a, b = Vector(a), Vector(b)
    bpy.ops.mesh.primitive_cylinder_add(vertices=6, radius=r, depth=(b - a).length, end_fill_type='NOTHING')
    o = bpy.context.active_object; o.name = nome
    o.matrix_world = Matrix.Translation((a + b) / 2) @ (b - a).to_track_quat('Z', 'Y').to_matrix().to_4x4()
    return o
pecas = [cilindro('cabo', (0, -0.05, 0), (0, L, 0), 0.018)]
pecas.append(cilindro('trav', (-0.12 * K, L, 0), (0.12 * K, L, 0), 0.012))
for i in range(4):
    x = (-0.105 + i * 0.07) * K
    pecas.append(cilindro('dente', (x, L, 0), (x, L + LD, 0.04 * K * (1 if i in (0, 3) else 0.6)), 0.009))
for p in pecas: p.select_set(True)
bpy.context.view_layer.objects.active = pecas[0]
bpy.ops.object.join(); garfo = bpy.context.active_object; garfo.name = 'forcado'
bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
mat = bpy.data.materials.new('madeira_forcado'); mat.use_nodes = True
next(n for n in mat.node_tree.nodes if n.type == 'BSDF_PRINCIPLED').inputs['Base Color'].default_value = (0.42, 0.28, 0.15, 1)
garfo.data.materials.append(mat)
bpy.ops.object.shade_flat()
# preso ao osso: a malha fica no espaço do osso, que na pose de repouso coincide com o espaço do forcado
Mg0 = arm.matrix_world @ arm.data.bones['garfo'].matrix_local
garfo.parent = arm; garfo.parent_type = 'BONE'; garfo.parent_bone = 'garfo'
bpy.context.view_layer.update()
garfo.matrix_world = Mg0
bpy.context.view_layer.update()

# ---- poses-chave do forcado: (quadro, inclinação do tronco°, quanto a bacia desce, ponta de trás do cabo, ângulo do cabo°, desvio°)
# frente do personagem = -Y, direita = -X
POSES = [
    (0,  34, 0.09, (-0.12, -0.14, 0.86), -30, 6),
    (12, 40, 0.11, (-0.12, -0.22, 0.83), -26, 6),
    (22, 30, 0.08, (-0.13, -0.16, 0.88), -14, 5),
    (31, 12, 0.03, (-0.17, -0.18, 0.96), 18, -2),
    (37, -4, 0.00, (-0.21, -0.20, 1.00), 38, -9),
    (44, -2, 0.00, (-0.21, -0.19, 0.98), 32, -9),
    (58, 18, 0.05, (-0.15, -0.16, 0.91), -8, 2),
    (72, 34, 0.09, (-0.12, -0.14, 0.86), -30, 6),
]
if VAR == 'b':     # a mulher: um pouco mais curta e defasada no jogo
    POSES = [(f, inc * 1.05, dz, (b[0], b[1] + 0.02, b[2]), ang * (0.9 if ang > 0 else 1), dv) for f, inc, dz, b, ang, dv in POSES]
S_R, S_L = 0.10, 0.33
TORCE = {31: -6, 37: -12, 44: -10, 58: -3}     # o tronco gira um pouco para a direita ao jogar      # onde cada mão segura o cabo (fração de 1,35 m a partir de trás): a direita atrás, a esquerda à frente

def quadro_garfo(Bp, ang, desvio):
    a, d = math.radians(ang), math.radians(desvio)
    hor = Vector((math.sin(d), -math.cos(d), 0))          # para a frente, um pouco para a esquerda (+X)
    y = (hor * math.cos(a) + Vector((0, 0, math.sin(a)))).normalized()
    x = y.cross(Vector((0, 0, 1))).normalized()            # direita do personagem
    z = x.cross(y)
    M = Matrix((x, y, z)).transposed().to_4x4(); M.translation = Vector(Bp) * K
    return M

# ---- alvos das mãos (empties presos ao osso do forcado): punho e orientação da mão fechada no cabo
def mao_alvo(nome, s, palma, dedos):
    # palma, dedos: no espaço do forcado. O centro da palma fica sobre o cabo; o punho fica atrás dele.
    g = Vector((0, s * 1.35 * K, 0)); pa = Vector(palma).normalized(); de = Vector(dedos).normalized()
    pulso = g - de * 0.075 * K - pa * 0.045 * K
    e = bpy.data.objects.new(nome, None); sc.collection.objects.link(e)
    e.empty_display_size = 0.05
    lado = nome[-1]
    X = pa if lado == 'l' else -pa                         # o X da mão esquerda é a normal da palma; na direita, o contrário
    Y = de; Z = X.cross(Y)
    R = Matrix((X, Y, Z)).transposed().to_4x4(); R.translation = pulso
    e.parent = arm; e.parent_type = 'BONE'; e.parent_bone = 'garfo'
    bpy.context.view_layer.update()
    e.matrix_world = Mg0 @ R
    return e
# no espaço do forcado +X é a DIREITA do personagem: a direita fecha por cima com os dedos para a esquerda dele,
# a esquerda fecha por baixo com os dedos para a direita.
alvoD = mao_alvo('alvo_r', S_R, (0, 0, -1), (-1, 0, 0))
alvoE = mao_alvo('alvo_l', S_L, (0, 0, 1), (1, 0, 0))

def vazio(nome, p):
    e = bpy.data.objects.new(nome, None); sc.collection.objects.link(e); e.location = p; e.empty_display_size = 0.05; return e
# polos: cotovelo direito para trás e para fora; esquerdo para baixo e para fora. Joelhos para a frente.
poloD = vazio('polo_r', Vector((-0.55, 0.45, 0.75)) * K); poloE = vazio('polo_l', Vector((0.55, 0.2, 0.55)) * K)
poloD.parent = arm; poloE.parent = arm
pe = {}
for l, dx, dy in (('l', 0.02, -0.10), ('r', -0.03, 0.08)):           # pé esquerdo à frente, direito atrás (base aberta)
    tor = B['foot_' + l].head_local
    pe[l] = vazio('pe_' + l, tor + Vector((dx, dy, 0)) * K)
    vazio('joelho_' + l, Vector((tor.x * 1.6, -0.8, 0.5)) * K)

pb = arm.pose.bones
def ikc(osso, alvo, polo, cadeia=2):
    c = pb[osso].constraints.new('IK'); c.target = alvo; c.pole_target = polo; c.chain_count = cadeia; c.use_stretch = False
    c.use_tail = True; return c
ikD = ikc('lowerarm_r', alvoD, poloD, 3); ikE = ikc('lowerarm_l', alvoE, poloE, 3)
ikPE = ikc('calf_l', pe['l'], bpy.data.objects['joelho_l']); ikPD = ikc('calf_r', pe['r'], bpy.data.objects['joelho_r'])
for osso, alvo in (('hand_r', alvoD), ('hand_l', alvoE)):
    c = pb[osso].constraints.new('COPY_ROTATION'); c.target = alvo
for l in 'lr':
    for osso in ('upperarm_' + l, 'lowerarm_' + l):
        pb[osso].ik_stretch = 0
    pb['lowerarm_' + l].lock_ik_y = True                    # o antebraço não torce em volta de si: dobra no cotovelo

# ---- pose a cada quadro-chave
def eixo_local(osso, mundo):
    return (B[osso].matrix_local.to_3x3().inverted() @ Vector(mundo)).normalized()
def roda(osso, mundo, ang):
    return Quaternion(eixo_local(osso, mundo), math.radians(ang))
DIST = [('pelvis', 0.25), ('spine_01', 0.25), ('spine_02', 0.28), ('spine_03', 0.22)]
for b in pb: b.rotation_mode = 'QUATERNION'
def dedos(curva):
    for l in 'lr':
        palma = Vector((0, 0, -1))
        for dedo in ('index', 'middle', 'ring', 'pinky'):
            for j, f in (('01', 0.9), ('02', 1.1), ('03', 0.8)):
                n = f'{dedo}_{j}_{l}'
                if n not in pb: continue
                ax = Vector((0, 1, 0)).cross(B[n].matrix_local.to_3x3().inverted() @ palma).normalized()
                pb[n].rotation_quaternion = Quaternion(ax, math.radians(curva * f))
                pb[n].keyframe_insert('rotation_quaternion', frame=0)
        for j in ('02', '03'):
            n = f'thumb_{j}_{l}'
            if n not in pb: continue
            ax = Vector((0, 1, 0)).cross(B[n].matrix_local.to_3x3().inverted() @ palma).normalized()
            pb[n].rotation_quaternion = Quaternion(ax, math.radians(35)); pb[n].keyframe_insert('rotation_quaternion', frame=0)
# girar em torno de +X leva o alto do tronco para -Y (a frente)
for f, inc, dz, Bp, ang, dv in POSES:
    sc.frame_set(f)
    for osso, k in DIST:
        tw = TORCE.get(f, 0) * (0.5 if osso in ('spine_02', 'spine_03') else 0)
        pb[osso].rotation_quaternion = roda(osso, (0, 0, 1), tw) @ roda(osso, (1, 0, 0), inc * k)
        pb[osso].keyframe_insert('rotation_quaternion', frame=f)
    pb['neck_01'].rotation_quaternion = roda('neck_01', (1, 0, 0), -inc * 0.45); pb['neck_01'].keyframe_insert('rotation_quaternion', frame=f)
    pb['pelvis'].location = B['pelvis'].matrix_local.to_3x3().inverted() @ Vector((0, 0.03 * dz / 0.1, -dz)) * K
    pb['pelvis'].keyframe_insert('location', frame=f)
    pb['garfo'].matrix = quadro_garfo(Bp, ang, dv)
    bpy.context.view_layer.update()
    pb['garfo'].keyframe_insert('location', frame=f); pb['garfo'].keyframe_insert('rotation_quaternion', frame=f)
dedos(75)
sc.frame_start, sc.frame_end = 0, 72

# ---- polo: acha o ângulo que leva o cotovelo/joelho para o lado do polo
def erro_polo(c, osso_meio, polo):
    sc.frame_set(12); bpy.context.view_layer.update()
    m = arm.matrix_world @ pb[osso_meio].head
    a = arm.matrix_world @ pb[osso_meio].parent.head
    return -(m - a).normalized().dot((polo.matrix_world.translation - a).normalized())
for c, meio, polo in ((ikD, 'lowerarm_r', poloD), (ikE, 'lowerarm_l', poloE), (ikPE, 'calf_l', bpy.data.objects['joelho_l']), (ikPD, 'calf_r', bpy.data.objects['joelho_r'])):
    melhor = None
    for g in range(-180, 180, 15):
        c.pole_angle = math.radians(g); e = erro_polo(c, meio, polo)
        if melhor is None or e < melhor[0]: melhor = (e, g)
    c.pole_angle = math.radians(melhor[1]); print('POLO', meio, melhor)

# ---- conferência: a mão chega ao alvo?
for f in (0, 12, 22, 31, 37, 44, 58):
    sc.frame_set(f); bpy.context.view_layer.update()
    eD = ((arm.matrix_world @ pb['hand_r'].head) - alvoD.matrix_world.translation).length
    eE = ((arm.matrix_world @ pb['hand_l'].head) - alvoE.matrix_world.translation).length
    print('ALCANCE', f, round(eD, 3), round(eE, 3))

# ---- assa o clipe (sem as restrições) só nos ossos que mexem
bpy.context.view_layer.objects.active = arm
for o in bpy.data.objects: o.select_set(o == arm)
bpy.ops.object.mode_set(mode='POSE')
MEXE = {'pelvis', 'spine_01', 'spine_02', 'spine_03', 'neck_01', 'garfo'}
for l in 'lr':
    MEXE |= {f'{x}_{l}' for x in ('clavicle', 'upperarm', 'lowerarm', 'hand', 'thigh', 'calf', 'foot')}
    MEXE |= {n for n in pb.keys() if n.endswith('_' + l) and any(d in n for d in ('index', 'middle', 'ring', 'pinky', 'thumb')) and 'leaf' not in n}
for b in pb:
    try: b.select = b.name in MEXE
    except AttributeError: b.bone.select = b.name in MEXE
bpy.ops.nla.bake(frame_start=0, frame_end=72, only_selected=True, visual_keying=True, clear_constraints=True, bake_types={'POSE'})
bpy.ops.object.mode_set(mode='OBJECT')
act = arm.animation_data.action; act.name = 'Malhar'
print('ACT', act.name, act.frame_range[:])
for a in list(bpy.data.actions):
    if a != act: bpy.data.actions.remove(a)

# ---- prévias
os.makedirs(PREV, exist_ok=True)
for o in bpy.data.objects:
    if o.type == 'EMPTY': o.hide_render = True
chao = bpy.data.meshes.new('chao'); chao.from_pydata([(-3, -3, 0), (3, -3, 0), (3, 3, 0), (-3, 3, 0)], [], [(0, 1, 2, 3)])
co = bpy.data.objects.new('chao', chao); sc.collection.objects.link(co)
sc.render.engine = 'BLENDER_WORKBENCH'
sh = sc.display.shading; sh.light = 'STUDIO'; sh.color_type = 'TEXTURE'; sh.show_shadows = True
sc.render.resolution_x, sc.render.resolution_y = 360, 420
cam = bpy.data.objects.new('cam', bpy.data.cameras.new('cam')); sc.collection.objects.link(cam); sc.camera = cam
cam.data.lens = 40
VISTAS = {'frente34': Vector((-2.4, -2.6, 1.4)), 'lado': Vector((-3.4, -0.5, 1.1)), 'tras34': Vector((2.2, 2.4, 1.6))}
for nv, p in VISTAS.items():
    cam.location = p * K
    alvo = Vector((0, -0.45, 0.85)) * K
    cam.rotation_euler = (alvo - cam.location).to_track_quat('-Z', 'Y').to_euler()
    for f in (0, 12, 22, 31, 37, 44, 58):
        sc.frame_set(f); sc.render.filepath = os.path.join(PREV, f'{nv}_{f:02d}.png'); bpy.ops.render.render(write_still=True)

# ---- exporta só o esqueleto, o forcado e o clipe
bpy.data.objects.remove(co); bpy.data.objects.remove(cam)
for o in list(bpy.data.objects):
    if o.type == 'EMPTY': bpy.data.objects.remove(o)
for o in bpy.data.objects: o.select_set(o in (arm, garfo))
sc.frame_set(0)
bpy.ops.export_scene.gltf(filepath=SAI, use_selection=True, export_animations=True, export_animation_mode='ACTIONS',
                          export_normals=False, export_skins=True, export_def_bones=False, export_frame_range=False,
                          export_force_sampling=True, export_optimize_animation_size=True)
print('OK', SAI, os.path.getsize(SAI))
