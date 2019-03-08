module.exports = {
	parser: '@typescript-eslint/parser',
	extends: ['plugin:@typescript-eslint/recommended', 'react-app', 'plugin:prettier/recommended'],
	plugins: ['@typescript-eslint', 'react', 'react-native'],
	rules: {
		indent: 'off',
		'@typescript-eslint/indent': ['error', 'tab'],
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/prefer-interface': 'off',
	},
};
