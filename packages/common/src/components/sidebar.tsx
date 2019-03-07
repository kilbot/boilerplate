import React from 'react';
import { View, Text, TouchableOpacity, ViewStyle } from 'react-native';

/**
 * Based on:
 * https://github.com/react-navigation/react-navigation-drawer/blob/master/src/views/DrawerNavigatorItems.js
 */
type Props = {
	activeItemKey: string;
	items: import('react-navigation').NavigationRoute[];
	onItemPress: (drawItem: import('react-navigation').DrawerItem) => void;
	drawerPosition?: 'left' | 'right';
	style: ViewStyle;
};

const SideBar = ({ activeItemKey, items, onItemPress, style }: Props) => {
	return (
		<View style={style}>
			{items.map((route, index) => {
				const focused = activeItemKey === route.key;
				return (
					<TouchableOpacity
						key={route.key}
						onPress={() => {
							onItemPress({ route, focused });
						}}
					>
						<Text>{route.routeName}</Text>
					</TouchableOpacity>
				);
			})}
		</View>
	);
};

export default SideBar;
