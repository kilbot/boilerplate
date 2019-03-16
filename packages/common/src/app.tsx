import React, { createContext } from 'react';
import { NativeModules } from 'react-native';
import { Database } from '@nozbe/watermelondb';
import Adapter from './adapter';
import { mySchema } from './models/schema';
import Blog from './models/Blog';
import Post from './models/Post';
import Comment from './models/Comment';
import { createNavigation } from './components/helpers/Navigation';
import createNavigatorApp from './navigation';

const adapter = new Adapter({
	dbName: 'WatermelonDemo',
	schema: mySchema,
});

export const database = new Database({
	adapter,
	// @ts-ignore
	modelClasses: [Blog, Post, Comment],
});

export const DatabaseContext = createContext(database);
export const { Provider, Consumer } = DatabaseContext;

// const appStartedLaunchingAt = NativeModules.PerformancePlugin.appInitTimestamp;
// const timeToLaunch = new Date().getTime() - appStartedLaunchingAt;

const Navigation = createNavigation({ database, timeToLaunch: '' });

const RootNavigator = createNavigatorApp(Navigation);

const App = () => (
	<Provider value={database}>
		<RootNavigator />
	</Provider>
);

export default App;
