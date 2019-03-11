declare module 'react-native-web' {
	export namespace AppRegistry {
		function registerComponent(appKey: string, getComponentFunc: ComponentProvider): string;
		function runApplication(appKey: string, appParameters: Object): void;
	}
}
