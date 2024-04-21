/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref, shallowRef } from 'vue';
import type { Ref } from 'vue';
import type { AxiosResponse } from 'axios';
import type { UseAxiosOptions, UseAxiosReturn } from './types';

/**
 *
 * T = Response Type
 * U = request Parameters Type
 * @param request
 * @param options
 * @returns
 */
export const useAxios = function <T, P = any>(
  request: (arg?: P) => Promise<AxiosResponse<T, any>>,
  options: UseAxiosOptions<T> = {}
): UseAxiosReturn<T, P> {
  const {
    shallow = true,
    initialData,
    resetOnExecute = false,
    onError,
    onFinish,
    onSuccess
  } = options;

  const response = shallowRef<AxiosResponse<T>>();
  const data = (shallow ? shallowRef : ref)<T>(initialData!) as Ref<T>;
  const isFinished = ref(false);
  const isLoading = ref(false);
  const isAborted = ref(false);
  const error = shallowRef<unknown>();

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

  async function execute(
    _data?: P,
    options?: Pick<UseAxiosOptions<T>, 'onError' | 'onSuccess' | 'onFinish'>
  ) {
    loading(true);
    error.value = undefined;
    resetData();
    try {
      const res = await request(_data);
      response.value = res;
      data.value = res.data;
      options?.onSuccess ? options.onSuccess(res.data) : onSuccess?.(res.data);
    } catch (e) {
      error.value = e;
      options?.onError ? options.onError(e) : onError?.(e);
    } finally {
      options?.onFinish ? options.onFinish() : onFinish?.();
      loading(false);
    }
  }

  return { data, execute, isFinished, isLoading, error, isAborted, response };
};
