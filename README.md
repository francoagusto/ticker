# Ticker Manager:
    Ticker manager for use in renders like PIXI.JS, with switch between RAF and setTimeout when the browser is minimized or without focus.
You could use https://github.com/turuslan/HackTimer, to keep setTimeout rate.

# Usage

    npm install typescript-collections --save

    ES6 import ... from

    ```typescript
    import {TickerManager} from 'ticker';

    var tickerManager = new TickerManager();
    tickerManager.onUpdate.add(this.tickerHandler, this);
    ```


# Notes

# Compile and build bundle:
    npm install
    tsc
    webpack