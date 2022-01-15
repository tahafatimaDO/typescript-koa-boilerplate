export interface Status {
    startTime: string;
    upTime: string;
    isShuttingDown: boolean;
}
export default class HealthMonitor {
    private startTime;
    private isShuttingDown;
    constructor();
    shuttingDown(): void;
    getStatus(): Status;
}
