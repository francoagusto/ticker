import {Signal} from "signals";

export class AbstractTicker {

    protected static FPS_TO_MS_NUM:number = 1000;
    private lastTime:number = 0;
    private fpms:number;

    constructor(private update:Signal, protected fps:number) {
        this.fpms = fps / AbstractTicker.FPS_TO_MS_NUM;
    }

    protected updateDispatch(currentTime:number):void {

        // Allow calling update directly with default currentTime.
        var currentTime = currentTime || performance.now();
        // Save uncapped elapsedMS for measurement
        var elapsedMS = currentTime - this.lastTime;
        this.lastTime = currentTime;
        /*// cap the milliseconds elapsed used for deltaTime
         if (elapsedMS > this._maxElapsedMS){
         elapsedMS = this._maxElapsedMS;
         }*/
        //console.log("Elapsed: " + elapsedMS);
        this.update.dispatch(elapsedMS);
    }
}