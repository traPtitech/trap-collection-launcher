/* eslint-disable */
import * as Types from '../../../@types';

export type Methods = {
  post: {
    status: 200;
    resBody: Types.GameVersion;
    reqBody: Types.NewGameVersion;
  };

  get: {
    status: 200;
    resBody: Types.GameVersion[];
  };
};
