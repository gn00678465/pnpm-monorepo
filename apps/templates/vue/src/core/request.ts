import { createRequest } from '@pnpm-monorepo/axios';

export const request = createRequest({
  baseURL: '',
  withCredentials: true
});
