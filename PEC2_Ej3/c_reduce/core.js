function sum(array) {
  return array.reduce((acc, currentValue) => acc + currentValue, 0);
}

function productAll(array) {
  return array.reduce((acc, row) => {
    const rowSum = row.reduce((acc, n) => acc * n, 1);
    return acc * rowSum;
  }, 1);
}

function objectify(array) {
  return array.reduce((object, [key, value]) => {
    object[key] = value;
    return object;
  }, {});
}

function luckyNumbers(array) {
  return array.reduce((str, num, idx) => {
    if (idx === array.length - 2) {
      str += num + ", and ";
    } else if (idx === array.length - 1) {
      str += num;
    } else {
      str += num + ", ";
    }

    return str;
  }, "Your lucky numbers are: ");
}

module.exports = {
  sum,
  productAll,
  objectify,
  luckyNumbers,
};
