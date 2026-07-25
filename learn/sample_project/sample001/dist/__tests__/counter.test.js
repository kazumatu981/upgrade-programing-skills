import { Counter } from '../lib/counter.js';

// ドキュメントをすべて読み込んだら onPageLoad関数を呼び出す
document.addEventListener('DOMContentLoaded', onPageLoad);

/**
 * ページが読み込まれたときに呼び出される関数
 */
function onPageLoad() {
    const counter = new Counter('counter001');

    document.getElementById('increment').addEventListener('click', () => {
        counter.increment();
    });
    document.getElementById('decrement').addEventListener('click', () => {
        counter.decrement();
    });

    document.getElementById('setValue').addEventListener('click', () => {
        const value = document.getElementById('value').value;
        const convertToString =
            document.getElementById('convertToString').checked;

        if (convertToString) {
            counter.value = Number.parseInt(value);
        } else {
            counter.value = value;
        }
    });
}
