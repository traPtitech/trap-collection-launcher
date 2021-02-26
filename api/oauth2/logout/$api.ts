/* eslint-disable */
import { AspidaClient, BasicHeaders } from 'aspida';
import { Methods as Methods0 } from '.';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined
    ? 'https://collection.trap.jp/api'
    : baseURL
  ).replace(/\/$/, '');
  const PATH0 = '/oauth2/logout';
  const POST = 'POST';

  return {
    post: (option?: { config?: T }) =>
      fetch<void, BasicHeaders, Methods0['post']['status']>(
        prefix,
        PATH0,
        POST,
        option
      ).send(),
    $post: (option?: { config?: T }) =>
      fetch<void, BasicHeaders, Methods0['post']['status']>(
        prefix,
        PATH0,
        POST,
        option
      )
        .send()
        .then((r) => r.body),
    $path: () => `${prefix}${PATH0}`,
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
