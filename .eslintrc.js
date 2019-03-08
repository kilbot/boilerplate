module.exports = {
	parser: '@typescript-eslint/parser',
	extends: ['plugin:@typescript-eslint/recommended', 'react-app', 'plugin:prettier/recommended'],
	plugins: ['@typescript-eslint', 'react', 'react-native', 'react-hooks'],
	rules: {
		indent: 'off',
		'@typescript-eslint/indent': ['error', 'tab'],
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/prefer-interface': 'off',
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',
	},
};
