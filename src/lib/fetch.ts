import { createWriteStream, promises } from 'fs';
import path from 'path';
import { EditionGameResponse, GameFileType } from './typescript-axios';
import {
  getGameFile,
  getGameImage,
  getGameVideo,
  getEditionGames,
  getEditionInfo,
  getGameFileMeta,
} from '@/lib/axios';
import progressLog from '@/lib/progressLog';
import store from '@/lib/store';
import {
  generateAbsolutePath,
  generateLocalPath,
} from '@/lib/utils/generatePaths';
import { unzip } from '@/lib/utils/unzip';

/*
やる処理 v2
- アップデートしなければならないリソースを特定する
  - const oldGameInfos = store.get('gameInfo');
- logを初期化
  - progressLog.reset(fileNum, imageNum, videoNum);
- リソースをダウンロード&展開する
  - logに残す
    - progressLog.add(target: keyof TraPCollection.Progress)
- gameInfoを更新
  - store.set('gameInfo', newGameInfos);
*/

// gameVersionIdからそのゲームへの相対パスを生成
const getLocalGameDirectory = (gameVersionId: string) => {
  const base = generateLocalPath('games', gameVersionId);
  return {
    base,
    executive: path.join(base, 'game.zip'),
    poster: path.join(base, 'poster.png'),
    video: path.join(base, 'video.mp4'),
  };
};

// gameVersionId からゲームへの絶対パスを生成
const getAbsoluteGameDirectory = (gameVersionId: string) => {
  const base = generateAbsolutePath(generateLocalPath('games', gameVersionId));
  return {
    base,
    executive: path.join(base, 'game.zip'),
    poster: path.join(base, 'poster.png'),
    video: path.join(base, 'video.mp4'),
  };
};

// gameVersionId からゲームのダウンロード位置への絶対パスを生成
const getAbsoluteDownloadDirectory = (gameVersionId: string) => {
  const base = generateAbsolutePath(generateLocalPath('games', gameVersionId));
  return {
    base,
    executive: path.join(base, 'game.zip.traPCollection'),
    poster: path.join(base, 'poster.png.traPCollection'),
    video: path.join(base, 'video.mp4.traPCollection'),
  };
};

// 新旧の GameInfo から、新しく追加する必要があるゲームのリストを返す
export const diff = (
  oldGameInfos: TraPCollection.GameInfo[],
  newEditionGames: EditionGameResponse[]
) =>
  newEditionGames.filter((newEditionGame) =>
    oldGameInfos.every(
      (oldGameInfo) => oldGameInfo.version.id !== newEditionGame.version.id
    )
  );

const getFileType = (game: EditionGameResponse) => {
  if (game.version.files?.jar) return GameFileType.Jar;
  const platform = process.platform;
  if (platform === 'win32') return GameFileType.Win32;
  if (platform === 'darwin') return GameFileType.Darwin;
  return undefined;
};

const downloadInit = async (game: EditionGameResponse) => {
  await promises.mkdir(getAbsoluteDownloadDirectory(game.version.id).base, {
    recursive: true,
  });
};

const downloadFile = async (game: EditionGameResponse) => {
  const gameDirectory = getAbsoluteGameDirectory(game.version.id);
  const downloadDirectory = getAbsoluteDownloadDirectory(game.version.id);

  const fileType = getFileType(game);
  const fileID: string | undefined = fileType && game.version.files?.[fileType];

  if (fileID === undefined) {
    progressLog.add('fileDownload');
    progressLog.add('fileDecompress');
    return;
  }

  const { data } = await getGameFile(game.id, fileID);
  const res = await getGameFileMeta(game.id, fileID);

  const md5 = res.data.md5;

  await unzip(
    data,
    downloadDirectory.executive,
    gameDirectory.executive,
    md5,
    () => progressLog.add('fileDownload')
  );

  progressLog.add('fileDecompress');
};

