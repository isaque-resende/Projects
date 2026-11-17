# Exporta Betfagé do jeito que está no Blender: terreno, estrada e muros (.glb) e o layout do jogo (betfage_layout.json).
# Rodar no Blender aberto: aba Scripting > texto "EXPORTAR_PARA_O_JOGO" > Run Script (ele também salva o .blend).
# Ou sem abrir:  blender -b betfage.blend -P exportar_betfage.py
# Mundo three.js: (x, y, z) = Blender (x, z, -y).
#
# O que vai para o jogo:
#   - coleção "Exportar": terreno, estrada, muretas, muro do aprisco (vão no .glb)
#   - objetos com a propriedade "glb": árvores, pedras, casas, objetos (layout; "f" = de longe, instanciado)
#   - objetos com a propriedade "planta": moitas e malvas (instanciadas no jogo)
#   - coleção "Colisao": círculos de colisão, presos ao objeto dono
#   - objetos de referência: "Campo_Trigal" (o retângulo do trigal), "Insula_Jogo", a carroça e os pontos JOGO_*
#   - o texto "betfage_fixos": estrada e medidas que só mudam regerando a fase
import bpy, json, math, os, time
from mathutils import Vector, Matrix

OUT = os.path.dirname(bpy.data.filepath) if bpy.data.filepath else r"M:\Claude\github\Projects-animais\assets-vila\fase-betfage"
R3 = lambda v: round(v, 3)
ALTOS = ('Arvore', 'Cipreste', 'Tamareira', 'Oliveira')


def terreno():
    return bpy.data.objects.get('Betfage_Terreno')


def altura_em(x, z):
    # altura do terreno no ponto (x, z) do jogo
    t = terreno()
    if t is None: return 0.0
    ok, loc, _, _ = t.ray_cast(Vector((x, -z, 300.0)), Vector((0, 0, -1)))
    return loc.z if ok else 0.0


def ajusta_alturas():
    # quem você arrastou no Blender volta a assentar no chão (a altura dada à mão é ignorada: arrastar numa vista
    # inclinada muda a altura sem querer). Quem não saiu do lugar fica como está.
    n = 0
    for o in bpy.data.objects:
        if ('glb' not in o and 'planta' not in o) or o.parent is not None: continue
        x, z = o.location.x, -o.location.y
        if abs(x - o.get('x0', x)) < 0.005 and abs(z - o.get('z0', z)) < 0.005: continue
        o.location.z = altura_em(x, z) - o.get('afunda', 0.05)
        o['x0'], o['z0'] = x, z; n += 1
    return n


# ---------- colisão: as formas da coleção "Colisao" ----------
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
    # árvore, pedra, objeto ou planta nova (uma cópia com Shift+D também) ganha o círculo padrão.
    # Se você apagar o círculo depois, ele não volta: o objeto guarda o próprio nome em col_feita.
    n = 0
    for o in bpy.data.objects:
        if ('glb' not in o and 'planta' not in o) or o.parent is not None or o.get('col_feita') == o.name: continue
        nome = o.get('no', o.get('planta', ''))
        if nome.startswith('Casa_'): o['col_feita'] = o.name; continue
        k = o.scale.x / o.get('k0', 1.0)
        r = 0.5 if any(a in nome for a in ALTOS) else 0.45 if 'Grande' in nome else 0.3 * k + 0.1
        circulo('COL_' + o.name, o.location.x, -o.location.y, o.location.z + 0.2, r, o)
        o['col_feita'] = o.name; n += 1
    return n


def colisao():
    bpy.context.view_layer.update()
    C = []
    for o in list(colecao_colisao().objects):
        if 'colisao' not in o: continue
        if o.get('dono') and o.parent is None:          # o dono foi apagado: a forma vai junto
            bpy.data.objects.remove(o); continue
        m = o.matrix_world
        C.append([round(m.translation.x, 2), round(-m.translation.y, 2), round(m.col[0].xyz.length * o.empty_display_size, 3)])
    return C


# ---------- chão leve ----------
# O jogo junta os vértices repetidos do chão e da estrada e tira a média das cores (função suaviza). Fazendo a
# mesma média aqui, o .glb sai com um vértice por ponto: fica bem menor e o jogo mostra o mesmo chão.
# A troca é numa cópia temporária da malha; a sua pintura (por canto) não muda.
LEVES = ('Betfage_Terreno', 'Betfage_Estrada')


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


