define(["require", "exports"], function (require, exports) {
    "use strict";
    var AbstractTicker = (function () {
        function AbstractTicker(update, fps) {
            this.update = update;
            this.fps = fps;
            this.lastTime = 0;
            this.fpms = fps / AbstractTicker.FPS_TO_MS_NUM;
        }
        AbstractTicker.prototype.updateDispatch = function (currentTime) {
            var currentTime = currentTime || performance.now();
            var elapsedMS = currentTime - this.lastTime;
            this.lastTime = currentTime;
            this.update.dispatch(elapsedMS);
        };
        AbstractTicker.FPS_TO_MS_NUM = 1000;
        return AbstractTicker;
    }());
    exports.AbstractTicker = AbstractTicker;
});
