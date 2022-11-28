import chapterProvider from '../../../data-access/chapter-provider';
import registerProvider from '../../../data-access/register-provider';
import {Notifications} from 'react-native-notifications';

export default {
  state: {
    listChapter: [1, 2, 3, 4],
    isRegister: false,
  },
  reducers: {
    updateData(state, payload = {}) {
      return {...state, ...payload};
    },
  },
  effects: dispatch => ({
    registerCourse: ({courseId, data}) => {
      registerProvider
        .post({courseId, page: 0, size: 500, sort: 'createdAt,asc'})
        .then(res => {
          if (res && res.code === 0) {
            dispatch.register.updateData({
              isRegister: true,
            });
            

            Notifications.postLocalNotification({
              title: data?.name,
              body: 'Đăng ký thành công',
            });
          }
        });
    },
    getCheckRegister: ({courseId}) => {
      dispatch.register.updateData({
        isRegister: false,
      });
      registerProvider.checkRegister(courseId).then(res => {
        if (res && res.code === 0) {
          dispatch.register.updateData({
            isRegister: res.data,
          });
        }
      });
    },
  }),
};
