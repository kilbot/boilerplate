import React, { createContext } from 'react';
import { NativeModules } from 'react-native';
import { Database } from '@nozbe/watermelondb';
import { NavigationContainer } from '@react-navigation/native';
import { Navigation } from './components/helpers/Navigation';
import Adapter from './adapter';
import { mySchema } from './models/schema';
import Blog from './models/Blog';
import Post from './models/Post';
import Comment from './models/Comment';

//
import 'react-native-gesture-handler';

const adapter = new Adapter({
	dbName: 'WatermelonDemo',
	schema: mySchema,
});

export const database = new Database({
	adapter,
	// @ts-ignore
	modelClasses: [Blog, Post, Comment],
	actionsEnabled: true,
});

export const DatabaseContext = createContext(database);
export const { Provider, Consumer } = DatabaseContext;

// const appStartedLaunchingAt = NativeModules.PerformancePlugin.appInitTimestamp;
// const timeToLaunch = new Date().getTime() - appStartedLaunchingAt;

const App = () => (
	<Provider value={database}>
		<NavigationContainer>
			<Navigation />
		</NavigationContainer>
	</Provider>
);

export default App;
