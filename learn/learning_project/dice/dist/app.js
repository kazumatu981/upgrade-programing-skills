import { Dice } from './lib/dice.js';
import { Sta } from './lib/start-stop-button.js';
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
    }
}
