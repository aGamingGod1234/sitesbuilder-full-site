import { mkdir, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import path from 'node:path';

const npmCli = process.env.npm_execpath;
if (!npmCli) throw new Error('npm_execpath is required; run this script through npm run qa:phase0');
const evidenceRoot = path.resolve('artifacts/qa/local');
await mkdir(evidenceRoot, { recursive: true });

const commands = [
  { script: 'check', evidence: 'check.txt' },
  { script: 'build', evidence: 'build.txt' },
  { script: 'test:unit', evidence: 'unit.txt' },
  { script: 'test:e2e', evidence: 'e2e.txt' },
  { script: 'qa:placeholders', evidence: 'placeholder-scan.txt' },
  { script: 'benchmark:bundle', args: ['--', '--report-only'], evidence: 'bundle-budget.txt' }
];

for (const item of commands) {
  const args = [npmCli, 'run', item.script, ...(item.args ?? [])];
  const output = [];
  const exitCode = await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, args, { cwd: process.cwd(), windowsHide: true });
    child.stdout.on('data', (chunk) => { process.stdout.write(chunk); output.push(chunk); });
    child.stderr.on('data', (chunk) => { process.stderr.write(chunk); output.push(chunk); });
    child.once('error', reject);
    child.once('close', resolve);
  });
  await writeFile(path.join(evidenceRoot, item.evidence), Buffer.concat(output));
  if (exitCode !== 0) {
    console.error(`Phase 0 command failed: npm run ${item.script} (exit ${exitCode})`);
    process.exit(exitCode ?? 1);
  }
}

console.log(`Phase 0 executable checks passed (${commands.length} commands).`);
