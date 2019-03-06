import React from 'react';
import { View, Text } from 'react-native';

// interface Props {
// 	navigation: import('react-navigation').NavigationScreenProp<{}, {}>;
// }

const SideBar = (...props: any) => {
	console.log(props);
	return (
		<View>
			<Text>Sidebar</Text>
		</View>
	);
};

export default SideBar;
