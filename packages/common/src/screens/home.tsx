import React from 'react';
import { View, Button } from 'react-native';

interface Props {
	navigation: import('react-navigation').NavigationScreenProp<{}, {}>;
}

const Home = ({ navigation }: Props) => {
	console.log('home render');
	return (
		<View style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<View style={{ width: '50%' }}>
				<Button onPress={() => navigation.openDrawer()} title="Open Drawer" />
			</View>
		</View>
	);
};

export default Home;
