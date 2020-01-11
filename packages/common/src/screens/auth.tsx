import React from 'react';
import { View, Text, Button } from 'react-native';
import { DataContext } from '../app';

export default function AuthScreen() {
	const { setUser } = React.useContext(DataContext);

	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>Auth Screen</Text>
			<Button title="Login" onPress={() => setUser({ name: 'Bob', authorised: true })} />
		</View>
	);
}
