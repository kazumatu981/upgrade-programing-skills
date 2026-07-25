/**
 * 値が文字列であることを確認する
 * @param {any} x テスト対象
 */
export function __assertIsString(x) {
    if (typeof x !== 'string') {
        throw new Error(`Expected a string, but got ${typeof x}`);
    }
}

/**
 * 値が数値であることを確認する
 * @param {any} x テスト対象
 */
export function __assertIsNumber(x) {
    if (typeof x !== 'number') {
        throw new Error(`Expected a number, but got ${typeof x}`);
    }
}

/**
 * 値が関数であることを確認する
 * @param {any} x テスト対象
 */
export function __assertIsFunction(x) {
    if (typeof x !== 'function') {
        throw new Error(`Expected a function, but got ${typeof x}`);
    }
}

/**
 * 値が指定された範囲内にあることを確認する
 * @private
 * @param {number} value 値
 * @param {number} minimum 最小値
 * @param {number} maximum 最大値
 */
export function __assertBetween(value, minimum, maximum) {
    if (value < minimum || maximum < value) {
        throw new Error(
            `The value ${value} is not between ${minimum} and ${maximum}`
        );
    }
}

/**
 * IDからDOMエレメントを安全に取得する
 * 見つからなかった場合は、例外を発生させる
 * @private
 * @param {string} id エレメントID
 * @returns {HTMLElement} エレメント
 */
export function __safeGetElementById(id) {
    const element = document.getElementById(id);
    if (!element) {
        throw new Error(`Element with id "${id}" not found`);
    }
    return element;
}
