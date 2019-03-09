import React from 'react';
import firebase, { FirebaseContext } from './firebase';
import Component from './component';

const App = () => (
	<FirebaseContext.Provider value={firebase}>
		<Component />
	</FirebaseContext.Provider>
);

export default App;
