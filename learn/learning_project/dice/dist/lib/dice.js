import { __assertIsString, __safeGetElementById } from './assert.js';
import { EventHandler } from './event-handler.js';

export class Dice extends EventHandler {
    _element = null;
    _value = 1;
    _intervalId = null;
    _interval = 100;

    constructor(elementId) {
        super();
        __assertIsString(elementId);
        this._element = __safeGetElementById(elementId);
    }

    get value() {
        return this._value;
    }

    set value(newValue) {
        // 値の型と範囲をチェックする
        __assertIsNumber(newValue);
        __assertBetween(newValue, 1, 6);
        this._value = newValue;
        this.fire('valueChanged', this);
    }

    _nextValue() {
        return Math.floor(Math.random() * 6) + 1;
    }

    startRolling() {
        if (this._intervalId !== null) {
            return;
        }
        this._intervalId = setInterval(() => {
            this.value = this._nextValue();
            this._updateDisplay();
        }, this._interval);
        this.fire('rollingStarted', this);
    }

    stopRolling() {
        if (this._intervalId === null) {
            return;
        }
        clearInterval(this._intervalId);
        this._intervalId = null;
        this.fire('rollingStopped', this);
    }

    _updateDisplay() {
        if (this._element) {
            this._element.textContent = this.value.toString();
        }
    }
}
