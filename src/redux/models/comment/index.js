import commentProvider from '../../../data-access/comment-provider';

export default {
  state: {
    listComment: [1, 2, 3, 4],
  },
  reducers: {
    updateData(state, payload = {}) {
      return {...state, ...payload};
    },
  },
  effects: dispatch => ({
    submitComment: ({courseId}) => {
      commentProvider.post({courseId, sort: 'createdAt,asc'}).then(res => {
        if (res && res.code === 0) {
          dispatch.register.updateData({
            isRegister: true,
          });
        }
      });
    },
    getListComment: ({courseId}) => {
      commentProvider.search({courseId, size: 100}).then(res => {
        if (res && res.code === 0) {
          dispatch.comment.updateData({
            listComment: res.data,
          });
        }
      });
    },
  }),
};
