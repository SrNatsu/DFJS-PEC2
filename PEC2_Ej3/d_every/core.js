// Check to see if all elements in an array
// are even numbers.

function allEven(input) {
  return input.every((n) => n % 2 === 0);
}

// Check to see if all elements in an array
// are of the same type.

function allSameType(input) {
  let type = typeof input[0];
  return input.every((el) => typeof el === type);
}

// Check to see if every element in the matrix is
// an array and that every element in the array is
// greater than 0.

function positiveMatrix(input) {
  return input.every((row) => Array.isArray(row) && row.every((n) => n > 0));
}

// Check that all items in an array are strings
// and that they all only contain the same vowels.

function allSameVowels(input) {
  return input.every((word) => {
    let word_vowels = word.replace(/[^aeiou]/g, "").split("");
    return word_vowels.every((v) => v === word_vowels[0]);
  });
}

module.exports = {
  allEven,
  allSameType,
  positiveMatrix,
  allSameVowels,
};
