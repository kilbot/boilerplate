import { AppRegistry } from 'react-native-web';
import App from '@boilerplate/common/src/app';

import './index.css';

// register the app
AppRegistry.registerComponent('boilerplate', () => App);

AppRegistry.runApplication('boilerplate', {
	rootTag: document.getElementById('root'),
});
