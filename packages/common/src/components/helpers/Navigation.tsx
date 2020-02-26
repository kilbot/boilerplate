import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Button from './Button';

import Root from '../Root';
import Blog from '../Blog';
import ModerationQueue from '../ModerationQueue';
import Post from '../Post';

// type NavigationView = import('react-navigation').NavigationView<{}, {}>;

// const StackView: NavigationView = ({ descriptors, navigation }) => {
// 	const activeKey = navigation.state.routes[navigation.state.index].key;
// 	const descriptor = descriptors[activeKey];
// 	console.log(descriptor.state.routeName);

// 	return (
// 		<Fragment>
// 			{descriptor.state.routeName !== 'Root' && (
// 				<View style={{ flexDirection: 'row', marginTop: 20 }}>
// 					<Button title="Back" onPress={() => descriptor.navigation.goBack()} />
// 				</View>
// 			)}
// 			<SceneView component={descriptor.getComponent()} navigation={descriptor.navigation} />
// 		</Fragment>
// 	);
// };

export type AppNavigatorParams = {
	Root: undefined;
	Blog: undefined;
	ModerationQueue: undefined;
	Post: undefined;
};

const Stack = createStackNavigator<AppNavigatorParams>();

export const Navigation = props => {
	return (
		<Stack.Navigator initialRouteName="Root">
			<Stack.Screen name="Root" component={Root} />
			<Stack.Screen name="Blog" component={Blog} />
			<Stack.Screen name="ModerationQueue" component={ModerationQueue} />
			<Stack.Screen name="Post" component={Post} />
		</Stack.Navigator>
	);
};
