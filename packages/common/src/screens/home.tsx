import React from 'react';
import { View, Text, Button } from 'react-native';

type ParamListBase = import('@react-navigation/native').ParamListBase;
type Props = {
	navigation: import('@react-navigation/stack').StackNavigationProp<ParamListBase>;
};

export default function HomeScreen({ navigation }: Props) {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>Home Screen</Text>
			<Button
				title="Go to Details"
				onPress={() => navigation.navigate('Details', { itemId: 86, otherParam: 'some text' })}
			/>
		</View>
	);
}
