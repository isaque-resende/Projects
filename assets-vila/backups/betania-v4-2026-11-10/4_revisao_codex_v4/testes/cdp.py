import json,urllib.request,websocket,time,base64,pathlib,sys
class CDP:
 def __init__(self):
  tabs=json.load(urllib.request.urlopen('http://localhost:9461/json'))
  self.ws=websocket.create_connection(next(t['webSocketDebuggerUrl'] for t in tabs if t['type']=='page'),origin='http://localhost:9461',timeout=120)
  self.i=0; self.events=[]
 def call(self,method,params=None):
  self.i+=1; self.ws.send(json.dumps(dict(id=self.i,method=method,params=params or {})))
  while True:
   r=json.loads(self.ws.recv())
   if r.get('id')==self.i:
    if 'error'in r: raise Exception(r['error'])
    return r.get('result',{})
   self.events.append(r)
 def ev(self,expression):
  r=self.call('Runtime.evaluate',dict(expression=expression,returnByValue=True))
  if 'exceptionDetails'in r: raise Exception(r['exceptionDetails'])
  return r.get('result',{}).get('value')
 def shot(self,path):
  r=self.call('Page.captureScreenshot',dict(format='png'));pathlib.Path(path).write_bytes(base64.b64decode(r['data']))
if __name__=='__main__':
 c=CDP();c.call('Runtime.enable');c.call('Log.enable');c.call('Page.enable')
 c.call('Emulation.setDeviceMetricsOverride',dict(width=1280,height=800,deviceScaleFactor=1,mobile=False))
 c.call('Page.navigate',dict(url='http://127.0.0.1:8766/vila-betania/'))
 deadline=time.time()+100
 while time.time()<deadline:
  if c.ev('!!window.__vila'):break
  time.sleep(1)
 print(json.dumps(c.ev('window.__vila ? __vila.estado() : document.body.innerText'), ensure_ascii=True))
 c.shot('M:/Claude/backup_betania_2026-11-10/4_revisao_codex_v4/testes/saida/depois/desktop.png')
 pathlib.Path('M:/Claude/backup_betania_2026-11-10/4_revisao_codex_v4/testes/saida/depois/events.json').write_text(json.dumps(c.events,ensure_ascii=False,indent=2),encoding='utf-8')
