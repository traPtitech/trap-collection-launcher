import ElectronStore from 'electron-store';

type Store = {
  gameInfo: TraPCollection.GameInfos;
  launcherVersions: TraPCollection.LauncherVersions;
  seatId: number | null;
  isSeated: boolean | null;
  launchCounter: number;
  token: string | null;
};

const store = new ElectronStore<Store>({
  defaults: {
    gameInfo: [],
    launcherVersions: [],
    isSeated: null,
    launchCounter: 0,
    seatId: null,
    token: null,
  },
  watch: true,
});

export class TraPCollectionStore {
  private store: ElectronStore<Store>;
  constructor(store: ElectronStore<Store>) {
    this.store = store;
  }
  public get<T extends keyof Store>(key: T): Store[T] {
    return this.store.get(key);
  }
  public set<T extends keyof Store>(key: T, value: Store[T]) {
    this.store.set(key, value);
  }
}

const traPCollectionStore = new TraPCollectionStore(store);

export default traPCollectionStore;
