/**
 * Deep copies an array.
 * @param {Array} arr 
 */
const arrayCopy = (arr) => JSON.parse(JSON.stringify(arr));

export { arrayCopy };
