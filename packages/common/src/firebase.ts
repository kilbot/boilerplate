import React from 'react';
import * as firebase from 'firebase/app';

const config = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_DATABASE_URL,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	// messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};
console.log(config);

const app = firebase.initializeApp(config);

const FirebaseContext = React.createContext(app);

export { app as default, FirebaseContext };
