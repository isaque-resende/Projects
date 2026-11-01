// Gera src/embedded/*.js com os binários (glb/hdr) em base64, para o build de compartilhamento.
import fs from 'node:fs';
const out = new URL('../src/embedded/', import.meta.url);
fs.rmSync(out, { recursive: true, force: true }); fs.mkdirSync(out, { recursive: true });
const files = [...fs.readdirSync('public/assets/models').map((f) => `public/assets/models/${f}`), 'public/assets/sky/sunset.hdr'];
for (const f of files) {
  const name = f.split('/').pop().replace(/\.(glb|hdr)$/, '');
  fs.writeFileSync(new URL(`${name}.js`, out), `export default "${fs.readFileSync(f).toString('base64')}";\n`);
  console.log('embutido', name);
}
