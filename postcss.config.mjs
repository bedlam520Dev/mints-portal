/** @type {import('postcss-load-config').Config} */
const config = {
	plugins: {
		'@tailwindcss/postcss': {
			lint: {
				rules: {
					// Disable boxModel warning - we have box-sizing: border-box set globally
					// which makes width/height with padding/border safe
					'at-rule-no-unknown': null,
					boxModel: false,
				},
			},
		},
	},
};

export default config;
