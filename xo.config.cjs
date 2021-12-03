/** @type {import('xo').Options} */
module.exports = {
	prettier: true,
	rules: {
		'import/extensions': 'off',
	},
	overrides: [
		{
			files: '**/*.ts',
			rules: {
				'@typescript-eslint/explicit-function-return-type': 'error',
			},
		},
	],
};
