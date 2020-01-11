import React from 'react';
import { View, Text, Button } from 'react-native';

type ParamListBase = import('@react-navigation/native').ParamListBase;
type Props = {
	navigation: import('@react-navigation/stack').StackNavigationProp<ParamListBase>;
};

export default function POSScreen({ navigation }: Props) {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>POS Screen</Text>
		</View>
	);
}
