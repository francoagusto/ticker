import { ITickStrategy } from "./ITickStrategy";
import { AbstractTicker } from "./AbstractTicker";
export declare class SetTimeoutTicker extends AbstractTicker implements ITickStrategy {
    private intervalId;
    constructor(update: Signal, fps: number);
    execute(): void;
    cancel(): void;
    isRunning(): boolean;
    private intervalCallback();
}
