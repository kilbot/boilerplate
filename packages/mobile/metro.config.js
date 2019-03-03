const path = require('path');
const blacklist = require('metro-config/src/defaults/blacklist');

module.exports = {
  projectRoot: path.resolve(__dirname),
  watchFolders: [
    path.resolve(__dirname, '../../node_modules'),
    path.resolve(__dirname, '../common'),
  ],
  resolver: {
    blacklistRE: blacklist([/common\/node_modules\/react-native\/.*/]),
  },
};
