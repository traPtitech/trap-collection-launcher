/* eslint-disable */
import { AspidaClient, BasicHeaders } from 'aspida';
import { Methods as Methods0 } from './key/_productKeyID@string';
import { Methods as Methods1 } from './key/generate';
import { Methods as Methods2 } from './login';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined
    ? 'https://collection.trap.jp/api'
    : baseURL
  ).replace(/\/$/, '');
  const PATH0 = '/launcher/key';
  const PATH1 = '/launcher/key/generate';
  const PATH2 = '/launcher/login';
  const POST = 'POST';
  const DELETE = 'DELETE';

  return {
    key: {
      _productKeyID: (val1: string) => {
        const prefix1 = `${PATH0}/${val1}`;

        return {
          delete: (option?: { config?: T }) =>
            fetch<void, BasicHeaders, Methods0['delete']['status']>(
              prefix,
              prefix1,
              DELETE,
              option
            ).send(),
          $delete: (option?: { config?: T }) =>
            fetch<void, BasicHeaders, Methods0['delete']['status']>(
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
      generate: {
        post: (option: { body: Methods1['post']['reqBody']; config?: T }) =>
          fetch<
            Methods1['post']['resBody'],
            BasicHeaders,
            Methods1['post']['status']
          >(prefix, PATH1, POST, option).json(),
        $post: (option: { body: Methods1['post']['reqBody']; config?: T }) =>
          fetch<
            Methods1['post']['resBody'],
            BasicHeaders,
            Methods1['post']['status']
          >(prefix, PATH1, POST, option)
            .json()
            .then((r) => r.body),
        $path: () => `${prefix}${PATH1}`,
      },
    },
    login: {
      post: (option: { body: Methods2['post']['reqBody']; config?: T }) =>
        fetch<
          Methods2['post']['resBody'],
          BasicHeaders,
          Methods2['post']['status']
        >(prefix, PATH2, POST, option).json(),
      $post: (option: { body: Methods2['post']['reqBody']; config?: T }) =>
        fetch<
          Methods2['post']['resBody'],
          BasicHeaders,
          Methods2['post']['status']
        >(prefix, PATH2, POST, option)
          .json()
          .then((r) => r.body),
      $path: () => `${prefix}${PATH2}`,
    },
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
