import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { forbiddenPublicPatterns, walkFiles } from './qa-utils.mjs';

const root = path.resolve('dist');
const artifactDir = path.resolve('artifacts/qa/local/legal');
const allowedExtensions = new Set(['.html', '.js', '.css', '.json', '.xml', '.txt']);
const files = (await walkFiles(root)).filter((file) => allowedExtensions.has(path.extname(file)));
const findings = [];

for (const file of files) {
  const text = await readFile(file, 'utf8');
  for (const pattern of forbiddenPublicPatterns) {
    if (pattern.test(text)) findings.push({ file: path.relative(root, file).replaceAll('\\', '/'), pattern: String(pattern) });
  }
}

await mkdir(artifactDir, { recursive: true });
await writeFile(path.join(artifactDir, 'placeholder-scan.json'), JSON.stringify({ filesScanned: files.length, findings }, null, 2));
console.log(JSON.stringify({ filesScanned: files.length, findings: findings.length }));
if (findings.length) process.exitCode = 1;
