import { __assertIsString, __safeGetElementById } from './assert.js';
import { EventHandler } from './event-handler.js';

export const EVENT_NAME_STARTED = 'started';
export const EVENT_NAME_STOPPING = 'stopping';
export const EVENT_NAME_STOPPED = 'stopped';
export const EVENT_NAME_CHANGED = 'changed';

const ROLLING_STATE = {
    started: 0,
    stopping: 1,
    stopped: 2,
};

const STATE_TO_EVENT = {
    0: EVENT_NAME_STARTED,
    1: EVENT_NAME_STOPPING,
    2: EVENT_NAME_STOPPED,
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
    _stoppingCounter = 0;

    constructor(elementId) {
        super();
        __assertIsString(elementId);
        this._element = __safeGetElementById(elementId);
        this.on(
            STATE_TO_EVENT[ROLLING_STATE.started],
            this._onStarted.bind(this)
        );
        this.on(EVENT_NAME_CHANGED, this._onChanged.bind(this));
    }

    get value() {
        return this._value;
    }

    get state() {
        return this._state;
    }

    set value(newValue) {
        // 値の型と範囲をチェックする
        __assertIsNumber(newValue);
        __assertBetween(newValue, 1, 6);
        this._unsafeValue = newValue;
    }

    start() {
        if (this.state !== ROLLING_STATE.stopped) {
            return;
        }
        this._unsafeState = ROLLING_STATE.started;
    }

    stop() {
        if (this.state !== ROLLING_STATE.started) {
            return;
        }
        this._unsafeState = ROLLING_STATE.stopping;
    }

    get _interval() {
        return this.state === ROLLING_STATE.started
            ? ROLLING_INTERVAL
            : STOPPING_INTERVAL;
    }

    get _shouldBreakLoop() {
        return (
            this.state === ROLLING_STATE.stopped ||
            (this.state === ROLLING_STATE.stopping &&
                this._untilStop < this._stoppingCounter)
        );
    }

    set _unsafeState(value) {
        if (this._state !== value) {
            this._state = value;
            this.fire(STATE_TO_EVENT[value], this);
        }
    }

    set _unsafeValue(value) {
        this._value = value;
        this.fire(EVENT_NAME_CHANGED, this);
    }

    _onStarted() {
        this._initLoop();
        this._runLoop();
    }

    _onChanged() {
        if (this._element) {
            this._element.textContent = this.value.toString();
        }
        if (this.state === ROLLING_STATE.stopping) {
            this._stoppingCounter++;
        }
    }

    _initLoop() {
        // UNTIL_STOP_DEFAULTを中心に±UNTIL_STOP_AROUNDの範囲で
        this._untilStop = getRandomValue(
            UNTIL_STOP_DEFAULT - UNTIL_STOP_AROUND,
            UNTIL_STOP_DEFAULT + UNTIL_STOP_AROUND
        );
        this._stoppingCounter = 0;
    }
    _runLoop() {
        // さいころを止めるべき場合は何もせずにそこで終わる
        if (this._shouldBreakLoop) {
            this._unsafeState = ROLLING_STATE.stopped;
            return;
        }

        // さいころを次の目にする
        this._roll();

        // 実行間隔後に再起呼び出しをする
        setTimeout(this._runLoop.bind(this), this._interval);
    }

    _roll() {
        this._unsafeValue = getRandomValue(1, 6, this.value);
    }
}

/**
 * 最小値と最大値の間の値の乱数を取得する
 * @param {number} min 最小の値
 * @param {number} max 最大の値
 * @param {number || undefined} prev 一つ前の値
 */
function getRandomValue(min, max, prev) {
    var newValue = Math.floor(Math.random() * (max - min + 1)) + min;
    while (prev === newValue) {
        newValue = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return newValue;
}
