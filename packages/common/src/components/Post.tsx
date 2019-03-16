import React from 'react';
import { Text, FlatList } from 'react-native';
// import { FlatList } from 'react-navigation';
import useObservable from '../hooks/use-observable';
import useNavigation from '../hooks/use-navigation';

import Comment from './Comment';
import styles from './helpers/styles';
import prompt from './helpers/prompt';
import Button from './helpers/Button';
import { extractId } from '../utils';

const renderComment = ({ item }) => <Comment comment={item} key={item.id} />;

const Post = () => {
	const navigation = useNavigation();
	const post = navigation.getParam('post');
	const comments = useObservable(post.comments.observe(), []);

	const addComment = async () => {
		const comment = await prompt('Write a comment');
		await post.addComment(comment);
	};

	return (
		<FlatList
			style={styles.marginContainer}
			data={comments}
			renderItem={renderComment}
			ListHeaderComponent={() => (
				<>
					<Text style={styles.title}>{post.title}</Text>
					<Text style={styles.subtitle}>{post.subtitle}</Text>
					<Text style={styles.body}>{post.body}</Text>
					<Text style={styles.subtitle}>Comments ({comments.length})</Text>
				</>
			)}
			ListFooterComponent={() => (
				<Button style={styles.button} title="Add comment" onPress={addComment} />
			)}
			keyExtractor={extractId}
		/>
	);
};

export default Post;
