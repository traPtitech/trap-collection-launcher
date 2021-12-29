import { createWriteStream, mkdirSync, writeFileSync, promises } from 'fs';
import path from 'path';
import AdmZip from 'adm-zip';
import iconv from 'iconv-lite';
import { md5sumFile } from './checksum';

const unzip = async (
  data: any,
  downloadPath: string,
  absolutePath: string,
  md5: string,
  onDownload: () => void
) => {
  await promises.unlink(downloadPath).catch(() => {
    return;
  });

  const stream = createWriteStream(downloadPath);
  data.pipe(stream);

  await new Promise<void>((resolve, reject) => {
    stream.on('close', async () => {
      onDownload();

      await promises.rename(downloadPath, absolutePath);

      // checksum
      const md5sum = await md5sumFile(absolutePath).catch(() => undefined);
      if (md5sum !== md5) {
        reject();
        return;
      }

      const zip = new AdmZip(absolutePath);

      const absoluteDir = path.join(path.dirname(absolutePath), 'dist');

      const zipEntries = zip.getEntries();

      zipEntries.forEach((v) => {
        const filePath = path.join(
          absoluteDir,
          iconv.decode(v.rawEntryName, 'shift_jis')
        );
        if (v.isDirectory) {
          mkdirSync(filePath, { recursive: true });
        } else {
          const file = zip.readFile(v);
          if (file) {
            mkdirSync(path.dirname(filePath), { recursive: true });
            writeFileSync(filePath, file);
          }
        }
      });

      resolve();
    });
    stream.on('error', reject);
  });
};

export default unzip;
