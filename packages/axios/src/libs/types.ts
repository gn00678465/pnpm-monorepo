import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios';

export interface RequestOption<ResponseData = unknown> {
  onRequest: (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;
  onError: (error: AxiosError<ResponseData>) => void | Promise<void>;
}
