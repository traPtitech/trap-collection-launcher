import { app } from 'electron';
import path from 'path';

/**
 * ローカルファイルのパスを生成する
 * @param type `artworks` or `games`
 * @param id `UUIDv4`
 * @param file `game.exe` or `poster.png` or `video.mp4`
 * @example createLocalPath('artworks', id, 'poster.png') // 'artworks/31acb96b-df71-4823-bf16-6efa80edd6b8/poster.png'
 */
export const generateLocalPath = (
  type: 'artworks' | 'games',
  id: string,
  file: string
): string => {
  return path.join(type, id, file);
};

/**
 * リソースの絶対パスを生成する
 * @param localPath
 * @example
 * generateAbsolutePath(localPath) // 'C:/Users/Username/AppData/Roaming/trap-collection/contents'
 */
export const generateAbsolutePath = (localPath: string): string => {
  return path.join(app.getPath('userData'), 'contents', localPath);
};
