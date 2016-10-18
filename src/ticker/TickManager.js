define(["require", "exports", "./strategies/RAFTicker", "./strategies/SetTimeoutTicker", "signals", "typescript-collections", "ifvisible"], function (require, exports, RAFTicker_1, SetTimeoutTicker_1, signals_1, typescript_collections_1, ifvisible) {
    "use strict";
    var TickManager = (function () {
        function TickManager(fps) {
            if (fps === void 0) { fps = 60; }
            this.fps = fps;
            this.paused = false;
            this.strategyCheckMap = new typescript_collections_1.Dictionary();
            this._onUpdate = new signals_1.Signal();
            this.strategyCheckMap.setValue(this.isFocused, new RAFTicker_1.RAFTicker(this._onUpdate, this.fps));
            this.strategyCheckMap.setValue(this.isNotFocused, new SetTimeoutTicker_1.SetTimeoutTicker(this._onUpdate, this.fps));
            this.checkStrategy();
            var callback = this.checkStrategy.bind(this);
            for (var _i = 0, _a = TickManager.CHANGE_EVENTS; _i < _a.length; _i++) {
                var eventKey = _a[_i];
                ifvisible.on(eventKey, callback);
            }
        }
        TickManager.prototype.checkStrategy = function () {
            var keys = this.strategyCheckMap.keys();
            var strategy, checker;
            for (var i = 0; i < keys.length; i++) {
                checker = keys[i];
                if (checker()) {
                    strategy = this.strategyCheckMap.getValue(checker);
                    if (this.isNotCurrent(strategy)) {
                        this.switchStrategy(strategy);
                    }
                    return;
                }
            }
        };
        TickManager.prototype.isNotCurrent = function (strategy) {
            return this.currentTickerStrategy != strategy;
        };
        TickManager.prototype.switchStrategy = function (strategy) {
            if (this.currentTickerStrategy != null) {
                this.currentTickerStrategy.cancel();
            }
            this.currentTickerStrategy = strategy;
            if (!this.paused) {
                this.currentTickerStrategy.execute();
            }
        };
        TickManager.prototype.isFocused = function () {
            return ifvisible.now();
        };
        TickManager.prototype.isNotFocused = function () {
            return !ifvisible.now();
        };
        Object.defineProperty(TickManager.prototype, "onUpdate", {
            get: function () {
                return this._onUpdate;
            },
            enumerable: true,
            configurable: true
        });
        TickManager.prototype.resume = function () {
            if (this.currentTickerStrategy != null && !this.currentTickerStrategy.isRunning()) {
                this.currentTickerStrategy.execute();
                this.paused = false;
            }
        };
        TickManager.prototype.pause = function () {
            if (this.currentTickerStrategy != null && this.currentTickerStrategy.isRunning()) {
                this.currentTickerStrategy.cancel();
                this.paused = true;
            }
        };
        TickManager.CHANGE_EVENTS = ["blur", "focus", "idle", "wakeup"];
        return TickManager;
    }());
    exports.TickManager = TickManager;
});
