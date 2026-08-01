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

    //#region コンストラクタ
    /**
     * M1.カウンタ部品
     * @param {string} elementId カウンタのDOMオブジェクトのID
     */
    constructor(elementId) {
        super();
        __assertIsString(elementId);

        this._element = __safeGetElementById(elementId);
    }
    //#endregion

    //#region プロパティ
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
        // 値の型をチェックする
        __assertIsNumber(newValue);

        this._unsafeValue = newValue;
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
    //#endregion

    //#region メソッド
    /**
     * 一つ増加させる
     */
    increment() {
        this.unsafValue++;
    }

    /**
     * 一つ減少させる
     */
    decrement() {
        this.unsafValue--;
    }
    //#endregion

    //#region 内部メンバ

    /**
     * 型チェックを行わずに値を設定する
     * クラス内部で値を設定する場合に使用する
     * @param {number} newValue 新しい値
     * @private
     */
    set _unsafeValue(newValue) {
        // 値の範囲をチェックする
        __assertBetween(newValue, this.minimum, this.maximum);

        this._count = newValue;
        this._updateDisplay();

        this.fire('change', this);
    }
    /**
     * 画面上の表示を更新する
     * @private
     */
    _updateDisplay() {
        if (this._element) {
            this._element.textContent = this._count;
        }
    }
    //#endregion
}
