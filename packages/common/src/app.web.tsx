// import { AppRegistry, NativeModules } from 'react-native';

import { Database } from '@nozbe/watermelondb';
import LokiJSAdapter from '@nozbe/watermelondb/adapters/lokijs';
import { createBrowserApp } from '@react-navigation/web';

import { mySchema } from './models/schema';
import Blog from './models/Blog';
import Post from './models/Post';
import Comment from './models/Comment';

import { createNavigation } from './components/helpers/Navigation';

const adapter = new LokiJSAdapter({
	dbName: 'WatermelonDemo',
	schema: mySchema,
});

const database = new Database({
	adapter,
	// @ts-ignore
	modelClasses: [Blog, Post, Comment],
});

// const appStartedLaunchingAt = NativeModules.PerformancePlugin.appInitTimestamp;
// const timeToLaunch = new Date().getTime() - appStartedLaunchingAt;

const Navigation = createNavigation({ database, timeToLaunch: '' });

export default createBrowserApp(Navigation);
