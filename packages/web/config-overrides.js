const { override, babelInclude, addWebpackResolve, setWebpackTarget } = require('customize-cra');
const path = require('path');

module.exports = override(
	babelInclude([
		// tell Babel to include common files
		path.resolve('src'),
		path.resolve('../common/src'),
	]),
	// note: we're using web build process for desktop
	process.env.PLATFORM === 'electron' &&
		addWebpackResolve({
			extensions: [
				'.electron.js',
				'.electron.ts',
				'.electron.tsx',
				'.web.mjs',
				'.mjs',
				'.web.js',
				'.js',
				'.web.ts',
				'.ts',
				'.web.tsx',
				'.tsx',
				'.json',
				'.web.jsx',
				'.jsx',
			],
		})
	// process.env.PLATFORM === 'electron' && setWebpackTarget('electron-renderer')
);
