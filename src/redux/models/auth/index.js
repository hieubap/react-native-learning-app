import authProvider from '@data-access/auth-provider';
import clientUtils from '@utils/client-utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useNavigation} from '@react-navigation/native';
import {_navigator} from '../../..';
// import {toast} from 'react-toastify';

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */

// const dataInit = initStore();
export default {
  state: {
    auth: {},
  },
  reducers: {
    updateData(state, payload = {}) {
      return {...state, ...payload};
    },
  },
  effects: dispatch => ({
    initApp: () => {
      AsyncStorage.getItem('auth').then(res => {
        const auth = JSON.parse(res) || {};
        console.log(auth, 'console.log(AsyncStorage.getItem());');
        if (!!auth?.userId) {
          dispatch.auth.updateData({
            auth,
          });
          clientUtils.auth = auth.token;
        }
      });
    },
    onLogout: () => {
      dispatch.auth.updateData({auth: null});
      AsyncStorage.clear().then(() => {
        _navigator.reset({
          index: 1,
          routes: [{name: 'Login'}],
        });
      });
    },
    onLogin: (payload, {}) => {
      // if (!info?.ip) return;
      return new Promise((resolve, reject) => {
        authProvider
          .login({
            ...payload,
          })
          .then(res => {
            if (res && res.code === 0) {
              AsyncStorage.setItem('auth', JSON.stringify(res?.data));

              // toast.success('Đăng nhập thành công');
              dispatch.auth.updateData({auth: res.data});
              clientUtils.auth = res.data?.token;
              // setTimeout(() => {
              //   window.location.reload();
              // }, 5000);

              resolve(res);
            } else {
              // toast.error(res.message);
              reject(res);
            }
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    onRegister: (payload, state) => {
      return new Promise((resolve, reject) => {
        authProvider
          .register(payload)
          .then(res => {
            if (res && res.code === 0) {
              // toast.success(
              //   'Đăng ký thành công. Vui lòng đăng nhập vào hệ thống',
              // );
              resolve(res);
            } else {
              // toast.error(res.message);
              reject(res);
            }
          })
          .catch(reject);
      });
    },
    changeAvatar: (file, {auth: {auth}}) => {
      authProvider.changeAvatar(file).then(res => {
        if (res && res.code === 0) {
          dispatch.auth.updateData({
            auth: {...auth, avatar: res.data?.avatar},
          });
          AsyncStorage.setItem(
            'auth',
            JSON.stringify({...auth, avatar: res.data?.avatar}),
          );

          // toast.success('Đổi ảnh đại diện thành công');
        }
      });
    },
  }),
};
