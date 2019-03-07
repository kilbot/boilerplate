import React, { Fragment, useState, useEffect } from 'react';
import { createNavigator, SceneView, NavigationActions } from '@react-navigation/core';
import DrawerRouter from 'react-navigation-drawer/dist/routers/DrawerRouter';
import { View } from 'react-native';
import Home from '../screens/home';
import Page from '../screens/page';
import Header from '../components/header';
import SideBar from '../components/sidebar';

type NavigationView = import('react-navigation').NavigationView<{}, {}>;
type DrawerItem = import('react-navigation').DrawerItem;

/**
 * react-navigation DrawerView is not compatible with web ... yet
 */
const DrawerView: NavigationView = ({ descriptors, navigation }) => {
	const activeKey = navigation.state.routes[navigation.state.index].key;
	const descriptor = descriptors[activeKey];
	const [open, setOpen] = useState(false);

	useEffect(() => {
		// @ts-ignore - TODO why not 'action'?
		const subscribe = navigation.addListener('action', event => {
			if (event.action.key !== navigation.state.key) {
				return;
			}
			switch (event.action.type) {
				case 'Navigation/OPEN_DRAWER':
					setOpen(true);
					break;
				case 'Navigation/CLOSE_DRAWER':
					setOpen(false);
					break;
				default:
					return;
			}
		});
		return () => {
			subscribe.remove();
		};
	}, [descriptor, navigation]);

	const handleItemPress = ({ route, focused }: DrawerItem) => {
		if (focused) {
			navigation.closeDrawer();
		} else {
			navigation.dispatch(NavigationActions.navigate({ routeName: route.routeName }));
			navigation.closeDrawer();
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
			{open && (
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
		},
		{}
	),
	{ initialRouteName: 'Home' }
);

export default AuthStack;
