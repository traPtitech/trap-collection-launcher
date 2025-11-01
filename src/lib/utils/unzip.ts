import { createWriteStream, mkdirSync, promises } from 'original-fs';
import path from 'path';
import unzipper from 'unzipper';
import iconv from 'iconv-lite';
import { md5sumFile } from './checksum';

export async function unzip(
  data: NodeJS.ReadableStream,
  downloadPath: string,
  absolutePath: string,
  md5: string,
  onDownload: () => void
) {
  // 一時ファイル削除
  await promises.unlink(downloadPath).catch(() => {});

  // ストリームを保存
  await new Promise<void>((resolve, reject) => {
    const stream = createWriteStream(downloadPath);
    data.pipe(stream);
    stream.on('finish', resolve);
    stream.on('error', reject);
  });

  onDownload();
  await promises.rename(downloadPath, absolutePath);

  // MD5 チェック
  const md5sum = await md5sumFile(absolutePath).catch(() => undefined);
  if (md5sum !== md5) throw new Error('MD5 checksum mismatch');

  // dist ディレクトリをクリーンアップ（既存のファイルを全て削除）
  const distDir = path.join(path.dirname(absolutePath), 'dist');
  await promises.rm(distDir, { recursive: true, force: true });
  mkdirSync(distDir, { recursive: true });

  // ZIP 解凍（ZIP64対応、Shift_JIS対応）
  // await new Promise<void>((resolve, reject) => {
  //   const stream = unzipper.Parse();
  //   const writePromises: Promise<void>[] = [];

  //   stream.on('entry', (entry: unzipper.Entry) => {
  //     const name = iconv.decode(Buffer.from(entry.path, 'binary'), 'shift_jis');
  //     const outPath = path.join(distDir, name);

  //     if (entry.type === 'Directory') {
  //       mkdirSync(outPath, { recursive: true });
  //       entry.autodrain();
  //     } else {
  //       mkdirSync(path.dirname(outPath), { recursive: true });

  //       // 各ファイルの書き込み完了を Promise で追跡
  //       const writePromise = new Promise<void>((resolveWrite, rejectWrite) => {
  //         const writeStream = createWriteStream(outPath);
  //         entry.pipe(writeStream);
  //         writeStream.on('finish', resolveWrite);
  //         writeStream.on('error', rejectWrite);
  //       });

  //       writePromises.push(writePromise);
  //     }
  //   });

  //   stream.on('close', async () => {
  //     try {
  //       // 全てのファイル書き込みが完了するのを待つ
  //       await Promise.all(writePromises);
  //       resolve();
  //     } catch (error) {
  //       reject(error);
  //     }
  //   });

  //   stream.on('error', reject);

  //   // ZIP ファイルを読み込む
  //   require('fs').createReadStream(absolutePath).pipe(stream);
  // });

  // Open を使って書き直す
  await new Promise<void>((resolve, reject) => {
    const stream = unzipper.Open.file(absolutePath);
    stream
      .then((directory) => {
        const extractPromises: Promise<void>[] = [];

        directory.files.forEach((file) => {
          const name = iconv.decode(
            Buffer.from(file.path, 'binary'),
            'shift_jis'
          );
          const outPath = path.join(distDir, name);

          if (file.type === 'Directory') {
            mkdirSync(outPath, { recursive: true });
          } else {
            mkdirSync(path.dirname(outPath), { recursive: true });

            const extractPromise = new Promise<void>(
              (resolveExtract, rejectExtract) => {
                file
                  .stream()
                  .pipe(createWriteStream(outPath))
                  .on('finish', resolveExtract)
                  .on('error', rejectExtract);
              }
            );

            extractPromises.push(extractPromise);
          }
        });

        return Promise.all(extractPromises);
      })
      .then(() => resolve())
      .catch(reject);
  });
}
