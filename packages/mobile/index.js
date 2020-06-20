/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import { AppRegistry } from 'react-native';
import './pollfill';
import App from '@boilerplate/common/src/app';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
