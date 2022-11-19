import {API} from '@variable/api';
import clientUtils from '../utils/client-utils';
import baseProvider from './base-provider';

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  ...baseProvider(API.register),
  checkRegister(courseId) {
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi('get', API.register + '/check-register/' + courseId, {})
        .then(resolve)
        .catch(reject);
    });
  },
};
