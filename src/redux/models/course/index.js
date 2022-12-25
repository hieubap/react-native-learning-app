import courseProvider from '../../../data-access/course-provider';

export default {
  state: {
    listCourse: [],
    listCourseHome: [],
    total: 0,
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
    getListCourse: ({categoryId}) => {
      courseProvider.search({categoryId, page: 0, size: 50}).then(res => {
        if (res && res.code === 0) {
          dispatch.course.updateData({
            listCourse: res.data,
            total: res.totalElements,
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
