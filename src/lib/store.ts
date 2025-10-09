import Store from 'electron-store';

type StoreSchema = {
  gameInfo: TraPCollection.GameInfos;
  launcherVersions: TraPCollection.LauncherVersions;
  seatId: number | null;
  seated: boolean | null;
  token: string | null;
};

const store = new Store<StoreSchema>({
  defaults: {
    gameInfo: [],
    launcherVersions: [],
    seated: null,
    seatId: null,
    token: null,
  },
  watch: true,
});

export class TraPCollectionStore {
  private store: Store<StoreSchema>;
  constructor(store: Store<StoreSchema>) {
    this.store = store;
  }
  public get<T extends keyof StoreSchema>(key: T): StoreSchema[T] {
    return this.store.get(key);
  }
  public set<T extends keyof StoreSchema>(key: T, value: StoreSchema[T]) {
    return this.store.set(key, value);
  }
}

const traPCollectionStore = new TraPCollectionStore(store);

export default traPCollectionStore;
