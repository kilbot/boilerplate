import React from 'react';
import { View, Text, Button } from 'react-native';

type ParamListBase = import('@react-navigation/native').ParamListBase;
type Props = {
	navigation: import('@react-navigation/stack').StackNavigationProp<ParamListBase>;
};

export default function SettingsScreen({ navigation }: Props) {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>Settings Screen</Text>
			<Button title="Go to Profile" onPress={() => navigation.navigate('Profile')} />
		</View>
	);
}
