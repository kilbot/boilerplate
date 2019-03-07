import { createBottomTabNavigator } from 'react-navigation-tabs';
import Tab1 from '../screens/tab1';
import Tab2 from '../screens/tab2';

const TabStack = createBottomTabNavigator({
	Tab1,
	Tab2,
});

export default TabStack;
