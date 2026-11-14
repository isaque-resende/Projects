# Moitas espinhosas (v16, duas numa malha) e malva-rosa (15): separa, endireita, decima, texturas 1024, origem na base, frente em -Y.
import bpy, bmesh, math, os
from mathutils import Vector, Matrix
OUT = "M:/Claude/github/Projects-animais/assets-vila/flores/plantas_betfage.glb"
SCR = "C:/Users/isaqu/AppData/Local/Temp/claude/956e92763068254c/f51927a9-9486-4ab8-a8f5-2b0632db0d38/scratchpad/"
bpy.ops.wm.read_factory_settings(use_empty=True)

def importa(p):
    antes = set(bpy.data.objects); bpy.ops.import_scene.gltf(filepath=p)
    ms = [o for o in bpy.data.objects if o not in antes and o.type == 'MESH']
    bpy.ops.object.select_all(action='DESELECT')
    for o in ms: o.select_set(True)
    bpy.context.view_layer.objects.active = ms[0]
    if len(ms) > 1: bpy.ops.object.join()
    o = bpy.context.view_layer.objects.active
    for p_ in [x for x in bpy.data.objects if x.type == 'EMPTY']: bpy.data.objects.remove(p_)
    o.parent = None
    bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
    return o

def limpa(o, alvo):
    bpy.context.view_layer.objects.active = o; bpy.ops.object.select_all(action='DESELECT'); o.select_set(True)
    bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.select_all(action='SELECT'); bpy.ops.mesh.remove_doubles(threshold=0.0003); bpy.ops.object.mode_set(mode='OBJECT')
    m = o.modifiers.new('d', 'DECIMATE'); m.ratio = min(1, alvo / len(o.data.polygons)); bpy.ops.object.modifier_apply(modifier='d')
    for p in o.data.polygons: p.use_smooth = False

def base(o, K, nome):
    vs = [v.co for v in o.data.vertices]
    c = Vector(((min(v.x for v in vs) + max(v.x for v in vs)) / 2, (min(v.y for v in vs) + max(v.y for v in vs)) / 2, min(v.z for v in vs)))
    for v in o.data.vertices: v.co = (v.co - c) * K
    o.location = (0, 0, 0); o.name = o.data.name = nome
    print('PECA', nome, len(o.data.polygons), [round(x, 2) for x in o.dimensions])

# ---- moitas: separa por partes soltas e agrupa pelo vão em x ----
o = importa("C:/Users/isaqu/Downloads/New Project 13_11_2026 v16.glb")
bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.select_all(action='SELECT'); bpy.ops.mesh.remove_doubles(threshold=0.0003); bpy.ops.object.mode_set(mode='OBJECT')
bpy.ops.mesh.separate(type='LOOSE')
partes = [x for x in bpy.data.objects if x.type == 'MESH']
cx = lambda p: sum((p.matrix_world @ v.co).x for v in p.data.vertices) / max(1, len(p.data.vertices))
xs = sorted(partes, key=cx)
# maior vão entre os centros consecutivos (ponderado pelo extremo) separa as duas moitas
def ext(p): v = [(p.matrix_world @ q.co).x for q in p.data.vertices]; return min(v), max(v)
corte = None; melhor = -1
xs_c = [cx(p) for p in xs]
for i in range(len(xs) - 1):
    gap = xs_c[i + 1] - xs_c[i]
    if gap > melhor and 0.2 * len(xs) < i + 1 < 0.95 * len(xs) + 1: melhor = gap; corte = (xs_c[i] + xs_c[i + 1]) / 2
# alternativa robusta: vão no histograma de vértices em x
import collections
todos = sorted((p.matrix_world @ v.co).x for p in partes for v in p.data.vertices)
x0, x1 = todos[0], todos[-1]; NB = 200; h = [0] * NB
for x in todos: h[min(NB - 1, int((x - x0) / (x1 - x0) * NB))] += 1
vales = [i for i in range(int(NB * 0.3), int(NB * 0.75))]; iv = min(vales, key=lambda i: h[i]); corte = x0 + (iv + 0.5) / NB * (x1 - x0)
print('CORTE', round(corte, 3), h[iv])
grupos = {0: [], 1: []}
for p in partes: grupos[0 if cx(p) < corte else 1].append(p)
moitas = []
for g, nome, alvo in [(0, 'Moita_Espinhos_Grande', 3200), (1, 'Moita_Espinhos_Pequena', 1600)]:
    bpy.ops.object.select_all(action='DESELECT')
    for p in grupos[g]: p.select_set(True)
    bpy.context.view_layer.objects.active = grupos[g][0]; bpy.ops.object.join()
    m = bpy.context.view_layer.objects.active
    limpa(m, alvo); moitas.append((m, nome))
