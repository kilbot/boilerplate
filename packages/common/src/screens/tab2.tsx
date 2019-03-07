import React from 'react';
import { View, Text } from 'react-native';

type Props = {
	navigation: import('react-navigation').NavigationScreenProp<{}, {}>;
};

const Tab2 = ({ navigation }: Props) => {
	return (
		<View style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<View style={{ width: '50%', alignItems: 'center' }}>
				<Text style={{ fontSize: 18 }}>Tab 2</Text>
			</View>
		</View>
	);
};

export default Tab2;
