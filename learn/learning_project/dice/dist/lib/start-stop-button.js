import {
    __assertIsString,
    __safeGetElementById,
    __assertIsIncludedIn,
} from './assert.js';
import { EventHandler } from './event-handler.js';

const BUTTON_TYPE_START = 'start';
const BUTTON_TYPE_STOPPING = 'stopping';
const BUTTON_TYPE_STOP = 'stop';

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

    constructor(elementId) {
        super();
        __assertIsString(elementId);
        this._element = __safeGetElementById(elementId);
        this._registerEvent();
    }

    get buttonType() {
        return this._buttonType;
    }

    set buttonType(value) {
        // TODO ボタンの種類が正しいかどうかを検証して、タイプを設定する
        // その後、ボタンの見た目を更新するために _updateLookAndFeel() を呼び出す
    }

    _registerEvent() {
        // TODO DOM要素のクリックイベントを登録する
        // ボタンをクリックしたら。。。。。
        // - ボタンの種類が start の場合は、click_start イベントを発火する
        // - ボタンの種類が stop の場合は、click_stop イベントを発火する
        // - ボタンの種類が stopping の場合は、何もしない
    }

    _updateLookAndFeel() {
        this._setFace();
        this._setClass();
    }
    _setFace() {
        // TODO DOM要素のテキストをボタンの種類に応じて変更する
    }

    _setClass() {
        // TODO DOM要素のクラスをボタンの種類に応じて変更する
    }
}
