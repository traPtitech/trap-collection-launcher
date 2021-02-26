/* eslint-disable */
import { AspidaClient, BasicHeaders, dataToURLString } from 'aspida';
import { Methods as Methods0 } from '.';
import { Methods as Methods1 } from './_gameID@string';
import { Methods as Methods2 } from './_gameID@string/image';
import { Methods as Methods3 } from './_gameID@string/info';
import { Methods as Methods4 } from './_gameID@string/maintainers';
import { Methods as Methods5 } from './_gameID@string/version';
import { Methods as Methods6 } from './_gameID@string/video';
import { Methods as Methods7 } from './asset/_gameID@string/file';
import { Methods as Methods8 } from './asset/_gameID@string/url';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined
    ? 'https://collection.trap.jp/api'
    : baseURL
  ).replace(/\/$/, '');
  const PATH0 = '/games';
  const PATH1 = '/image';
  const PATH2 = '/info';
  const PATH3 = '/maintainers';
  const PATH4 = '/version';
  const PATH5 = '/video';
  const PATH6 = '/games/asset';
  const PATH7 = '/file';
  const PATH8 = '/url';
  const GET = 'GET';
  const POST = 'POST';
  const PUT = 'PUT';
  const DELETE = 'DELETE';

  return {
    _gameID: (val0: string) => {
      const prefix0 = `${PATH0}/${val0}`;

      return {
        image: {
          post: (option: { body: Methods2['post']['reqBody']; config?: T }) =>
            fetch<void, BasicHeaders, Methods2['post']['status']>(
              prefix,
              `${prefix0}${PATH1}`,
              POST,
              option,
              'FormData'
            ).send(),
          $post: (option: { body: Methods2['post']['reqBody']; config?: T }) =>
            fetch<void, BasicHeaders, Methods2['post']['status']>(
              prefix,
              `${prefix0}${PATH1}`,
              POST,
              option,
              'FormData'
            )
              .send()
              .then((r) => r.body),
          get: (option?: { config?: T }) =>
            fetch<void, BasicHeaders, Methods2['get']['status']>(
              prefix,
              `${prefix0}${PATH1}`,
              GET,
              option
            ).send(),
          $get: (option?: { config?: T }) =>
            fetch<void, BasicHeaders, Methods2['get']['status']>(
              prefix,
              `${prefix0}${PATH1}`,
              GET,
              option
            )
              .send()
              .then((r) => r.body),
          $path: () => `${prefix}${prefix0}${PATH1}`,
        },
        info: {
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
          put: (option: { body: Methods3['put']['reqBody']; config?: T }) =>
            fetch<
              Methods3['put']['resBody'],
              BasicHeaders,
              Methods3['put']['status']
            >(prefix, `${prefix0}${PATH2}`, PUT, option).json(),
          $put: (option: { body: Methods3['put']['reqBody']; config?: T }) =>
            fetch<
              Methods3['put']['resBody'],
              BasicHeaders,
              Methods3['put']['status']
            >(prefix, `${prefix0}${PATH2}`, PUT, option)
              .json()
              .then((r) => r.body),
          $path: () => `${prefix}${prefix0}${PATH2}`,
        },
        maintainers: {
          post: (option: { body: Methods4['post']['reqBody']; config?: T }) =>
            fetch<void, BasicHeaders, Methods4['post']['status']>(
              prefix,
              `${prefix0}${PATH3}`,
              POST,
              option
            ).send(),
          $post: (option: { body: Methods4['post']['reqBody']; config?: T }) =>
            fetch<void, BasicHeaders, Methods4['post']['status']>(
              prefix,
              `${prefix0}${PATH3}`,
              POST,
              option
            )
              .send()
              .then((r) => r.body),
          get: (option?: { config?: T }) =>
            fetch<
              Methods4['get']['resBody'],
              BasicHeaders,
              Methods4['get']['status']
            >(prefix, `${prefix0}${PATH3}`, GET, option).json(),
          $get: (option?: { config?: T }) =>
            fetch<
              Methods4['get']['resBody'],
              BasicHeaders,
              Methods4['get']['status']
            >(prefix, `${prefix0}${PATH3}`, GET, option)
              .json()
              .then((r) => r.body),
          $path: () => `${prefix}${prefix0}${PATH3}`,
        },
        version: {
          post: (option: { body: Methods5['post']['reqBody']; config?: T }) =>
            fetch<
              Methods5['post']['resBody'],
              BasicHeaders,
              Methods5['post']['status']
            >(prefix, `${prefix0}${PATH4}`, POST, option).json(),
          $post: (option: { body: Methods5['post']['reqBody']; config?: T }) =>
            fetch<
              Methods5['post']['resBody'],
              BasicHeaders,
              Methods5['post']['status']
            >(prefix, `${prefix0}${PATH4}`, POST, option)
              .json()
              .then((r) => r.body),
          get: (option?: { config?: T }) =>
            fetch<
              Methods5['get']['resBody'],
              BasicHeaders,
              Methods5['get']['status']
            >(prefix, `${prefix0}${PATH4}`, GET, option).json(),
          $get: (option?: { config?: T }) =>
            fetch<
              Methods5['get']['resBody'],
              BasicHeaders,
              Methods5['get']['status']
            >(prefix, `${prefix0}${PATH4}`, GET, option)
              .json()
              .then((r) => r.body),
          $path: () => `${prefix}${prefix0}${PATH4}`,
        },
        video: {
          post: (option: { body: Methods6['post']['reqBody']; config?: T }) =>
            fetch<void, BasicHeaders, Methods6['post']['status']>(
              prefix,
              `${prefix0}${PATH5}`,
              POST,
              option,
              'FormData'
            ).send(),
          $post: (option: { body: Methods6['post']['reqBody']; config?: T }) =>
            fetch<void, BasicHeaders, Methods6['post']['status']>(
              prefix,
              `${prefix0}${PATH5}`,
              POST,
              option,
              'FormData'
            )
              .send()
              .then((r) => r.body),
          get: (option?: { config?: T }) =>
            fetch<void, BasicHeaders, Methods6['get']['status']>(
              prefix,
              `${prefix0}${PATH5}`,
              GET,
              option
            ).send(),
          $get: (option?: { config?: T }) =>
            fetch<void, BasicHeaders, Methods6['get']['status']>(
              prefix,
              `${prefix0}${PATH5}`,
              GET,
              option
            )
              .send()
              .then((r) => r.body),
          $path: () => `${prefix}${prefix0}${PATH5}`,
        },
        delete: (option?: { config?: T }) =>
          fetch<void, BasicHeaders, Methods1['delete']['status']>(
            prefix,
            prefix0,
            DELETE,
            option
          ).send(),
        $delete: (option?: { config?: T }) =>
          fetch<void, BasicHeaders, Methods1['delete']['status']>(
            prefix,
            prefix0,
            DELETE,
            option
          )
            .send()
            .then((r) => r.body),
        $path: () => `${prefix}${prefix0}`,
      };
    },
    asset: {
      _gameID: (val1: string) => {
        const prefix1 = `${PATH6}/${val1}`;

        return {
          file: {
            post: (option: { body: Methods7['post']['reqBody']; config?: T }) =>
              fetch<
                Methods7['post']['resBody'],
                BasicHeaders,
                Methods7['post']['status']
              >(prefix, `${prefix1}${PATH7}`, POST, option, 'FormData').json(),
            $post: (option: {
              body: Methods7['post']['reqBody'];
              config?: T;
            }) =>
              fetch<
                Methods7['post']['resBody'],
                BasicHeaders,
                Methods7['post']['status']
              >(prefix, `${prefix1}${PATH7}`, POST, option, 'FormData')
                .json()
                .then((r) => r.body),
            get: (option: { query: Methods7['get']['query']; config?: T }) =>
              fetch<void, BasicHeaders, Methods7['get']['status']>(
                prefix,
                `${prefix1}${PATH7}`,
                GET,
                option
              ).send(),
            $get: (option: { query: Methods7['get']['query']; config?: T }) =>
              fetch<void, BasicHeaders, Methods7['get']['status']>(
                prefix,
                `${prefix1}${PATH7}`,
                GET,
                option
              )
                .send()
                .then((r) => r.body),
            $path: (option?: {
              method?: 'get';
              query: Methods7['get']['query'];
            }) =>
              `${prefix}${prefix1}${PATH7}${
                option && option.query
                  ? `?${dataToURLString(option.query)}`
                  : ''
              }`,
          },
          url: {
            post: (option: { body: Methods8['post']['reqBody']; config?: T }) =>
              fetch<
                Methods8['post']['resBody'],
                BasicHeaders,
                Methods8['post']['status']
              >(prefix, `${prefix1}${PATH8}`, POST, option).json(),
            $post: (option: {
              body: Methods8['post']['reqBody'];
              config?: T;
            }) =>
              fetch<
                Methods8['post']['resBody'],
                BasicHeaders,
                Methods8['post']['status']
              >(prefix, `${prefix1}${PATH8}`, POST, option)
                .json()
                .then((r) => r.body),
            get: (option?: { config?: T }) =>
              fetch<
                Methods8['get']['resBody'],
                BasicHeaders,
                Methods8['get']['status']
              >(prefix, `${prefix1}${PATH8}`, GET, option).text(),
            $get: (option?: { config?: T }) =>
              fetch<
                Methods8['get']['resBody'],
                BasicHeaders,
                Methods8['get']['status']
              >(prefix, `${prefix1}${PATH8}`, GET, option)
                .text()
                .then((r) => r.body),
            $path: () => `${prefix}${prefix1}${PATH8}`,
          },
        };
      },
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
    get: (option?: { query?: Methods0['get']['query']; config?: T }) =>
      fetch<
        Methods0['get']['resBody'],
        BasicHeaders,
        Methods0['get']['status']
      >(prefix, PATH0, GET, option).json(),
    $get: (option?: { query?: Methods0['get']['query']; config?: T }) =>
      fetch<
        Methods0['get']['resBody'],
        BasicHeaders,
        Methods0['get']['status']
      >(prefix, PATH0, GET, option)
        .json()
        .then((r) => r.body),
    $path: (option?: { method?: 'get'; query: Methods0['get']['query'] }) =>
      `${prefix}${PATH0}${
        option && option.query ? `?${dataToURLString(option.query)}` : ''
      }`,
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
