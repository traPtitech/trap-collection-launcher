/* eslint-disable */
import { AspidaClient, BasicHeaders } from 'aspida';
import { Methods as Methods0 } from './_seatVersionID@number';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined
    ? 'https://collection.trap.jp/api'
    : baseURL
  ).replace(/\/$/, '');
  const PATH0 = '/seats/versions';
  const GET = 'GET';
  const DELETE = 'DELETE';

  return {
    _seatVersionID: (val0: number) => {
      const prefix0 = `${PATH0}/${val0}`;

      return {
        get: (option?: { config?: T }) =>
          fetch<
            Methods0['get']['resBody'],
            BasicHeaders,
            Methods0['get']['status']
          >(prefix, prefix0, GET, option).json(),
        $get: (option?: { config?: T }) =>
          fetch<
            Methods0['get']['resBody'],
            BasicHeaders,
            Methods0['get']['status']
          >(prefix, prefix0, GET, option)
            .json()
            .then((r) => r.body),
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
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
