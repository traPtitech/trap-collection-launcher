import { createWriteStream, mkdirSync, writeFileSync } from 'fs';
import path from 'path';
import AdmZip from 'adm-zip';
import iconv from 'iconv-lite';
import { md5sumFile } from './checksum';

const unzip = async (data: any, absolutePath: string, md5: string) => {
  const stream = createWriteStream(absolutePath);
  data.pipe(stream);

  await new Promise<void>((resolve, reject) => {
    stream.on('finish', async () => {
      // checksum
      const md5sum = await md5sumFile(absolutePath).catch(() => undefined);
      if (md5sum !== md5) {
        reject();
        return;
      }

      const zip = new AdmZip(absolutePath);

      const absoluteDir = path.join(path.dirname(absolutePath), 'dist');

      const zipEntries = zip.getEntries();

      zipEntries.map(async (v) => {
        const filePath = path.join(
          absoluteDir,
          iconv.decode(v.rawEntryName, 'shift_jis')
        );
        if (v.isDirectory) {
          mkdirSync(filePath, { recursive: true });
        } else {
          const file = zip.readFile(v);
          if (file) {
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
