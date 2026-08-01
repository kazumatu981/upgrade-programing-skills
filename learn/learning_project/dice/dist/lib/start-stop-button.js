import { EventHandler } from './event-handler.js';

const BUTTON_STATE_START = 'start';
const BUTTON_STATE_STOPPING = 'stopping';
const BUTTON_STATE_STOP = 'stop';

const BUTTON_STATES = {
    [BUTTON_STATE_START]: BUTTON_STATE_START,
    [BUTTON_STATE_STOPPING]: BUTTON_STATE_STOPPING,
    [BUTTON_STATE_STOP]: BUTTON_STATE_STOP,
};

const BUTTON_FACE = {
    [BUTTON_STATE_START]: 'Start',
    [BUTTON_STATE_STOPPING]: 'Stopping...',
    [BUTTON_STATE_STOP]: 'Stop',
};

const BUTTON_CLASS = {
    [BUTTON_STATE_START]: 'start-button',
    [BUTTON_STATE_STOPPING]: 'stopping-button',
    [BUTTON_STATE_STOP]: 'stop-button',
};

const BUTTON_LOOKS = {
    [BUTTON_STATE_START]: {
        face: BUTTON_FACE[BUTTON_STATE_START],
        className: BUTTON_CLASS[BUTTON_STATE_START],
    },
    [BUTTON_STATE_STOPPING]: {
        face: BUTTON_FACE[BUTTON_STATE_STOPPING],
        className: BUTTON_CLASS[BUTTON_STATE_STOPPING],
    },
    [BUTTON_STATE_STOP]: {
        face: BUTTON_FACE[BUTTON_STATE_STOP],
        className: BUTTON_CLASS[BUTTON_STATE_STOP],
    },
};

export class StartStopButton extends EventHandler {
    _state = BUTTON_STATE_START;

    constructor() {}

    _setFace() {}
}
