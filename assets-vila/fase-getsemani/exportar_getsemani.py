# Exporta o Getsêmani do jeito que está no Blender: terreno, trilha, mureta, a Rocha da Agonia e a gruta (.glb) e o
# layout do jogo (getsemani_layout.json). Rodar no Blender aberto: aba Scripting > texto "EXPORTAR_PARA_O_JOGO" > Run Script
# (ele também salva o .blend). Ou sem abrir:  blender -b getsemani.blend -P exportar_getsemani.py
# Mundo three.js: (x, y, z) = Blender (x, z, -y).
#
# O que vai para o jogo:
#   - coleção "Exportar": terreno, trilha, mureta, Rocha_Agonia e a gruta (vão no .glb)
#   - objetos com "glb" e "no": oliveiras, pedras, jarros, cestos (layout; "f" = de longe, instanciado)
#   - objetos com "planta": moitas e malvas (instanciadas no jogo)
#   - coleção "Colisao": círculos de colisão, presos ao objeto dono
#   - "Prensa_Jogo": a prensa na boca da gruta
#   - "JOGO_portao", "JOGO_oito", "JOGO_tres": a entrada, onde os oito ficaram e onde ficaram Pedro, Tiago e João
#   - "JOGO_agonia": onde se ajoelha, a leste da rocha (a seta aponta o templo); "JOGO_rocha": o alto da rocha
#   - "JOGO_cedrom": onde a trilha cruza o leito; "JOGO_betesda": o fim da trilha, de frente para Betesda (Jerusalém vem da maquete, ../jerusalem)
#   - o texto "getsemani_fixos": trilha, mureta, a área andável e o retângulo do jardim
import bpy, json, math, os, time
from mathutils import Vector, Matrix

OUT = os.path.dirname(bpy.data.filepath) if bpy.data.filepath else r"M:\Claude\github\Projects-animais\assets-vila\fase-getsemani"
R3 = lambda v: round(v, 3)
ALTOS = ('Oliveira',)


def terreno():
    return bpy.data.objects.get('Getsemani_Terreno')


def altura_em(x, z):
    t = terreno()
    if t is None: return 0.0
    ok, loc, _, _ = t.ray_cast(Vector((x, -z, 300.0)), Vector((0, 0, -1)))
    return loc.z if ok else 0.0


def ajusta_alturas():
    # quem você arrastou volta a assentar no chão; quem não saiu do lugar fica como está
    n = 0
    for o in bpy.data.objects:
        if ('glb' not in o and 'planta' not in o) or o.parent is not None: continue
        x, z = o.location.x, -o.location.y
        if abs(x - o.get('x0', x)) < 0.005 and abs(z - o.get('z0', z)) < 0.005: continue
        o.location.z = altura_em(x, z) - o.get('afunda', 0.0 if 'no' not in o else 0.05)
        o['x0'], o['z0'] = x, z; n += 1
    return n


def colecao_colisao():
    col = bpy.data.collections.get('Colisao')
    if col is None:
        col = bpy.data.collections.new('Colisao'); bpy.context.scene.collection.children.link(col)
    return col


def circulo(nome, x, z, y, r, dono=None):
    e = bpy.data.objects.new(nome, None); colecao_colisao().objects.link(e)
    e.empty_display_type = 'CIRCLE'; e.empty_display_size = 1.0; e['colisao'] = 'circ'
    e.hide_render = True; e.show_in_front = True
    e.matrix_world = Matrix.Translation((x, -z, y)) @ Matrix.Rotation(math.pi / 2, 4, 'X') @ Matrix.Diagonal((r, r, r, 1))
    if dono is not None:
        e['dono'] = 1; e.parent = dono; e.matrix_parent_inverse = dono.matrix_world.inverted()
    return e


