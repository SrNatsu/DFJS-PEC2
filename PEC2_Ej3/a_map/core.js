function multiplyBy10(array) {
  return array.map((n) => n * 10);
}

function shiftRight(array) {
  return array.map((_, i, a) => a[(i + a.length - 1) % a.length]);
}

function onlyVowels(array) {
  return array.map((word) => {
    return word.replace(/[^aeiou]/g, "");
  });
}

function doubleMatrix(array) {
  return array.map((row) => row.map((cell) => cell * 2));
}

module.exports = {
  multiplyBy10,
  shiftRight,
  onlyVowels,
  doubleMatrix,
};
