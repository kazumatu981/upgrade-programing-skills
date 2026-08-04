import {
    StartStopButton,
    EVENT_ON_CLICK_START,
    EVENT_ON_CLICK_STOP,
} from '../lib/start-stop-button.js';

// ドキュメントをすべて読み込んだら onPageLoad関数を呼び出す
document.addEventListener('DOMContentLoaded', onPageLoad);

/**
 * ページが読み込まれたときに呼び出される関数
 */
function onPageLoad() {
    const rollButton = new StartStopButton('rollButton');

    document
        .getElementById('buttonTypes')
        .addEventListener('change', (event) => {
            const buttonType = event.target.value;
            document.getElementById('buttonType').value = buttonType;
        });
    document.getElementById('setButtonType').addEventListener('click', () => {
        const buttonType = document.getElementById('buttonType').value;
        rollButton.buttonType = buttonType;
    });

    rollButton.on(EVENT_ON_CLICK_START, () => {
        console.log('start');
    });

    rollButton.on(EVENT_ON_CLICK_STOP, () => {
        console.log('stop');
    });
}
