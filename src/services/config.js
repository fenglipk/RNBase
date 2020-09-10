import { Storage } from '../utils';

const BasePath = '/gateway';

const defaultIPConfig = {
  scheme: 'http',
  host: 'quality.fangchenggang.cs2025.cn/',
  port: '1708',
};

class IPConfig {
  get host() {
    return global.IP_CONFIG && global.IP_CONFIG.HOST || defaultIPConfig.host;
  }

  get port() {
    return global.IP_CONFIG && global.IP_CONFIG.Port || defaultIPConfig.port;
  }

  get scheme() {
    return global.IP_CONFIG && global.IP_CONFIG.Scheme || defaultIPConfig.scheme;
  }

  get wsBashURL() {
    return `ws://${this.host}:${this.port}`;
  }

  get rootURL() {
    // return `${this.scheme}://${this.host}:${this.port}`;
    return `${this.scheme}://${this.host}`;
  }

  get baseURL() {
    // return `${this.rootURL}${BasePath}`;
    return `${this.rootURL}`;
  }

  save = async ({ host, port, scheme }) => {
    global.IP_CONFIG = {
      HOST: host,
      Port: port,
      Scheme: scheme,
    };
    console.warn('--------------');
    await Storage.set('ipConfig', global.IP_CONFIG);
    console.warn('===============');
  }

  baseServerName = () => '/api-pea-device';

  baseHejinServerName = () => '/api-product-control';

  url = (path) => `${this.baseURL}${path}`;

  wsUrl = (path) => `${this.wsBashURL}${path}`;
}

export const ipConfig = new IPConfig();
