import { postLauncherLogin } from '@/lib/axios';
import { store } from '@/lib/store';

export const updateToken = async (): Promise<void> => {
  const productKey = store.get('productKey');
  if (!productKey) {
    return console.error(new Error('ProductKey is not set'));
  }

  postLauncherLogin(productKey)
    .then(({ data }) => {
      if (data) {
        store.set('token', data.accessToken);
        setTimeout(updateToken, data.expiresIn * 1000);
      }
    })
    .catch(console.error);
};
