import { screen } from 'electron';
import store from '@/lib/store';

export const detectSeated = async (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    const fps = 5;
    const timelimit = 120;
    const counterLimit = fps * timelimit;
    let counter = 0;
    let prevMousePos = screen.getCursorScreenPoint();
    let isSitDown = false;

    setInterval(() => {
      const mousePos = screen.getCursorScreenPoint();
      if (prevMousePos != mousePos) {
        counter = 0;
        prevMousePos = mousePos;
        isSitDown = true;
        store.set('seated', isSitDown);
      }
      counter++;
      if (counter > counterLimit) {
        isSitDown = false;
        store.set('seated', isSitDown);
      }
    }, 1000 / fps);
  });
