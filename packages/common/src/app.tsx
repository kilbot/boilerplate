import React, { useState, Fragment } from 'react';
import { View, Button, Text } from 'react-native';
import firebase, { FirebaseContext } from './lib/firebase';
import AuthService from './services/auth';
import Cats from './cats';

const auth = new AuthService();

const App = () => {
	const [user, setUser] = useState(null);

	const handleLogin = async () => {
		const user = await auth.login();
		// @ts-ignore
		setUser(user);
	};

	const handleLogout = async () => {
		setUser(null);
	};

	return (
		<FirebaseContext.Provider value={firebase}>
			<View
				style={{
					alignItems: 'center',
					justifyContent: 'center',
					flex: 1,
				}}
			>
				{user ? (
					<Fragment>
						<Cats />
						<Button title="Logout" onPress={handleLogout} />
					</Fragment>
				) : (
					<Fragment>
						<Text style={{ marginBottom: 20 }}>Login to see cats</Text>
						<Button title="Login" onPress={handleLogin} />
					</Fragment>
				)}
			</View>
		</FirebaseContext.Provider>
	);
};

export default App;
