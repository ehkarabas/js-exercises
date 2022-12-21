let num;
while (true) {
  num = Number(prompt("Enter a number between 0 and 100"));
  if (isNaN(num)) {
    console.log("You need to enter numbers only, try again!");
    continue;
  } else if (num < 0 || num > 100) {
    console.log(
      "You need to enter numbers between 0 and 100(both inclusive), try again!"
    );
    continue;
  } else {
    console.log(`Number you inputted : ${num}`);
    break;
  }
}
