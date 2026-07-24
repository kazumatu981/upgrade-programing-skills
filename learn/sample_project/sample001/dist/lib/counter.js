import {
    __assertIsString,
    __assertIsNumber,
    __assertBetween,
    __safeGetElementById,
} from './assert.js';

import { EventHandler } from './event-handler.js';

export class Counter extends EventHandler {
    _count = 0;
    _element = null;

    _minimum = 0;
    _maximum = 10;

    /**
     * M1.カウンタ部品
     * @param {string} elementId カウンタのDOMオブジェクトのID
     */
    constructor(elementId) {
        super();

        __assertIsString(elementId);
        this._element = __safeGetElementById(elementId);
    }

    /**
     * 値を取得する
     */
    get value() {
        return this._count;
    }

    /**
     * 値を設定する。
     */
    set value(newValue) {
        // 値の型と範囲をチェックする
        __assertIsNumber(newValue);
        __assertBetween(newValue, this.minimum, this.maximum);

        // 値を設定する
        this._count = newValue;

        // 画面上の表示を更新する
        this._updateDisplay();

        // 値が変更したことを通知する
        this.fire('change', this);
    }

    /**
     * 下限値
     */
    get minimum() {
        return this._minimum;
    }

    /**
     * 上限値
     */
    get maximum() {
        return this._maximum;
    }

    //#region メソッド
    /**
     * 一つ増加させる
     */
    increment() {
        this.value++;
    }

    /**
     * 一つ減少させる
     */
    decrement() {
        this.value--;
    }
    //#endregion

    /**
     * 画面上の表示を更新する
     */
    _updateDisplay() {
        this._element.textContent = this._count;
    }
}
