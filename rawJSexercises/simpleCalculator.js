// Nested functions
const add = function (n1, n2) {
  return n1 + n2;
};
const sub = function (n1, n2) {
  return n1 - n2;
};
const div = function (n1, n2) {
  return n1 / n2;
};
const mul = function (n1, n2) {
  return n1 * n2;
};

// Main function
const compute = function (n1, n2, op) {
  switch (op) {
    case "+":
      return add(n1, n2);
    case "-":
      return sub(n1, n2);
    case "/":
      return div(n1, n2);
    case "*":
      return mul(n1, n2);
    default:
      return "Operator mistyped...";
  }
};

// Output Examples
console.log(compute(3, 4, "+")); // 7
console.log(compute(3, 4, "-")); // -1
console.log(compute(3, 4, "/")); // 0.75
console.log(compute(3, 4, "*")); // 12
console.log(compute(3, 4, 5)); // Operator mistyped...
