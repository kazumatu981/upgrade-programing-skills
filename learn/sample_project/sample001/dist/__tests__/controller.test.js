import { Controller } from '../lib/controller.js';

// ドキュメントをすべて読み込んだら onPageLoad関数を呼び出す
document.addEventListener('DOMContentLoaded', onPageLoad);

/**
 * ページが読み込まれたときに呼び出される関数
 */
function onPageLoad() {
    // Controllerのオブジェクトを生成
    const controller = new Controller('increment', 'decrement');

    // クリックイベントの登録
    controller.on('click_increment', () => {
        console.log('増加をクリック');
    });
    controller.on('click_decrement', () => {
        console.log('減少をクリック');
    });

    // enableIncrement と disableIncrement
    document.getElementById('enableIncrement').addEventListener('click', () => {
        controller.enableIncrement = true;
    });
    document
        .getElementById('disableIncrement')
        .addEventListener('click', () => {
            controller.enableIncrement = false;
        });

    // enableDecrement と disableDecrement
    document.getElementById('enableDecrement').addEventListener('click', () => {
        controller.enableDecrement = true;
    });
    document
        .getElementById('disableDecrement')
        .addEventListener('click', () => {
            controller.enableDecrement = false;
        });
}
