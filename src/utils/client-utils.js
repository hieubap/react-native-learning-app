import {refModal, _navigator} from '..';
import store from '../redux';

export default {
  auth: '',
  token: '',
  serverApi: '',
  fileURL: '/files/',
  updateURL(domain) {
    this.serverApi = domain;
    this.fileURL = domain + '/files/';
  },
  requestApi(methodType, url, body, ignoreAuth) {
    return new Promise((resolve, reject) => {
      if (!body) body = {};
      if (methodType.toLowerCase() !== 'get') {
        body = JSON.stringify(body);
      }
      this.requestFetch(
        methodType,
        url && url.indexOf('http') === 0 ? url : url,
        ignoreAuth
          ? {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            }
          : {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + this.auth,
            },
        body,
      )
        .then(s => {
          s.json()
            .then(val => {
              console.log('response', val);
              if (val.code === 401) {
                _navigator.reset({
                  index: 1,
                  routes: [{name: 'Login'}],
                });
                // localStorage.clear();
                // window.location.href = "/auth/login";
              } else {
                console.log('showing..');
                refModal.current &&
                  refModal.current.show({
                    type: 'error',
                    content: val.message || val?.toString(),
                  });
              }
              resolve(val);
            })
            .catch(e => {
              reject(e);
            });
        })
        .catch(e => {
          if ('TypeError: Network request failed' === e.toString()) {
            refModal.current &&
              refModal.current.show({
                type: 'error',
                content:
                  'Không thể kết nối đến server.\n' +
                  store.getState().application?.notice,
              });
          } else if (e && e.status === 401) {
            _navigator.reset({
              index: 1,
              routes: [{name: 'Login'}],
            });
            // localStorage.clear();
            // window.location.href = "/auth/login";
          }
          reject(e);
        });
    });
  },
  requestFetch(methodType, url, headers, body) {
    return new Promise((resolve, reject) => {
      let fetchParam = {
        method: methodType,
        headers,
      };

      if (methodType.toLowerCase() !== 'get') {
        fetchParam.body = body;
      }

      console.log('request', this.serverApi + url, fetchParam);
      return fetch(this.serverApi + url, fetchParam)
        .then(json => {
          if (!json.ok) {
            reject(json);
          } else resolve(json);
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  upload(methodType, url, form) {
    return new Promise((resolve, reject) => {
      return this.requestFetch(
        methodType,
        url && url.indexOf('http') === 0 ? url : url,
        {
          Authorization: 'Bearer ' + this.auth,
        },
        form,
      )
        .then(s => {
          s.json()
            .then(val => {
              if (val.code === 401) {
                _navigator.reset({
                  index: 1,
                  routes: [{name: 'Login'}],
                });
                // localStorage.clear();
                // window.location.href = "/auth/login";
              }
              resolve(val);
            })
            .catch(e => {
              reject(e);
            });
        })
        .catch(e => {
          if (e && e.status === 401) {
            _navigator.reset({
              index: 1,
              routes: [{name: 'Login'}],
            });
            // localStorage.clear();
            // window.location.href = "/auth/login";
          }
          reject(e);
        });
    });
  },
};
