/**
 * Deep copies an array.
 * @param {Array} arr 
 */
const arrayCopy = (arr) => JSON.parse(JSON.stringify(arr));

export const DEFAULT_WIDTH = 10;
export const DEFAULT_INTERVAL = 150;
export {arrayCopy};
