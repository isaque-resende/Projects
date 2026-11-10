from cdp import CDP
import json,time,pathlib
c=CDP();c.call('Runtime.enable');c.call('Log.enable');c.call('Page.enable')
results=[]
def js(expr):
 r=c.call('Runtime.evaluate',dict(expression=expr,returnByValue=True,awaitPromise=True))
 if 'exceptionDetails'in r: raise RuntimeError(r['exceptionDetails'])
 return r.get('result',{}).get('value')
def record(name,ok,detail=None):
 results.append(dict(teste=name,ok=bool(ok),detalhe=detail));print(json.dumps(results[-1],ensure_ascii=True),flush=True)
def advance(n): return js(f'__vila.teste.avancar({n}).then(()=>JSON.parse(__vila.estado()))')
def state(): return js('JSON.parse(__vila.estado())')
c.call('Emulation.setFocusEmulationEnabled',dict(enabled=True))
c.call('Emulation.setDeviceMetricsOverride',dict(width=1000,height=700,deviceScaleFactor=1,mobile=False))
c.events.clear()
c.call('Page.navigate',dict(url='http://127.0.0.1:8766/vila-betania/?teste=1'))
end=time.time()+180
while time.time()<end:
 if js('!!window.__vila?.teste'): break
 time.sleep(1)
record('Inicializacao completa',js('!!window.__vila?.teste'))
js("document.querySelector('#bAjuda').click()")
record('Ajuda abre como modal',js("document.querySelector('#ajuda').open"))
t0=state()['tempo'];time.sleep(1);record('Ajuda pausa simulacao',state()['tempo']==t0)
record('Stencil ativo para silhueta',js('__vila.teste.diagnostico().stencil'))
routes=js('__vila.POIS.map(p=>({id:p.id,passos:__vila.caminho(__vila.P.x,__vila.P.z,__vila.P.y,...p.pe,p.peY)?.length || 0}))')
record('Rotas aos nove pontos de interesse',all(x['passos'] for x in routes),routes)
# Native keyboard activation on a real button, modal remains open so route simulation is paused.
js("document.querySelector('#voltarJogo').click(); document.querySelector('#bCorre').focus()")
c.call('Input.dispatchKeyEvent',dict(type='keyDown',key='Enter',code='Enter',windowsVirtualKeyCode=13,text='\r',unmodifiedText='\r'))
c.call('Input.dispatchKeyEvent',dict(type='keyUp',key='Enter',code='Enter',windowsVirtualKeyCode=13))
record('Botao correr funciona com Enter',js("document.querySelector('#bCorre').getAttribute('aria-pressed')==='true'"))
js("document.querySelector('#bCorre').click(); document.querySelector('#bAjuda').click()")
# Direct steps make gameplay checks independent of software-rendered frame rate.
js("document.body.dispatchEvent(new KeyboardEvent('keydown',{key:'w',bubbles:true}))") # Modal intentionally ignores game input.
a=state();advance(.5);b=state();record('Ajuda bloqueia entrada de movimento',a['P']==b['P'])
js("document.querySelector('#ajuda').close(); document.body.dispatchEvent(new KeyboardEvent('keydown',{key:'w',bubbles:true})); document.querySelector('#ajuda').showModal()")
a=state();advance(.5);b=state();record('W movimenta personagem',a['P']!=b['P'])
js("dispatchEvent(new Event('blur'))")
a=state();advance(.5);b=state();record('Perda de foco limpa teclas',a['P']==b['P'])
# Place near each scripted activity and activate through the shipped button.
def action(id,seconds):
 js(f"{{const p=__vila.POIS.find(p=>p.id==={json.dumps(id)}); Object.assign(__vila.P,{{x:p.pe[0],z:p.pe[1],y:p.peY,rota:[],aoChegar:null}})}}")
 advance(.1);js("document.querySelector('#bAcao').click()")
 started=state()['ocupado'];out=advance(seconds)
 record('Interacao '+id,started and not out['ocupado'] and not out['travado'],out)
action('poco',40)
record('Balde cheio pronto para cantaro',js('__vila.baldeEst.cheio && __vila.baldeEst.modo==="gancho"'))
js("document.querySelector('#bAcao').click()")
out=advance(30);record('Encher cantaro conclui',not out['ocupado'] and js('__vila.baldeEst.modo==="borda"'),out)
action('forno',30)
record('Forno aceso',js('__vila.fogo > .9'))
js("document.querySelector('#bAcao').click()")
out=advance(60);record('Assar pao conclui',not out['ocupado'] and js('__vila.paEst.modo==="descanso" && !__vila.paEst.carga'),out)
action('eira',35)
action('tumulo',35)
js("document.querySelector('#bAcao').click()")
out=advance(40);record('Entrar no tumulo conclui',not out['ocupado'],out)
js("document.querySelector('#bAcao').click()")
out=advance(40);record('Sair do tumulo conclui',not out['ocupado'],out)
action('casa',40)
js("document.querySelector('#bAcao').click()")
out=advance(50);record('Subir ao terraco',not out['ocupado'] and out['P'][1]>2,out)
js("document.querySelector('#bAcao').click()")
out=advance(50);record('Descer a rua',not out['ocupado'] and out['P'][1]<1,out)
action('lagar',60)
# Desktop preview returns to plaza.
js("Object.assign(__vila.P,{x:4.6,z:1.9,y:0,rota:[],aoChegar:null}); document.querySelector('#fecharLegenda').click()")
advance(2);js("document.querySelector('#ajuda').close()")
c.shot('M:/Claude/backup_betania_2026-11-10/4_revisao_codex_v4/testes/saida/depois/desktop.png')
# Portrait and landscape layout + modal fitting.
for label,w,h in [('mobile',390,844),('paisagem',844,390)]:
 c.call('Emulation.setDeviceMetricsOverride',dict(width=w,height=h,deviceScaleFactor=1,mobile=True))
 js("document.querySelector('#bAjuda').click()")
 bounds=js("(()=>{let r=document.querySelector('#ajuda').getBoundingClientRect();return {left:r.left,right:r.right,top:r.top,bottom:r.bottom,w:innerWidth,h:innerHeight}})()")
 record('Ajuda cabe em '+label,bounds['left']>=0 and bounds['right']<=bounds['w']+1 and bounds['top']>=0 and bounds['bottom']<=bounds['h']+1,bounds)
 c.shot('M:/Claude/backup_betania_2026-11-10/4_revisao_codex_v4/testes/saida/depois/'+label+'-ajuda.png')
 js("document.querySelector('#ajuda').close()")
 c.shot('M:/Claude/backup_betania_2026-11-10/4_revisao_codex_v4/testes/saida/depois/'+label+'.png')
# Ignore old navigation contexts; new exceptions are all preserved for inspection.
errors=[e for e in c.events if e['method']=='Runtime.exceptionThrown' or (e['method']=='Log.entryAdded' and e['params']['entry']['level']=='error')]
record('Sem erros de runtime/rede',not errors,errors)
pathlib.Path('M:/Claude/backup_betania_2026-11-10/4_revisao_codex_v4/testes/saida/resultados.json').write_text(json.dumps(results,ensure_ascii=False,indent=2),encoding='utf-8')
pathlib.Path('M:/Claude/backup_betania_2026-11-10/4_revisao_codex_v4/testes/saida/depois/test-events.json').write_text(json.dumps(c.events,ensure_ascii=False,indent=2),encoding='utf-8')
print('FINISHED',sum(x['ok'] for x in results),'/',len(results),flush=True)
