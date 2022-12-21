let num;
while (true) {
  num = Number(prompt("Enter a number to check its digits count : "));
  if (isNaN(num)) {
    console.log("You need to enter numbers only, try again!");
    continue;
  } else {
    console.log(`Number you inputted : ${num}`);
    break;
  }
}

let digitsCount = 0;
let numCopy = num;
if (Math.abs(num) > 1) {
  while (Math.abs(numCopy) > 1) {
    digitsCount++;
    numCopy /= 10;
    console.log(`A digit counted...`);
  }
  console.log(`${num} has ${digitsCount} digits.`);
} else {
  console.log(`${num} has 0 digits.`);
}
