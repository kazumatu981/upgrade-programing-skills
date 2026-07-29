import { __assertIsString, __safeGetElementById } from './assert.js';
import { EventHandler } from './event-handler.js';

const ROLLING_STATE = {
    started: 0,
    stopping: 1,
    stopped: 2,
};

const EVENT_NAME = {
    0: 'started',
    1: 'stoppig',
    2: 'stopped',
};

const ROLLING_INTERVAL = 100;
const STOPPING_INTERVAL = ROLLING_INTERVAL * 2;
const UNTIL_STOP_DEFAULT = 5;
const UNTIL_STOP_AROUND = 3;

export class Dice extends EventHandler {
    _element = null;
    _value = 1;
    _state = ROLLING_STATE.stopped;
    _untilStop = UNTIL_STOP_DEFAULT;
    _untilStopCounter = 0;

    constructor(elementId) {
        super();
        __assertIsString(elementId);
        this._element = __safeGetElementById(elementId);
        this.on(EVENT_NAME[ROLLING_STATE.started], this._onStarted.bind(this));
    }
    get state() {
        return this._state;
    }
    set state(value) {
        this._state = value;
        this.fire(EVENT_NAME[value], this);
    }

    get value() {
        return this._value;
    }

    set value(newValue) {
        // 値の型と範囲をチェックする
        __assertIsNumber(newValue);
        __assertBetween(newValue, 1, 6);
        this._setUnsafeValue(newValue);
    }

    start() {
        if (this.state !== ROLLING_STATE.stopped) {
            return;
        }
        this.state = ROLLING_STATE.started;
    }

    stop() {
        if (this.state !== ROLLING_STATE.started) {
            return;
        }
        this.state = ROLLING_STATE.stopping;
    }

    _onStarted() {
        this._loopInit();
        this._loop();
    }

    _loopInit() {
        // UNTIL_STOP_DEFAULTを中心に±UNTIL_STOP_AROUNDの範囲で
        this._untilStop = getRandom(
            UNTIL_STOP_DEFAULT - UNTIL_STOP_AROUND,
            UNTIL_STOP_DEFAULT + UNTIL_STOP_AROUND
        );
        this._untilStopCounter = 0;
    }
    _loop() {
        // 停止状態の場合は何もしない
        if (this.state === ROLLING_STATE.stopped) return;
        // 停止中ならループカウンタを判定する
        if (
            this.state === ROLLING_STATE.stopping &&
            this._untilStop < this._untilStopCounter++
        ) {
            this.state = ROLLING_STATE.stopped;
            return;
        }

        // さいころを次の目にする
        this._rolling();

        // 実行間隔を現在の状態で決定する
        const interval =
            this.state === ROLLING_STATE.started
                ? ROLLING_INTERVAL
                : STOPPING_INTERVAL;

        // 実行間隔後に再起呼び出しをする
        setTimeout(this._loop.bind(this), interval);
    }

    _setUnsafeValue(value) {
        this._value = value;
        this.fire('changed', this);
    }

    _rolling() {
        var newValue = getRandom(1, 6, this.value);
        this._setUnsafeValue(newValue);
        if (this._element) {
            this._element.textContent = this.value.toString();
        }
    }
}

/**
 * 最小値と最大値の間の値の乱数を取得する
 * @param {number} min 最小の値
 * @param {number} max 最大の値
 * @param {number || undefined} prev 一つ前の値
 */
function getRandom(min, max, prev) {
    var newValue = Math.floor(Math.random() * (max - min + 1)) + min;
    while (prev === newValue) {
        newValue = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return newValue;
}
