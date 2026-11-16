# Exporta Betânia do jeito que está no Blender: terreno (.glb), árvores/pedras/flores (layout) e posições do jogo.
# Rodar no Blender aberto: aba Scripting > texto "EXPORTAR_PARA_O_JOGO" > Run Script (ele também salva o .blend).
# Ou sem abrir:  blender -b betania.blend -P exportar_betania.py
# Mundo three.js: (x, y, z) = Blender (x, z, -y).
import bpy, json, math, os, time

OUT = r"M:\Claude\github\Projects-animais\assets-vila\fase-betania"
R3 = lambda v: round(v, 3)


def terreno():
    return bpy.data.objects.get('Betania_Terreno')


def altura_em(x, z):
    # altura do terreno no ponto (x, z) do jogo
    t = terreno()
    if t is None: return 0.0
    from mathutils import Vector
    ok, loc, _, _ = t.ray_cast(Vector((x, -z, 200.0)), Vector((0, 0, -1)))
    return loc.z if ok else 0.0


def assenta(x, z):
    # como o gerador: o ponto mais alto embaixo do objeto (raio 0,35)
    return max([altura_em(x, z)] + [altura_em(x + 0.35 * math.cos(a), z + 0.35 * math.sin(a)) for a in (0, 1.57, 3.14, 4.71)])


def ajusta_alturas():
    # todas as árvores, pedras, flores etc. são assentadas no chão, onde quer que estejam
    # (a altura que você der à mão é ignorada: arrastar numa vista inclinada muda a altura sem querer)
    n = 0
    for o in bpy.data.objects:
        if 'glb' not in o or o.parent is not None: continue
        x, z = o.location.x, -o.location.y
        novo = assenta(x, z) - o.get('afunda', 0.05)
        if abs(novo - o.location.z) > 0.005: n += 1
        o.location.z = novo
        o['x0'], o['z0'], o['y0'] = x, z, novo
    return n


def le_tudo():
    bpy.context.view_layer.update()
    pontos, caminhos, lav = {}, [], None
    for o in bpy.data.objects:
        if 'jogo' in o:
            m = o.matrix_world; loc = m.to_translation(); rz = o.rotation_euler.z if o.parent is None else m.to_euler('XYZ').z; sx = m.to_scale().x
            p = {'x': R3(loc.x + o.get('ox', 0.0)), 'z': R3(-loc.y + o.get('oz', 0.0))}
            if not o.get('sem_giro'): p['r'] = R3(rz - o.get('r0', 0.0))
            if o.get('k0'): p['k'] = R3(sx / o['k0'])
            pontos[o['jogo']] = p
        elif o.get('lavoura'):
            xs = [(o.matrix_world @ v.co).x for v in o.data.vertices]; ys = [(o.matrix_world @ v.co).y for v in o.data.vertices]
            lav = {'x0': R3(min(xs)), 'x1': R3(max(xs)), 'z0': R3(-max(ys)), 'z1': R3(-min(ys))}
        elif o.type == 'CURVE' and 'larg' in o:
            pts = [o.matrix_world @ p.co.to_3d() for p in o.data.splines[0].points]
            caminhos.append((o.name, {'pts': [[R3(p.x), R3(-p.y)] for p in pts], 'larg': R3(o['larg'])}))
    caminhos.sort(key=lambda c: c[0])
    return {'versao': int(time.time()), 'pontos': dict(sorted(pontos.items())), 'caminhos': [c for _, c in caminhos], 'lavoura': lav}


def layout():
    L = []
    for o in sorted([o for o in bpy.data.objects if 'glb' in o and o.parent is None], key=lambda o: o.get('ordem', 0)):
        e = {'glb': o['glb'], 'no': o['no'], 'p': [R3(o.location.x), R3(o.location.z), R3(-o.location.y)],
             'r': R3(o.rotation_euler.z - o.get('r0', 0.0)), 'k': R3(o.scale.x / o.get('k0', 1.0))}
        if o.get('f'): e['f'] = 1
        L.append(e)
    return L


def trava_chao():
    # terreno, caminhos e muretas: no lugar certo e travados (arrastar o chão sem querer desmonta tudo)
    col = bpy.data.collections.get('Cenario_exportado')
    for o in list(col.objects):
        if o is None: continue
        if o.name.startswith('Betania_'): o.location = (0, 0, 0); o.rotation_euler = (0, 0, 0); o.scale = (1, 1, 1)
        o.hide_select = True; o.lock_location = o.lock_rotation = o.lock_scale = (True, True, True)


def exporta(salvar=True):
    trava_chao()
    n = ajusta_alturas()
    POS = le_tudo()
    col = bpy.data.collections.get('Cenario_exportado')
    for o in bpy.context.view_layer.objects: o.select_set(False)
    trav = [o for o in col.all_objects if o.hide_select]
    for o in trav: o.hide_select = False                  # o chão fica travado contra clique; solta só para exportar
    for o in col.all_objects: o.select_set(True)
    bpy.context.view_layer.objects.active = terreno()
    saida = OUT + '\\betania_cenario.glb'
    bpy.ops.export_scene.gltf(filepath=saida, use_selection=True, export_format='GLB', export_normals=False, export_vertex_color='MATERIAL',
                              export_image_format='WEBP', export_image_quality=80, export_meshopt_compression_enable=True)
    for o in col.all_objects: o.select_set(False)
    for o in trav: o.hide_select = True
    L = layout()
    json.dump({'objetos': L}, open(OUT + '\\betania_layout.json', 'w'), separators=(',', ':'))
    json.dump(POS, open(OUT + '\\betania_posicoes.json', 'w'), indent=1)
    if salvar:
        if bpy.data.filepath: bpy.ops.wm.save_mainfile()
        else: bpy.ops.wm.save_as_mainfile(filepath=OUT + '\\betania.blend')
    print('EXPORTADO: %d objetos no layout, %d posicoes, %d caminhos, %d assentados no chao' % (len(L), len(POS['pontos']), len(POS['caminhos']), n))


if __name__ in ('__main__', '<run_path>') or globals().get('RODAR_EXPORTACAO'):
    exporta()
