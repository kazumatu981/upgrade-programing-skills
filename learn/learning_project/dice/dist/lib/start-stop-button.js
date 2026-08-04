import {
    __assertIsString,
    __safeGetElementById,
    __assertIsIncludedIn,
} from './assert.js';
import { EventHandler } from './event-handler.js';

export const BUTTON_TYPE_START = 'start';
export const BUTTON_TYPE_STOPPING = 'stopping';
export const BUTTON_TYPE_STOP = 'stop';

const BUTTON_FACE = {
    [BUTTON_TYPE_START]: 'Start',
    [BUTTON_TYPE_STOPPING]: 'Stopping...',
    [BUTTON_TYPE_STOP]: 'Stop',
};

const BUTTON_CLASS = {
    [BUTTON_TYPE_START]: 'start-button',
    [BUTTON_TYPE_STOPPING]: 'stopping-button',
    [BUTTON_TYPE_STOP]: 'stop-button',
};

export const EVENT_ON_CLICK_START = 'click_start';
export const EVENT_ON_CLICK_STOP = 'click_stop';

export class StartStopButton extends EventHandler {
    _buttonType = BUTTON_TYPE_START;
    _element = null;

    //#region constructor
    constructor(elementId) {
        super();
        __assertIsString(elementId);
        this._element = __safeGetElementById(elementId);
        this._registerEvent();
    }
    //#endregion

    //#region public properties
    /**
     * ボタンの種類を取得する。
     * @returns {string} ボタンの種類
     * @see BUTTON_TYPE_START
     * @see BUTTON_TYPE_STOPPING
     * @see BUTTON_TYPE_STOP
     */
    get buttonType() {
        return this._buttonType;
    }

    /**
     * ボタンの種類を設定する。
     * @param {string} value ボタンの種類
     * @see BUTTON_TYPE_START
     * @see BUTTON_TYPE_STOPPING
     * @see BUTTON_TYPE_STOP
     */
    set buttonType(value) {
        // TODO ボタンの種類が正しいかどうかを検証して、タイプを設定する
        // その後、ボタンの見た目を更新するために _updateLookAndFeel() を呼び出す
    }
    //#endregion

    //#region private methods
    /**
     * DOM要素のクリックイベントを登録する
     */
    _registerEvent() {
        // TODO DOM要素のクリックイベントを登録する
        this._element.addEventListener('click', () => {
            // TODO ボタンをクリックしたときの処理を実装する
            // ボタンをクリックしたら。。。。。
            // - ボタンの種類が start の場合は、click_start イベントを発火する
            // - ボタンの種類が stop の場合は、click_stop イベントを発火する
            // - ボタンの種類が stopping の場合は、何もしない
        });
    }

    /**
     * ボタンの見た目を更新する
     */
    _updateLookAndFeel() {
        this._setFace();
        this._setClass();
    }
    /**
     * DOM要素のテキストをボタンの種類に応じて変更する
     */
    _setFace() {
        // TODO DOM要素のテキストをボタンの種類に応じて変更する
    }

    /**
     * DOM要素のクラスをボタンの種類に応じて変更する
     */
    _setClass() {
        // TODO DOM要素のクラスをボタンの種類に応じて変更する
    }
    //#endregion
}
