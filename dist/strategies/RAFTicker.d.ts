import { ITickStrategy } from "./ITickStrategy";
import { AbstractTicker } from "./AbstractTicker";
export declare class RAFTicker extends AbstractTicker implements ITickStrategy {
    private updateBinded;
    private requestAnimationFrameId;
    constructor(update: Signal, fps: number);
    isRunning(): boolean;
    execute(): void;
    cancel(): void;
    private updateHandler(elapsedTime);
}
