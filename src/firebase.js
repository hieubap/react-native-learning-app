// Import the functions you need from the SDKs you need
import firebaseApp from '@react-native-firebase/app';
import database from '@react-native-firebase/database';
import clientUtils from './utils/client-utils';
import store from './redux';

const firebaseConfig = {
  apiKey: 'AIzaSyAtgb9tbS_NG3rVkLNsb6mIwL2EyhqDHX4',
  authDomain: 'connect-center-24b1e.firebaseapp.com',
  databaseURL: 'https://connect-center-24b1e-default-rtdb.firebaseio.com',
  projectId: 'connect-center-24b1e',
  storageBucket: 'connect-center-24b1e.appspot.com',
  messagingSenderId: '545436821194',
  appId: '1:545436821194:web:7f60f9b5c69271451ef633',
  measurementId: 'G-WZPVZPY9XQ',
};
if (!firebaseApp.apps.length) {
  firebaseApp.initializeApp(firebaseConfig);
}
export default function () {
  // store.dispatch.application.updateData({init: true});
  // database()
  //   .ref('learning_app')
  //   .child('config')
  //   .on('value', snapshot => {
  //     const data = snapshot.val();
  //     clientUtils.updateURL(data.api);
  //     const dataUpdate = {init: true};
  //     if (data.notice) {
  //       dataUpdate.notice = data.notice;
  //     }
  //     store.dispatch.application.updateData(dataUpdate);
  //   });
}
