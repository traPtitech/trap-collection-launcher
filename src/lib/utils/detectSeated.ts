import { screen } from 'electron';
import { patchSeatEmpty, patchSeatInUse } from '../axios';
import launchedGames from '../launchedGames';
import store from '@/lib/store';

export const detectSeated = () => {
  const detectPerSecond = 1;
  const mouseTimeLimit = 10;
  const mouseCounterLimit = detectPerSecond * mouseTimeLimit;
  const selectingTimeLimit = 120;
  const selectingCounterLimit = detectPerSecond * selectingTimeLimit;
  let counter = 0;
  let prevMousePos = screen.getCursorScreenPoint();
  let prevLaunchCounter = store.get('launchCounter');

  const mutateSitDown = (value: boolean) => {
    if (value === store.get('isSeated')) {
      return;
    }
    const seatId = store.get('seatId');
    store.set('isSeated', value);
    if (value) {
      seatId && patchSeatInUse(seatId);
    } else {
      seatId && patchSeatEmpty(seatId);
    }
  };

  setInterval(() => {
    const launchCounter = store.get('launchCounter');
    if (prevLaunchCounter != launchCounter) {
      if (launchCounter > 0) {
        mutateSitDown(true);
      }
      counter = 0;
      prevLaunchCounter = launchCounter;
    }

    if (launchCounter == 0) {
      // Wait 2m when not playing the game.
      counter++;
      if (counter > selectingCounterLimit) {
        mutateSitDown(false);
      }
    } else {
      // Wait 10s when playing the game and not moving the mouse.
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
      if (counter > mouseCounterLimit) {
        mutateSitDown(false);
      }
    }
  }, 1000 / detectPerSecond);
};
