import chapterProvider from '../../../data-access/chapter-provider';
import registerProvider from '../../../data-access/register-provider';
import {Notifications} from 'react-native-notifications';
import {ToastAndroid} from 'react-native';

export default {
  state: {
    listChapter: [1, 2, 3, 4],
    isRegister: false,
    statusRegister: 0,
    registerId: null,
  },
  reducers: {
    updateData(state, payload = {}) {
      return {...state, ...payload};
    },
  },
  effects: dispatch => ({
    registerCourse: ({courseId, authorId, imgUrl, data}) => {
      registerProvider.post({courseId, authorId, imgUrl}).then(res => {
        if (res && res.code === 0) {
          dispatch.register.updateData({
            statusRegister: 1,
          });

          Notifications.postLocalNotification({
            title: data?.name,
            body: 'Đăng ký thành công, Vui lòng chờ duyệt',
          });
        }
      });
    },
    uploadRegister: (
      {courseId, authorId, imgUrl},
      {auth: {auth}, register: {registerId}},
    ) => {
      registerProvider
        .put({courseId, authorId, studentId: auth.userId, imgUrl}, registerId)
        .then(res => {
          if (res && res.code === 0) {
            ToastAndroid.show('Upload thành công', 1000);
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
            registerId: res.data.id,
            isRegister: !!res.data.id,
            statusRegister: res.data?.approve ? 2 : !!res.data.id ? 1 : 0,
          });
        }
      });
    },
  }),
};
