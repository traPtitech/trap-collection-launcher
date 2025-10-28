import PackageJson from '../package.json';

export const baseUrl = process.env.API_BASE_URL;
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

export const electronStoreName = process.env.ELECTRON_STORE_NAME || 'config';
