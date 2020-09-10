/**
 * Created by jianyijun on 2020/03/20.
 * 全局对象工具类
 */
import { Dimensions, Platform, StatusBar } from 'react-native';
// import { fileAddress } from '../netWork/index';

// 操作系统全局变量
if (Platform.OS === 'android') {
  global.__IOS__ = false;
  global.__ANDROID__ = true;
} else {
  global.__IOS__ = true;
  global.__ANDROID__ = false;
}
const X_WIDTH = 375;
const X_HEIGHT = 812;
const XR_WIDTH = 414;
const XR_HEIGHT = 896;
// UI设计图的宽度
const designWidth = 750;
// UI设计图的高度
const designHeight = 1334;

export const deviceWidth = Dimensions.get('window').width; // 设备的宽度
export const deviceHeight = Dimensions.get('window').height; // 设备的高度

export const unitWidth = deviceWidth / designWidth;
// 计算手机屏幕高度对应设计图高度的单位高度
export const unitHeight = deviceHeight / designHeight;

export const statusBarHeight = getStatusBarHeight();
// 标题栏的高度
export const titleHeight = unitWidth * 100 + statusBarHeight;

const _width = Dimensions.get('window').width;
const _height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';
global.ScreenWidth = _width < _height ? _width : _height;
global.ScreenHeight = _width < _height ? _height : _width;
global.px = _height / 1334; // 以1920*1080量化换算 接收设计人员的尺寸
global.IsIOS = isIOS;

/**
 *
 * @param {*} ldw
 */
export function reallySize(size) {
  // 真实长度
  return (_width / 375) * size;
}

export function getStatusBarHeight() {
  if (Platform.OS == 'android') return 0; // 状态栏高度
  if (isIPhoneX()) {
    return 44;
  }
  return 20;
}

export function isStrEmpty(obj) {
  return (
    obj == null
    || obj == undefined
    || obj == ''
    || obj == 'null'
    || obj == NaN
    || obj == 'undefined'
  );
} // 字符串

export function isArryEmpty(obj) {
  return obj.length == 0;
} // 数组

export function isJsonEmpty(obj) {
  if (obj == null) {
    return true;
  }
  const arr = Object.keys(obj);
  if (arr.length == 0) {
    return true;
  }
  return false;
} // json

export function checkPhone(phone) {
  if (!(/^1[3456789]\d{9}$/.test(phone))) {
    return false;
  }
  return true;
}

export function isIPhoneX() {
  return (
    Platform.OS === 'ios'
    && ((_height === X_HEIGHT && _width === X_WIDTH)
      || (_height === XR_HEIGHT && _width === XR_WIDTH))
  );
}

// export const uploadPic = async files => {
//   const formData = new FormData();
//   files.forEach(file => {
//     formData.append('multipartFile', file);
//   });
//   return fetch(`${fileAddress}fs/v1/fsfile/add`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'multipart/form-data;charset=utf-8'
//     },
//     body: formData
//   }).then(response => (
//     response.json()
//   )).then(response => {
//     const res = {
//       success: true,
//       data: response.data
//     };
//     return res;
//   })
//     .catch(error => {
//       console.warn(error);
//       const res = {
//         success: false,
//         error
//       };
//       return res;
//     });
// };
/**
 *
 * @param {*} ldw
 */
