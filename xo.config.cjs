/** @type {import('xo').Options} */
module.exports = {
	extends: ['plugin:security/recommended', 'plugin:sonarjs/recommended'],
	prettier: true,
	rules: {
		'unicorn/prefer-top-level-await': 'off',
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
