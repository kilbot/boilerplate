import React from 'react';
import { Text, View } from 'react-native';

import styles from './helpers/styles';

const Comment = ({ comment }) => (
	<View style={styles.comment}>
		<Text>
			{comment.isNasty && '☹️ '}
			{comment.body}
		</Text>
	</View>
);

export default Comment;
