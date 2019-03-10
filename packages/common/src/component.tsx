import React, { useEffect, useState } from 'react';
import useFirebase from './hooks/use-firebase';
import { View, Text, Button } from 'react-native';
import firebase, { auth, provider } from './firebase';
import { GoogleSignin } from 'react-native-google-signin';

const Component = () => {
	// const firebase = useFirebase();
	const [user, setUser] = useState(null);

	const handleLogin = async () => {
		try {
			// add any configuration settings here:
			await GoogleSignin.configure();

			const data = await GoogleSignin.signIn();

			// create a new firebase credential with the token
			const credential = firebase.auth.GoogleAuthProvider.credential(
				data.idToken,
				// @ts-ignore
				data.accessToken
			);
			// login with credential
			const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);

			console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()));
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<View
			style={{
				alignItems: 'center',
				justifyContent: 'center',
				flex: 1,
			}}
		>
			{user ? (
				<Button title="Logout" onPress={() => setUser(null)} />
			) : (
				<Button title="Login" onPress={handleLogin} />
			)}
		</View>
	);
};

export default Component;
