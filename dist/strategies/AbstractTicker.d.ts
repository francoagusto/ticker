export declare class AbstractTicker {
    private update;
    protected fps: number;
    protected static FPS_TO_MS_NUM: number;
    private lastTime;
    private fpms;
    constructor(update: Signal, fps: number);
    protected updateDispatch(currentTime: number): void;
}
