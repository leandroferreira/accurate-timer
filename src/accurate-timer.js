define('accurate-timer', ['EventEmitter'], function (EventEmitter) {
  'use strict';

  var AccurateTimer = function () {
    // default parameters
    this.fps = 30;
    this.interval = null;
    this.intervalStart = null;
    this.elapsed = null;
  };

  AccurateTimer.prototype = new EventEmitter();

  AccurateTimer.TICK = 'tick';

  AccurateTimer.prototype.start = function () {
    this.pause();
    if (!this.intervalStart) {
      this.intervalStart = Date.now();
    }
    this.interval = setInterval(this.tick.bind(this), 1000 / this.fps);
    this.tick();
  };

  AccurateTimer.prototype.tick = function () {
    this.elapsed = Date.now() - this.intervalStart;
    this.emitEvent(AccurateTimer.TICK);
  };

  AccurateTimer.prototype.pause = function () {
    if (this.interval) {
      clearInterval(this.interval);
    }
  };

  AccurateTimer.prototype.stop = function () {
    this.pause();
    this.elapsed = 0;
  };

  return AccurateTimer;
});