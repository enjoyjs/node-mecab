module.exports = {
	prettier: true,
	overrides: [
		{
			files: '**/*.ts',
			rules: {
				'@typescript-eslint/explicit-function-return-type': 'error'
			}
		}
	]
};
