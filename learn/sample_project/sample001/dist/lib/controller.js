import { __assertIsString, __safeGetElementById } from './assert.js';
import { EventHandler } from './event-handler.js';

export class Controller extends EventHandler {
    _enableIncrement = false;
    _enableDecrement = false;

    constructor(incrementButtonId, decrementButtonId) {
        super();
        __assertIsString(incrementButtonId);
        __assertIsString(decrementButtonId);

        this._incrementButton = __safeGetElementById(incrementButtonId);
        this._decrementButton = __safeGetElementById(decrementButtonId);

        this._registerButtonEvents();
    }

    get enableIncrement() {
        return this._enableIncrement;
    }
    set enableIncrement(value) {
        this._enableIncrement = value;
        this._setButtonState(this._incrementButton, value);
    }
    get enableDecrement() {
        return this._enableDecrement;
    }
    set enableDecrement(value) {
        this._enableDecrement = value;
        this._setButtonState(this._decrementButton, value);
    }

    _registerButtonEvents() {
        this._incrementButton.addEventListener('click', () => {
            if (this._enableIncrement) {
                this.fire('click_increment', this);
            }
        });
        this._decrementButton.addEventListener('click', () => {
            if (this._enableDecrement) {
                this.fire('click_decrement', this);
            }
        });
    }

    _setButtonState(button, enabled) {
        if (enabled) {
            button.classList.add('enableButton');
            button.classList.remove('disableButton');
        } else {
            button.classList.add('disableButton');
            button.classList.remove('enableButton');
        }
    }
}
