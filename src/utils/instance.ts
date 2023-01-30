import GlobalConfig from './globalConfigType';

declare global {
  interface Window {
    globalConfig: GlobalConfig;
  }
}
