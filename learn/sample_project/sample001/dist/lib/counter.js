import {
    __assertIsString,
    __assertIsNumber,
    __assertBetween,
} from './assert.js';

export class Counter {
    _count = 0;
    _element = null;

    minimal = 0;
    maximal = 10;
    events = {
        change: () => {
            console.log(`Value changed to: ${this.value}`);
        },
        reachMaximal: () => {
            console.log('Reached maximal value');
        },
        reachMinimal: () => {
            console.log('Reached minimal value');
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
        __assertBetween(newValue, this.minimal, this.maximal);

        this.count = newValue;
        this._updateDisplay();
        this._fireEvent();
    }

    increment() {
        if (this.value < this.maximal) {
            this.value++;
        }
    }

    decrement() {
        if (this.value > this.minimal) {
            this.value--;
        }
    }

    _updateDisplay() {
        this.element.textContent = this.count;
    }
    _fireEvent() {
        this.events.change(this, this.value);
        if (this.value === this.maximal) {
            this.events.reachMaximal(this, this.value);
        }
        if (this.value === this.minimal) {
            this.events.reachMinimal(this, this.value);
        }
    }
}
