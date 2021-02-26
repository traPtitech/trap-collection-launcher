/* eslint-disable */
import * as Types from '../@types';

export type Methods = {
  post: {
    status: 200;
    resBody: Types.GameInfo;
    reqBody: Types.NewGame;
  };

  get: {
    query?: {
      all?: boolean;
    };

    status: 200;
    resBody: Types.Game[];
  };
};
