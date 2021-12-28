import Store from 'electron-store';

export const store = new Store<{
  gameInfo: TraPCollection.GameInfos;
  launcherVersions: TraPCollection.LauncherVersions;
  seatId?: number;
  seatVersionId?: number;
}>({
  defaults: {
    gameInfo: [],
    launcherVersions: [],
    seatId: undefined,
    seatVersionId: undefined,
  },
  watch: true,
});