# a grande fica com ~1,3 m de largura
Kg = 1.3 / moitas[0][0].dimensions.x
for m, nome in moitas: base(m, Kg, nome)

# ---- malva-rosa: endireita a haste (eixo principal na vertical), 1,7 m ----
f = importa("C:/Users/isaqu/Downloads/New_Project_13112026 (15).glb")
vs = [v.co.copy() for v in f.data.vertices]
c = sum(vs, Vector()) / len(vs)
import numpy as np
A = np.array([[v.x - c.x, v.y - c.y, v.z - c.z] for v in vs[::7]]); w, V = np.linalg.eigh(A.T @ A); ax = Vector(V[:, 2])
if ax.z < 0: ax = -ax
print('EIXO', [round(x, 2) for x in ax])
R = ax.rotation_difference(Vector((0, 0, 1))).to_matrix().to_4x4()
f.data.transform(Matrix.Translation(c) @ R @ Matrix.Translation(-c))
# as flores (que olhavam para cima) ficam viradas para +x depois de endireitar: gira para olharem para -Y (a frente)
hz = Vector((-ax.x, -ax.y, 0)).normalized(); ang = math.atan2(hz.y, hz.x)
f.data.transform(Matrix.Translation(c) @ Matrix.Rotation(-math.pi / 2 - ang, 4, 'Z') @ Matrix.Translation(-c))
limpa(f, 2600)
base(f, 1.7 / f.dimensions.z, 'Malva_Rosa')

# ---- materiais: sem normal/metal/rugosidade, texturas 1024 ----
for mat in bpy.data.materials:
    if not mat.use_nodes: continue
    nt = mat.node_tree; bs = next((n for n in nt.nodes if n.type == 'BSDF_PRINCIPLED'), None)
    if not bs: continue
    for nm in ('Normal', 'Metallic', 'Roughness'):
        for l in list(bs.inputs[nm].links): nt.links.remove(l)
    for n in list(nt.nodes):
        if n.type == 'NORMAL_MAP' or (n.type == 'TEX_IMAGE' and not any(l.to_socket == bs.inputs['Base Color'] for l in n.outputs[0].links)): nt.nodes.remove(n)
    bs.inputs['Metallic'].default_value = 0; bs.inputs['Roughness'].default_value = 1
for img in list(bpy.data.images):
    if img.users == 0: bpy.data.images.remove(img)
    elif img.size[0] > 1024: img.scale(1024, 1024)
print('IMAGENS', [(i.name, i.size[:]) for i in bpy.data.images])

objs = [m for m, _ in moitas] + [f]
X = 0
for o in objs: o.location.x = X; X += o.dimensions.x + 0.6
sc = bpy.context.scene
cam = bpy.data.objects.new('C', bpy.data.cameras.new('C')); sc.collection.objects.link(cam); sc.camera = cam
cam.data.type = 'ORTHO'; cam.data.ortho_scale = X + 0.5; cam.location = (X / 2 - 0.5, -12, 4.5); cam.rotation_euler = (math.radians(72), 0, 0)
s = bpy.data.objects.new('S', bpy.data.lights.new('S', 'SUN')); sc.collection.objects.link(s); s.data.energy = 3; s.rotation_euler = (0.7, 0.2, 0.3)
sc.world = bpy.data.worlds.new('W'); sc.world.use_nodes = True; next(n for n in sc.world.node_tree.nodes if n.type == 'BACKGROUND').inputs['Strength'].default_value = 0.8
sc.render.resolution_x = 1200; sc.render.resolution_y = 600
for e in ('BLENDER_EEVEE', 'BLENDER_EEVEE_NEXT'):
    try: sc.render.engine = e; break
    except TypeError: pass
sc.render.filepath = SCR + 'plantas.png'; bpy.ops.render.render(write_still=True)
for o in objs: o.location = (0, 0, 0)
os.makedirs(os.path.dirname(OUT), exist_ok=True)
bpy.ops.object.select_all(action='DESELECT')
for o in objs: o.select_set(True)
bpy.ops.export_scene.gltf(filepath=OUT, use_selection=True, export_format='GLB', export_image_format='WEBP', export_image_quality=80, export_meshopt_compression_enable=True)
print('SAIDA', os.path.getsize(OUT))
