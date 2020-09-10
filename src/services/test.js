import { stringify } from 'qs';
import _ from 'lodash';
import request from '../utils/request';
import { ipConfig } from './config';

export const serverName = ipConfig.baseServerName();

const testGetUrl = `${serverName}/qms/v1/sampleInfo/page`; // 测试GET

const testPostUrl = 'qms/v1/sampleInfo/page'; // 测试POST

export const testGet = async params => {
  return request(`${ipConfig.url(`${testGetUrl}`)}?${stringify(params)}`, {
    method: 'GET',
  }).then(testGetFilter);
};

export const testPost = async params => {
  return request(`${ipConfig.url(testPostUrl)}`, {
    method: 'POST',
    body: params,
  }).then();
};

const testGetFilter = response => {
  const data = _.map(response.data, it => ({
    id: it.id,
    name: it.name,
  }));

  return {
    list: data,
  };
};
