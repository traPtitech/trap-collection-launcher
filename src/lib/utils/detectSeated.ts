import { screen } from 'electron';
import { patchSeatEmpty, patchSeatInUse } from '../axios';
import launchedGames from '../launchedGames';
import store from '@/lib/store';

// if the mouse is not moved in 2 minutes, detect the player not seated.
export const detectSeated = () => {
  const detectPerSecond = 1;
  const timelimit = 10;
  const counterLimit = detectPerSecond * timelimit;
  let counter = 0;
  let prevMousePos = screen.getCursorScreenPoint();

  const mutateSitDown = (value: boolean) => {
    if (value === store.get('seated')) {
      return;
    }
    const seatId = store.get('seatId');
    store.set('seated', value);
    if (value) {
      seatId && patchSeatInUse(seatId);
    } else {
      seatId && patchSeatEmpty(seatId);
    }
  };

  setInterval(() => {
    const mousePos = screen.getCursorScreenPoint();
    if (
      prevMousePos.x !== mousePos.x ||
      prevMousePos.y !== mousePos.y ||
      launchedGames.get().size > 0
    ) {
      counter = 0;
      prevMousePos = mousePos;
      mutateSitDown(true);
    }
    counter++;
    if (counter > counterLimit) {
      mutateSitDown(false);
    }
  }, 1000 / detectPerSecond);
};
