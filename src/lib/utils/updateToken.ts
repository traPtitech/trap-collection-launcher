import { postLauncherLogin } from '@/lib/axios';
import { store } from '@/lib/store';

export const updateToken = async (): Promise<void> => {
  const productKeys = store.get('productKey') ?? [];
  const productKey = productKeys[0]?.id;
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
