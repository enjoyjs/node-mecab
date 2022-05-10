/** @type {import('xo').Options} */
module.exports = {
	extends: ['plugin:security/recommended', 'plugin:sonarjs/recommended'],
	prettier: true,
	overrides: [
		{
			files: '**/*.ts',
			rules: {
				'@typescript-eslint/explicit-function-return-type': 'error',
			},
		},
	],
};
