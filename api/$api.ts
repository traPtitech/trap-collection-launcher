/* eslint-disable */
import { AspidaClient, BasicHeaders, dataToURLString } from 'aspida';
import { Methods as Methods0 } from './games';
import { Methods as Methods1 } from './games/_gameID@string';
import { Methods as Methods2 } from './games/_gameID@string/image';
import { Methods as Methods3 } from './games/_gameID@string/info';
import { Methods as Methods4 } from './games/_gameID@string/maintainers';
import { Methods as Methods5 } from './games/_gameID@string/version';
import { Methods as Methods6 } from './games/_gameID@string/video';
import { Methods as Methods7 } from './games/asset/_gameID@string/file';
import { Methods as Methods8 } from './games/asset/_gameID@string/url';
import { Methods as Methods9 } from './launcher/key/_productKeyID@string';
import { Methods as Methods10 } from './launcher/key/generate';
import { Methods as Methods11 } from './launcher/login';
import { Methods as Methods12 } from './oauth2/callback';
import { Methods as Methods13 } from './oauth2/generate/code';
import { Methods as Methods14 } from './oauth2/logout';
import { Methods as Methods15 } from './seats';
import { Methods as Methods16 } from './seats/versions/_seatVersionID@number';
import { Methods as Methods17 } from './users';
import { Methods as Methods18 } from './users/me';
import { Methods as Methods19 } from './versions';
import { Methods as Methods20 } from './versions/_launcherVersionID@number';
import { Methods as Methods21 } from './versions/_launcherVersionID@number/game';
import { Methods as Methods22 } from './versions/_launcherVersionID@number/keys';
import { Methods as Methods23 } from './versions/_launcherVersionID@number/seats';
import { Methods as Methods24 } from './versions/check';

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
  const PATH9 = '/launcher/key';
  const PATH10 = '/launcher/key/generate';
  const PATH11 = '/launcher/login';
  const PATH12 = '/oauth2/callback';
  const PATH13 = '/oauth2/generate/code';
  const PATH14 = '/oauth2/logout';
  const PATH15 = '/seats';
  const PATH16 = '/seats/versions';
  const PATH17 = '/users';
  const PATH18 = '/users/me';
  const PATH19 = '/versions';
  const PATH20 = '/game';
  const PATH21 = '/keys';
  const PATH22 = '/versions/check';
  const GET = 'GET';
  const POST = 'POST';
  const PUT = 'PUT';
  const DELETE = 'DELETE';

  return {
    games: {
      _gameID: (val1: string) => {
        const prefix1 = `${PATH0}/${val1}`;

        return {
          image: {
            post: (option: { body: Methods2['post']['reqBody']; config?: T }) =>
              fetch<void, BasicHeaders, Methods2['post']['status']>(
                prefix,
                `${prefix1}${PATH1}`,
                POST,
                option,
                'FormData'
              ).send(),
            $post: (option: {
              body: Methods2['post']['reqBody'];
              config?: T;
            }) =>
              fetch<void, BasicHeaders, Methods2['post']['status']>(
                prefix,
                `${prefix1}${PATH1}`,
                POST,
                option,
                'FormData'
              )
                .send()
                .then((r) => r.body),
            get: (option?: { config?: T }) =>
              fetch<void, BasicHeaders, Methods2['get']['status']>(
                prefix,
                `${prefix1}${PATH1}`,
                GET,
                option
              ).send(),
            $get: (option?: { config?: T }) =>
              fetch<void, BasicHeaders, Methods2['get']['status']>(
                prefix,
                `${prefix1}${PATH1}`,
                GET,
                option
              )
                .send()
                .then((r) => r.body),
            $path: () => `${prefix}${prefix1}${PATH1}`,
          },
          info: {
            get: (option?: { config?: T }) =>
              fetch<
                Methods3['get']['resBody'],
                BasicHeaders,
                Methods3['get']['status']
              >(prefix, `${prefix1}${PATH2}`, GET, option).json(),
            $get: (option?: { config?: T }) =>
              fetch<
                Methods3['get']['resBody'],
                BasicHeaders,
                Methods3['get']['status']
              >(prefix, `${prefix1}${PATH2}`, GET, option)
                .json()
                .then((r) => r.body),
            put: (option: { body: Methods3['put']['reqBody']; config?: T }) =>
              fetch<
                Methods3['put']['resBody'],
                BasicHeaders,
                Methods3['put']['status']
              >(prefix, `${prefix1}${PATH2}`, PUT, option).json(),
            $put: (option: { body: Methods3['put']['reqBody']; config?: T }) =>
              fetch<
                Methods3['put']['resBody'],
                BasicHeaders,
                Methods3['put']['status']
              >(prefix, `${prefix1}${PATH2}`, PUT, option)
                .json()
                .then((r) => r.body),
            $path: () => `${prefix}${prefix1}${PATH2}`,
          },
          maintainers: {
            post: (option: { body: Methods4['post']['reqBody']; config?: T }) =>
              fetch<void, BasicHeaders, Methods4['post']['status']>(
                prefix,
                `${prefix1}${PATH3}`,
                POST,
                option
              ).send(),
            $post: (option: {
              body: Methods4['post']['reqBody'];
              config?: T;
            }) =>
              fetch<void, BasicHeaders, Methods4['post']['status']>(
                prefix,
                `${prefix1}${PATH3}`,
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
              >(prefix, `${prefix1}${PATH3}`, GET, option).json(),
            $get: (option?: { config?: T }) =>
              fetch<
                Methods4['get']['resBody'],
                BasicHeaders,
                Methods4['get']['status']
              >(prefix, `${prefix1}${PATH3}`, GET, option)
                .json()
                .then((r) => r.body),
            $path: () => `${prefix}${prefix1}${PATH3}`,
          },
          version: {
            post: (option: { body: Methods5['post']['reqBody']; config?: T }) =>
              fetch<
                Methods5['post']['resBody'],
                BasicHeaders,
                Methods5['post']['status']
              >(prefix, `${prefix1}${PATH4}`, POST, option).json(),
            $post: (option: {
              body: Methods5['post']['reqBody'];
              config?: T;
            }) =>
              fetch<
                Methods5['post']['resBody'],
                BasicHeaders,
                Methods5['post']['status']
              >(prefix, `${prefix1}${PATH4}`, POST, option)
                .json()
                .then((r) => r.body),
            get: (option?: { config?: T }) =>
              fetch<
                Methods5['get']['resBody'],
                BasicHeaders,
                Methods5['get']['status']
              >(prefix, `${prefix1}${PATH4}`, GET, option).json(),
            $get: (option?: { config?: T }) =>
              fetch<
                Methods5['get']['resBody'],
                BasicHeaders,
                Methods5['get']['status']
              >(prefix, `${prefix1}${PATH4}`, GET, option)
                .json()
                .then((r) => r.body),
            $path: () => `${prefix}${prefix1}${PATH4}`,
          },
          video: {
            post: (option: { body: Methods6['post']['reqBody']; config?: T }) =>
              fetch<void, BasicHeaders, Methods6['post']['status']>(
                prefix,
                `${prefix1}${PATH5}`,
                POST,
                option,
                'FormData'
              ).send(),
            $post: (option: {
              body: Methods6['post']['reqBody'];
              config?: T;
            }) =>
              fetch<void, BasicHeaders, Methods6['post']['status']>(
                prefix,
                `${prefix1}${PATH5}`,
                POST,
                option,
                'FormData'
              )
                .send()
                .then((r) => r.body),
            get: (option?: { config?: T }) =>
              fetch<void, BasicHeaders, Methods6['get']['status']>(
                prefix,
                `${prefix1}${PATH5}`,
                GET,
                option
              ).send(),
            $get: (option?: { config?: T }) =>
              fetch<void, BasicHeaders, Methods6['get']['status']>(
                prefix,
                `${prefix1}${PATH5}`,
                GET,
                option
              )
                .send()
                .then((r) => r.body),
            $path: () => `${prefix}${prefix1}${PATH5}`,
          },
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
      asset: {
        _gameID: (val2: string) => {
          const prefix2 = `${PATH6}/${val2}`;

          return {
            file: {
              post: (option: {
                body: Methods7['post']['reqBody'];
                config?: T;
              }) =>
                fetch<
                  Methods7['post']['resBody'],
                  BasicHeaders,
                  Methods7['post']['status']
                >(
                  prefix,
                  `${prefix2}${PATH7}`,
                  POST,
                  option,
                  'FormData'
                ).json(),
              $post: (option: {
                body: Methods7['post']['reqBody'];
                config?: T;
              }) =>
                fetch<
                  Methods7['post']['resBody'],
                  BasicHeaders,
                  Methods7['post']['status']
                >(prefix, `${prefix2}${PATH7}`, POST, option, 'FormData')
                  .json()
                  .then((r) => r.body),
              get: (option: { query: Methods7['get']['query']; config?: T }) =>
                fetch<void, BasicHeaders, Methods7['get']['status']>(
                  prefix,
                  `${prefix2}${PATH7}`,
                  GET,
                  option
                ).send(),
              $get: (option: { query: Methods7['get']['query']; config?: T }) =>
                fetch<void, BasicHeaders, Methods7['get']['status']>(
                  prefix,
                  `${prefix2}${PATH7}`,
                  GET,
                  option
                )
                  .send()
                  .then((r) => r.body),
              $path: (option?: {
                method?: 'get';
                query: Methods7['get']['query'];
              }) =>
                `${prefix}${prefix2}${PATH7}${
                  option && option.query
                    ? `?${dataToURLString(option.query)}`
                    : ''
                }`,
            },
            url: {
              post: (option: {
                body: Methods8['post']['reqBody'];
                config?: T;
              }) =>
                fetch<
                  Methods8['post']['resBody'],
                  BasicHeaders,
                  Methods8['post']['status']
                >(prefix, `${prefix2}${PATH8}`, POST, option).json(),
              $post: (option: {
                body: Methods8['post']['reqBody'];
                config?: T;
              }) =>
                fetch<
                  Methods8['post']['resBody'],
                  BasicHeaders,
                  Methods8['post']['status']
                >(prefix, `${prefix2}${PATH8}`, POST, option)
                  .json()
                  .then((r) => r.body),
              get: (option?: { config?: T }) =>
                fetch<
                  Methods8['get']['resBody'],
                  BasicHeaders,
                  Methods8['get']['status']
                >(prefix, `${prefix2}${PATH8}`, GET, option).text(),
              $get: (option?: { config?: T }) =>
                fetch<
                  Methods8['get']['resBody'],
                  BasicHeaders,
                  Methods8['get']['status']
                >(prefix, `${prefix2}${PATH8}`, GET, option)
                  .text()
                  .then((r) => r.body),
              $path: () => `${prefix}${prefix2}${PATH8}`,
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
    },
    launcher: {
      key: {
        _productKeyID: (val2: string) => {
          const prefix2 = `${PATH9}/${val2}`;

          return {
            delete: (option?: { config?: T }) =>
              fetch<void, BasicHeaders, Methods9['delete']['status']>(
                prefix,
                prefix2,
                DELETE,
                option
              ).send(),
            $delete: (option?: { config?: T }) =>
              fetch<void, BasicHeaders, Methods9['delete']['status']>(
                prefix,
                prefix2,
                DELETE,
                option
              )
                .send()
                .then((r) => r.body),
            $path: () => `${prefix}${prefix2}`,
          };
        },
        generate: {
          post: (option: { body: Methods10['post']['reqBody']; config?: T }) =>
            fetch<
              Methods10['post']['resBody'],
              BasicHeaders,
              Methods10['post']['status']
            >(prefix, PATH10, POST, option).json(),
          $post: (option: { body: Methods10['post']['reqBody']; config?: T }) =>
            fetch<
              Methods10['post']['resBody'],
              BasicHeaders,
              Methods10['post']['status']
            >(prefix, PATH10, POST, option)
              .json()
              .then((r) => r.body),
          $path: () => `${prefix}${PATH10}`,
        },
      },
      login: {
        post: (option: { body: Methods11['post']['reqBody']; config?: T }) =>
          fetch<
            Methods11['post']['resBody'],
            BasicHeaders,
            Methods11['post']['status']
          >(prefix, PATH11, POST, option).json(),
        $post: (option: { body: Methods11['post']['reqBody']; config?: T }) =>
          fetch<
            Methods11['post']['resBody'],
            BasicHeaders,
            Methods11['post']['status']
          >(prefix, PATH11, POST, option)
            .json()
            .then((r) => r.body),
        $path: () => `${prefix}${PATH11}`,
      },
    },
    oauth2: {
      callback: {
        get: (option: { query: Methods12['get']['query']; config?: T }) =>
          fetch<void, BasicHeaders, Methods12['get']['status']>(
            prefix,
            PATH12,
            GET,
            option
          ).send(),
        $get: (option: { query: Methods12['get']['query']; config?: T }) =>
          fetch<void, BasicHeaders, Methods12['get']['status']>(
            prefix,
            PATH12,
            GET,
            option
          )
            .send()
            .then((r) => r.body),
        $path: (option?: {
          method?: 'get';
          query: Methods12['get']['query'];
        }) =>
          `${prefix}${PATH12}${
            option && option.query ? `?${dataToURLString(option.query)}` : ''
          }`,
      },
      generate: {
        code: {
          get: (option?: { config?: T }) =>
            fetch<
              Methods13['get']['resBody'],
              BasicHeaders,
              Methods13['get']['status']
            >(prefix, PATH13, GET, option).json(),
          $get: (option?: { config?: T }) =>
            fetch<
              Methods13['get']['resBody'],
              BasicHeaders,
              Methods13['get']['status']
            >(prefix, PATH13, GET, option)
              .json()
              .then((r) => r.body),
          $path: () => `${prefix}${PATH13}`,
        },
      },
      logout: {
        post: (option?: { config?: T }) =>
          fetch<void, BasicHeaders, Methods14['post']['status']>(
            prefix,
            PATH14,
            POST,
            option
          ).send(),
        $post: (option?: { config?: T }) =>
          fetch<void, BasicHeaders, Methods14['post']['status']>(
            prefix,
            PATH14,
            POST,
            option
          )
            .send()
            .then((r) => r.body),
        $path: () => `${prefix}${PATH14}`,
      },
    },
    seats: {
      versions: {
        _seatVersionID: (val2: number) => {
          const prefix2 = `${PATH16}/${val2}`;

          return {
            get: (option?: { config?: T }) =>
              fetch<
                Methods16['get']['resBody'],
                BasicHeaders,
                Methods16['get']['status']
              >(prefix, prefix2, GET, option).json(),
            $get: (option?: { config?: T }) =>
              fetch<
                Methods16['get']['resBody'],
                BasicHeaders,
                Methods16['get']['status']
              >(prefix, prefix2, GET, option)
                .json()
                .then((r) => r.body),
            delete: (option?: { config?: T }) =>
              fetch<void, BasicHeaders, Methods16['delete']['status']>(
                prefix,
                prefix2,
                DELETE,
                option
              ).send(),
            $delete: (option?: { config?: T }) =>
              fetch<void, BasicHeaders, Methods16['delete']['status']>(
                prefix,
                prefix2,
                DELETE,
                option
              )
                .send()
                .then((r) => r.body),
            $path: () => `${prefix}${prefix2}`,
          };
        },
      },
      post: (option: { body: Methods15['post']['reqBody']; config?: T }) =>
        fetch<
          Methods15['post']['resBody'],
          BasicHeaders,
          Methods15['post']['status']
        >(prefix, PATH15, POST, option).json(),
      $post: (option: { body: Methods15['post']['reqBody']; config?: T }) =>
        fetch<
          Methods15['post']['resBody'],
          BasicHeaders,
          Methods15['post']['status']
        >(prefix, PATH15, POST, option)
          .json()
          .then((r) => r.body),
      delete: (option: { body: Methods15['delete']['reqBody']; config?: T }) =>
        fetch<
          Methods15['delete']['resBody'],
          BasicHeaders,
          Methods15['delete']['status']
        >(prefix, PATH15, DELETE, option).json(),
      $delete: (option: { body: Methods15['delete']['reqBody']; config?: T }) =>
        fetch<
          Methods15['delete']['resBody'],
          BasicHeaders,
          Methods15['delete']['status']
        >(prefix, PATH15, DELETE, option)
          .json()
          .then((r) => r.body),
      $path: () => `${prefix}${PATH15}`,
    },
    users: {
      me: {
        get: (option?: { config?: T }) =>
          fetch<
            Methods18['get']['resBody'],
            BasicHeaders,
            Methods18['get']['status']
          >(prefix, PATH18, GET, option).json(),
        $get: (option?: { config?: T }) =>
          fetch<
            Methods18['get']['resBody'],
            BasicHeaders,
            Methods18['get']['status']
          >(prefix, PATH18, GET, option)
            .json()
            .then((r) => r.body),
        $path: () => `${prefix}${PATH18}`,
      },
      get: (option?: { config?: T }) =>
        fetch<
          Methods17['get']['resBody'],
          BasicHeaders,
          Methods17['get']['status']
        >(prefix, PATH17, GET, option).json(),
      $get: (option?: { config?: T }) =>
        fetch<
          Methods17['get']['resBody'],
          BasicHeaders,
          Methods17['get']['status']
        >(prefix, PATH17, GET, option)
          .json()
          .then((r) => r.body),
      $path: () => `${prefix}${PATH17}`,
    },
    versions: {
      _launcherVersionID: (val1: number) => {
        const prefix1 = `${PATH19}/${val1}`;

        return {
          game: {
            post: (option: {
              body: Methods21['post']['reqBody'];
              config?: T;
            }) =>
              fetch<
                Methods21['post']['resBody'],
                BasicHeaders,
                Methods21['post']['status']
              >(prefix, `${prefix1}${PATH20}`, POST, option).json(),
            $post: (option: {
              body: Methods21['post']['reqBody'];
              config?: T;
            }) =>
              fetch<
                Methods21['post']['resBody'],
                BasicHeaders,
                Methods21['post']['status']
              >(prefix, `${prefix1}${PATH20}`, POST, option)
                .json()
                .then((r) => r.body),
            $path: () => `${prefix}${prefix1}${PATH20}`,
          },
          keys: {
            get: (option?: { config?: T }) =>
              fetch<
                Methods22['get']['resBody'],
                BasicHeaders,
                Methods22['get']['status']
              >(prefix, `${prefix1}${PATH21}`, GET, option).json(),
            $get: (option?: { config?: T }) =>
              fetch<
                Methods22['get']['resBody'],
                BasicHeaders,
                Methods22['get']['status']
              >(prefix, `${prefix1}${PATH21}`, GET, option)
                .json()
                .then((r) => r.body),
            $path: () => `${prefix}${prefix1}${PATH21}`,
          },
          seats: {
            post: (option?: { config?: T }) =>
              fetch<
                Methods23['post']['resBody'],
                BasicHeaders,
                Methods23['post']['status']
              >(prefix, `${prefix1}${PATH15}`, POST, option).json(),
            $post: (option?: { config?: T }) =>
              fetch<
                Methods23['post']['resBody'],
                BasicHeaders,
                Methods23['post']['status']
              >(prefix, `${prefix1}${PATH15}`, POST, option)
                .json()
                .then((r) => r.body),
            $path: () => `${prefix}${prefix1}${PATH15}`,
          },
          get: (option?: { config?: T }) =>
            fetch<
              Methods20['get']['resBody'],
              BasicHeaders,
              Methods20['get']['status']
            >(prefix, prefix1, GET, option).json(),
          $get: (option?: { config?: T }) =>
            fetch<
              Methods20['get']['resBody'],
              BasicHeaders,
              Methods20['get']['status']
            >(prefix, prefix1, GET, option)
              .json()
              .then((r) => r.body),
          $path: () => `${prefix}${prefix1}`,
        };
      },
      check: {
        get: (option: { query: Methods24['get']['query']; config?: T }) =>
          fetch<
            Methods24['get']['resBody'],
            BasicHeaders,
            Methods24['get']['status']
          >(prefix, PATH22, GET, option).json(),
        $get: (option: { query: Methods24['get']['query']; config?: T }) =>
          fetch<
            Methods24['get']['resBody'],
            BasicHeaders,
            Methods24['get']['status']
          >(prefix, PATH22, GET, option)
            .json()
            .then((r) => r.body),
        $path: (option?: {
          method?: 'get';
          query: Methods24['get']['query'];
        }) =>
          `${prefix}${PATH22}${
            option && option.query ? `?${dataToURLString(option.query)}` : ''
          }`,
      },
      post: (option: { body: Methods19['post']['reqBody']; config?: T }) =>
        fetch<
          Methods19['post']['resBody'],
          BasicHeaders,
          Methods19['post']['status']
        >(prefix, PATH19, POST, option).json(),
      $post: (option: { body: Methods19['post']['reqBody']; config?: T }) =>
        fetch<
          Methods19['post']['resBody'],
          BasicHeaders,
          Methods19['post']['status']
        >(prefix, PATH19, POST, option)
          .json()
          .then((r) => r.body),
      get: (option?: { config?: T }) =>
        fetch<
          Methods19['get']['resBody'],
          BasicHeaders,
          Methods19['get']['status']
        >(prefix, PATH19, GET, option).json(),
      $get: (option?: { config?: T }) =>
        fetch<
          Methods19['get']['resBody'],
          BasicHeaders,
          Methods19['get']['status']
        >(prefix, PATH19, GET, option)
          .json()
          .then((r) => r.body),
      $path: () => `${prefix}${PATH19}`,
    },
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
