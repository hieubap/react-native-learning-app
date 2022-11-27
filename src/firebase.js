// Import the functions you need from the SDKs you need
import firebaseApp from '@react-native-firebase/app';
import database from '@react-native-firebase/database';
import clientUtils from './utils/client-utils';
import store from './redux';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Initialize Firebase
if (!firebaseApp.apps.length) {
  firebaseApp.initializeApp(firebaseConfig);
}

// const db = database.getDatabase();

export default function () {
  database()
    .ref('learning_app')
    .child('config')
    .on('value', snapshot => {
      const data = snapshot.val();
      console.log(data, 'api');
      clientUtils.updateURL(data.api);
      const dataUpdate = {init: true};
      if (data.notice) {
        dataUpdate.notice = data.notice;
      }
      store.dispatch.application.updateData(dataUpdate);
    });
  //   return new Promise((resolve, reject) => {
  //     const starCountRef = database.ref('learning_app');
  //     const urlServer = child(starCountRef, 'urlServer');
  //     onValue(urlServer, snapshot => {

  //       resolve();
  //     });
  //   });
}
