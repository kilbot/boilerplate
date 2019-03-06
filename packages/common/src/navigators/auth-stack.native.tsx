import { createStackNavigator } from 'react-navigation-stack';
import AuthScreen from '../screens/auth';
import AuthModal from '../screens/auth-modal';

const AuthStack = createStackNavigator(
	{
		Auth: AuthScreen,
		Modal: AuthModal,
	},
	{
		initialRouteName: 'Auth',
		headerMode: 'none',
	}
);

export default AuthStack;
