import axios from 'axios';
import type {
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
  AxiosError,
  AxiosRequestConfig
} from 'axios';
import axiosRetry from 'axios-retry';
import { nanoid } from 'nanoid';
import {
  createAxiosConfig,
  createRetryOptions,
  createDefaultOptions
} from './options';
import { REQUEST_ID_KEY } from './constant';
import type { RequestOption } from './types';

function createCommonRequest<ResponseData = unknown>(
  axiosConfig?: CreateAxiosDefaults,
  options?: Partial<RequestOption<ResponseData>>
) {
  const opts = createDefaultOptions<ResponseData>(options);

  const _axiosConfig = createAxiosConfig(axiosConfig);
  const instance = axios.create(_axiosConfig);

  const abortControllerMap = new Map<string, AbortController>();

  // config axios retry
  const retryOptions = createRetryOptions(_axiosConfig);
  axiosRetry(instance, retryOptions);

  instance.interceptors.request.use((conf) => {
    const config: InternalAxiosRequestConfig = { ...conf };

    // set request id
    const requestId = nanoid();
    config.headers.set(REQUEST_ID_KEY, requestId);

    // config abort
    const abortController = new AbortController();
    config.signal = abortController.signal;
    abortControllerMap.set(requestId, abortController);

    // handle config by hook
    const handledConfig = opts.onRequest?.(config) || config;

    return handledConfig;
  });

  instance.interceptors.response.use(
    async (response) => {
      return Promise.resolve(response);
    },
    async (error: AxiosError<ResponseData>) => {
      await opts.onError(error);
      return Promise.reject(error);
    }
  );

  function cancelRequest(requestId: string) {
    const abortController = abortControllerMap.get(requestId);
    if (abortController) {
      abortController.abort();
      abortControllerMap.delete(requestId);
    }
  }

  function cancelAllRequest() {
    abortControllerMap.forEach((abortController) => {
      abortController.abort();
    });
    abortControllerMap.clear();
  }

  return {
    instance,
    cancelRequest,
    cancelAllRequest
  };
}

/**
 * create a request instance
 *
 * @param axiosConfig axios config
 * @param options request options
 */

export function createRequest<ResponseData = unknown>(
  axiosConfig?: CreateAxiosDefaults
) {
  const { instance, cancelRequest, cancelAllRequest } =
    createCommonRequest<ResponseData>(axiosConfig);

  const request = async function request<TR = unknown>(
    config: AxiosRequestConfig
  ) {
    const response: AxiosResponse<TR> = await instance(config);
    return response;
  };

  request.cancelRequest = cancelRequest;
  request.cancelAllRequest = cancelAllRequest;

  return request;
}
