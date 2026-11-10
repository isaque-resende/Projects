from cdp import CDP
import json,time,pathlib
c=CDP();c.call('Runtime.enable');c.call('Log.enable')
results=[]
def js(expr):
 r=c.call('Runtime.evaluate',dict(expression=expr,returnByValue=True,awaitPromise=True))
 if 'exceptionDetails'in r: raise Exception(r['exceptionDetails'])
 return r.get('result',{}).get('value')
def rec(n,ok,d=None):
 results.append(dict(teste=n,ok=bool(ok),detalhe=d));print(json.dumps(results[-1],ensure_ascii=True),flush=True)
c.call('Emulation.setDeviceMetricsOverride',dict(width=1000,height=700,deviceScaleFactor=1,mobile=False))
js("document.querySelector('#ajuda').close(); document.activeElement.blur(); Object.assign(__vila.P,{x:4.6,z:1.9,y:0,rota:[],aoChegar:null}); __vila.roteiro(()=>new Promise(r=>window.liberarTeste=r)); __vila.irPara([8.4,10.6]);")
for kind,x,y,button,buttons in [('mousePressed',110,350,'left',1),('mouseMoved',170,400,'left',1)]:
 c.call('Input.dispatchMouseEvent',dict(type=kind,x=x,y=y,button=button,buttons=buttons,clickCount=1))
rec('Joystick preserva rota durante interacao',js('__vila.P.rota.length>0 && __vila.ocupado'))
c.call('Input.dispatchMouseEvent',dict(type='mouseReleased',x=170,y=400,button='left',buttons=0,clickCount=1))
js("window.liberarTeste(); __vila.P.rota=[]; __vila.P.aoChegar=null; document.querySelector('#ajuda').showModal()")
js('__vila.teste.avancar(.1)')
js("document.querySelector('#ajuda').close(); __vila.zoomT=.4")
c.call('Emulation.setTouchEmulationEnabled',dict(enabled=True,maxTouchPoints=5))
def touch(kind,points):
 c.call('Input.dispatchTouchEvent',dict(type=kind,touchPoints=[dict(id=i,x=x,y=y,radiusX=2,radiusY=2,force=1) for i,x,y in points]))
touch('touchStart',[(1,100,300)])
touch('touchStart',[(1,100,300),(2,250,300)])
touch('touchMove',[(1,100,300),(2,300,300)])
touch('touchEnd',[(1,100,300)])
touch('touchEnd',[])
rec('Pinca modifica zoom sem iniciar caminhada',js('__vila.zoomT<.4 && __vila.P.rota.length===0'),js('__vila.zoomT'))
c.call('Emulation.setTouchEmulationEnabled',dict(enabled=False))
# Repeated camera control must stop on blur even if pointerup was lost.
js('__vila.zoomT=.4')
c.call('Input.dispatchMouseEvent',dict(type='mousePressed',x=963,y=84,button='left',buttons=1,clickCount=1))
js("dispatchEvent(new Event('blur')); document.querySelector('#ajuda').showModal()")
z=js('__vila.zoomT');time.sleep(.3)
rec('Perda de foco encerra repeticao de zoom',js('__vila.zoomT')==z)
c.call('Input.dispatchMouseEvent',dict(type='mouseReleased',x=963,y=84,button='left',buttons=0,clickCount=1))
# Scrollable help remains operable in a short landscape viewport.
c.call('Emulation.setDeviceMetricsOverride',dict(width=844,height=390,deviceScaleFactor=1,mobile=True))
js("document.querySelector('#voltarJogo').scrollIntoView({block:'end'})")
r=js("(()=>{let r=document.querySelector('#voltarJogo').getBoundingClientRect();return {top:r.top,bottom:r.bottom}})()")
rec('Voltar a vila acessivel com rolagem em paisagem',r['top']>=0 and r['bottom']<=390,r)
# Test a blocked required asset. Expected network errors belong only to this test.
c.call('Network.enable');c.call('Network.setBlockedURLs',dict(urls=['*reboco_pintado_v4.webp']))
c.call('Page.reload',dict(ignoreCache=True))
end=time.time()+60
while time.time()<end:
 if js("!!document.querySelector('#recarregar') && !document.querySelector('#recarregar').hidden"):break
 time.sleep(.5)
rec('Falha de textura mostra mensagem e tentar novamente',js("!document.querySelector('#recarregar').hidden && document.querySelector('#erro').textContent.includes('Recurso indisponÃ­vel')"))
c.call('Network.setBlockedURLs',dict(urls=[]))
pathlib.Path('M:/Claude/backup_betania_2026-11-10/4_revisao_codex_v4/testes/saida/regressoes.json').write_text(json.dumps(results,ensure_ascii=False,indent=2),encoding='utf-8')
# Restore a clean normal game tab; this is a headless test profile only.
c.call('Emulation.setDeviceMetricsOverride',dict(width=1000,height=700,deviceScaleFactor=1,mobile=False))
c.call('Page.navigate',dict(url='http://127.0.0.1:8766/vila-betania/'))
print('FINISHED',sum(x['ok'] for x in results),'/',len(results),flush=True)
