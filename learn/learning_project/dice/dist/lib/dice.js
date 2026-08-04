import { __assertIsString, __safeGetElementById } from './assert.js';
import { EventHandler } from './event-handler.js';

/////////////////////////////////////////////
// さいころの状態が変化したときに発火するイベント名

/**
 * さいころが転がり始めたときに発火するイベント名
 */
export const EVENT_NAME_STARTED = 'started';
/**
 * さいころが止まろうとしているときに発火するイベント名
 */
export const EVENT_NAME_STOPPING = 'stopping';
/**
 * さいころが止まったときに発火するイベント名
 */
export const EVENT_NAME_STOPPED = 'stopped';
/**
 * さいころの値が変化したときに発火するイベント名
 */
export const EVENT_NAME_CHANGED = 'changed';

/**
 * さいころの状態を表す定数
 */
export const ROLLING_STATE = {
    /**
     * さいころが転がっている状態
     */
    started: 0,
    /**
     * さいころが止まろうとしている状態
     */
    stopping: 1,
    /**
     * さいころが止まった状態
     */
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
    _stoppingCounter = UNTIL_STOP_DEFAULT;

    //#region constructor
    /**
     * さいころの目を管理するクラスのインスタンスを生成する
     * @param {string} elementId さいころの要素名
     */
    constructor(elementId) {
        super();
        // 引数の妥当性確認
        __assertIsString(elementId);
        this._element = __safeGetElementById(elementId);

        // スタートイベントを登録する
        this.on(
            STATE_TO_EVENT[ROLLING_STATE.started],
            this._onStarted.bind(this)
        );
        // 値変化イベントを登録する
        this.on(EVENT_NAME_CHANGED, this._onChanged.bind(this));
    }
    //#endregion

    //#region public properties
    /**
     * さいころの目を取得する。
     * @returns {number} さいころの目
     */
    get value() {
        return this._value;
    }
    /**
     * さいころの目を設定する。
     * @param {number} newValue さいころの目
     */
    set value(newValue) {
        // 値の型と範囲をチェックする
        __assertIsNumber(newValue);
        __assertBetween(newValue, 1, 6);
        this._unsafeValue = newValue;
    }

    /**
     * さいころの状態を取得する。
     *
     * ROLLING_STATEのいずれかの値を返却する。
     *
     * @returns {number} さいころの状態
     */
    get state() {
        return this._state;
    }
    //#endregion

    //#region public methods
    /**
     * さいころを転がす
     * すでに転がっている場合は何もしない
     */
    start() {
        if (this.state !== ROLLING_STATE.stopped) {
            return;
        }
        this._unsafeState = ROLLING_STATE.started;
    }
    /**
     * さいころを止める
     * すでに止まっている場合は何もしない
     */
    stop() {
        if (this.state !== ROLLING_STATE.started) {
            return;
        }
        this._unsafeState = ROLLING_STATE.stopping;
    }
    //#endregion

    //#region private members

    //#region private properties
    /**
     * さいころの状態に応じたループの実行間隔を取得する
     */
    get _interval() {
        return this.state === ROLLING_STATE.started
            ? ROLLING_INTERVAL
            : STOPPING_INTERVAL;
    }
    /**
     * さいころの状態を設定する
     * 状態が変化した場合は、対応するイベントを発火する
     * @param {number} value さいころの状態
     */
    set _unsafeState(value) {
        if (this._state !== value) {
            this._state = value;
            this.fire(STATE_TO_EVENT[value], this);
        }
    }

    /**
     * さいころの目を設定する
     * 目が変化した場合は、対応するイベントを発火する
     * @param {number} value さいころの目
     */
    set _unsafeValue(value) {
        this._value = value;
        this.fire(EVENT_NAME_CHANGED, this);
    }
    //#endregion

    /**
     * さいころが転がり始めたときに発火するイベントの処理
     */
    _onStarted() {
        this._initLoop();
        this._runLoop();
    }
    /**
     * さいころの目が変化したときに発火するイベントの処理
     */
    _onChanged() {
        if (this._element) {
            this._element.textContent = this.value.toString();
        }
        if (this.state === ROLLING_STATE.stopping) {
            this._stoppingCounter--;
            if (this._stoppingCounter <= 0) {
                this._unsafeState = ROLLING_STATE.stopped;
            }
        }
    }

    /**
     * さいころ目変更ループ初期化処理
     */
    _initLoop() {
        // UNTIL_STOP_DEFAULTを中心に±UNTIL_STOP_AROUNDの範囲で
        this._stoppingCounter = getRandomValue(
            UNTIL_STOP_DEFAULT - UNTIL_STOP_AROUND,
            UNTIL_STOP_DEFAULT + UNTIL_STOP_AROUND
        );
    }
    /**
     * さいころ目変更メインループ
     */
    _runLoop() {
        // さいころを止めるべき場合は何もせずにそこで終わる
        if (this.state === ROLLING_STATE.stopped) {
            return;
        }

        // さいころを次の目にする
        this._roll();

        // 実行間隔後に再起呼び出しをする
        setTimeout(this._runLoop.bind(this), this._interval);
    }
    /**
     * さいころの目を次の目にする
     */
    _roll() {
        this._unsafeValue = getRandomValue(1, 6, this.value);
    }
    //#endregion
}

/**
 * 最小値と最大値の間の値の乱数を取得する。
 * ひとつ前の値と同じ値が出ないようにする。
 * @param {number} min 最小の値
 * @param {number} max 最大の値
 * @param {number || undefined} prev 一つ前の値
 */
function getRandomValue(min, max, prev) {
    let newValue = Math.floor(Math.random() * (max - min + 1)) + min;
    while (prev === newValue) {
        newValue = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return newValue;
}
