import { NativeModules } from 'react-native';

import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { createAppContainer } from 'react-navigation';

import { mySchema } from './models/schema';
import Blog from './models/Blog';
import Post from './models/Post';
import Comment from './models/Comment';

import { createNavigation } from './components/helpers/Navigation';

const adapter = new SQLiteAdapter({
	dbName: 'WatermelonDemo',
	schema: mySchema,
});

const database = new Database({
	adapter,
	// @ts-ignore
	modelClasses: [Blog, Post, Comment],
});

const appStartedLaunchingAt = NativeModules.PerformancePlugin.appInitTimestamp;
const timeToLaunch = new Date().getTime() - appStartedLaunchingAt;

const Navigation = createNavigation({ database, timeToLaunch });

export default createAppContainer(Navigation);
