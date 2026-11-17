# Exporta Betânia do jeito que está no Blender: terreno (.glb), árvores/pedras/flores (layout) e posições do jogo.
# Rodar no Blender aberto: aba Scripting > texto "EXPORTAR_PARA_O_JOGO" > Run Script (ele também salva o .blend).
# Ou sem abrir:  blender -b betania.blend -P exportar_betania.py
# Mundo three.js: (x, y, z) = Blender (x, z, -y).
import bpy, json, math, os, time
from mathutils import Vector

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
            # uma linha que volta por cima de si mesma (ida e volta para fazer um ramo) vira trechos separados:
            # ponto repetido = fim do trecho; o próximo trecho começa nele. Pontos duplicados seguidos somem.
            trechos, atual, vistos = [], [], []
            for p in pts:
                q = (R3(p.x), R3(-p.y))
                if any(abs(q[0] - v[0]) < 0.02 and abs(q[1] - v[1]) < 0.02 for v in vistos):
                    if len(atual) >= 2: trechos.append(atual)
                    atual = [q]
                else:
                    atual.append(q); vistos.append(q)
            if len(atual) >= 2: trechos.append(atual)
            for i, tr in enumerate(trechos):
                caminhos.append(('%s_%03d' % (o.name, i), {'pts': [list(q) for q in tr], 'larg': R3(o['larg'])}))
    caminhos.sort(key=lambda c: c[0])
    return {'versao': int(time.time()), 'pontos': dict(sorted(pontos.items())), 'caminhos': [c for _, c in caminhos], 'lavoura': lav}


# ---------- colisão: as formas da coleção "Colisao" ----------
# Círculo = empty "Círculo" (o raio é o tamanho dele no mundo); caixa = empty "Cubo" (vira caixa alinhada aos eixos).
# Cada forma fica presa (parent) ao objeto dono e anda junto com ele. Pessoas, a pedra que rola e o muro do
# aprisco com porteira continuam no código do jogo.
ALTOS = ('Arvore', 'Cipreste', 'Tamareira')


def colecao_colisao():
    col = bpy.data.collections.get('Colisao')
    if col is None:
        col = bpy.data.collections.new('Colisao'); bpy.context.scene.collection.children.link(col)
    return col


def colisao_novas():
    # árvore, pedra ou planta de perto que ainda não tem colisão ganha o círculo padrão
    # (se você apagar o círculo depois, ele não volta: o objeto guarda o próprio nome em col_feita;
    #  uma cópia com Shift+D tem outro nome, então ganha o círculo dela)
    from mathutils import Matrix
    col = colecao_colisao(); n = 0
    for o in bpy.data.objects:
        if 'glb' not in o or o.parent is not None or o.get('f') or o.get('col_feita') == o.name or o['no'].startswith('Casa_'): continue
        k = round(o.scale.x / o.get('k0', 1.0), 3)
        r = 0.45 if any(a in o['no'] for a in ALTOS) else 0.35 * k + 0.15
        e = bpy.data.objects.new('COL_' + o.name, None); col.objects.link(e)
        e.empty_display_type = 'CIRCLE'; e.empty_display_size = 1.0; e['colisao'] = 'circ'; e['dono'] = 1
        e.hide_render = True; e.show_in_front = True
        e.matrix_world = Matrix.Translation(o.matrix_world.translation + Vector((0, 0, 0.2))) @ Matrix.Rotation(math.pi / 2, 4, 'X') @ Matrix.Diagonal((r, r, r, 1))
        e.parent = o; e.matrix_parent_inverse = o.matrix_world.inverted()
        o['col_feita'] = o.name; n += 1
    return n


def colisao():
    bpy.context.view_layer.update()
    C, B = [], []
    for o in list(colecao_colisao().objects):
        if 'colisao' not in o: continue
        if o.get('dono') and o.parent is None:          # o dono foi apagado: a forma vai junto
            bpy.data.objects.remove(o); continue
        m, s = o.matrix_world, o.empty_display_size
        if o['colisao'] == 'circ':
            C.append([R3(m.translation.x), R3(-m.translation.y), round(m.col[0].xyz.length * s, 4)])
        else:
            cs = [m @ Vector((a * s, b * s, c * s)) for a in (-1, 1) for b in (-1, 1) for c in (-1, 1)]
            xs, ys = [p.x for p in cs], [p.y for p in cs]
            B.append([round(min(xs), 4), round(max(xs), 4), round(-max(ys), 4), round(-min(ys), 4)])
    return {'circ': sorted(C), 'caixas': sorted(B)}


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
    nc = colisao_novas()
    POS = le_tudo()
    POS['colisao'] = colisao()
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
    msg = 'EXPORTADO %s: %d objetos, %d posicoes, %d caminhos, %d colisoes' % (time.strftime('%H:%M:%S'), len(L), len(POS['pontos']), len(POS['caminhos']), len(POS['colisao']['circ']) + len(POS['colisao']['caixas']))
    print(msg); aviso(msg + ' - recarregue o jogo (Ctrl+F5)')


def aviso(texto, icone='CHECKMARK'):
    # janelinha na tela do Blender (sem janela, em modo -b, só imprime)
    print(texto)
    try:
        if bpy.context.window_manager.windows:
            bpy.context.window_manager.popup_menu(lambda self, ctx: self.layout.label(text=texto), title='Betânia', icon=icone)
    except Exception:
        pass


if __name__ in ('__main__', '<run_path>') or globals().get('RODAR_EXPORTACAO'):
    try:
        if bpy.context.mode != 'OBJECT': bpy.ops.object.mode_set(mode='OBJECT')     # sai do modo de edição (pontos editados entram)
        exporta()
    except Exception as e:
        import traceback; traceback.print_exc(); aviso('ERRO na exportação: %s' % e, 'ERROR')
        raise
