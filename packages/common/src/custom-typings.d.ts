declare module '@react-navigation/web' {
	import { NavigationContainer } from 'react-navigation';
	function createBrowserApp(navigator: NavigationContainer): React.ComponentClass<null, null>;
}

declare module '@react-navigation/core' {
	export {
		createNavigator,
		createSwitchNavigator,
		SceneView,
		NavigationActions,
		StackRouter,
		TabRouter,
	} from 'react-navigation';
}

declare module 'react-navigation-stack';
declare module 'react-navigation-drawer';
declare module 'react-navigation-tabs';

declare module 'react-navigation-drawer/dist/routers/DrawerRouter' {
	import {
		NavigationRouteConfigMap,
		NavigationRouter,
		NavigationParams,
		NavigationPathsConfig,
	} from 'react-navigation';

	interface NavigationDrawerRouterConfigBase {
		initialRouteName?: string;
		initialRouteParams?: NavigationParams;
		paths?: NavigationPathsConfig;
		order?: string[];
		backBehavior?: 'none' | 'initialRoute';
	}

	function DrawerRouter(
		routeConfigs: NavigationRouteConfigMap,
		config: NavigationDrawerRouterConfigBase
	): NavigationRouter<any, any>;

	export default DrawerRouter;
}
