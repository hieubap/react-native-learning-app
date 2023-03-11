import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import React, {createRef, useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import ModalConfirm from './components/ModalConfirm';
import Navigation from './navigation';
import store from './redux';
import messaging from '@react-native-firebase/messaging';
import {Notifications} from 'react-native-notifications';
import FilterModal from './screen/courseList/FilterModal';
import useNotification from './hook/useNotification';

export const _navigator = createNavigationContainerRef();
export const refModal = createRef();
export const refFilter = createRef();

export default function App() {
  const {initNotification} = useNotification();
  useEffect(() => {
    Notifications.registerRemoteNotifications();
    initNotification();
    checkApplicationPermission();
    notificationListening();


    // Notifications.events().registerNotificationReceivedForeground(
    //   (notification, completion) => {
    //     console.log(
    //       `Notification received in foreground: ${notification.title} : ${notification.body}`,
    //     );
    //     completion({alert: false, sound: false, badge: false});
    //   },
    // );

    // Notifications.events().registerNotificationOpened(
    //   (notification, completion) => {
    //     console.log(`Notification opened: ${notification.payload}`);
    //     completion();
    //   },
    // );
  }, []);
  const checkApplicationPermission = async () => {
    const authorizationStatus = await messaging().requestPermission();
    const enabled =
      authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('User has notification permissions enabled.');
      getFCMToken();
    }
  };

  const getFCMToken = async () => {
    await messaging()
      .getToken()
      .then(res => {
        console.log(res, 'token');
      });
  };

  const notificationListening = () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage?.notification,
      );
      // navigation.navigate(remoteMessage.data.type);
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage?.notification,
          );
        }
      });

    messaging().onMessage(mess => {
      console.log(mess);
      console.log('onMessage....');
      Notifications.postLocalNotification({
        title: mess.notification.title,
        body: mess.notification.body,
      });
    });
  };

  return (
    <Provider store={store}>
      <NavigationContainer ref={_navigator}>
        <SafeAreaProvider>
          <Navigation />

          <ModalConfirm ref={refModal} />
          <FilterModal ref={refFilter} />
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}
