/* eslint-disable import/prefer-default-export */

// Stealed from https://stackoverflow.com/questions/35228052/debounce-function-implemented-with-promises :v
export function debounceWithPromise(inner, ms = 0) {
    let timer = null;
    let resolves = [];

    return function (...args) {
        // Run the function after a certain amount of time
        clearTimeout(timer);
        timer = setTimeout(() => {
        // Get the result of the inner function, then apply it to the resolve function of
        // each promise that has been created since the last time the inner function was run
            const result = inner(...args);
            resolves.forEach((r) => r(result));
            resolves = [];
        }, ms);

        return new Promise((r) => resolves.push(r));
    };
}
