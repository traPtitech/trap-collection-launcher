import { postLauncherLogin } from '@/lib/axios';
import { store } from '@/lib/store';

export const updateToken = async (): Promise<void> => {
  const productKey = store.get('productKey');
  if (!productKey) {
    throw new Error('ProductKey is not set');
  }
  const { data } = await postLauncherLogin(productKey).catch((reason) => {
    throw new Error(reason.message);
  });
  store.set('token', data.accessToken);
  setTimeout(updateToken, data.expiresIn * 1000);
};
