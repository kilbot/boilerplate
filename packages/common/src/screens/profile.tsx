import React from 'react';
import { View, Text, Button } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

type ParamListBase = import('@react-navigation/native').ParamListBase;
type Props = {
	navigation: import('@react-navigation/stack').StackNavigationProp<ParamListBase>;
};

function ProfileContent() {
	const navigation = useNavigation();

	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>Profile Screen</Text>
			<Button title="Go to Settings" onPress={() => navigation.navigate('Settings')} />
		</View>
	);
}

export default function Profile() {
	useFocusEffect(
		React.useCallback(() => {
			// Do something when the screen is focused

			return () => {
				// Do something when the screen is unfocused
				// Useful for cleanup functions
			};
		}, [])
	);

	return <ProfileContent />;
}
