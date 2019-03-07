import React, { Fragment } from 'react';
import { createNavigator, SceneView, NavigationActions } from '@react-navigation/core';
import DrawerRouter from 'react-navigation-drawer/dist/routers/DrawerRouter';
import Home from '../screens/home';
import Page from '../screens/page';
import Header from '../components/header';
import SideBar from '../components/sidebar';

type NavigationView = import('react-navigation').NavigationView<{}, {}>;
type DrawerItem = import('react-navigation').DrawerItem;

const DrawerView: NavigationView = ({ descriptors, navigation }) => {
	const activeKey = navigation.state.routes[navigation.state.index].key;
	const descriptor = descriptors[activeKey];

	const handleItemPress = ({ route, focused }: DrawerItem) => {
		if (focused) {
			navigation.closeDrawer();
		} else {
			navigation.dispatch(NavigationActions.navigate({ routeName: route.routeName }));
		}
	};

	return (
		<Fragment>
			<Header navigation={descriptor.navigation} />
			<SceneView
				component={descriptor.getComponent()}
				navigation={descriptor.navigation}
				style={{ flex: 1 }}
			/>
			<SideBar
				activeItemKey={activeKey}
				items={navigation.state.routes}
				onItemPress={handleItemPress}
			/>
		</Fragment>
	);
};

const AuthStack = createNavigator(
	DrawerView,
	DrawerRouter(
		{
			Home: {
				screen: Home,
				// path: '',
			},
			Page: {
				screen: Page,
				// path: 'modal',
			},
		},
		{}
	),
	{ initialRouteName: 'Home' }
);

export default AuthStack;
