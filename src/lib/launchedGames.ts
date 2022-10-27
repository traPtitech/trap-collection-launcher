import ChildProcess from 'child_process';
import { BrowserWindow } from 'electron';

export class LaunchedGames {
  private games: Set<ChildProcess.ChildProcess | BrowserWindow> = new Set();

  public add(game: ChildProcess.ChildProcess | BrowserWindow): void {
    this.games.add(game);
  }

  public remove(game: ChildProcess.ChildProcess | BrowserWindow): void {
    this.games.delete(game);
  }

  public get(): Set<ChildProcess.ChildProcess | BrowserWindow> {
    return this.games;
  }
}

const launchedGames = new LaunchedGames();

export default launchedGames;
