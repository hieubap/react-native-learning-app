import AsyncStorage from '@react-native-async-storage/async-storage';
import {_navigator} from '../../..';
export default {
  state: {
    notice: 'Vui lòng sử dụng app vào 19h - 23h các ngày',
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
  }),
};
