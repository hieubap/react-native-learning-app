import {useRef} from 'react';
import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import {Notifications} from 'react-native-notifications';
const DEFAULT_CHANNEL = 'channel_learning_app';

function useNotification() {
  const channelId = useRef();

  const initNotification = () => {
    notifee.requestPermission();
    checkApplicationPermission();
  };

  const checkApplicationPermission = async () => {
    const authorizationStatus = await messaging().requestPermission();
    channelId.current = await notifee.createChannel({
      id: 'default',
      name: DEFAULT_CHANNEL,
    });

    if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
      console.log('User has notification permissions enabled.');
      messaging()
        .getToken()
        .then(res => {});

      messaging()
        .subscribeToTopic(DEFAULT_CHANNEL)
        .then(() => console.log('Subscribed to topic!'));
      messaging().onMessage(mess => {
        console.log('mess',mess.notification.body);
        localNotification({
          title: mess.notification.title,
          body: mess.notification.body,
        });
      });
    } else if (
      authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL
    ) {
      console.log('User has provisional notification permissions.');
    } else {
      console.log('User has notification permissions disabled');
    }
  };

  const localNotification = payload => {
    notifee.displayNotification({
      ...payload,
      android: {
        channelId: channelId.current,
        smallIcon: 'studemy_icon',
      },
    });
  };

  return {localNotification, initNotification};
}

export default useNotification;
