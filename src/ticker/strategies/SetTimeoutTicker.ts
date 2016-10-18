import {Signal} from "signals";
import {ITickStrategy} from "./ITickStrategy";
import {AbstractTicker} from "./AbstractTicker";



export class SetTimeoutTicker extends AbstractTicker implements ITickStrategy {


    private intervalId:number = -1;


    constructor(update:Signal, fps:number) {
        super(update, fps);
    }

    execute():void {
        console.log("SetTimeoutTicker.execute");

        var itervalTime:number = AbstractTicker.FPS_TO_MS_NUM / this.fps;
        this.intervalId = setInterval(this.intervalCallback.bind(this), itervalTime);
    }

    cancel():void {
        console.log("SetTimeoutTicker.cancel");
        clearInterval(this.intervalId);
        this.intervalId = -1;
    }

    isRunning():boolean {
        return this.intervalId >= 0;
    }

    private intervalCallback():void {
        //console.log("SetTimeoutTicker.intervalCallback");
        this.updateDispatch(0);
    }


}