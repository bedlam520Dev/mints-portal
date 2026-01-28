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

			'prettier/prettier': [
				'warn',
				{
					endOfLine: 'auto',
				},
			],

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
			'react/react-in-jsx-scope': 'off',
			'react/prop-types': 'off',
			'react/jsx-props-no-spreading': 'off',
			'react/jsx-filename-extension': 'off',
			'react/jsx-max-depth': 'off',
			'sort-imports': 'off',
			'sort-keys': 'off',
			'no-console': 'warn',
			'no-undef': 'off',
			'no-ternary': 'off',
			'func-style': 'off',
			'arrow-body-style': 'off',
			'no-inline-comments': 'off',
			curly: ['warn', 'multi-line'],
		},
	},
	{
		files: ['src/app/api/**/*.ts', 'src/lib/**/*.ts', 'src/components/dev/**/*.tsx'],
		rules: {
			'no-console': 'off',
		},
	}
);
