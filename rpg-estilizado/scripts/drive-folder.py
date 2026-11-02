# Baixa todos os arquivos de uma pasta pública do Google Drive (sem subpastas).
# Uso: python3 scripts/drive-folder.py <id-da-pasta> <destino>
# A visualização embutida lista a pasta inteira (a página normal para em 50 itens).
import re, ssl, sys, os, urllib.request
CA = os.environ.get('SSL_CERT_FILE') or ('/root/.ccr/ca-bundle.crt' if os.path.exists('/root/.ccr/ca-bundle.crt') else None)
ctx = ssl.create_default_context(cafile=CA)
def get(u):
    return urllib.request.urlopen(urllib.request.Request(u, headers={'User-Agent': 'Mozilla/5.0'}), context=ctx, timeout=120).read()
fid, dest = sys.argv[1], sys.argv[2]
h = get(f'https://drive.google.com/embeddedfolderview?id={fid}').decode('utf8', 'replace')
items = re.findall(r'file/d/([A-Za-z0-9_-]+)/view[^>]*>.*?flip-entry-title">([^<]+)', h, re.S)
os.makedirs(dest, exist_ok=True); n = bad = 0
for i, nm in items:
    p = os.path.join(dest, os.path.basename(nm))
    if os.path.exists(p) and os.path.getsize(p) > 0: continue
    b = get(f'https://drive.usercontent.google.com/download?id={i}&export=download&confirm=t')
    if b[:200].find(b'Quota exceeded') >= 0: bad += 1; continue
    open(p, 'wb').write(b); n += 1
print(len(items), 'itens,', n, 'baixados,', bad, 'com quota')
