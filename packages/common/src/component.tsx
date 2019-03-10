import React, { useEffect } from 'react';
import useFirebase from './hooks/use-firebase';
import { View, Text } from 'react-native';

const Component = () => {
	const firebase = useFirebase();
	console.log(firebase);
	useEffect(() => {
		// const db = firebase.database();
		// console.log(db);
	}, [firebase]);

	return (
		<View>
			<Text>Hello World!</Text>
		</View>
	);
};

export default Component;
