import { Dice } from '../lib/dice.js';

// ドキュメントをすべて読み込んだら onPageLoad関数を呼び出す
document.addEventListener('DOMContentLoaded', onPageLoad);

/**
 * ページが読み込まれたときに呼び出される関数
 */
function onPageLoad() {
    const dice = new Dice('dice001');

    dice.on('started', () => {
        console.log('started');
    });

    dice.on('stopping', () => {
        console.log('stopping');
    });

    dice.on('stopped', () => {
        console.log(`stoped: value=${dice.value}`);
    });

    document.getElementById('start').addEventListener('click', () => {
        dice.start();
    });
    document.getElementById('stop').addEventListener('click', () => {
        dice.stop();
    });
}
