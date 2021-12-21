import crypto from 'crypto';
import fs from 'fs';

export const md5sumFile = async (filePath: string): Promise<string> =>
  new Promise((resolve) => {
    const data = fs.createReadStream(filePath);
    const md5hash = crypto.createHash('md5');

    data.pipe(md5hash).on('finish', () => {
      const md5sum = md5hash.digest('hex');
      resolve(md5sum);
    });
  });
