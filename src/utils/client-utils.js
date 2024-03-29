import AsyncStorage from '@react-native-async-storage/async-storage';
import {refModal, _navigator} from '..';
import store from '../redux';
import {CommonActions} from '@react-navigation/native';

export default {
  auth: '',
  token: '',
  serverApi: 'http://14.225.205.222:8800',
  fileURL: 'http://14.225.205.222:8800/files/',
  updateURL() {
    // const domain = "http://14.225.205.222:8800"
    // const domain = "http://192.168.1.6:8800";
    // this.serverApi = domain;
    // this.fileURL = domain + '/files/';
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
              if (val.code !== 0) {
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
            const routeState = _navigator.getCurrentRoute();
            if (routeState.name !== 'Login') {
              _navigator.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [{name: 'Login'}],
                }),
              );
              this.auth = null;
              AsyncStorage.clear();
            }

            // _navigator.reset({
            //   index: 1,
            //   routes: [{name: 'Login'}],
            // });
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
                AsyncStorage.clear();
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
            AsyncStorage.clear();
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
