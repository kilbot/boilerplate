import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Button from './Button';

import Root from '../Root';
import Blog from '../Blog';
import ModerationQueue from '../ModerationQueue';
import Post from '../Post';

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
			<Stack.Screen name="Root" component={Root} options={{ title: 'Blogs' }} />
			<Stack.Screen
				name="Blog"
				component={Blog}
				options={({ route }) => ({ title: route.params.blog.name })}
			/>
			<Stack.Screen
				name="ModerationQueue"
				component={ModerationQueue}
				options={{ title: 'Moderation Queue' }}
			/>
			<Stack.Screen
				name="Post"
				component={Post}
				options={({ route }) => ({
					title: route.params.post.title,
				})}
			/>
		</Stack.Navigator>
	);
};
