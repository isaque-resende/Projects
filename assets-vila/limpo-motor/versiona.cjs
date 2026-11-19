// Põe no index.html de uma fase um importmap com a "versão" (o hash do conteúdo) de cada módulo .js da fase e do motor.
// O GitHub Pages deixa os arquivos 10 min no cache do navegador: sem isso, o celular roda o código antigo misturado com o novo.
// Uso (rodar antes de cada commit que mexe em .js):  node assets-vila/limpo-motor/versiona.cjs assets-vila/fase-oliveiras
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const fase = path.resolve(process.argv[2] || '.'), motor = path.resolve(__dirname);
const idx = path.join(fase, 'index.html');
let html = fs.readFileSync(idx, 'utf8'); const crlf = html.includes('\r\n'); html = html.replace(/\r\n/g, '\n');
const ver = (f) => crypto.createHash('sha1').update(fs.readFileSync(f)).digest('hex').slice(0, 8);
const ent = {};
for (const [dir, pre] of [[path.join(fase, 'js'), './js/'], [motor, '../limpo-motor/']])
  for (const n of fs.readdirSync(dir).filter((n) => n.endsWith('.js')).sort()) ent[pre + n] = pre + n + '?v=' + ver(path.join(dir, n));
const m = html.match(/<script type="importmap">\n([\s\S]*?)\n<\/script>/);
if (!m) throw new Error('importmap não achado');
const mapa = JSON.parse(m[1]);
for (const k of Object.keys(mapa.imports)) if (k.startsWith('./') || k.startsWith('../')) delete mapa.imports[k];
Object.assign(mapa.imports, ent);
const txt = '{ "imports": {\n' + Object.entries(mapa.imports).map(([k, v]) => '  ' + JSON.stringify(k) + ': ' + JSON.stringify(v)).join(',\n') + '\n} }';
html = html.replace(m[0], '<script type="importmap">\n' + txt + '\n</script>');
html = html.replace(/<script type="module" src="js\/main\.js[^"]*"><\/script>/, '<script type="module" src="' + ent['./js/main.js'] + '"></script>');
fs.writeFileSync(idx, crlf ? html.replace(/\n/g, '\r\n') : html);
console.log('ok', Object.keys(ent).length, 'módulos');
