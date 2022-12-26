// FIBONACCI numbers:  1, 1, 2, 3, 5, 8, 13, 21, ...
// f(n) = f(n-1) + f(n-2)

// input validation
let n;
while (true) {
  n = +prompt(
    "Enter the index of the Fibonacci number you want to display :"
  );
  if (isNaN(n)) {
    console.log("Enter only numbers, try again.");
    continue;
  } else if (n <= 0) {
    console.log("n need to be a positive number, try again.");
  } else {
    console.log(`inputted n : ${n}`);
    break;
  }
}

// recursive function example : nth fibonacci number
// Recursion is based on calling the function within itself, and in order to prevent infinite loops, conditions for the lower/upper limit should be determined.
const fiboRecursiveN = (n) => {
  if (n == 1 || n == 2) {
    return 1;
  } else {
    return fiboRecursiveN(n - 1) + fiboRecursiveN(n - 2);
  }
};

console.log(fiboRecursiveN(n)); // 7 => 13, 6 => 8, 5 => 5

// !recursive function example : n factorial
const factorial = (num) => {
  if (num === 0) {
    return 1;
  }
  return num * factorial(num - 1);
};

console.log(factorial(n)); // 7 => 5040, 6 => 720, 5 => 120
