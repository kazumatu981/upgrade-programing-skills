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
        counter: 'counter',
        increment: 'increment',
        decrement: 'decrement',
    });

    app.on('counter_is_changed', (_, value) => {
        console.log(`値が変更されました: ${value}`);
    });

    app.on('increment_is_clicked', () => {
        console.log('プラスボタンがクリックされました');
    });
    app.on('decrement_is_clicked', () => {
        console.log('マイナスボタンがクリックされました');
    });
}
