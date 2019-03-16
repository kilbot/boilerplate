import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

type Props = {
	navigation: import('react-navigation').NavigationScreenProp<{}, {}>;
};

const Home = ({ navigation }: Props) => {
	const [count, setCount] = useState(0);
	return (
		<View style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<View style={{ width: '50%', alignItems: 'center' }}>
				<Text style={{ fontSize: 18 }}>Home</Text>
				<Text style={{ fontSize: 18 }}>You clicked {count} times</Text>
				<Button title="Click me" onPress={() => setCount(count + 1)} />
			</View>
		</View>
	);
};

export default Home;
