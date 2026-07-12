import { gzipSync } from 'node:zlib';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { walkFiles } from './qa-utils.mjs';

const reportOnly = process.argv.includes('--report-only');
const root = path.resolve('dist');
const artifactDir = path.resolve('artifacts/benchmarks/local');
const files = await walkFiles(root);
const records = [];

for (const file of files) {
  const buffer = await readFile(file);
  const extension = path.extname(file).toLowerCase();
  const compressible = ['.html', '.css', '.js', '.json', '.xml', '.txt', '.svg'].includes(extension);
  records.push({
    path: path.relative(root, file).replaceAll('\\', '/'),
    bytes: buffer.length,
    transferBytes: compressible ? gzipSync(buffer).length : buffer.length
  });
}

const initialExtensions = new Set(['.html', '.css', '.js', '.woff', '.woff2']);
const initialFiles = records.filter((record) => initialExtensions.has(path.extname(record.path).toLowerCase()) || record.path === 'assets/bg-hero-1.jpg');
const totalTransferBytes = records.reduce((sum, record) => sum + record.transferBytes, 0);
const estimatedInitialTransferBytes = initialFiles.reduce((sum, record) => sum + record.transferBytes, 0);
const budgets = { estimatedInitialTransferBytes: 700_000 };
const failures = estimatedInitialTransferBytes > budgets.estimatedInitialTransferBytes
  ? [`estimated initial transfer ${estimatedInitialTransferBytes} exceeds ${budgets.estimatedInitialTransferBytes}`]
  : [];
const report = { generatedAt: new Date().toISOString(), reportOnly, budgets, estimatedInitialTransferBytes, totalTransferBytes, failures, files: records };

await mkdir(artifactDir, { recursive: true });
await writeFile(path.join(artifactDir, 'bundle-summary.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify({ estimatedInitialTransferBytes, totalTransferBytes, failures }));
if (failures.length && !reportOnly) process.exitCode = 1;
