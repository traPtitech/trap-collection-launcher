/* eslint-disable */
import { AspidaClient, BasicHeaders } from 'aspida';
import { Methods as Methods0 } from '.';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined
    ? 'https://collection.trap.jp/api'
    : baseURL
  ).replace(/\/$/, '');
  const PATH0 = '/launcher/key/generate';
  const POST = 'POST';

  return {
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
    $path: () => `${prefix}${PATH0}`,
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
