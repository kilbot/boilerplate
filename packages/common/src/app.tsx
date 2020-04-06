/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { memo } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const App = () => {
	return (
		<View style={styles.container}>
			<Text>react native with web and typescript</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default memo(App);
