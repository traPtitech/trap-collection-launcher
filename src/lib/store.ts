// eslint-disable-next-line import/no-unresolved
import Store from 'electron-store';

export const store = new Store<{
  seatId: number;
  seatVersionId: number;
  productKey: string;
  gameInfo: TraPCollection.GameInfo[];
  lastUpdate: Date;
}>({});
