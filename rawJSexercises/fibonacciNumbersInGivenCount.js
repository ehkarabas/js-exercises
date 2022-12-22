// initial fibonacci numbers
const fibonacciArray = [0, 1];

// input validation of desired count of numbers to display
let count;
while (true) {
  count = Number(
    prompt(`Enter count(more than 2) of fibonacci numbers to display :  `)
  );
  if (isNaN(count)) {
    console.log("Enter only numbers, try again.");
    continue;
  } else if (count <= 2) {
    console.log(`Enter more than 2 to display fibonacci numbers, try again.`);
    continue;
  } else {
    console.log(`Your input = ${count}`);
    break;
  }
}

// storing fibonacci numbers till the given count value
for (let i = 3; i <= count; i++) {
  let lastFibonacciNum =
    fibonacciArray.slice(-2)[0] + fibonacciArray.slice(-2)[1];
  fibonacciArray.push(lastFibonacciNum);
}

// output
console.log(fibonacciArray);
