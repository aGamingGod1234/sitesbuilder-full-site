import { createHash } from 'node:crypto';
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

export async function walkFiles(root) {
  const output = [];
  for (const entry of await readdir(root, { withFileTypes: true })) {
    const absolute = path.join(root, entry.name);
    if (entry.isDirectory()) output.push(...await walkFiles(absolute));
    else if (entry.isFile()) output.push(absolute);
  }
  return output;
}

export function percentile(values, percentileValue) {
  if (!values.length) return 0;
  const sorted = [...values].sort((left, right) => left - right);
  const index = Math.min(sorted.length - 1, Math.ceil((percentileValue / 100) * sorted.length) - 1);
  return sorted[Math.max(0, index)];
}

export function sha256(buffer) {
  return createHash('sha256').update(buffer).digest('hex');
}

export async function fileRecord(file, root = process.cwd()) {
  const details = await stat(file);
  const buffer = await readFile(file);
  return {
    path: path.relative(root, file).replaceAll('\\', '/'),
    bytes: details.size,
    sha256: sha256(buffer)
  };
}

export const forbiddenPublicPatterns = [
  /\[FULL LEGAL NAME\]/i,
  /\[BUSINESS\/CONTACT ADDRESS/i,
  /\[REQUIRED BEFORE PUBLICATION/i,
  /Most selected/i,
  /S\$499|S\$950|S\$1,800/i,
  /concept to final product in four days/i,
  /redesigned in seven days/i
];
