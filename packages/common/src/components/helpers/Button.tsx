import React from 'react';
import { Button as RNButton, View } from 'react-native';

import styles from './styles';

type Props = {
	title: string;
	onPress: () => void;
};

const Button = ({ title, onPress }: Props) => (
	<View style={styles.button}>
		<RNButton title={title} onPress={onPress} color="#EC5B59" />
	</View>
);

export default Button;
