import React, { useEffect, useState } from 'react';
import useFirebase from './hooks/use-firebase';
import { View, Text, Button } from 'react-native';
import { auth, provider } from './firebase';

const Component = () => {
	// const firebase = useFirebase();
	const [user, setUser] = useState(null);

	const handleLogin = () => {
		auth.signInWithPopup(provider).then((result: any) => {
			console.log(result.user);
			setUser(result.user);
		});
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