def colisao_novas():
    # objeto novo (ou cópia com Shift+D) ganha o círculo padrão; apagado depois, não volta
    n = 0
    for o in bpy.data.objects:
        if 'no' not in o and 'planta' not in o: continue
        if o.parent is not None or o.get('col_feita') == o.name or o.get('f'): continue
        nome = o.get('no', o.get('planta', ''))
        k = o.scale.x / o.get('k0', 1.0)
        r = 0.45 if any(a in nome for a in ALTOS) else 0.3 * k + 0.1
        circulo('COL_' + o.name, o.location.x, -o.location.y, o.location.z + 0.2, r, o)
        o['col_feita'] = o.name; n += 1
    return n


MOVIDOS = []


def colisao():
    bpy.context.view_layer.update()
    C = []
    for o in list(colecao_colisao().objects):
        if 'colisao' not in o: continue
        if o.get('dono') and o.parent is None:
            bpy.data.objects.remove(o); continue
        m = o.matrix_world
        d = o.parent
        if o.get('dono') and d is not None and not o.get('fixo'):      # o círculo fica no pé do dono (os 'fixo', da rocha e da gruta, são vários por dono e ficam onde estão)
            w = d.matrix_world.translation
            if math.hypot(m.translation.x - w.x, m.translation.y - w.y) > 0.05:
                o.matrix_world = Matrix.Translation((w.x, w.y, w.z + 0.2)) @ m.to_3x3().to_4x4(); m = o.matrix_world; MOVIDOS.append(o.name)
        C.append([round(m.translation.x, 2), round(-m.translation.y, 2), round(m.col[0].xyz.length * o.empty_display_size, 3)])
    return C


# chão leve: um vértice por ponto, com a média das cores (o jogo faz a mesma média)
LEVES = ('Getsemani_Terreno', 'Getsemani_Trilha', )


def chao_leve(objs):
    import numpy as np
    trocas = []
    for o in objs:
        me0 = o.data
        ca = me0.color_attributes.get(me0.color_attributes.active_color_name or '')
        if ca is None or ca.domain != 'CORNER': continue
        me, nome = me0.copy(), ca.name
        n, nv = len(me.loops), len(me.vertices)
        cor = np.empty(n * 4, 'f4'); me.color_attributes[nome].data.foreach_get('color', cor)
        vi = np.empty(n, 'i4'); me.loops.foreach_get('vertex_index', vi)
        soma = np.zeros((nv, 4)); np.add.at(soma, vi, cor.reshape(-1, 4))
        media = soma / np.maximum(np.bincount(vi, minlength=nv), 1)[:, None]
        me.color_attributes.remove(me.color_attributes[nome])
        nova = me.color_attributes.new(nome, 'FLOAT_COLOR', 'POINT'); nova.data.foreach_set('color', media.astype('f4').ravel())
        me.color_attributes.active_color_name = nome; me.color_attributes.render_color_index = me.color_attributes.active_color_index
        o.data = me; trocas.append((o, me0, me))
    return trocas


def desfaz_chao_leve(trocas):
    for o, me0, me in trocas:
        o.data = me0; bpy.data.meshes.remove(me)


def objetos():
    L = []
    for o in sorted([o for o in bpy.data.objects if 'glb' in o and 'no' in o and o.parent is None], key=lambda o: (o.get('ordem', 1e9), o.name)):
        e = {'glb': o['glb'], 'no': o['no'], 'p': [R3(o.location.x), R3(o.location.z), R3(-o.location.y)],
             'r': R3(o.rotation_euler.z - o.get('r0', 0.0)), 'k': R3(o.scale.x / o.get('k0', 1.0))}
        if o.get('f'): e['f'] = 1
        L.append(e)
    return L


def plantas():
    P = []
    for o in sorted([o for o in bpy.data.objects if 'planta' in o and o.parent is None], key=lambda o: (o.get('ordem', 1e9), o.name)):
        P.append([o['planta'], round(o.location.x, 2), R3(o.location.z), round(-o.location.y, 2), R3(o.rotation_euler.z - o.get('r0', 0.0)), round(o.scale.x / o.get('k0', 1.0), 2)])
    return P


