import { screen } from 'electron';
import { patchSeatEmpty, patchSeatInUse } from '../axios';
import store from '@/lib/store';

// if the mouse is not moved in 2 minutes, detect the player not seated.
export const detectSeated = async (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    const seatId = store.get('seatId');

    const detectPerSecond = 1;
    const timelimit = 120;
    const counterLimit = detectPerSecond * timelimit;
    let counter = 0;
    let prevMousePos = screen.getCursorScreenPoint();
    let isSitDown = false;

    const mutateSitDown = (value: boolean) => {
      if (value === isSitDown) {
        return;
      }
      isSitDown = value;
      if (isSitDown) {
        seatId && patchSeatInUse(seatId);
      } else {
        seatId && patchSeatEmpty(seatId);
      }
    };

    setInterval(() => {
      const mousePos = screen.getCursorScreenPoint();
      if (prevMousePos != mousePos) {
        counter = 0;
        prevMousePos = mousePos;
        mutateSitDown(true);
        store.set('seated', isSitDown);
      }
      counter++;
      if (counter > counterLimit) {
        mutateSitDown(false);
        store.set('seated', isSitDown);
        seatId && patchSeatEmpty(seatId);
      }
    }, 1000 / detectPerSecond);
  });
