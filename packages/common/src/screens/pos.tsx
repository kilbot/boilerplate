import React from 'react';
import { View, Text, Button } from 'react-native';
import { DataContext } from '../app';

type ParamListBase = import('@react-navigation/native').ParamListBase;
type Props = {
	navigation: import('@react-navigation/stack').StackNavigationProp<ParamListBase>;
};

export default function POSScreen({ navigation }: Props) {
	const { settings, setSettings } = React.useContext(DataContext);

	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>POS Screen</Text>
			<Text>Settings: {JSON.stringify(settings)}</Text>
			<Button title="Save Settings" onPress={() => setSettings({ foo: 'bar' })} />
		</View>
	);
}
