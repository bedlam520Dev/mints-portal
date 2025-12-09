import nextPlugin from '@next/eslint-plugin-next';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default [
	{
		ignores: [
			'node_modules',
			'.next',
			'dist',
			'_dev/**',
			'_devlogs/**',
			'pnpm-lock.yaml',
			'scripts/**',
			'.venv',
			'.vscode',
		],
	},
	{
		files: ['**/*.{js,jsx,ts,tsx}'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				project: ['./tsconfig.json'],
				tsconfigRootDir: __dirname,
			},
		},
		plugins: {
			'@next/next': nextPlugin,
		},
		rules: {
			...nextPlugin.configs['core-web-vitals'].rules,
		},
	},
];
