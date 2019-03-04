import React from 'react';
import { createNavigator, SwitchRouter, SceneView } from '@react-navigation/core';
import { createBrowserApp } from '@react-navigation/web';

import Home from './home';
import SideBar from './sidebar';

interface Props {
	descriptors: any;
	navigation: any;
}

const SideBarView: React.FunctionComponent<Props> = ({ descriptors, navigation }) => {
	const activeKey = navigation.state.routes[navigation.state.index].key;
	const descriptor = descriptors[activeKey];
	return (
		<div>
			<SideBar />
			<div>
				<SceneView component={descriptor.getComponent()} navigation={descriptor.navigation} />
			</div>
		</div>
	);
};

const AppNavigator = createNavigator(SideBarView, SwitchRouter({ Home: { screen: Home } }), {});

export default createBrowserApp(AppNavigator);
