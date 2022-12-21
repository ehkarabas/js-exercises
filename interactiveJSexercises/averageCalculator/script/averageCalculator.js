let numCount;
while (true) {
  numCount = Number(
    prompt("Enter the count of numbers whose averages are to be calculated : ")
  );
  if (isNaN(numCount)) {
    console.log("You need to enter numbers only, try again!");
    continue;
  } else if (numCount < 0 || numCount > 30) {
    console.log(
      "You need to enter numbers between 0 and 30(both inclusive), try again!"
    );
    continue;
  } else {
    console.log(`Count of numbers you inputted : ${numCount}`);
    break;
  }
}

let sum = 0;
let numCountCopy = numCount;
for (let i = 1; i <= numCount; i++) {
  while (true) {
    const tempNum = Number(prompt("Enter a number "));
    if (isNaN(tempNum)) {
      console.log("You need to enter numbers only, try again!");
      continue;
      // } else if (tempNum < 0 || tempNum > 30) {
      //   console.log(
      //     "You need to enter numbers between 0 and 30(both inclusive), try again!"
      //   );
      //   continue;
    } else {
      console.log(`Number you inputted : ${tempNum}`);
      sum += tempNum;
      numCountCopy--;
      console.log(
        `Current Total : ${sum}\nRemaining count of numbers to be inputted : ${numCountCopy}`
      );
      break;
    }
  }
}
console.log(
  `Average(${sum}/${numCount}) of ${numCount} number you inputted : ${(
    sum / numCount
  ).toFixed(2)}`
);
