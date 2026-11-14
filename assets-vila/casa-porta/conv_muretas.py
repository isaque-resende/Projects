# Muretas novas (prancha): reto alto, reto baixo, canto, ponta, escada. Escala pelas medidas do prompt; origem na base; frente em -Y.
import bpy, bmesh, math, os
from mathutils import Vector
SCR = "C:/Users/isaqu/AppData/Local/Temp/claude/956e92763068254c/f51927a9-9486-4ab8-a8f5-2b0632db0d38/scratchpad/"
OUT = "M:/Claude/github/Projects-animais/assets-vila/casa-porta/muretas.glb"
DL = "C:/Users/isaqu/Downloads/New_Project_14112026 (%d).glb"
bpy.ops.wm.read_factory_settings(use_empty=True)
def importa(n):
    antes = set(bpy.data.objects); bpy.ops.import_scene.gltf(filepath=DL % n)
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
objs = []
# (arquivo, nome, medida de referência: 'comp' = maior lado horizontal, 'alt' = altura; valor em metros)
for n, nome, ref, val, alvo in [(4, 'Mureta_Alta', 'comp', 2.0, 2500), (5, 'Mureta_Baixa', 'comp', 2.0, 2000), (6, 'Mureta_Canto', 'alt', 1.0, 2200), (7, 'Mureta_Ponta', 'comp', 1.5, 1800), (8, 'Mureta_Escada', 'alt', 1.0, 2500)]:
    o = importa(n); limpa(o, alvo)
    vs = [v.co for v in o.data.vertices]
    mn = Vector([min(v[i] for v in vs) for i in range(3)]); mx = Vector([max(v[i] for v in vs) for i in range(3)])
    d = mx - mn
    # o lado comprido fica em X (frente em -Y)
    if ref == 'comp' and d.y > d.x:
        for v in o.data.vertices: v.co = Vector((v.co.y, -v.co.x, v.co.z))
        vs = [v.co for v in o.data.vertices]; mn = Vector([min(v[i] for v in vs) for i in range(3)]); mx = Vector([max(v[i] for v in vs) for i in range(3)]); d = mx - mn
    K = val / (d.x if ref == 'comp' else d.z)
    c = Vector(((mn.x + mx.x) / 2, (mn.y + mx.y) / 2, mn.z))
    for v in o.data.vertices: v.co = (v.co - c) * K
    o.name = o.data.name = nome; bpy.context.view_layer.update()
    print('PECA', nome, len(o.data.polygons), [round(x, 2) for x in o.dimensions])
    objs.append(o)
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
X = 0
for o in objs: o.location.x = X + o.dimensions.x / 2; X += o.dimensions.x + 0.8
sc = bpy.context.scene
cam = bpy.data.objects.new('C', bpy.data.cameras.new('C')); sc.collection.objects.link(cam); sc.camera = cam
cam.data.type = 'ORTHO'; cam.data.ortho_scale = X + 1
d = Vector((0.4, -1, 0.6)).normalized(); cam.location = Vector((X / 2, 0, 0.6)) + d * 30; cam.rotation_euler = (-d).to_track_quat('-Z', 'Y').to_euler()
s = bpy.data.objects.new('S', bpy.data.lights.new('S', 'SUN')); sc.collection.objects.link(s); s.data.energy = 3; s.rotation_euler = (0.7, 0.2, 0.3)
sc.world = bpy.data.worlds.new('W'); sc.world.use_nodes = True; next(n for n in sc.world.node_tree.nodes if n.type == 'BACKGROUND').inputs['Strength'].default_value = 0.8
for e in ('BLENDER_EEVEE', 'BLENDER_EEVEE_NEXT'):
    try: sc.render.engine = e; break
    except TypeError: pass
sc.render.resolution_x = 1600; sc.render.resolution_y = 400
sc.render.filepath = SCR + 'muretas.png'; bpy.ops.render.render(write_still=True)
for o in objs: o.location = (0, 0, 0)
bpy.ops.object.select_all(action='DESELECT')
for o in objs: o.select_set(True)
bpy.ops.export_scene.gltf(filepath=OUT, use_selection=True, export_format='GLB', export_image_format='WEBP', export_image_quality=80, export_meshopt_compression_enable=True)
print('SAIDA', os.path.getsize(OUT), len(bpy.data.images))
