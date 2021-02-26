/* eslint-disable */
import * as Types from '../@types';

export type Methods = {
  post: {
    status: 200;
    resBody: Types.VersionMeta;
    reqBody: Types.NewVersion;
  };

  get: {
    status: 200;
    resBody: Types.Version[];
  };
};
