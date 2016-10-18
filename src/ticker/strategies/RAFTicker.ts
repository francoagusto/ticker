import {ITickStrategy} from "./ITickStrategy";
import {AbstractTicker} from "./AbstractTicker";

import {Signal} from "signals";

export class RAFTicker extends AbstractTicker implements ITickStrategy {

    private updateBinded:()=>void;
    private requestAnimationFrameId:number = -1;


    constructor(update:Signal, fps:number) {
        super(update, fps);
        this.updateBinded = this.updateHandler.bind(this);
    }

    isRunning():boolean {
        return this.requestAnimationFrameId >= 0;
    }
    
    execute():void {
        this.updateHandler(0);
    }

    cancel():void {
        window.cancelAnimationFrame(this.requestAnimationFrameId);
        this.requestAnimationFrameId = -1;
    }

    private updateHandler(elapsedTime:number):void {
        this.updateDispatch(elapsedTime);
        this.requestAnimationFrameId = window.requestAnimationFrame(this.updateBinded);
    }

}