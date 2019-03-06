import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Home from '../screens/home';
import Page from '../screens/page';
import Header from '../components/header';
import SideBar from '../components/sidebar';

export default createDrawerNavigator(
	{
		Home: Home,
		Page: Page,
	},
	{
		initialRouteName: 'Home',
		contentComponent: (props: any) => <SideBar {...props} />,
	}
);
