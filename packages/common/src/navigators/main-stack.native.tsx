import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Home from '../screens/home';
import Page from '../screens/page';
import Tabs from '../screens/tabs';
import Header from '../components/header';
import SideBar from '../components/sidebar';

export default createDrawerNavigator(
	{
		Home,
		Page,
		Tabs,
	},
	{
		initialRouteName: 'Home',
		contentComponent: (props: any) => <SideBar {...props} />,
	}
);
