declare module '@react-navigation/web' {
	import { NavigationContainer } from 'react-navigation';
	function createBrowserApp(navigator: NavigationContainer): React.ComponentClass<null, null>;
}

declare module '@react-navigation/core';
declare module 'react-navigation-stack';
declare module 'react-navigation-drawer';