def ref(nome):
    o = bpy.data.objects.get(nome)
    if o is None: raise RuntimeError('falta o objeto "%s" no Blender' % nome)
    return o


def ponto(nome):
    o = ref(nome); return [R3(o.location.x), R3(o.location.z), R3(-o.location.y), R3(o.rotation_euler.z)]


def layout():
    bpy.context.view_layer.update()
    F = json.loads(bpy.data.texts['getsemani_fixos'].as_string())
    lay = {'estrada': F['estrada'], 'meia': F['meia'], 'muros': F['muros'], 'area': F['area'], 'jardim': F['jardim']}
    pr = ref('Prensa_Jogo'); lay['prensa'] = {'p': [R3(pr.location.x), R3(pr.location.z), R3(-pr.location.y)], 'r': R3(pr.rotation_euler.z)}
    for n in ('portao', 'oito', 'tres', 'agonia', 'rocha', 'cedrom', 'betesda'): lay[n] = ponto('JOGO_' + n)
    lay['objetos'] = objetos()
    lay['obst'] = colisao()
    lay['plantas'] = plantas()
    return lay


def trava_chao():
    col = bpy.data.collections.get('Exportar')
    for o in col.objects:
        o.hide_select = True; o.lock_location = o.lock_rotation = o.lock_scale = (True, True, True)


def exporta(salvar=True):
    trava_chao()
    n = ajusta_alturas()
    nc = colisao_novas()
    lay = layout()
    col = bpy.data.collections.get('Exportar')
    for o in bpy.context.view_layer.objects: o.select_set(False)
    trav = [o for o in col.all_objects if o.hide_select]
    for o in trav: o.hide_select = False
    for o in col.all_objects: o.select_set(True)
    bpy.context.view_layer.objects.active = terreno()
    leves = chao_leve([o for o in col.all_objects if o.type == 'MESH' and o.name.startswith(LEVES)])
    try:
        bpy.ops.export_scene.gltf(filepath=os.path.join(OUT, 'getsemani_cenario.glb'), use_selection=True, export_format='GLB', export_normals=False,
                                  export_vertex_color='MATERIAL', export_image_format='WEBP', export_image_quality=80, export_meshopt_compression_enable=True)
    finally:
        desfaz_chao_leve(leves)
    for o in col.all_objects: o.select_set(False)
    for o in trav: o.hide_select = True
    json.dump(lay, open(os.path.join(OUT, 'getsemani_layout.json'), 'w'), separators=(',', ':'))
    if salvar:
        if bpy.data.filepath: bpy.ops.wm.save_mainfile()
        else: bpy.ops.wm.save_as_mainfile(filepath=os.path.join(OUT, 'getsemani.blend'))
    msg = 'EXPORTADO %s: %d objetos, %d plantas, %d colisoes (%d reassentados, %d circulos novos, %d circulos realinhados)' % (time.strftime('%H:%M:%S'), len(lay['objetos']), len(lay['plantas']), len(lay['obst']), n, nc, len(MOVIDOS))
    aviso(msg + ' - recarregue o jogo (Ctrl+F5)')


def aviso(texto, icone='CHECKMARK'):
    print(texto)
    try:
        if not bpy.app.background and bpy.context.window_manager.windows:
            bpy.context.window_manager.popup_menu(lambda self, ctx: self.layout.label(text=texto), title='Getsêmani', icon=icone)
    except Exception:
        pass


if __name__ in ('__main__', '<run_path>') or globals().get('RODAR_EXPORTACAO'):
    try:
        if bpy.context.mode != 'OBJECT': bpy.ops.object.mode_set(mode='OBJECT')
        exporta()
    except Exception as e:
        import traceback; traceback.print_exc(); aviso('ERRO na exportação: %s' % e, 'ERROR')
        raise
