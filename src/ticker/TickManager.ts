import {AbstractTicker} from "./strategies/AbstractTicker";
import {ITickStrategy} from "./strategies/ITickStrategy";
import {RAFTicker} from "./strategies/RAFTicker";
import {SetTimeoutTicker} from "./strategies/SetTimeoutTicker";
import {Signal} from "signals";
import {Dictionary} from "typescript-collections";
import * as ifvisible from "ifvisible";


export class TickManager {

    private _onUpdate: Signal;

    private paused: boolean = false;
    private currentTickerStrategy: ITickStrategy;

    private strategyCheckMap: Dictionary<()=>boolean, ITickStrategy> = new Dictionary<()=>boolean, ITickStrategy>();

    private static CHANGE_EVENTS: Array<string> = ["blur", "focus", "idle", "wakeup"];

    constructor(private fps: number = 60) {
        this._onUpdate = new Signal();


        this.strategyCheckMap.setValue(this.isFocused, new RAFTicker(this._onUpdate, this.fps));
        this.strategyCheckMap.setValue(this.isNotFocused, new SetTimeoutTicker(this._onUpdate, this.fps));

        //check only in these events
        this.checkStrategy();

        var callback: (any)=>any = this.checkStrategy.bind(this);
        for (var eventKey of TickManager.CHANGE_EVENTS) {
            ifvisible.on(eventKey, callback);
        }
    }

    private checkStrategy(): void {
        var keys = this.strategyCheckMap.keys();
        var strategy, checker;

        for (var i: number = 0; i < keys.length; i++) {
            checker = keys[i];
            if (checker()) {
                strategy = this.strategyCheckMap.getValue(checker);
                if (this.isNotCurrent(strategy)) {
                    this.switchStrategy(strategy);
                }
                return;
            }
        }
    }

    private isNotCurrent(strategy: ITickStrategy): boolean {
        return this.currentTickerStrategy != strategy;
    }

    private switchStrategy(strategy: ITickStrategy): void {
        if (this.currentTickerStrategy != null) {
            this.currentTickerStrategy.cancel();
        }

        this.currentTickerStrategy = strategy;
        if (!this.paused) {
            this.currentTickerStrategy.execute();
        }
    }

    private isFocused(): boolean {
        return ifvisible.now();
    }

    private isNotFocused(): boolean {
        return !ifvisible.now();
    }

    //public interface
    get onUpdate(): Signal {
        return this._onUpdate;
    }

    resume(): void {
        if (this.currentTickerStrategy != null && !this.currentTickerStrategy.isRunning()) {
            this.currentTickerStrategy.execute();
            this.paused = false;
        }
    }

    pause(): void {

        if (this.currentTickerStrategy != null && this.currentTickerStrategy.isRunning()) {
            this.currentTickerStrategy.cancel();
            this.paused = true;
        }
    }
}