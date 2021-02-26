/* eslint-disable */
import { AspidaClient, BasicHeaders, dataToURLString } from 'aspida';
import { Methods as Methods0 } from './_gameID@string/file';
import { Methods as Methods1 } from './_gameID@string/url';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined
    ? 'https://collection.trap.jp/api'
    : baseURL
  ).replace(/\/$/, '');
  const PATH0 = '/games/asset';
  const PATH1 = '/file';
  const PATH2 = '/url';
  const GET = 'GET';
  const POST = 'POST';

  return {
    _gameID: (val0: string) => {
      const prefix0 = `${PATH0}/${val0}`;

      return {
        file: {
          post: (option: { body: Methods0['post']['reqBody']; config?: T }) =>
            fetch<
              Methods0['post']['resBody'],
              BasicHeaders,
              Methods0['post']['status']
            >(prefix, `${prefix0}${PATH1}`, POST, option, 'FormData').json(),
          $post: (option: { body: Methods0['post']['reqBody']; config?: T }) =>
            fetch<
              Methods0['post']['resBody'],
              BasicHeaders,
              Methods0['post']['status']
            >(prefix, `${prefix0}${PATH1}`, POST, option, 'FormData')
              .json()
              .then((r) => r.body),
          get: (option: { query: Methods0['get']['query']; config?: T }) =>
            fetch<void, BasicHeaders, Methods0['get']['status']>(
              prefix,
              `${prefix0}${PATH1}`,
              GET,
              option
            ).send(),
          $get: (option: { query: Methods0['get']['query']; config?: T }) =>
            fetch<void, BasicHeaders, Methods0['get']['status']>(
              prefix,
              `${prefix0}${PATH1}`,
              GET,
              option
            )
              .send()
              .then((r) => r.body),
          $path: (option?: {
            method?: 'get';
            query: Methods0['get']['query'];
          }) =>
            `${prefix}${prefix0}${PATH1}${
              option && option.query ? `?${dataToURLString(option.query)}` : ''
            }`,
        },
        url: {
          post: (option: { body: Methods1['post']['reqBody']; config?: T }) =>
            fetch<
              Methods1['post']['resBody'],
              BasicHeaders,
              Methods1['post']['status']
            >(prefix, `${prefix0}${PATH2}`, POST, option).json(),
          $post: (option: { body: Methods1['post']['reqBody']; config?: T }) =>
            fetch<
              Methods1['post']['resBody'],
              BasicHeaders,
              Methods1['post']['status']
            >(prefix, `${prefix0}${PATH2}`, POST, option)
              .json()
              .then((r) => r.body),
          get: (option?: { config?: T }) =>
            fetch<
              Methods1['get']['resBody'],
              BasicHeaders,
              Methods1['get']['status']
            >(prefix, `${prefix0}${PATH2}`, GET, option).text(),
          $get: (option?: { config?: T }) =>
            fetch<
              Methods1['get']['resBody'],
              BasicHeaders,
              Methods1['get']['status']
            >(prefix, `${prefix0}${PATH2}`, GET, option)
              .text()
              .then((r) => r.body),
          $path: () => `${prefix}${prefix0}${PATH2}`,
        },
      };
    },
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
