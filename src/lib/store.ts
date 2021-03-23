import Store from 'electron-store';

export const store = new Store<{
  gameInfo: TraPCollection.GameInfo[];
  lastUpdate?: Date;
  productKey?: string;
  seatId?: number;
  seatVersionId?: number;
}>({
  defaults: {
    gameInfo: [],
    lastUpdate: undefined,
    productKey: undefined,
    seatId: undefined,
    seatVersionId: undefined,
  },
});
