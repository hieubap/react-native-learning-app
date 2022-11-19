import chapterProvider from '../../../data-access/chapter-provider';

export default {
  state: {
    listChapter: [1, 2, 3, 4],
  },
  reducers: {
    updateData(state, payload = {}) {
      return {...state, ...payload};
    },
  },
  effects: dispatch => ({
    getListChapter: ({courseId}) => {
      chapterProvider.search({courseId, page: 0, size: 500, sort: "createdAt,asc"}).then(res => {
        console.log(res, 'res');
        if (res && res.code === 0) {
          dispatch.chapter.updateData({
            listChapter: res.data,
          });
        }
      });
    },
  }),
};
