/* eslint-disable */
import { AspidaClient, BasicHeaders, dataToURLString } from 'aspida';
import { Methods as Methods0 } from './callback';
import { Methods as Methods1 } from './generate/code';
import { Methods as Methods2 } from './logout';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined
    ? 'https://collection.trap.jp/api'
    : baseURL
  ).replace(/\/$/, '');
  const PATH0 = '/oauth2/callback';
  const PATH1 = '/oauth2/generate/code';
  const PATH2 = '/oauth2/logout';
  const GET = 'GET';
  const POST = 'POST';

  return {
    callback: {
      get: (option: { query: Methods0['get']['query']; config?: T }) =>
        fetch<void, BasicHeaders, Methods0['get']['status']>(
          prefix,
          PATH0,
          GET,
          option
        ).send(),
      $get: (option: { query: Methods0['get']['query']; config?: T }) =>
        fetch<void, BasicHeaders, Methods0['get']['status']>(
          prefix,
          PATH0,
          GET,
          option
        )
          .send()
          .then((r) => r.body),
      $path: (option?: { method?: 'get'; query: Methods0['get']['query'] }) =>
        `${prefix}${PATH0}${
          option && option.query ? `?${dataToURLString(option.query)}` : ''
        }`,
    },
    generate: {
      code: {
        get: (option?: { config?: T }) =>
          fetch<
            Methods1['get']['resBody'],
            BasicHeaders,
            Methods1['get']['status']
          >(prefix, PATH1, GET, option).json(),
        $get: (option?: { config?: T }) =>
          fetch<
            Methods1['get']['resBody'],
            BasicHeaders,
            Methods1['get']['status']
          >(prefix, PATH1, GET, option)
            .json()
            .then((r) => r.body),
        $path: () => `${prefix}${PATH1}`,
      },
    },
    logout: {
      post: (option?: { config?: T }) =>
        fetch<void, BasicHeaders, Methods2['post']['status']>(
          prefix,
          PATH2,
          POST,
          option
        ).send(),
      $post: (option?: { config?: T }) =>
        fetch<void, BasicHeaders, Methods2['post']['status']>(
          prefix,
          PATH2,
          POST,
          option
        )
          .send()
          .then((r) => r.body),
      $path: () => `${prefix}${PATH2}`,
    },
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
