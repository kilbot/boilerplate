import React, { Fragment } from 'react';
import { createNavigator, SwitchRouter, SceneView } from '@react-navigation/core';
// @ts-ignore
import DrawerRouter from 'react-navigation-drawer/dist/routers/DrawerRouter';
import Home from '../screens/home';
import Page from '../screens/page';
import Header from '../components/header';
import SideBar from '../components/sidebar';

type NavigationView = import('react-navigation').NavigationView<{}, {}>;

const DrawerView: NavigationView = ({ descriptors, navigation }) => {
	const activeKey = navigation.state.routes[navigation.state.index].key;
	const descriptor = descriptors[activeKey];

	return (
		<Fragment>
			<Header navigation={descriptor.navigation} />
			<SceneView
				component={descriptor.getComponent()}
				navigation={descriptor.navigation}
				style={{ flex: 1 }}
			/>
			{/* <SideBar navigationState={navigation.state} /> */}
		</Fragment>
	);
};

const AuthStack = createNavigator(
	DrawerView,
	DrawerRouter({
		Home: {
			screen: Home,
			// path: '',
		},
		Page: {
			screen: Page,
			// path: 'modal',
		},
	}),
	{ initialRouteName: 'Home' }
);

export default AuthStack;
