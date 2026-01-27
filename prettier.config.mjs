/** @type {import('prettier').Config} */
const config = {
	singleQuote: true,
	jsxSingleQuote: true,
	semi: true,
	tabWidth: 2,
	useTabs: true,
	trailingComma: 'es5',
	arrowParens: 'always',
	bracketSpacing: true,
	bracketSameLine: false,
	singleAttributePerLine: true,
	printWidth: 88,
	endOfLine: 'lf',
	quoteProps: 'as-needed',
	proseWrap: 'preserve',
	htmlWhitespaceSensitivity: 'css',
	embeddedLanguageFormatting: 'auto',
	plugins: ['prettier-plugin-tailwindcss'],
};

export default config;
