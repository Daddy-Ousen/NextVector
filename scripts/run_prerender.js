import { spawnSync } from 'node:child_process';

const pyCmds = process.platform === 'win32' ? ['python', 'py', 'python3'] : ['python3', 'python'];
const script = 'scripts/prerender_static_pages.py';

for (const cmd of pyCmds) {
  const res = spawnSync(cmd, [script, ...process.argv.slice(2)], { stdio: 'inherit' });
  // Interpreter not found: try the next candidate. Otherwise report the script's own result.
  if (res.error && res.error.code === 'ENOENT') continue;
  // 9009: Windows Store "python" alias stub with no real interpreter behind it
  if (process.platform === 'win32' && res.status === 9009) continue;
  process.exit(res.status ?? 1);
}

console.error(`[Error] Neither python nor python3 could execute ${script}`);
process.exit(1);
