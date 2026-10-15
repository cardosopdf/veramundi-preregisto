#!/usr/bin/env node
/* Confere as impressões digitais SHA-256 de REGISTO.md com os ficheiros deste repositório.
   Uso: node verificar.mjs   (Node 18 ou mais recente; sem dependências)
   - Modo "json-canónico": SHA-256 de JSON.stringify(JSON.parse(conteúdo)), em UTF-8.
   - Modo "bytes": SHA-256 dos bytes exatos do ficheiro.
   Os ficheiros que ainda não estão aqui (o código da análise, publicado depois de 7 dez 2026) aparecem como "por publicar". */
import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
const sha = b => createHash('sha256').update(b).digest('hex');
const linhas = readFileSync(new URL('./REGISTO.md', import.meta.url), 'utf8').split('\n').filter(l => /^\| \d{4}-/.test(l));
let falhas = 0;
for (const l of linhas) {
  const [, , fich, modo, h] = l.split('|').map(x => x.trim().replace(/`/g, ''));
  const p = new URL('./' + fich, import.meta.url);
  if (!existsSync(p)) { console.log('por publicar  ' + fich); continue; }
  const b = readFileSync(p);
  const calc = modo === 'json-canónico' ? sha(Buffer.from(JSON.stringify(JSON.parse(b.toString('utf8'))), 'utf8')) : sha(b);
  const ok = calc === h;
  if (!ok) falhas++;
  console.log((ok ? 'confere      ' : 'NÃO CONFERE  ') + fich);
}
process.exit(falhas ? 1 : 0);
