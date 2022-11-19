import courseProvider from '../../../data-access/course-provider';

export default {
  state: {
    listCourseHome: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return {...state, ...payload};
    },
  },
  effects: dispatch => ({
    getListHome: () => {
      courseProvider.search({page: 0, size: 10}).then(res => {
        console.log(res, 'res');
        if (res && res.code === 0) {
          dispatch.course.updateData({
            listCourseHome: res.data,
          });
        }
      });
    },
    searchCourse: ({name}) => {
      courseProvider.search({name, page: 0, size: 100}).then(res => {
        console.log(res, 'res');
        if (res && res.code === 0) {
          dispatch.course.updateData({
            listCourseSearch: res.data,
          });
        }
      });
    },
  }),
};
