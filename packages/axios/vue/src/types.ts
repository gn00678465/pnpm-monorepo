import type { Ref, ShallowRef } from 'vue';
import type { AxiosResponse } from 'axios';

/**
 * request composable
 */
export interface UseAxiosOptions<T> {
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

export type UseAxiosReturn<T, U> = {
  /**
   * Axios Response
   */
  response: ShallowRef<AxiosResponse<T> | undefined>;
  data: Ref<T | undefined>;
  execute: (
    arg?: U,
    options?: Pick<UseAxiosOptions<T>, 'onError' | 'onSuccess' | 'onFinish'>
  ) => Promise<void>;
  isFinished: Ref<boolean>;
  isLoading: Ref<boolean>;
  error: ShallowRef<unknown | undefined>;
  isAborted: Ref<boolean>;
};
