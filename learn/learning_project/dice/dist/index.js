import { App } from './app.js';

// ドキュメントをすべて読み込んだら onPageLoad関数を呼び出す
document.addEventListener('DOMContentLoaded', onPageLoad);

/**
 * ページが読み込まれたときに呼び出される関数
 */
function onPageLoad() {
    console.log('Page loaded');

    // App クラスのインスタンスを作成する
    const app = new App({
        dice1: 'dice1',
        dice2: 'dice2',
        dice3: 'dice3',
        startStopButton: 'rollButton',
    });
}
