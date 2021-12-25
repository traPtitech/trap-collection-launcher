import path from 'path';
import { app } from 'electron';

/**
 * ローカルファイルのパスを生成する
 * @param type `artworks` or `games`
 * @param id `UUIDv4`
 * @param file `game.exe` or `poster.png` or `video.mp4`
 * @example createLocalPath('artworks', id, 'poster.png') // 'artworks/31acb96b-df71-4823-bf16-6efa80edd6b8/poster.png'
 */
export const generateLocalPath = (
  versionId: string,
  type: 'artworks' | 'games',
  id: string,
  file?: string
): string => {
  return file
    ? path.join('versions', versionId, type, id, file)
    : path.join(type, id);
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
