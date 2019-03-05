import React from 'react';
import { View, Button, AsyncStorage } from 'react-native';

interface Props {
	navigation: import('react-navigation').NavigationScreenProp<{}, {}>;
}

const Home = ({ navigation }: Props) => {
	return (
		<View style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<View style={{ width: '50%', marginBottom: 20 }}>
				<Button
					title="Logout"
					onPress={async () => {
						await AsyncStorage.removeItem('userToken');
						navigation.navigate('LoadingScreen');
					}}
				/>
			</View>
			<View style={{ width: '50%' }}>
				<Button onPress={() => navigation.openDrawer()} title="Open Drawer" />
			</View>
		</View>
	);
};

export default Home;
