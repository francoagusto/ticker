var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./AbstractTicker"], function (require, exports, AbstractTicker_1) {
    "use strict";
    var SetTimeoutTicker = (function (_super) {
        __extends(SetTimeoutTicker, _super);
        function SetTimeoutTicker(update, fps) {
            _super.call(this, update, fps);
            this.intervalId = -1;
        }
        SetTimeoutTicker.prototype.execute = function () {
            console.log("SetTimeoutTicker.execute");
            var itervalTime = AbstractTicker_1.AbstractTicker.FPS_TO_MS_NUM / this.fps;
            this.intervalId = setInterval(this.intervalCallback.bind(this), itervalTime);
        };
        SetTimeoutTicker.prototype.cancel = function () {
            console.log("SetTimeoutTicker.cancel");
            clearInterval(this.intervalId);
            this.intervalId = -1;
        };
        SetTimeoutTicker.prototype.isRunning = function () {
            return this.intervalId >= 0;
        };
        SetTimeoutTicker.prototype.intervalCallback = function () {
            this.updateDispatch(0);
        };
        return SetTimeoutTicker;
    }(AbstractTicker_1.AbstractTicker));
    exports.SetTimeoutTicker = SetTimeoutTicker;
});
