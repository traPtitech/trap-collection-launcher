import child_process from 'child_process';

export const checkJava = (): Promise<boolean> =>
  new Promise((resolve) => {
    child_process.exec('java -version', (_err, _stdout, stderr) => {
      const match = stderr.match(/version "(.+?)"/)?.[1];
      resolve(Boolean(match));
    });
  });
