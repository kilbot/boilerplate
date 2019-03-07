import React, { Fragment } from 'react';
import { createNavigator, SceneView, TabRouter } from '@react-navigation/core';
import { Text, View } from 'react-native';
import Tab1 from '../screens/tab1';
import Tab2 from '../screens/tab2';

type NavigationView = import('react-navigation').NavigationView<{}, {}>;

/**
 *
 */
const TabView: NavigationView = ({ descriptors, navigation }) => {
	const activeKey = navigation.state.routes[navigation.state.index].key;
	const descriptor = descriptors[activeKey];
	console.log(navigation);
	return (
		<Fragment>
			<SceneView component={descriptor.getComponent()} navigation={descriptor.navigation} />
			<View style={{ display: 'flex', flexDirection: 'row' }}>
				{navigation.state.routes.map((route, index) => (
					<Text key={route.key} style={{ flex: 1 }}>
						{route.routeName}
					</Text>
				))}
			</View>
		</Fragment>
	);
};

const TabStack = createNavigator(
	TabView,
	TabRouter(
		{
			Tab1,
			Tab2,
		},
		{}
	),
	{}
);

export default TabStack;
