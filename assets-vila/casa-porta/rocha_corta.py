import bpy, bmesh, sys, os
bpy.ops.wm.read_factory_settings(use_empty=True)
src, out = sys.argv[sys.argv.index('--')+1:sys.argv.index('--')+3]
bpy.ops.import_scene.gltf(filepath=src)
o=[x for x in bpy.data.objects if x.type=='MESH'][0]
bm=bmesh.new(); bm.from_mesh(o.data)
mw=o.matrix_world
apaga=[f for f in bm.faces if (lambda c: c.x > 4.75 and abs(c.y + 1.2) < 2.4 and c.z < 1.15)(mw @ f.calc_center_median())]
print('APAGA', len(apaga), len(bm.faces))
bmesh.ops.delete(bm, geom=apaga, context='FACES')
# tira os cacos soltos que sobraram do corte (ilhas pequenas perto da boca)
bm.faces.ensure_lookup_table(); visto=set(); ilhas=[]
for f0 in bm.faces:
    if f0.index in visto: continue
    pilha=[f0]; ilha=[]; visto.add(f0.index)
    while pilha:
        f=pilha.pop(); ilha.append(f)
        for e in f.edges:
            for g in e.link_faces:
                if g.index not in visto: visto.add(g.index); pilha.append(g)
    ilhas.append(ilha)
cacos=[f for il in ilhas if len(il) < 60 and (lambda c: c.x > 4.9 and abs(c.y + 1.2) < 3.2 and c.z < 1.3)(sum((mw @ f.calc_center_median() for f in il), __import__('mathutils').Vector()) / len(il)) for f in il]
print('ILHAS', len(ilhas), 'CACOS', len(cacos))
bmesh.ops.delete(bm, geom=cacos, context='FACES')
bm.to_mesh(o.data); bm.free()
for ob in bpy.data.objects: ob.select_set(True)
bpy.ops.export_scene.gltf(filepath=out, use_selection=True, export_format='GLB', export_image_format='WEBP', export_image_quality=80, export_meshopt_compression_enable=True)
print('SAIDA', os.path.getsize(out))
