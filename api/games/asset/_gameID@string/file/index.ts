/* eslint-disable */
import * as Types from '../../../../@types';

export type Methods = {
  post: {
    status: 200;
    resBody: Types.GameFile;
    reqFormat: FormData;
    reqBody: Types.NewGameFile;
  };

  get: {
    query: Types.operatingSystem;
    status: 200;
  };
};
