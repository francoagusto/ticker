export declare class TickManager {
    private fps;
    private _onUpdate;
    private paused;
    private currentTickerStrategy;
    private strategyCheckMap;
    private static CHANGE_EVENTS;
    constructor(fps?: number);
    private checkStrategy();
    private isNotCurrent(strategy);
    private switchStrategy(strategy);
    private isFocused();
    private isNotFocused();
    readonly onUpdate: Signal;
    resume(): void;
    pause(): void;
}
