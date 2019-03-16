import React from 'react';
import { Text, FlatList } from 'react-native';
// import { FlatList } from 'react-navigation';
import useObservable from '../hooks/use-observable';
import useNavigation from '../hooks/use-navigation';

import Comment from './Comment';
import styles from './helpers/styles';
import { extractId } from '../utils';

const renderComment = ({ item }) => <Comment comment={item} key={item.id} />;

const ModerationQueue = () => {
	const navigation = useNavigation();
	const blog = navigation.getParam('blog');
	const nastyComments = useObservable(blog.nastyComments.observe(), []);

	return (
		<FlatList
			ListHeaderComponent={() => (
				<>
					<Text style={styles.title}>Moderation queue for {blog.name}</Text>
					<Text style={styles.subtitle}>Nasty comments ({nastyComments.length})</Text>
				</>
			)}
			data={nastyComments}
			renderItem={renderComment}
			keyExtractor={extractId}
		/>
	);
};

export default ModerationQueue;
