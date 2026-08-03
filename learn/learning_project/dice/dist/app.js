import { Dice, ROLLING_STATE } from './lib/dice.js';
import {
    StartStopButton,
    BUTTON_TYPE_START,
    BUTTON_TYPE_STOPPING,
    BUTTON_TYPE_STOP,
    EVENT_ON_CLICK_STOP,
    EVENT_ON_CLICK_START,
} from './lib/start-stop-button.js';
import { EventHandler } from './lib/event-handler.js';

export class App extends EventHandler {
    _dice1;
    _dice2;
    _dice3;
    _startStopButton;

    constructor({ dice1, dice2, dice3, startStopButton }) {
        super();
        this._dice1 = new Dice(dice1);
        this._dice2 = new Dice(dice2);
        this._dice3 = new Dice(dice3);
        this._startStopButton = new StartStopButton(startStopButton);

        this._registerEvent();
    }

    get isAllDiceStopped() {
        return (
            this._dice1.state === ROLLING_STATE.stopped &&
            this._dice2.state === ROLLING_STATE.stopped &&
            this._dice3.state === ROLLING_STATE.stopped
        );
    }

    _registerEvent() {
        this._startStopButton.on(EVENT_ON_CLICK_START, () => {
            // ダイス1～3を転がす
        });

        this._startStopButton.on(EVENT_ON_CLICK_STOP, () => {
            // ダイス1～3を止める
        });

        this._dice1.on(
            ROLLING_STATE.stopped,
            this._changeButtonTypeToStop.bind(this)
        );
        this._dice2.on(
            ROLLING_STATE.stopped,
            this._changeButtonTypeToStop.bind(this)
        );
        this._dice3.on(
            ROLLING_STATE.stopped,
            this._changeButtonTypeToStop.bind(this)
        );
    }
    _changeButtonTypeToStop() {
        // TODO ボタンの種類を停止中に変更する
    }
}
