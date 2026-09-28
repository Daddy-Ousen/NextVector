import { spawnSync } from 'node:child_process';

const pyCmds = process.platform === 'win32' ? ['python', 'py', 'python3'] : ['python3', 'python'];
let ran = false;

for (const cmd of pyCmds) {
  try {
    const res = spawnSync(cmd, ['scripts/prerender_static_pages.py'], { stdio: 'inherit' });
    if (res.status === 0) {
      ran = true;
      break;
    }
  } catch {
    // try next candidate
  }
}

if (!ran) {
  console.error('[Error] Neither python nor python3 could execute scripts/prerender_static_pages.py');
  process.exit(1);
}
