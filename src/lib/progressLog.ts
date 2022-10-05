export class ProgressLog {
  private log: TraPCollection.Progress;

  constructor(totalFiles: number, totalPoster: number, totalVideo: number) {
    this.log = {
      fileDownload: { complete: 0, total: totalFiles },
      fileDecompress: { complete: 0, total: totalFiles },
      posterDownload: { complete: 0, total: totalPoster },
      videoDownload: { complete: 0, total: totalVideo },
    };
  }

  public reset(totalFiles: number, totalPoster: number, totalVideo: number) {
    this.log = {
      fileDownload: { complete: 0, total: totalFiles },
      fileDecompress: { complete: 0, total: totalFiles },
      posterDownload: { complete: 0, total: totalPoster },
      videoDownload: { complete: 0, total: totalVideo },
    };
  }

  public get(): TraPCollection.Progress {
    return this.log;
  }

  public add(target: keyof TraPCollection.Progress) {
    this.log[target].complete += 1;
  }
}

const progressLog = new ProgressLog(0, 0, 0);

export default progressLog;
