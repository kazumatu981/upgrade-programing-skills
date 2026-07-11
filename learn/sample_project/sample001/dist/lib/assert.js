export function __assertIsString(x) {
    if (typeof x !== 'string') {
        throw new Error(`Expected a string, but got ${typeof x}`);
    }
}

export function __assertIsNumber(x) {
    if (typeof x !== 'number') {
        throw new Error(`Expected a number, but got ${typeof x}`);
    }
}

export function __assertBetween(value, minimal, maximal) {
    if (value < minimal || maximal < value) {
        throw new Error(
            `The value ${value} is not between ${minimal} and ${maximal}`
        );
    }
}
