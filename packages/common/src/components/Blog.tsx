import React from 'react';
import { Text, FlatList } from 'react-native';
// import { FlatList } from 'react-navigation';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useObservableState } from 'observable-hooks';
// import useObservable from '../hooks/use-observable';
import Button from './helpers/Button';
import ListItem from './helpers/ListItem';
import styles from './helpers/styles';
import { extractId } from '../utils';

const NastyCommentsItem = ({ blog, onPress }) => (
	<ListItem
		title="Nasty comments"
		countObservable={blog.nastyComments.observeCount()}
		onPress={onPress}
	/>
);

const PostItem = ({ post, onPress }) => (
	<ListItem title={post.title} countObservable={post.comments.observeCount()} onPress={onPress} />
);

const Blog = () => {
	const navigation = useNavigation();
	const route = useRoute();
	const blog = route.params.blog;
	const posts = useObservableState(blog.posts.observe(), []);

	const moderate = async () => {
		await blog.moderateAll();
	};

	return (
		<FlatList
			data={posts}
			renderItem={({ item: post }) => (
				<PostItem post={post} key={post.id} onPress={() => navigation.navigate('Post', { post })} />
			)}
			ListHeaderComponent={() => (
				<>
					<Button style={styles.button} title="Moderate" onPress={moderate} />
					<NastyCommentsItem
						blog={blog}
						onPress={() => navigation.navigate('ModerationQueue', { blog })}
					/>
					<Text style={styles.postsListHeader}>Posts: {posts.length}</Text>
				</>
			)}
			keyExtractor={extractId}
		/>
	);
};

export default Blog;
