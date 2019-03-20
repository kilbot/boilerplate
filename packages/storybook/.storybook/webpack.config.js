/**
 * From https://github.com/storybooks/storybook/issues/4739
 */
const path = require('path');

module.exports = async ({ config, mode }) => {
	// `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
	// You can change the configuration based on that.
	// 'PRODUCTION' is used when building the static version of storybook.

	config.module.rules.push({
		test: /\.(ts|tsx)$/,
		loader: 'babel-loader',
		options: {
			presets: ['module:metro-react-native-babel-preset'],
		},
	});

	//
	config.module.rules.push({
		test: /\.(js|jsx)$/,
		include: [
			// path.resolve(__dirname, '../../../', 'node_modules/react-native-vector-icons'),
			// path.resolve('node_modules/react-native-elements'),
			// path.resolve('node_modules/react-native-ratings'),
			// path.resolve('node_modules/react-native-status-bar-height'),
		],
		loader: 'babel-loader',
		options: {
			cacheDirectory: true,
			babelrc: false,
			// plugins: [['@babel/plugin-proposal-class-properties', { loose: false }]],
			// presets: ['module:metro-react-native-babel-preset'],
		},
	});

	//
	// config.module.rules.push({
	//   test: /\.(png|jpg|gif|ttf)$/,
	//   loader: 'file-loader',
	// });

	config.resolve.alias = config.resolve.alias || {};
	config.resolve.alias['react-native'] = 'react-native-web';

	config.resolve.extensions.push('.ts', '.tsx');

	// winston logging to file
	config.node = config.node || {};
	config.node.fs = 'empty';

	return config;
};
