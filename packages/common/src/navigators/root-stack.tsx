import { createSwitchNavigator } from '@react-navigation/core';
import Loading from '../screens/loading';
import AuthNavigator from './auth-stack';
import MainNavigator from './main-stack';

const RootStack = createSwitchNavigator(
	{
		LoadingScreen: {
			screen: Loading,
			// path: 'loading',
		},
		AuthStack: {
			screen: AuthNavigator,
			// path: 'auth',
		},
		MainStack: {
			screen: MainNavigator,
			// path: 'main',
		},
	},
	{
		initialRouteName: 'LoadingScreen',
	}
);

export default RootStack;
