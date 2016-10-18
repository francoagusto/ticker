var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./AbstractTicker"], function (require, exports, AbstractTicker_1) {
    "use strict";
    var RAFTicker = (function (_super) {
        __extends(RAFTicker, _super);
        function RAFTicker(update, fps) {
            _super.call(this, update, fps);
            this.requestAnimationFrameId = -1;
            this.updateBinded = this.updateHandler.bind(this);
        }
        RAFTicker.prototype.isRunning = function () {
            return this.requestAnimationFrameId >= 0;
        };
        RAFTicker.prototype.execute = function () {
            this.updateHandler(0);
        };
        RAFTicker.prototype.cancel = function () {
            window.cancelAnimationFrame(this.requestAnimationFrameId);
            this.requestAnimationFrameId = -1;
        };
        RAFTicker.prototype.updateHandler = function (elapsedTime) {
            this.updateDispatch(elapsedTime);
            this.requestAnimationFrameId = window.requestAnimationFrame(this.updateBinded);
        };
        return RAFTicker;
    }(AbstractTicker_1.AbstractTicker));
    exports.RAFTicker = RAFTicker;
});
