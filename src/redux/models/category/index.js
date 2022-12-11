import categoryProvider from '../../../data-access/category-provider';

export default {
  state: {
    listCategory: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return {...state, ...payload};
    },
  },
  effects: dispatch => ({
    getListCategory: () => {
      console.log('category...');
      categoryProvider
        .search({page: 0, size: 500, sort: 'createdAt,asc'})
        .then(res => {
          console.log(res, 'res');
          if (res && res.code === 0) {
            dispatch.category.updateData({
              listCategory: res.data,
            });
          }
        });
    },
  }),
};
