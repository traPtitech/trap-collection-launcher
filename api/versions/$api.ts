/* eslint-disable */
import { AspidaClient, BasicHeaders, dataToURLString } from 'aspida';
import { Methods as Methods0 } from '.';
import { Methods as Methods1 } from './_launcherVersionID@number';
import { Methods as Methods2 } from './_launcherVersionID@number/game';
import { Methods as Methods3 } from './_launcherVersionID@number/keys';
import { Methods as Methods4 } from './_launcherVersionID@number/seats';
import { Methods as Methods5 } from './check';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined
    ? 'https://collection.trap.jp/api'
    : baseURL
  ).replace(/\/$/, '');
  const PATH0 = '/versions';
  const PATH1 = '/game';
  const PATH2 = '/keys';
  const PATH3 = '/seats';
  const PATH4 = '/versions/check';
  const GET = 'GET';
  const POST = 'POST';

  return {
    _launcherVersionID: (val0: number) => {
      const prefix0 = `${PATH0}/${val0}`;

      return {
        game: {
          post: (option: { body: Methods2['post']['reqBody']; config?: T }) =>
            fetch<
              Methods2['post']['resBody'],
              BasicHeaders,
              Methods2['post']['status']
            >(prefix, `${prefix0}${PATH1}`, POST, option).json(),
          $post: (option: { body: Methods2['post']['reqBody']; config?: T }) =>
            fetch<
              Methods2['post']['resBody'],
              BasicHeaders,
              Methods2['post']['status']
            >(prefix, `${prefix0}${PATH1}`, POST, option)
              .json()
              .then((r) => r.body),
          $path: () => `${prefix}${prefix0}${PATH1}`,
        },
        keys: {
          get: (option?: { config?: T }) =>
            fetch<
              Methods3['get']['resBody'],
              BasicHeaders,
              Methods3['get']['status']
            >(prefix, `${prefix0}${PATH2}`, GET, option).json(),
          $get: (option?: { config?: T }) =>
            fetch<
              Methods3['get']['resBody'],
              BasicHeaders,
              Methods3['get']['status']
            >(prefix, `${prefix0}${PATH2}`, GET, option)
              .json()
              .then((r) => r.body),
          $path: () => `${prefix}${prefix0}${PATH2}`,
        },
        seats: {
          post: (option?: { config?: T }) =>
            fetch<
              Methods4['post']['resBody'],
              BasicHeaders,
              Methods4['post']['status']
            >(prefix, `${prefix0}${PATH3}`, POST, option).json(),
          $post: (option?: { config?: T }) =>
            fetch<
              Methods4['post']['resBody'],
              BasicHeaders,
              Methods4['post']['status']
            >(prefix, `${prefix0}${PATH3}`, POST, option)
              .json()
              .then((r) => r.body),
          $path: () => `${prefix}${prefix0}${PATH3}`,
        },
        get: (option?: { config?: T }) =>
          fetch<
            Methods1['get']['resBody'],
            BasicHeaders,
            Methods1['get']['status']
          >(prefix, prefix0, GET, option).json(),
        $get: (option?: { config?: T }) =>
          fetch<
            Methods1['get']['resBody'],
            BasicHeaders,
            Methods1['get']['status']
          >(prefix, prefix0, GET, option)
            .json()
            .then((r) => r.body),
        $path: () => `${prefix}${prefix0}`,
      };
    },
    check: {
      get: (option: { query: Methods5['get']['query']; config?: T }) =>
        fetch<
          Methods5['get']['resBody'],
          BasicHeaders,
          Methods5['get']['status']
        >(prefix, PATH4, GET, option).json(),
      $get: (option: { query: Methods5['get']['query']; config?: T }) =>
        fetch<
          Methods5['get']['resBody'],
          BasicHeaders,
          Methods5['get']['status']
        >(prefix, PATH4, GET, option)
          .json()
          .then((r) => r.body),
      $path: (option?: { method?: 'get'; query: Methods5['get']['query'] }) =>
        `${prefix}${PATH4}${
          option && option.query ? `?${dataToURLString(option.query)}` : ''
        }`,
    },
    post: (option: { body: Methods0['post']['reqBody']; config?: T }) =>
      fetch<
        Methods0['post']['resBody'],
        BasicHeaders,
        Methods0['post']['status']
      >(prefix, PATH0, POST, option).json(),
    $post: (option: { body: Methods0['post']['reqBody']; config?: T }) =>
      fetch<
        Methods0['post']['resBody'],
        BasicHeaders,
        Methods0['post']['status']
      >(prefix, PATH0, POST, option)
        .json()
        .then((r) => r.body),
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
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
