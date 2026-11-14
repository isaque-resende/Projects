# Casas novas (14/11) e ferramentas da eira: decima, texturas 1024, origem na base, frente como veio (-Y), escala pela porta (1,6 m)
import bpy, bmesh, math, os
from mathutils import Vector
SCR = "C:/Users/isaqu/AppData/Local/Temp/claude/956e92763068254c/f51927a9-9486-4ab8-a8f5-2b0632db0d38/scratchpad/"
OUT = "M:/Claude/github/Projects-animais/assets-vila/casas/casas_betfage.glb"
DL = "C:/Users/isaqu/Downloads/New_Project_14112026%s.glb"
bpy.ops.wm.read_factory_settings(use_empty=True)
def importa(suf):
    antes = set(bpy.data.objects); bpy.ops.import_scene.gltf(filepath=DL % suf)
    ms = [o for o in bpy.data.objects if o not in antes and o.type == 'MESH']
    bpy.ops.object.select_all(action='DESELECT')
    for o in ms: o.select_set(True)
    bpy.context.view_layer.objects.active = ms[0]
    if len(ms) > 1: bpy.ops.object.join()
    o = bpy.context.view_layer.objects.active; o.parent = None
    for e in [x for x in bpy.data.objects if x.type == 'EMPTY']: bpy.data.objects.remove(e)
    bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
    return o
def limpa(o, alvo):
    bpy.ops.object.select_all(action='DESELECT'); o.select_set(True); bpy.context.view_layer.objects.active = o
    bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.select_all(action='SELECT'); bpy.ops.mesh.remove_doubles(threshold=0.0003); bpy.ops.object.mode_set(mode='OBJECT')
    m = o.modifiers.new('d', 'DECIMATE'); m.ratio = min(1, alvo / len(o.data.polygons)); bpy.ops.object.modifier_apply(modifier='d')
    for p in o.data.polygons: p.use_smooth = False
def base(o, K, nome):
    vs = [v.co for v in o.data.vertices]
    c = Vector(((min(v.x for v in vs) + max(v.x for v in vs)) / 2, (min(v.y for v in vs) + max(v.y for v in vs)) / 2, min(v.z for v in vs)))
    for v in o.data.vertices: v.co = (v.co - c) * K
    o.location = (0, 0, 0); o.name = o.data.name = nome
    bpy.context.view_layer.update(); print('PECA', nome, len(o.data.polygons), [round(x, 2) for x in o.dimensions])
objs = []
for suf, nome, K, alvo in [('', 'Casa_Alcapao', 4.4, 7000), (' (1)', 'Casa_Varal', 4.0, 7000), (' (3)', 'Casa_Sobrado', 7.7, 9000)]:
    o = importa(suf); limpa(o, alvo); base(o, K, nome); objs.append(o)
# ferramentas da eira: separa a peneira (redonda) do trilho de debulhar pelas partes soltas
o = importa(' (2)')
bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.select_all(action='SELECT'); bpy.ops.mesh.remove_doubles(threshold=0.0003); bpy.ops.object.mode_set(mode='OBJECT')
bpy.ops.mesh.separate(type='LOOSE')
partes = [x for x in bpy.data.objects if x.type == 'MESH' and x not in objs]
cx = lambda p: sum((p.matrix_world @ v.co).x for v in p.data.vertices) / max(1, len(p.data.vertices))
todos = sorted((p.matrix_world @ v.co).x for p in partes for v in p.data.vertices)
x0, x1 = todos[0], todos[-1]; NB = 200; h = [0] * NB
for x in todos: h[min(NB - 1, int((x - x0) / (x1 - x0) * NB))] += 1
iv = min(range(int(NB * 0.3), int(NB * 0.8)), key=lambda i: h[i]); corte = x0 + (iv + 0.5) / NB * (x1 - x0)
print('CORTE', round(corte, 3), h[iv])
base_obj = partes[0]
if len(partes) > 1:
    bpy.ops.object.select_all(action='DESELECT')
    for p in partes: p.select_set(True)
    bpy.context.view_layer.objects.active = partes[0]; bpy.ops.object.join(); base_obj = bpy.context.view_layer.objects.active
for g, nome, alvo in [(0, 'Peneira_Graos', 1800), (1, 'Trilho_Debulhar', 1800)]:
    m = base_obj.copy(); m.data = base_obj.data.copy(); bpy.context.scene.collection.objects.link(m)
    bm = bmesh.new(); bm.from_mesh(m.data)
    # corta por face (centro), para não rasgar peças no meio
    fora = [fc for fc in bm.faces if (fc.calc_center_median().x < corte) != (g == 0)]
    bmesh.ops.delete(bm, geom=fora, context='FACES'); bm.to_mesh(m.data); bm.free()
    limpa(m, alvo); objs.append((m, nome))
bpy.data.objects.remove(base_obj)
pen, tri = objs[3][0], objs[4][0]
Kf = 1.0 / max(pen.dimensions.x, pen.dimensions.y)   # peneira com 1 m de diâmetro; o trilho na mesma escala
base(pen, Kf, 'Peneira_Graos'); base(tri, Kf, 'Trilho_Debulhar')
objs = objs[:3] + [pen, tri]
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
print('IMAGENS', len(bpy.data.images))
X = 0
for o in objs: o.location.x = X + o.dimensions.x / 2; X += o.dimensions.x + 1
sc = bpy.context.scene
cam = bpy.data.objects.new('C', bpy.data.cameras.new('C')); sc.collection.objects.link(cam); sc.camera = cam
cam.data.type = 'ORTHO'; cam.data.ortho_scale = X + 1
d = Vector((0.45, -1, 0.75)).normalized(); cam.location = Vector((X / 2, 0, 1.5)) + d * 40; cam.rotation_euler = (-d).to_track_quat('-Z', 'Y').to_euler()
s = bpy.data.objects.new('S', bpy.data.lights.new('S', 'SUN')); sc.collection.objects.link(s); s.data.energy = 3; s.rotation_euler = (0.7, 0.2, 0.3)
sc.world = bpy.data.worlds.new('W'); sc.world.use_nodes = True; next(n for n in sc.world.node_tree.nodes if n.type == 'BACKGROUND').inputs['Strength'].default_value = 0.8
for e in ('BLENDER_EEVEE', 'BLENDER_EEVEE_NEXT'):
    try: sc.render.engine = e; break
    except TypeError: pass
sc.render.resolution_x = 1600; sc.render.resolution_y = 500
sc.render.filepath = SCR + 'casas_novas.png'; bpy.ops.render.render(write_still=True)
for o in objs: o.location = (0, 0, 0)
bpy.ops.object.select_all(action='DESELECT')
for o in objs: o.select_set(True)
bpy.ops.export_scene.gltf(filepath=OUT, use_selection=True, export_format='GLB', export_image_format='WEBP', export_image_quality=80, export_meshopt_compression_enable=True)
print('SAIDA', os.path.getsize(OUT))
