import { __assertIsString, __safeGetElementById } from './assert.js';
import { EventHandler } from './event-handler.js';

export class Controller extends EventHandler {
    _enableIncrement = false;
    _enableDecrement = false;

    //#region コンストラクタ
    /**
     * M2.コントローラ部品
     * @param {string} incrementButtonId プラスボタンのDOMオブジェクトのID
     * @param {string} decrementButtonId マイナスボタンのDOMオブジェクトのID
     */
    constructor(incrementButtonId, decrementButtonId) {
        super();
        __assertIsString(incrementButtonId);
        __assertIsString(decrementButtonId);

        this._incrementButton = __safeGetElementById(incrementButtonId);
        this._decrementButton = __safeGetElementById(decrementButtonId);

        this._registerButtonEvents();
    }
    //#endregion

    //#region プロパティ
    /**
     * プラスボタンの有効状態を取得する
     */
    get enableIncrement() {
        return this._enableIncrement;
    }
    /**
     * プラスボタンの有効状態を設定する
     */
    set enableIncrement(value) {
        this._enableIncrement = value;
        this._setButtonStyle(this._incrementButton, value);
    }
    /**
     * マイナスボタンの有効状態を取得する
     */
    get enableDecrement() {
        return this._enableDecrement;
    }
    /**
     * マイナスボタンの有効状態を設定する
     */
    set enableDecrement(value) {
        this._enableDecrement = value;
        this._setButtonStyle(this._decrementButton, value);
    }
    //#endregion

    //#region 内部メソッド
    /**
     * ボタンのクリックイベントを登録する
     * @private
     */
    _registerButtonEvents() {
        this._incrementButton.addEventListener('click', () => {
            if (this.enableIncrement) {
                this.fire('click_increment', this);
            }
        });
        this._decrementButton.addEventListener('click', () => {
            if (this.enableDecrement) {
                this.fire('click_decrement', this);
            }
        });
    }

    /**
     * ボタンのスタイルを設定する
     * @param {Element} button 対象DOMエレメント
     * @param {boolean} enabled 活性化する場合はtrue、非活性化する場合はfalse
     * @private
     */
    _setButtonStyle(button, enabled) {
        if (enabled) {
            button.classList.add('enableButton');
            button.classList.remove('disableButton');
        } else {
            button.classList.add('disableButton');
            button.classList.remove('enableButton');
        }
    }
    //#endregion
}
