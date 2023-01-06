// Write a JavaScript program that finds the sum of the squares of the elements of a list consisting of numbers.

// Examples:
// Input: [1, 2, 3, 4, 5, 6, 7, 8, 9]
// Output: 285


// Exact input validation with regex pattern
let numArrStr, numArrNumber;
while (true) {
  numArrStr = prompt(
    "Enter 2 or more positive numbers, use whitespaces between each one : "
  );
  // console.log(num.match(/^\d+(?: \d+){1,}$/));
  if (numArrStr.match(/^\d+(?: \d+){1,}$/) == null) {
    console.log(
      "Your must enter 2 or more positive numbers seperated by whitespaces, try again."
    );
    continue;
  } else {
    // converting string to array
    numArrStr = numArrStr.split(" ");
    // converting each item to number
    numArrNumber = numArrStr.map((strNumber) => Number(strNumber));
    console.log(`Array of numbers you inputted : ${numArrNumber}`);
    break;
  }
}

// Calculating squares of numbers and adding up
const squareSumArr = (arr) => {
  return arr.reduce((sum, currValue) => (sum += currValue ** 2));
};

// Outputting the result
console.log(squareSumArr(numArrNumber));
