import { Counter } from './lib/counter.js';
import { Controller } from './lib/controller.js';
import { EventHandler } from './lib/event-handler.js';

export class App extends EventHandler {
    _idDefines;
    _counter;
    _controller;

    //#region コンストラクタ
    constructor(idDefines) {
        super();

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
    //#endregion

    //#region 内部メソッド
    /**
     * イベントを登録する
     */
    _registerEvents() {
        // カウンタの値の変化を監視する
        this._counter.on('change', () => this._onCounterChange());

        // コントローラのイベントを登録する
        this._controller.on('click_increment', () => this._onIncrement());
        this._controller.on('click_decrement', () => this._onDecrement());
    }

    //#region イベントハンドラ
    /**
     * カウンタが変更になった
     */
    _onCounterChange() {
        this.fire('counter_is_changed', this._counter.value);
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

    /**
     * プラスボタンがクリックされた
     */
    _onIncrement() {
        this.fire('increment_is_clicked');
        this._counter.increment();
    }

    /**
     * マイナスボタンがクリックされた
     */
    _onDecrement() {
        this.fire('decrement_is_clicked');
        this._counter.decrement();
    }
    //#endregion
    //#endregion
}
