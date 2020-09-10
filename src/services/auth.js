import JSEncrypt from 'jsencrypt';
import request from '../utils/request';
import { ipConfig } from './config';
import { appId } from '../../app.json';


const PATH = '/api-ms/authorize';

// 刷新验证码
const refreshSecurityUrl = '/api-ms/system/securityCode?appId=APP_RXSB&userCode=';

const RSA_PUBLICKEY = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCB/aF5+eAtsN4NZJikjc7XrG+KyUwOkNzZf4XYPDVGNXV7l+QL4lVB58VBZmAqj3YyCjKrjZ4u6q8BTVcKxgE7XVIbZ6br6H2RpT8qTRJaNiUYobH7hHtfdwb8TWuv0SKHaOapYID3Wx9fAhtXecz+3Ws2mNaWUdZCOSMwQ3k4QQIDAQAB';

const AuthCode = {
  clientAppId: appId,
  securityCode: '',
};

export const login = async params => {
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(RSA_PUBLICKEY);
  const password = encrypt.encrypt(params.password);
  const defaultParams = AuthCode;
  const newParams = { ...defaultParams, ...params, password };
  return request(`${ipConfig.url(PATH)}/login`, {
    method: 'POST',
    body: newParams,
  })
    .then(mapToken)
    .catch(error => {
      const token = {
        access: false,
        error,
      };
      return token;
    });
};

export const refreshSecurity = async (account) => request(`${ipConfig.url(refreshSecurityUrl)}${account}`, {
  method: 'GET',
}).then(response => {
  console.info(response);
  const res = {
    success: true,
    data: response,
  };
  return res;
}).catch(error => {
  const res = {
    success: false,
    error,
  };
  return res;
});

const mapToken = response => {
  const token = {
    access: response.access_token,
    refresh: response.refresh_token,
  };
  return token;
};
