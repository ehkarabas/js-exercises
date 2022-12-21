let num1;
while (true) {
  num1 = +prompt("Enter first number");
  if (isNaN(num1)) {
    console.log("You must enter numbers, try again!");
    continue;
  } else {
    console.log(`First number : "${num1}"`);
    break;
  }
}

let op;
const opList = ["+", "-", "/", "*"];
while (true) {
  op = prompt("Enter the operation (+, -, /, *)");
  if (!opList.includes(op)) {
    console.log("Operator must be +, -, * or /. Try again");
    continue;
  } else {
    console.log(`Operator : "${op}"`);
    break;
  }
}

let num2;
while (true) {
  num2 = +prompt("Enter second number");
  if (isNaN(num2)) {
    console.log("You must enter numbers, try again!");
    continue;
  } else {
    console.log(`Second number : "${num2}"`);
    break;
  }
}
if (op == "+") {
  console.log(`${num1} ${op} ${num2} = `, (num1 + num2).toFixed(2));
} else if (op == "-") {
  console.log(`${num1} ${op} ${num2} = `, (num1 - num2).toFixed(2));
} else if (op == "/") {
  console.log(`${num1} ${op} ${num2} = `, (num1 / num2).toFixed(2));
} else {
  console.log(`${num1} ${op} ${num2} = `, (num1 * num2).toFixed(2));
}
