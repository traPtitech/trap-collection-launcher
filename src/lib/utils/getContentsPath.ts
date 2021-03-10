import { app } from 'electron';
import path from 'path';

export const getContentsPath = (...filePath: string[]): string => {
  return path.join(app.getPath('userData'), 'contents', ...filePath);
};

export const getContentPathsFromGameId = (
  gameId: string
): { url: string; poster: string; video: string } => {
  return {
    url: getContentsPath(gameId, 'poster.png'),
    poster: getContentsPath(gameId, 'poster.png'),
    video: getContentsPath(gameId, 'video.mp4'),
  };
};
