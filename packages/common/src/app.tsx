import 'react-native-gesture-handler';

import React from 'react';
import { NavigationNativeContainer } from '@react-navigation/native';
import AppNavigator from './navigators/app';

export const DataContext = React.createContext({
	user: undefined,
	setUser: undefined,
	settings: undefined,
	setSettings: undefined,
});

const App = () => {
	const [user, setUser] = React.useState();
	const [settings, setSettings] = React.useState();

	return (
		<DataContext.Provider value={{ user, setUser, settings, setSettings }}>
			<NavigationNativeContainer>
				<AppNavigator />
			</NavigationNativeContainer>
		</DataContext.Provider>
	);
};

export default App;
