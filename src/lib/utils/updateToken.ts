import { postLauncherLogin } from '@/lib/axios';
import { store } from '@/lib/store';

export const updateToken = async (): Promise<void> => {
  const productKey = store.get('productKey');
  if (!productKey) {
    throw new Error('ProductKey is not set');
  }
  const { body } = await postLauncherLogin(productKey).catch((reason) => {
    throw new Error(reason.message);
  });
  store.set('token', body.accessToken);
  setTimeout(updateToken, body.expiresIn * 1000);
};
