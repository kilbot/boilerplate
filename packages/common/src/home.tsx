import React from 'react';
import { View, Text, Button } from 'react-native';

interface Props {
	navigation: any;
}

const Home: React.FunctionComponent<Props> = ({ navigation }) => {
	return (
		<View>
			<Text>Home</Text>
			<Button onPress={() => navigation.openDrawer()} title="Open Drawer" />
		</View>
	);
};

export default Home;
