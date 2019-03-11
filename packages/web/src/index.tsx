import { AppRegistry } from 'react-native-web';
import App from '@boilerplate/common/src/app';

import './index.css';

const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_DATABASE_URL,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	// messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

// register the app
AppRegistry.registerComponent('boilerplate', () => App);

AppRegistry.runApplication('boilerplate', {
	rootTag: document.getElementById('root'),
	firebaseConfig,
});
