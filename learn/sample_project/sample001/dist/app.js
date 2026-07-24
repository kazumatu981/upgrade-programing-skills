import { Counter } from './lib/counter.js';
import { Controller } from './lib/controller.js';

export class App {
    _idDefines;
    _counter;
    _controller;

    constructor(idDefines) {
        this._idDefines = idDefines;

        // カウンタとコントローラを作成する
        this._counter = new Counter(idDefines.counter);
        this._controller = new Controller(
            idDefines.increment,
            idDefines.decrement
        );

        // イベントを登録する
        this._registerEvents();

        // 初期状態を設定する
        this._counter.value = 1;
    }

    _registerEvents() {
        // カウンタの値の変化を監視する
        this._counter.on('change', () => this._onCounterChange());

        // コントローラのイベントを登録する
        this._controller.on('click_increment', () => this._onIncrement());
        this._controller.on('click_decrement', () => this._onDecrement());
    }

    _onCounterChange() {
        // もし、上限に達したら、インクリメントボタンを無効化する
        if (this._counter.value >= this._counter.maximum) {
            this._controller.enableIncrement = false;
        } else {
            this._controller.enableIncrement = true;
        }
        // もし、下限に達したら、デクリメントボタンを無効化する
        if (this._counter.value <= this._counter.minimum) {
            this._controller.enableDecrement = false;
        } else {
            this._controller.enableDecrement = true;
        }
    }

    _onIncrement() {
        this._counter.increment();
    }

    _onDecrement() {
        this._counter.decrement();
    }
}
