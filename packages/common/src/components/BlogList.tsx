import React from 'react';
import { View } from 'react-native';
import { Q } from '@nozbe/watermelondb';
import useDatabase from '../hooks/use-database';
import useObservable from '../hooks/use-observable';
import useNavigation from '../hooks/use-navigation';
import ListItem from './helpers/ListItem';

const BlogItem = ({ blog, onPress }) => {
	return (
		<ListItem title={blog.name} countObservable={blog.posts.observeCount()} onPress={onPress} />
	);
};

const BlogList = ({ search }: { search: string }) => {
	const navigation = useNavigation();
	const database = useDatabase();

	const blogs = useObservable(
		database.collections
			.get('blogs')
			.query(Q.where('name', Q.like(`%${Q.sanitizeLikeString(search)}%`)))
			.observe(),
		[],
		[search]
	);

	return (
		<View>
			{blogs.length > 0 &&
				blogs.map(blog => (
					<BlogItem
						blog={blog}
						key={blog.id}
						onPress={() => {
							navigation.navigate('Blog', { blog });
						}}
					/>
				))}
		</View>
	);
};

export default BlogList;