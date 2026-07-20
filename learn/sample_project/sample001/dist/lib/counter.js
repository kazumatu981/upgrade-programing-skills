import {
    __assertIsString,
    __assertIsNumber,
    __assertBetween,
} from './assert.js';

export class Counter {
    _count = 0;
    _element = null;

    minimum = 0;
    maximum = 10;
    events = {
        change: () => {
            console.log(`Value changed to: ${this.value}`);
        },
        reachmaximum: () => {
            console.log('Reached maximum value');
        },
        reachminimum: () => {
            console.log('Reached minimum value');
        },
    };

    constructor(elementId) {
        __assertIsString(elementId);

        this.element = document.getElementById(elementId);
        this.count = 0;
    }

    get value() {
        return this.count;
    }

    set value(newValue) {
        __assertIsNumber(newValue);
        __assertBetween(newValue, this.minimum, this.maximum);

        this.count = newValue;
        this._updateDisplay();
        this._fireEvent();
    }

    increment() {
        if (this.value < this.maximum) {
            this.value++;
        }
    }

    decrement() {
        if (this.value > this.minimum) {
            this.value--;
        }
    }

    _updateDisplay() {
        this.element.textContent = this.count;
    }
    _fireEvent() {
        this.events.change(this, this.value);
        if (this.value === this.maximum) {
            this.events.reachmaximum(this, this.value);
        }
        if (this.value === this.minimum) {
            this.events.reachminimum(this, this.value);
        }
    }
}
