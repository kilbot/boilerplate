import React from 'react';
import { View, Text, Button } from 'react-native';

type ParamListBase = import('@react-navigation/native').ParamListBase;
type Props = {
	route: import('@react-navigation/core').RouteProp;
	navigation: import('@react-navigation/stack').StackNavigationProp<ParamListBase>;
};

export default function DetailsScreen({ route, navigation }: Props) {
	const { itemId, otherParam } = route.params;
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>Details Screen</Text>
			<Text>itemId: {JSON.stringify(itemId)}</Text>
			<Text>otherParam: {JSON.stringify(otherParam)}</Text>
			<Button
				title="Go to Details... again"
				onPress={() =>
					navigation.push('Details', {
						itemId: Math.floor(Math.random() * 100),
					})
				}
			/>
			<Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
			<Button title="Go back" onPress={() => navigation.goBack()} />
			<Button title="Pop to first screen in stack" onPress={() => navigation.popToTop()} />
		</View>
	);
}
