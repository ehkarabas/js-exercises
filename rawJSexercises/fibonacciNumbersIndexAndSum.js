// Functions that return the sum of the Fibonacci numbers up to the given nth term and the Fibonacci number at the nth term.
// Fibonacci numbers : 1, 1, 2, 3, 5, 8, 13, 21, ...

// Function that returns the sum of the Fibonacci numbers up to the given nth term
const fiboSum = (n) => {
  let fib1 = 1;
  let fib2 = 1;
  let sum = fib1 + fib2;
  let sumLastTwo = 0;

  for (let i = 3; i <= n; i++) {
    sumLastTwo = fib1 + fib2;
    fib1 = fib2;
    fib2 = sumLastTwo;
    sum += sumLastTwo;
  }
  return sum;
};

// Function that returns the Fibonacci number at the nth term
const fiboN = (n) => {
  let fib1 = 1;
  let fib2 = 1;
  let sumLastTwo = 0;

  for (let i = 3; i <= n; i++) {
    sumLastTwo = fib1 + fib2;
    fib1 = fib2;
    fib2 = sumLastTwo;
  }
  return sumLastTwo;
};

// input validation
let n;
while (true) {
  n = +prompt(
    "Enter the count of fibonacci numbers to be displayed and nth fibonacci number to be displayed :"
  );
  if (isNaN(n)) {
    console.log("Enter only numbers, try again.");
    continue;
  } else if (n <= 2) {
    console.log("n need to be higher than 2, try again.");
  } else {
    console.log(`inputted n : ${n}`);
    break;
  }
}

// output
console.log(fiboSum(n)); // 7 => 33, 6 => 20, 5 => 12
console.log(fiboN(n)); // 7 => 13, 6 => 8, 5 => 5
