/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});
if (process.env.NODE_ENV !== "development") {
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
}
AppRegistry.registerComponent(appName, () => App);
