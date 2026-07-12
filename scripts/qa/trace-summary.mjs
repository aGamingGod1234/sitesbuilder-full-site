import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { percentile } from './qa-utils.mjs';

const input = process.argv[2];
if (!input) throw new Error('Usage: node scripts/qa/trace-summary.mjs <chrome-trace.json> [output.json]');
const output = process.argv[3] ?? 'artifacts/benchmarks/local/trace-summary.json';
const trace = JSON.parse(await readFile(path.resolve(input), 'utf8'));
const events = Array.isArray(trace.traceEvents) ? trace.traceEvents : [];
const tasksMs = events
  .filter((event) => event.ph === 'X' && typeof event.dur === 'number' && ['RunTask', 'ThreadControllerImpl::RunTask'].includes(event.name))
  .map((event) => event.dur / 1000);
const summary = {
  source: path.resolve(input),
  taskCount: tasksMs.length,
  p95TaskMs: percentile(tasksMs, 95),
  maxTaskMs: tasksMs.length ? Math.max(...tasksMs) : 0,
  longTasksOver100Ms: tasksMs.filter((value) => value > 100).length
};
await mkdir(path.dirname(path.resolve(output)), { recursive: true });
await writeFile(path.resolve(output), JSON.stringify(summary, null, 2));
console.log(JSON.stringify(summary));
