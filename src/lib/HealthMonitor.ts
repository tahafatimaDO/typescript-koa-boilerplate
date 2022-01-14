/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import moment from 'moment';

export interface Status {
  startTime: string;
  upTime: string;
  isShuttingDown: boolean;
}

export default class HealthMonitor {
  private startTime: number;

  private isShuttingDown: boolean;

  constructor() {
    this.isShuttingDown = false;
    this.startTime = Date.now();
  }

  public shuttingDown() {
    this.isShuttingDown = true;
  }

  public getStatus(): Status {
    return {
      startTime: new Date(this.startTime).toISOString(),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      upTime: moment(this.startTime).fromNow(true),
      isShuttingDown: this.isShuttingDown,
    };
  }
}
