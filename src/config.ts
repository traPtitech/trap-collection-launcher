// eslint-disable-next-line import/no-unresolved
import PackageJson from '/package.json';

export const baseUrl = 'https://collection.trap.jp/api/v2';
export const isKoudaisai = process.env.KOUDAISAI === 'true';

export const packageJson: {
  name: string;
  productName: string;
  version: string;
  description: string;
} = PackageJson;

export const questionnaireUrl = 'https://anke-to.trap.jp/targeted';
export const homePageUrl = 'https://trap.jp/';
export const javaDownloadPageUrl = 'https://www.java.com/ja/download/';
