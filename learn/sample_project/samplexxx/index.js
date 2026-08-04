import { App } from './app.js';

// ドキュメントをすべて読み込んだら onPageLoad関数を呼び出す
document.addEventListener('DOMContentLoaded', onPageLoad);

/**
 * ページが読み込まれたときに呼び出される関数
 */
function onPageLoad() {
    console.log('Page loaded');
    const app = new App();

    document.getElementById('start').addEventListener('click', () => {
        app.startGame();
    });
    document.getElementById('pause').addEventListener('click', () => {
        app.pauseGame();
    });
    document.getElementById('reset').addEventListener('click', () => {
        app.resetGame();
    });
}
