const { override, babelInclude, addDecoratorsLegacy } = require('customize-cra');
const path = require('path');

const addWorkerLoader = () => config => {
	config.output.globalObject = 'this';
	config.module.rules.unshift({ test: /\.worker\.js$/, use: { loader: 'worker-loader' } });
	return config;
};

module.exports = override(
	addWorkerLoader(),
	addDecoratorsLegacy(),
	babelInclude([
		// tell Babel to include common files
		path.resolve('src'),
		path.resolve('../common/src'),
		path.resolve('../../node_modules/react-native-screens'),
		path.resolve('../../node_modules/react-native-reanimated'),
		path.resolve('../../node_modules/react-native-gesture-handler'),
	])
);
