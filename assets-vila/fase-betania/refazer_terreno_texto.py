# refaz terreno, caminhos e muretas seguindo as posições atuais (casas, túmulo, caminhos...) e exporta
import bpy, traceback
if bpy.context.mode != 'OBJECT': bpy.ops.object.mode_set(mode='OBJECT')
try:
    SO_TERRENO = True; EXPORTAR = True
    exec(open(r'M:\Claude\github\Projects-animais\assets-vila\fase-betania\betania_blender.py', encoding='utf-8').read())
except Exception as e:
    traceback.print_exc()
    bpy.context.window_manager.popup_menu(lambda self, ctx: self.layout.label(text='ERRO: %s' % e), title='Betânia', icon='ERROR')
