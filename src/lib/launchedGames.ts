import ChildProcess from 'child_process';
import { BrowserWindow } from 'electron';

interface LaunchedGame {
  process: ChildProcess.ChildProcess | BrowserWindow;
  closeHandler: () => Promise<void>;
}

export class LaunchedGames {
  private games: Set<LaunchedGame> = new Set();

  public add(launchedGame: LaunchedGame): void {
    this.games.add(launchedGame);
  }

  public remove(launchedGame: LaunchedGame): void {
    this.games.delete(launchedGame);
  }

  public get(): Set<LaunchedGame> {
    return this.games;
  }
}

const launchedGames = new LaunchedGames();

export default launchedGames;
