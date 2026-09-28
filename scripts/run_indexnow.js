import { spawnSync } from 'node:child_process';

const pyCmds = process.platform === 'win32' ? ['python', 'py', 'python3'] : ['python3', 'python'];
let ran = false;

for (const cmd of pyCmds) {
  try {
    const res = spawnSync(cmd, ['scripts/ping_indexnow.py'], { stdio: 'inherit' });
    if (res.status === 0) {
      ran = true;
      break;
    }
  } catch {
    // try next candidate
  }
}

if (!ran) {
  console.error('[Error] Neither python nor python3 could execute scripts/ping_indexnow.py');
  process.exit(1);
}
