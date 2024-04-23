/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref, shallowRef } from 'vue';
import type { Ref } from 'vue';
import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';
import { until, noop } from '@vueuse/shared';
import type {
  UseAxiosOptions,
  UseAxiosReturn,
  UseAxiosInstance
} from './types';

export function useAxios<T = any, R = AxiosResponse<T>, D = any>(
  config?: AxiosRequestConfig<D>,
  options?: UseAxiosOptions
): UseAxiosReturn<T, R, D>;
export function useAxios<T = any, R = AxiosResponse<T>, D = any>(
  instance?: UseAxiosInstance,
  options?: UseAxiosOptions
): UseAxiosReturn<T, R, D>;
export function useAxios<T = any, R = AxiosResponse<T>, D = any>(
  config?: AxiosRequestConfig<D>,
  instance?: UseAxiosInstance,
  options?: UseAxiosOptions
): UseAxiosReturn<T, R, D>;
/**
 * Wrapper for axios.
 *
 */
export function useAxios<T = any, R = AxiosResponse<T>, D = any>(
  ...args: any[]
): UseAxiosReturn<T, R, D> {
  const defaultOptions: UseAxiosOptions<T> = {
    shallow: true
  };
  let defaultConfig: AxiosRequestConfig<D> = {};
  let instance: AxiosInstance = axios;
  let options: UseAxiosOptions<T> = defaultOptions;

  const isAxiosInstance = (val: any) => !!val?.request;

  if (args.length > 0) {
    if (isAxiosInstance(args[0])) instance = args[0];
    else defaultConfig = args[0];
  }

  if (args.length > 1) {
    if (isAxiosInstance(args[1])) instance = args[1];
  }

  if (args.length === 3) options = args[args.length - 1] || defaultOptions;

  const {
    shallow,
    initialData,
    resetOnExecute = false,
    onError = noop,
    onFinish,
    onSuccess = noop
  } = options;

  const response = shallowRef<AxiosResponse<T>>();
  const data = (shallow ? shallowRef : ref)<T>(initialData!) as Ref<T>;
  const isFinished = ref(false);
  const isLoading = ref(false);
  const isAborted = ref(false);
  const error = shallowRef<unknown>();

  let abortController: AbortController = new AbortController();

  const abort = (message?: string) => {
    if (isFinished.value || !isLoading.value) return;
    abortController.abort(message);
    abortController = new AbortController();
    isAborted.value = true;
    isLoading.value = false;
    isFinished.value = false;
  };

  /**
   * Reset data to initialData
   */
  const resetData = () => {
    if (resetOnExecute) data.value = initialData!;
  };

  const loading = (loading: boolean) => {
    isLoading.value = loading;
    isFinished.value = !loading;
  };

  const waitUntilFinished = () =>
    new Promise<UseAxiosReturn<T, R, D>>((resolve, reject) => {
      until(isFinished)
        .toBe(true)
        .then(() => (error.value ? reject(error.value) : resolve(result)));
    });

  const promise = {
    then: (...args) => waitUntilFinished().then(...args),
    catch: (...args) => waitUntilFinished().catch(...args)
  } as Promise<UseAxiosReturn<T, R, D>>;

  async function execute(
    _data?: D,
    options?: Pick<UseAxiosOptions<T>, 'onError' | 'onSuccess' | 'onFinish'> & {
      config?: AxiosRequestConfig;
    }
  ) {
    error.value = undefined;

    resetData();

    abort();

    loading(true);
    isAborted.value = false;

    instance(
      _data
        ? { ...defaultConfig, data: _data, signal: abortController.signal }
        : { ...defaultConfig, signal: abortController.signal }
    )
      .then((res) => {
        if (isAborted.value) return;
        response.value = res;
        data.value = res.data;
        onSuccess(res.data);
      })
      .catch((e) => {
        error.value = e;
        onError(e);
      })
      .finally(() => {
        options?.onFinish ? options.onFinish() : onFinish?.();
        loading(false);
      });
    return promise;
  }

  const result = {
    // data
    response,
    data,
    error,
    // methods
    execute,
    abort,
    // status
    isFinished,
    isLoading,
    isCanceled: isAborted
  };

  return { ...result };
}
