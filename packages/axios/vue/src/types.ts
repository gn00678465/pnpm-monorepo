import type { Ref, ShallowRef } from 'vue';
import type { AxiosResponse, AxiosInstance, AxiosRequestConfig } from 'axios';

export type UseAxiosInstance =
  | AxiosInstance
  | (<T, R, D>(config: AxiosRequestConfig<D>) => Promise<R>);

/**
 * request composable
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface UseAxiosOptions<T = any> {
  /**
   * Use shallowRef.
   *
   * @default true
   */
  shallow?: boolean;

  /**
   * Initial data to use
   */
  initialData?: T;

  /**
   * Sets the state to initialState before executing the promise.
   */
  resetOnExecute?: boolean;

  /**
   * Callback when error is caught.
   */
  onError?: (e: unknown) => void;

  /**
   * Callback when success is caught.
   */
  onSuccess?: (data: T) => void;

  /**
   * Callback when request is finished.
   */
  onFinish?: () => void;
}

export type UseAxiosReturn<T, R, D> = {
  /**
   * Axios Response
   */
  response: ShallowRef<AxiosResponse<T> | undefined>;
  data: Ref<T | undefined>;
  error: ShallowRef<unknown | undefined>;
  execute: (
    arg?: D,
    options?: Pick<UseAxiosOptions<T>, 'onError' | 'onSuccess' | 'onFinish'>
  ) => Promise<UseAxiosReturn<T, R, D>>;

  abort: (message?: string) => void;
  isFinished: Ref<boolean>;
  isLoading: Ref<boolean>;
  isCanceled: Ref<boolean>;
};
