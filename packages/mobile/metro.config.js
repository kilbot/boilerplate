const path = require('path');
const blacklist = require('metro-config/src/defaults/blacklist');

module.exports = {
	projectRoot: path.resolve(__dirname),
	watchFolders: [
		path.resolve(__dirname, '../../node_modules'),
		path.resolve(__dirname, '../common'),
	],
	resolver: {
		blacklistRE: blacklist([
			// prevent react-native conflict in project root or common directory
			new RegExp(path.resolve(__dirname, '../../node_modules/react-native') + '/.*'),
			new RegExp(path.resolve(__dirname, '../common/node_modules/react-native') + '/.*'),
		]),
		extraNodeModules: {
			'react-native': path.resolve(__dirname, 'node_modules/react-native'),
		},
	},
};
