import Store = require('electron-store');

export const store = new Store<{
  seatId: number;
  seatVersionId: number;
  productKey: string;
  games: TraPCollection.Game[];
  lastUpdate: Date;
}>();