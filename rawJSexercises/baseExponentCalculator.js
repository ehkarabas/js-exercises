// nested functions
const squared = (base) => base ** 2;
const cubed = (base) => base ** 3;

// main function
const baseExp = (base, exp) =>
  exp == 2
    ? Number(squared(base).toFixed(2))
    : exp == 3
    ? Number(cubed(base).toFixed(2))
    : Number((base ** exp).toFixed(2));

// output
console.log(baseExp(5, 2)); // 25
console.log(baseExp(5, 3)); // 125
console.log(baseExp(5, 4)); // 625
console.log(baseExp(2.4, 3.5)); // 21.42
