import { Counter } from './lib/counter.js';
import { Controller } from './lib/controller.js';

const counter = new Counter('counter');
const controller = new Controller('increment', 'decrement');

// ドキュメントをすべて読み込んだら onPageLoad関数を呼び出す
document.addEventListener('DOMContentLoaded', onPageLoad);

/**
 * ページが読み込まれたときに呼び出される関数
 */
function onPageLoad() {
    console.log('Page loaded');

    // カウンタの値の変化を監視する
    counter.on('change', onCounterChange);

    // コントローラのイベントを登録する
    controller.on('click_increment', onIncrement);
    controller.on('click_decrement', onDecrement);

    // 初期状態を設定する
    counter.value = 1;
}

function onCounterChange() {
    // もし、上限に達したら、インクリメントボタンを無効化する
    if (counter.value >= counter.maximum) {
        controller.enableIncrement = false;
    } else {
        controller.enableIncrement = true;
    }
    // もし、下限に達したら、デクリメントボタンを無効化する
    if (counter.value <= counter.minimum) {
        controller.enableDecrement = false;
    } else {
        controller.enableDecrement = true;
    }
}

function onIncrement() {
    counter.increment();
}

function onDecrement() {
    counter.decrement();
}
