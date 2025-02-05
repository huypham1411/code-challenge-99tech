//using for loop
var sum_to_n_a = function (n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

//Gauss' Formula
var sum_to_n_b = function (n) {
  return (n * (n + 1)) / 2;
};

//recursion
var sum_to_n_c = function (n) {
  if (n === 1) {
    return 1;
  }
  return n + sum_to_n_c(n - 1);
};

console.log("suma", sum_to_n_a(5));
console.log("suma", sum_to_n_a(0));
console.log("suma", sum_to_n_a(1));
console.log("suma", sum_to_n_a(10));

console.log("sumb", sum_to_n_b(5));
console.log("sumb", sum_to_n_b(0));
console.log("sumb", sum_to_n_b(1));
console.log("sumb", sum_to_n_b(10));

console.log("sumc", sum_to_n_c(5));
console.log("sumc", sum_to_n_c(0));
console.log("sumc", sum_to_n_c(1));
console.log("sumc", sum_to_n_c(10));
