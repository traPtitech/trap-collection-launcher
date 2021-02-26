/* eslint-disable */
import * as Types from '../../../@types';

export type Methods = {
  get: {
    status: 200;
    resBody: Types.Game;
  };

  put: {
    status: 200;
    resBody: Types.GameInfo;
    reqBody: Types.NewGame;
  };
};
