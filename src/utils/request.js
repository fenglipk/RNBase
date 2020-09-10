import { DeviceEventEmitter } from 'react-native';
import Storage from './storage';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

export const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errortext = codeMessage[response.status] || response.statusText;
  // console.warn(`请求错误 ${response.status}: ${response.url} \n ${errortext}`);
  const error = new Error(errortext);
  error.name = `${response.status}`;
  error.response = response;
  throw error;
};

export const checkResultCode = response => {

  if (response.resultCode === 0) {
    return response;
  }

  let errortext = '';
  let errorname = '';
  if (response.errorInfo) {
    errortext = response.errorInfo.description;
    errorname = response.errorInfo.errorMsg;
  } else if (response.message) {
    errortext = response.message;
    errorname = response.message;
  } else {
    errortext = response.action_message;
    errorname = response.resultMsg;
  }
  console.warn(response);
  const error = new Error(errortext);
  error.name = errorname;
  error.response = response;
  throw error;
};

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async (url, options) => {
  const defaultOptions = {
    credentials: 'include',
  };
  const newOptions = { ...defaultOptions, ...options };
  if (
    newOptions.method === 'POST'
    || newOptions.method === 'PUT'
    || newOptions.method === 'DELETE'
  ) {
    if (newOptions.body) {
      newOptions.body = JSON.stringify(newOptions.body);
    }
  }
  newOptions.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    token: global.__TOKEN_ACCESS__,
    ...newOptions.headers,
  };

  return fetch(url, newOptions)
    .then(checkStatus)
    .then(response => {
      if (newOptions.method === 'DELETE' || response.status === 204) {
        const textRsp = response.text();
        console.log(`${url}\n 请求头：${newOptions.body}\n返回数据:`, textRsp);
        return textRsp;
      }
      const jsonRsp = response.json();
      console.log(`${url}\n 请求头：${newOptions.body}\n 返回数据:`, jsonRsp);
      return jsonRsp;
    })
    .then(checkResultCode);
  // .catch(e => {
  //   if (e.name !== 'TypeError') {
  //     if (e.name === 401) {
  //       Storage.remove('token.access');
  //       global.navigation.navigate({ routeName: 'Login' });
  //       e.name = '用户没有权限，重新登录';
  //     }
  //     console.warn(url, e);
  //   } else {
  //     e.name = '网络异常';
  //   }
  //   Toast.info('e.name', 3);
  //   throw e;
  // });
};
