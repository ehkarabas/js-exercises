let base;
while (true) {
  base = Number(prompt("Enter a number as the base : "));
  if (isNaN(base)) {
    console.log("You need to enter numbers only, try again!");
    continue;
    // } else if (base < 0 || base > 100) {
    //   console.log(
    //     "You need to enter numbers between 0 and 100(both inclusive), try again!"
    //   );
    //   continue;
  } else {
    console.log(`Base you inputted : ${base}`);
    break;
  }
}

let exponent;
while (true) {
  exponent = Number(prompt("Enter a positive number as the exponent : "));
  if (isNaN(exponent)) {
    console.log("You need to enter positive numbers only, try again!");
    continue;
  } else if (exponent < 0 || exponent > 30) {
    console.log(
      "You need to enter positive numbers to 30(inclusive), try again!"
    );
    continue;
  } else {
    console.log(`Exponent you inputted : ${exponent}`);
    break;
  }
}

console.log(`The result of ${base}^${exponent} = ${base ** exponent}`);
