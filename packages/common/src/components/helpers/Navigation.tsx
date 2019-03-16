import React, { Fragment } from 'react';
import { createNavigator, StackRouter, SceneView } from '@react-navigation/core';
import { View } from 'react-native';
import Button from './Button';

import Root from '../Root';
import Blog from '../Blog';
import ModerationQueue from '../ModerationQueue';
import Post from '../Post';

type NavigationView = import('react-navigation').NavigationView<{}, {}>;

const StackView: NavigationView = ({ descriptors, navigation }) => {
	const activeKey = navigation.state.routes[navigation.state.index].key;
	const descriptor = descriptors[activeKey];
	console.log(descriptor.state.routeName);

	return (
		<Fragment>
			{descriptor.state.routeName !== 'Root' && (
				<View style={{ flexDirection: 'row', marginTop: 20 }}>
					<Button title="Back" onPress={() => descriptor.navigation.goBack()} />
				</View>
			)}
			<SceneView component={descriptor.getComponent()} navigation={descriptor.navigation} />
		</Fragment>
	);
};

export const createNavigation = props => {
	const { timeToLaunch } = props;
	return createNavigator(
		StackView,
		StackRouter(
			{
				Root: {
					screen: Root,
					path: '',
					navigationOptions: { title: 'Blogs' },
				},
				Blog: {
					screen: Blog,
					path: '',
					navigationOptions: ({ navigation }) => ({
						title: navigation.state.params.blog.name,
					}),
				},
				ModerationQueue: {
					screen: ModerationQueue,
					path: '',
					navigationOptions: { title: 'Moderation Queue' },
				},
				Post: {
					screen: Post,
					path: '',
					navigationOptions: ({ navigation }) => ({
						title: navigation.state.params.post.title,
					}),
				},
			},
			{}
		),
		{
			initialRouteName: 'Root',
			initialRouteParams: props,
		}
	);
};
