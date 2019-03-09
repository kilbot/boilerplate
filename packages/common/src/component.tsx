import React, { useContext, useEffect } from 'react';
import { FirebaseContext } from './firebase';
import { View, Text } from 'react-native';

const Component = () => {
	const firebase = useContext(FirebaseContext);
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
