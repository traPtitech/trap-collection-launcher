/* eslint-disable */
import * as Types from '../../../@types';

export type Methods = {
  post: {
    status: 200;
    reqBody: Types.Maintainers;
  };

  get: {
    status: 200;
    resBody: Types.Maintainer[];
  };
};