# ---------- layout ----------
def objetos():
    L = []
    for o in sorted([o for o in bpy.data.objects if 'glb' in o and o.parent is None], key=lambda o: (o.get('ordem', 1e9), o.name)):
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


def layout():
    bpy.context.view_layer.update()
    F = json.loads(bpy.data.texts['betfage_fixos'].as_string())
    L = objetos()
    lay = {'S': F['S'], 'estrada': F['estrada'], 'meia': F['meia']}
    ins = ref('Insula_Jogo')
    lay['insula'] = {'p': [R3(ins.location.x), ins.location.z, R3(-ins.location.y)], 'r': ins.rotation_euler.z - ins.get('r0', 0.0)}
    cp = ref('Campo_Trigal'); cs = [cp.matrix_world @ Vector(c) for c in cp.bound_box]
    lay['campo'] = {'x0': min(c.x for c in cs), 'x1': max(c.x for c in cs), 'z0': min(-c.y for c in cs), 'z1': max(-c.y for c in cs), 'y': cp.get('y_ref', cp.location.z)}
    pob = next(o for o in bpy.data.objects if o.get('no') == 'Peneira_Graos' and o.parent is None)
    lay['eira'] = {'x': pob.location.x, 'z': -pob.location.y, 'r': F['eira_r'], 'y': pob.location.z + pob.get('afunda', 0.0)}
    ca = ref('Carroca_Jogo')
    lay['carro'] = {'x': ca.location.x, 'z': -ca.location.y, 'y': ca.location.z + ca.get('afunda', 0.0)}
    for chave in ('figseca', 'pasto', 'cocho'):
        o = ref('JOGO_' + chave); lay[chave] = [o.location.x, -o.location.y] if chave != 'pasto' else [R3(o.location.x), R3(-o.location.y)]
    mj = ref('JOGO_manjedoura'); lay['manjedoura'] = [R3(mj.location.x), R3(mj.location.z), R3(-mj.location.y), R3(mj.rotation_euler.z)]
    lay['objetos'] = L
    lay['obst'] = colisao()
    lay['plantas'] = plantas()
    sob = next(e for e in L if e['no'] == 'Casa_Sobrado')
    sobo = next(o for o in bpy.data.objects if o.get('no') == 'Casa_Sobrado' and o.parent is None)
    lay['casa'] = {'p': sob['p'], 'r': sobo.rotation_euler.z - sobo.get('r0', 0.0), 'k': sob['k']}
    return lay


def trava_chao():
    # terreno, estrada e muros: travados contra clique (arrastar o chão sem querer desmonta tudo)
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
        bpy.ops.export_scene.gltf(filepath=OUT + '\\betfage_cenario.glb', use_selection=True, export_format='GLB', export_normals=False, export_vertex_color='MATERIAL',
                                  export_image_format='WEBP', export_image_quality=80, export_meshopt_compression_enable=True)
    finally:
        desfaz_chao_leve(leves)
    for o in col.all_objects: o.select_set(False)
    for o in trav: o.hide_select = True
    json.dump(lay, open(OUT + '\\betfage_layout.json', 'w'), separators=(',', ':'))
    if salvar:
        if bpy.data.filepath: bpy.ops.wm.save_mainfile()
        else: bpy.ops.wm.save_as_mainfile(filepath=OUT + '\\betfage.blend')
    msg = 'EXPORTADO %s: %d objetos, %d plantas, %d colisoes (%d reassentados, %d circulos novos)' % (time.strftime('%H:%M:%S'), len(lay['objetos']), len(lay['plantas']), len(lay['obst']), n, nc)
    aviso(msg + ' - recarregue o jogo (Ctrl+F5)')


def aviso(texto, icone='CHECKMARK'):
    print(texto)
    try:
        if not bpy.app.background and bpy.context.window_manager.windows:
            bpy.context.window_manager.popup_menu(lambda self, ctx: self.layout.label(text=texto), title='Betfagé', icon=icone)
    except Exception:
        pass


if __name__ in ('__main__', '<run_path>') or globals().get('RODAR_EXPORTACAO'):
    try:
        if bpy.context.mode != 'OBJECT': bpy.ops.object.mode_set(mode='OBJECT')
        exporta()
    except Exception as e:
        import traceback; traceback.print_exc(); aviso('ERRO na exportação: %s' % e, 'ERROR')
        raise
