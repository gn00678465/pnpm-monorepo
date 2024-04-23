import { request } from '../core/request';
import { useAxios } from '@pnpm-monorepo/vue-axios';

export const { data, response, error } = useAxios<{ total: number; data: [] }>(
  { url: '', method: 'get' },
  request
);
