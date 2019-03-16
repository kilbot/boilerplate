import React from 'react';
import { Text, View, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';
import useObservable from '../../hooks/use-observable';

import styles from './styles';

// We observe and render the counter in a separate component so that we don't have to wait for the database
// until we can render the component. You can also prefetch all data before displaying the list
const Counter = ({ observable }) => {
	const count = useObservable(observable, '');
	return count;
};

const isAndroid = Platform.OS === 'android';

type Props = {
	title: string;
	countObservable: any;
	onPress: () => void;
};

const ListItem = ({ title, countObservable, onPress }: Props) =>
	isAndroid ? (
		<TouchableNativeFeedback onPress={onPress}>
			<View style={styles.listItem}>
				<Text style={styles.listItemTitle} numberOfLines={1}>
					{title}
				</Text>
				<Text style={styles.listItemCounter}>
					<Counter observable={countObservable} />
				</Text>
			</View>
		</TouchableNativeFeedback>
	) : (
		<TouchableOpacity onPress={onPress} style={styles.listItem} activeOpacity={0.5}>
			<Text style={styles.listItemTitle} numberOfLines={1}>
				{title}
			</Text>
			<Text style={styles.listItemCounter}>
				<Counter observable={countObservable} />
			</Text>
		</TouchableOpacity>
	);

export default ListItem;
