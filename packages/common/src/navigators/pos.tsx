import React from 'react';
import { Button } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import POS from '../screens/pos';
import Orders from '../screens/orders';
import Customers from '../screens/customers';
import Support from '../screens/support';
import { DataContext } from '../app';

const Drawer = createDrawerNavigator();

export default function App({ navigation, route }) {
	const { setUser } = React.useContext(DataContext);

	navigation.setOptions({
		headerLeft: () => (
			<Button
				onPress={() => {
					navigation.toggleDrawer();
				}}
				title="Menu"
			/>
		),
		headerRight: () => (
			<Button
				onPress={() => {
					setUser({ authorised: false });
				}}
				title="Logout"
			/>
		),
	});

	return (
		<Drawer.Navigator initialRouteName="POS">
			<Drawer.Screen name="POS" component={POS} />
			<Drawer.Screen name="Orders" component={Orders} />
			<Drawer.Screen name="Customers" component={Customers} />
			<Drawer.Screen name="Support" component={Support} />
		</Drawer.Navigator>
	);
}
