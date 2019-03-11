import React from 'react';
import { createNavigator, StackRouter, SceneView } from '@react-navigation/core';

import Root from '../Root';
import Blog from '../Blog';
import ModerationQueue from '../ModerationQueue';
import Post from '../Post';

type NavigationView = import('react-navigation').NavigationView<{}, {}>;

const View: NavigationView = ({ descriptors, navigation }) => {
	const activeKey = navigation.state.routes[navigation.state.index].key;
	const descriptor = descriptors[activeKey];
	return <SceneView component={descriptor.getComponent()} navigation={descriptor.navigation} />;
};

export const createNavigation = props => {
	const { database, timeToLaunch } = props;
	return createNavigator(
		View,
		StackRouter(
			{
				Root: {
					// We have to use a little wrapper because React Navigation doesn't pass simple props (and withObservables needs that)
					screen: ({ navigation }) => {
						// const { database, timeToLaunch } = navigation.state.params;
						return <Root database={database} timeToLaunch={timeToLaunch} navigation={navigation} />;
					},
					navigationOptions: { title: 'Blogs' },
				},
				Blog: {
					screen: ({ navigation }) => (
						<Blog blog={navigation.state.params.blog} navigation={navigation} />
					),
					navigationOptions: ({ navigation }) => ({
						title: navigation.state.params.blog.name,
					}),
				},
				ModerationQueue: {
					screen: ({ navigation }) => <ModerationQueue blog={navigation.state.params.blog} />,
					navigationOptions: { title: 'Moderation Queue' },
				},
				Post: {
					screen: ({ navigation }) => <Post post={navigation.state.params.post} />,
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
