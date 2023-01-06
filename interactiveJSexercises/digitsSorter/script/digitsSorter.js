// Code a function takes an integer as an argument and returns the largest possible number by rearranging the digits in a suitable order.

// Examples:
// Input: 42145 Output: 54421
// Input: 145263 Output: 654321
// Input: 123456789 Output: 987654321

// Exact input validation with regex pattern
let num;
while (true) {
  num = prompt("Enter a number : ");
  // console.log(num.match(/^-?\d+$/));
  if (num.match(/^-?\d+$/) == null) {
    console.log(
      "Your must enter one positive or negative integer only, try again."
    );
    continue;
  } else {
    console.log(`The number you inputted : ${num}`);
    break;
  }
}

// Defining a function that arranges the digits of a number in a suitable order.
const numDigitSorter = (number) => {
  let result;
  let arrNum = number.split("");
  console.log(arrNum);
  if (number < 0) {
    arrNum.shift();
    arrNum.sort((a, b) => a - b);
    arrNum.unshift("-");
  } else {
    arrNum.sort((a, b) => b - a);
  }
  result = Number(arrNum.join(""));
  return result;
};

// Outputting the result
console.log(numDigitSorter(num));
