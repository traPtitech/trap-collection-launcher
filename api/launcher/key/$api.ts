/* eslint-disable */
import { AspidaClient, BasicHeaders } from 'aspida';
import { Methods as Methods0 } from './_productKeyID@string';
import { Methods as Methods1 } from './generate';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined
    ? 'https://collection.trap.jp/api'
    : baseURL
  ).replace(/\/$/, '');
  const PATH0 = '/launcher/key';
  const PATH1 = '/launcher/key/generate';
  const POST = 'POST';
  const DELETE = 'DELETE';

  return {
    _productKeyID: (val0: string) => {
      const prefix0 = `${PATH0}/${val0}`;

      return {
        delete: (option?: { config?: T }) =>
          fetch<void, BasicHeaders, Methods0['delete']['status']>(
            prefix,
            prefix0,
            DELETE,
            option
          ).send(),
        $delete: (option?: { config?: T }) =>
          fetch<void, BasicHeaders, Methods0['delete']['status']>(
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
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
