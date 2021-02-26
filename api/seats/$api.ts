/* eslint-disable */
import { AspidaClient, BasicHeaders } from 'aspida';
import { Methods as Methods0 } from '.';
import { Methods as Methods1 } from './versions/_seatVersionID@number';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined
    ? 'https://collection.trap.jp/api'
    : baseURL
  ).replace(/\/$/, '');
  const PATH0 = '/seats';
  const PATH1 = '/seats/versions';
  const GET = 'GET';
  const POST = 'POST';
  const DELETE = 'DELETE';

  return {
    versions: {
      _seatVersionID: (val1: number) => {
        const prefix1 = `${PATH1}/${val1}`;

        return {
          get: (option?: { config?: T }) =>
            fetch<
              Methods1['get']['resBody'],
              BasicHeaders,
              Methods1['get']['status']
            >(prefix, prefix1, GET, option).json(),
          $get: (option?: { config?: T }) =>
            fetch<
              Methods1['get']['resBody'],
              BasicHeaders,
              Methods1['get']['status']
            >(prefix, prefix1, GET, option)
              .json()
              .then((r) => r.body),
          delete: (option?: { config?: T }) =>
            fetch<void, BasicHeaders, Methods1['delete']['status']>(
              prefix,
              prefix1,
              DELETE,
              option
            ).send(),
          $delete: (option?: { config?: T }) =>
            fetch<void, BasicHeaders, Methods1['delete']['status']>(
              prefix,
              prefix1,
              DELETE,
              option
            )
              .send()
              .then((r) => r.body),
          $path: () => `${prefix}${prefix1}`,
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
    delete: (option: { body: Methods0['delete']['reqBody']; config?: T }) =>
      fetch<
        Methods0['delete']['resBody'],
        BasicHeaders,
        Methods0['delete']['status']
      >(prefix, PATH0, DELETE, option).json(),
    $delete: (option: { body: Methods0['delete']['reqBody']; config?: T }) =>
      fetch<
        Methods0['delete']['resBody'],
        BasicHeaders,
        Methods0['delete']['status']
      >(prefix, PATH0, DELETE, option)
        .json()
        .then((r) => r.body),
    $path: () => `${prefix}${PATH0}`,
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
