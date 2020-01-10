import 'react-native-gesture-handler';

import * as React from 'react';
import { NavigationNativeContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/home';
import DetailsScreen from './screens/details';
import SettingsScreen from './screens/settings';
import ProfileScreen from './screens/profile';

type BottomTabParams = {
	First: undefined;
	Second: undefined;
};

type HomeStackParamList = {
	Home: undefined;
	Details: undefined;
};

type SettingsStackParamList = {
	Settings: undefined;
	Profile: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParams>();
const HomeStack = createStackNavigator<HomeStackParamList>();
const SettingsStack = createStackNavigator<SettingsStackParamList>();

// function App() {
// 	return (
// 		<NavigationNativeContainer>
// 			<Stack.Navigator initialRouteName="Home">
// 				<Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Overview' }} />
// 				<Stack.Screen name="Details" component={DetailsScreen} />
// 			</Stack.Navigator>
// 		</NavigationNativeContainer>
// 	);
// }

function App() {
	return (
		<NavigationNativeContainer>
			<Tab.Navigator>
				<Tab.Screen name="First">
					{() => (
						<SettingsStack.Navigator>
							<SettingsStack.Screen name="Settings" component={SettingsScreen} />
							<SettingsStack.Screen name="Profile" component={ProfileScreen} />
						</SettingsStack.Navigator>
					)}
				</Tab.Screen>
				<Tab.Screen name="Second">
					{() => (
						<HomeStack.Navigator>
							<HomeStack.Screen name="Home" component={HomeScreen} />
							<HomeStack.Screen name="Details" component={DetailsScreen} />
						</HomeStack.Navigator>
					)}
				</Tab.Screen>
			</Tab.Navigator>
		</NavigationNativeContainer>
	);
}

export default App;
