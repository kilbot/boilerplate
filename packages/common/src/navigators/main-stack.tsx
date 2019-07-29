import React, { Fragment, useState } from 'react';
import { createNavigator, SceneView, NavigationActions } from '@react-navigation/core';
import DrawerRouter from 'react-navigation-drawer/lib/module/routers/DrawerRouter';
import { View } from 'react-native';
import Home from '../screens/home';
import Page from '../screens/page';
import TabStack from './tab-stack';
import Header from '../components/header';
import SideBar from '../components/sidebar';

type NavigationView = import('react-navigation').NavigationView<{}, {}>;
type DrawerItem = import('react-navigation').DrawerItem;

/**
 * react-navigation DrawerView is not compatible with web ... yet
 * based on:
 * https://github.com/react-navigation/react-navigation-drawer/blob/master/src/views/DrawerView.js
 */
const DrawerView: NavigationView = ({ descriptors, navigation }) => {
	const activeKey = navigation.state.routes[navigation.state.index].key;
	const descriptor = descriptors[activeKey];
	// @ts-ignore
	const { openId, closeId } = navigation.state;
	const [state, setState] = useState({ open: false, openId, closeId });

	if (state.openId !== openId) {
		setState({ open: true, openId: openId, closeId: state.closeId });
	}

	if (state.closeId !== closeId) {
		setState({ open: false, closeId: closeId, openId: state.openId });
	}

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
			{state.open && (
				<View
					style={{
						backgroundColor: 'rgba(00, 00, 00, 0.1)',
						position: 'absolute',
						top: 0,
						left: 0,
						display: 'flex',
						flexDirection: 'column',
						zIndex: 1000,
						height: '100%',
						width: '100%',
					}}
				>
					<SideBar
						activeItemKey={activeKey}
						items={navigation.state.routes}
						onItemPress={handleItemPress}
						style={{
							backgroundColor: '#FFFFFF',
							width: '300px',
							height: '100%',
							flex: 1,
						}}
					/>
				</View>
			)}
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
			Tabs: {
				screen: TabStack,
				// path: 'modal',
			},
		},
		{}
	),
	{ initialRouteName: 'Home' }
);

export default AuthStack;
