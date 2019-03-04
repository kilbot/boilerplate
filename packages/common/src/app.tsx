import React from 'react';
import { createStackNavigator, createDrawerNavigator, createAppContainer } from 'react-navigation';
import Home from './home';
import SideBar from './sidebar';

const Drawer = createDrawerNavigator(
	{ Home: { screen: Home } },
	{
		initialRouteName: 'Home',
		contentOptions: { activeTintColor: '#e91e63' },
		contentComponent: props => <SideBar {...props} />,
	}
);

const AppNavigator = createStackNavigator(
	{ Drawer: { screen: Drawer } },
	{ initialRouteName: 'Drawer', headerMode: 'none' }
);

export default createAppContainer(AppNavigator);
