function onlyEven(array) {
  return array.filter((n) => n % 2 === 0);
}

function onlyOneWord(array) {
  return array.filter((string) => string.split(" ").length === 1);
}

function positiveRowsOnly(array) {
  return array.filter((row) => {
    return row.every((n) => n >= 0);
  });
}

function allSameVowels(array) {
  return array.filter((word) => {
    let word_vowels = word.replace(/[^aeiou]/g, "");

    return (
      word_vowels.length === 0 ||
      word_vowels.split("").every((v) => v === word_vowels[0])
    );
  });
}

module.exports = {
  onlyEven,
  onlyOneWord,
  positiveRowsOnly,
  allSameVowels,
};
