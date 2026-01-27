import js from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const nextRules = nextPlugin.configs.recommended.rules ?? {};
const reactRules = reactPlugin.configs.recommended.rules ?? {};
const reactJsxRuntimeRules = reactPlugin.configs['jsx-runtime'].rules ?? {};
const reactHooksRules = reactHooksPlugin.configs.recommended.rules ?? {};

const tsFileGlobs = ['**/*.ts', '**/*.tsx', '**/*.cts', '**/*.mts'];

const typeCheckedConfigs = tseslint.configs.recommendedTypeChecked.map((config) => ({
	...config,
	files: config.files ?? tsFileGlobs,
	languageOptions: {
		...config.languageOptions,
		parserOptions: {
			...(config.languageOptions?.parserOptions ?? {}),
			project: ['./tsconfig.json'],
			tsconfigRootDir: import.meta.dirname,
		},
	},
}));

export default tseslint.config(
	{
		ignores: [
			'.next/**/*',
			'node_modules/**/*',
			'_dev/**/*',
			'_devlogs/**/*',
			'pnpm-lock.yaml',
			'.vscode/**/*',
			'.env*',
			'.gitignore',
			'.prettierignore',
			'.rsyncignore',
			'public/**/*',
		],
	},
	js.configs.recommended,
	...typeCheckedConfigs,
	{
		languageOptions: {
			ecmaVersion: 2023,
			sourceType: 'module',
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
		plugins: {
			'@next/next': nextPlugin,
			react: reactPlugin,
			'react-hooks': reactHooksPlugin,
			'@typescript-eslint': tseslint.plugin,
			prettier: prettierPlugin,
		},
		settings: {
			react: {
				version: 'detect',
			},
			next: {
				rootDir: ['.'],
			},
		},
		rules: {
			...nextRules,
			...reactRules,
			...reactJsxRuntimeRules,
			...reactHooksRules,
			...prettierConfig.rules,

			// Prettier integration
			'prettier/prettier': [
				'warn',
				{
					endOfLine: 'auto',
				},
			],

			// TypeScript rules - reasonable defaults
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
				},
			],
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/explicit-module-boundary-types': 'off',
			'@typescript-eslint/consistent-type-definitions': 'off',

			// React rules - Next.js compatible
			'react/react-in-jsx-scope': 'off', // Not needed in Next.js
			'react/prop-types': 'off', // Using TypeScript
			'react/jsx-props-no-spreading': 'off', // Common pattern
			'react/jsx-filename-extension': 'off', // .tsx is fine
			'react/jsx-max-depth': 'off', // Too restrictive

			// Import rules - disabled overly strict ones
			'sort-imports': 'off',
			'sort-keys': 'off',

			// General rules - modern JS
			'no-console': 'warn', // Allow console in dev
			'no-undef': 'off', // TypeScript handles this
			'no-ternary': 'off', // Ternaries are fine
			'func-style': 'off', // Allow both styles
			'arrow-body-style': 'off', // Allow both styles
			'no-inline-comments': 'off', // Comments are good
			curly: ['warn', 'multi-line'], // Require braces for multi-line
		},
	},
	// Disable no-console for server-side code and dev utilities
	{
		files: ['src/app/api/**/*.ts', 'src/lib/**/*.ts', 'src/components/dev/**/*.tsx'],
		rules: {
			'no-console': 'off', // Server-side and dev utilities need console logging
		},
	}
);
