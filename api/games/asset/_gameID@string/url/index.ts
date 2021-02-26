/* eslint-disable */
import * as Types from '../../../../@types';

export type Methods = {
  post: {
    status: 200;
    resBody: Types.GameURL;
    reqBody: Types.NewGameURL;
  };

  get: {
    status: 200;
    resBody: string;
  };
};
