import * as React from 'react';
import AuthScreen from '../screens/auth';
import POSNavigator from './pos';
import SplashScreen from '../screens/splash';
import { createStackNavigator } from '@react-navigation/stack';
import { DataContext } from '../app';

type StackNavigatorProps = React.ComponentProps<typeof Stack.Navigator>;

export type AppNavigatorParams = {
	Auth: undefined;
	Home: undefined;
};

const Stack = createStackNavigator<AppNavigatorParams>();

const AppNavigator = (props: Partial<StackNavigatorProps>): React.ReactElement => {
	const { user, setUser } = React.useContext(DataContext);

	React.useEffect(() => {
		// init data while splash screen shown
		const timer = setTimeout(() => {
			setUser({
				authorised: false,
			});
		}, 1000);
		return () => {
			clearTimeout(timer);
		};
	}, [setUser]);

	return (
		<Stack.Navigator>
			{user === undefined ? (
				<Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
			) : user.authorised ? (
				<Stack.Screen name="POS" options={{ title: 'POS' }} component={POSNavigator} />
			) : (
				<Stack.Screen
					name="Auth"
					options={{ title: 'Connect', test: 'foo', headerShown: false }}
					component={AuthScreen}
				/>
			)}
		</Stack.Navigator>
	);
};

export default AppNavigator;
