#!/usr/bin/env node
/**
 * dev.mjs
 * Chooses an optimal Next dev command depending on whether we're in Termux.
 */

import { spawn } from 'node:child_process';

const isTermux =
	!!process.env.TERMUX_VERSION ||
	process.platform === 'android' ||
	/com\.termux/i.test(process.env.PREFIX ?? '') ||
	/termux/i.test(process.env.HOME ?? '');

const baseArgs = ['dev'];
const isTurboDesired = !isTermux; // default: turbo on desktop

const nextArgs = isTurboDesired
	? [...baseArgs, '--turbo']
	: [...baseArgs, '--hostname', '0.0.0.0', '--port', '3000'];

const cmd = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm';
const child = spawn(cmd, ['next', ...nextArgs], {
	stdio: 'inherit',
	env: process.env,
});

child.on('exit', (code) => process.exit(code ?? 1));
