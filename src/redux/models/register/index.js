import chapterProvider from '../../../data-access/chapter-provider';
import registerProvider from '../../../data-access/register-provider';
import {Notifications} from 'react-native-notifications';

export default {
  state: {
    listChapter: [1, 2, 3, 4],
    isRegister: false,
    statusRegister: 0,
  },
  reducers: {
    updateData(state, payload = {}) {
      return {...state, ...payload};
    },
  },
  effects: dispatch => ({
    registerCourse: ({courseId, imgUrl, data}) => {
      registerProvider.post({courseId, imgUrl}).then(res => {
        if (res && res.code === 0) {
          // dispatch.register.updateData({
          //   isRegister: true,
          // });

          Notifications.postLocalNotification({
            title: data?.name,
            body: 'Đăng ký thành công, Vui lòng chờ duyệt',
          });
        }
      });
    },
    getCheckRegister: ({courseId}) => {
      dispatch.register.updateData({
        isRegister: false,
        statusRegister: 0,
      });
      registerProvider.checkRegister(courseId).then(res => {
        if (res && res.code === 0) {
          dispatch.register.updateData({
            isRegister: res.data,
            statusRegister: res.data?.approve ? 2 : !!res.data ? 1 : 0,
          });
        }
      });
    },
  }),
};
