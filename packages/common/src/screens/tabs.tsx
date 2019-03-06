import React from 'react';
import { View, Text } from 'react-native';

interface Props {
	navigation: import('react-navigation').NavigationScreenProp<{}, {}>;
}

const Tabs = ({ navigation }: Props) => {
	return (
		<View style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<View style={{ width: '50%' }}>
				<Text>Tabs</Text>
			</View>
		</View>
	);
};

export default Tabs;
