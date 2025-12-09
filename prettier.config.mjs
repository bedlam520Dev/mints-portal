/** @type {import('prettier').Config} */
const config = {
	singleQuote: true,
	trailingComma: 'es5',
	printWidth: 80,
	tabWidth: 4,
	semi: true,
	bracketSpacing: true,
	arrowParens: 'always',
	endOfLine: 'lf',
	htmlWhitespaceSensitivity: 'css',
	jsxSingleQuote: true,
	singleAttributePerLine: true,
	proseWrap: 'always',
	quoteProps: 'as-needed',
	useTabs: true,
	plugins: [
		'prettier-plugin-tailwindcss',
		'prettier-plugin-organize-imports',
	],
};
export default config;
