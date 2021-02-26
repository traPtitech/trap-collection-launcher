/* eslint-disable */
import { AspidaClient, BasicHeaders } from 'aspida';
import { Methods as Methods0 } from './code';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined
    ? 'https://collection.trap.jp/api'
    : baseURL
  ).replace(/\/$/, '');
  const PATH0 = '/oauth2/generate/code';
  const GET = 'GET';

  return {
    code: {
      get: (option?: { config?: T }) =>
        fetch<
          Methods0['get']['resBody'],
          BasicHeaders,
          Methods0['get']['status']
        >(prefix, PATH0, GET, option).json(),
      $get: (option?: { config?: T }) =>
        fetch<
          Methods0['get']['resBody'],
          BasicHeaders,
          Methods0['get']['status']
        >(prefix, PATH0, GET, option)
          .json()
          .then((r) => r.body),
      $path: () => `${prefix}${PATH0}`,
    },
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
