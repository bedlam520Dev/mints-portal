/** @type {import('postcss-load-config').Config} */
const config = {
	plugins: {
		'@tailwindcss/postcss': {
			lint: {
				rules: {
					'at-rule-no-unknown': null,
					boxModel: false,
				},
			},
		},
	},
};

export default config;
