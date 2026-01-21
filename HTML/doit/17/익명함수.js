const sum = function (a, b) {
  return a + b;
};
console.log(sum(1, 2));

const multiple= function (a, b, c = 0) {
  return a * b + c;
};
console.log(multiple(1, 2));