const downloadImage = async (game: EditionGameResponse) => {
  const gameDirectory = getAbsoluteGameDirectory(game.version.id);
  const downloadDirectory = getAbsoluteDownloadDirectory(game.version.id);

  const { data } = await getGameImage(game.id, game.version.imageID);

  promises.unlink(gameDirectory.poster).catch(() => {
    return;
  });

  const writeStream = createWriteStream(downloadDirectory.poster);
  await data.pipe(writeStream);
  await new Promise<void>((resolve, reject) => {
    writeStream.on('close', () => {
      promises.rename(downloadDirectory.poster, gameDirectory.poster);
      resolve();
    });
    writeStream.on('error', reject);
  });

  progressLog.add('posterDownload');
};

const downloadVideo = async (game: EditionGameResponse) => {
  const gameDirectory = getAbsoluteGameDirectory(game.version.id);
  const downloadDirectory = getAbsoluteDownloadDirectory(game.version.id);

  const { data } = await getGameVideo(game.id, game.version.videoID);

  promises.unlink(gameDirectory.video).catch(() => {
    return;
  });

  const writeStream = createWriteStream(downloadDirectory.video);
  await data.pipe(writeStream);
  await new Promise<void>((resolve, reject) => {
    writeStream.on('close', () => {
      promises.rename(downloadDirectory.video, gameDirectory.video);
      resolve();
    });
    writeStream.on('error', reject);
  });

  progressLog.add('videoDownload');
};

export const fetch = async (): Promise<void> => {
  const oldGameInfos = store.get('gameInfo');

  const {
    data: { id: editionID },
  } = await getEditionInfo();
  const { data: newEditionGames } = await getEditionGames(editionID);
  const diffs = diff(oldGameInfos, newEditionGames);

  progressLog.reset(diffs.length, diffs.length, diffs.length);

  // storeのコピーを保持して更新していく
  const currentInfos = [...oldGameInfos];

  // store書き込み用のキュー（排他制御のため直列化）
  let storeQueue = Promise.resolve();
  const addToStore = (newInfo: TraPCollection.GameInfo) => {
    storeQueue = storeQueue.then(() => {
      currentInfos.push(newInfo);
      store.set('gameInfo', currentInfos);
    });
  };

  // 全ゲームを並列処理
  const results = await Promise.allSettled(
    diffs.map(async (game) => {
      try {
        await downloadInit(game);
        await downloadFile(game);
        await downloadImage(game);
        await downloadVideo(game);

        const gameDirectory = getLocalGameDirectory(game.version.id);
        const updateAt = game.version.createdAt;

        const fileType = getFileType(game);
        const fileID: string | undefined =
          fileType && game.version.files?.[fileType];

        const info: TraPCollection.GameInfo['info'] = await (fileID
          ? (async () => {
              const res = await getGameFileMeta(game.id, fileID);
              const entryPoint = res.data.entryPoint;
              if (fileType === GameFileType.Jar)
                return { type: 'jar', entryPoint, updateAt };
              return { type: 'app', entryPoint, updateAt };
            })()
          : { type: 'url', url: game.version.url ?? '', updateAt });

        const newInfo: TraPCollection.GameInfo = {
          createdAt: game.createdAt,
          description: game.description,
          id: game.id,
          name: game.name,
          version: {
            createdAt: updateAt,
            description: game.version.description,
            id: game.version.id,
            name: game.version.name,
          },
          info,
          poster: { updateAt, path: gameDirectory.poster },
          video: { updateAt, path: gameDirectory.video },
        };

        // ここで store に逐次反映（キュー経由で排他制御）
        addToStore(newInfo);
      } catch (error) {
        console.error(`Failed to download game: ${game.name}`, error);
        throw error; // Promise.allSettled で rejected として記録
      }
    })
  );

  // 全ての store 書き込みが完了するまで待つ
  await storeQueue;

  // エラー結果をログに出力
  results.forEach((result, index) => {
    if (result.status === 'rejected') {
      console.error(
        `Game download failed: ${diffs[index]?.name}`,
        result.reason
      );
    }
  });
};
