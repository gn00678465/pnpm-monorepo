import type { CreateAxiosDefaults } from 'axios';
import type { IAxiosRetryConfig } from 'axios-retry';
import type { RequestOption } from './types';

/**
 * 將 axios 預設的設定與傳入的設定合併
 * @param config
 * @returns
 */
export function createAxiosConfig(config?: Partial<CreateAxiosDefaults>) {
  const axiosConfig: CreateAxiosDefaults = {
    timeout: 10 * 1000,
    headers: {
      'Content-Type': 'application/json'
    }
  };

  Object.assign(axiosConfig, config);

  return axiosConfig;
}

/**
 * axios 重試設定
 * 使用 axios-retry
 * @param config
 * @returns
 */
export function createRetryOptions(config?: Partial<CreateAxiosDefaults>) {
  const retryConfig: IAxiosRetryConfig = {
    retries: 3
  };

  Object.assign(retryConfig, config);

  return retryConfig;
}

export function createDefaultOptions<ResponseData = unknown>(
  options?: Partial<RequestOption<ResponseData>>
) {
  const opts: RequestOption<ResponseData> = {
    onRequest: async (config) => config,
    onError: async () => {}
  };

  Object.assign(opts, options);

  return opts;
}
