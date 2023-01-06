// Code a JavaScript program that finds repeating values in a JavaScript array.

// Examples:
// Input: [1, 2, 3, 2, 1, 4, 5, 6, 7, 8, 9, 9, 10]
// Output: 1, 2, 9

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

// Finding repeating values
const nonUniqueFinder = (arr) => {
  arr.sort((a, b) => a - b);
  let repeatingValues = [];
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i + 1] == arr[i]) {
      repeatingValues.push(numArrNumber[i]);
    }
  }
  return repeatingValues;
};

// Outputting the result
console.log(nonUniqueFinder(numArrNumber));
