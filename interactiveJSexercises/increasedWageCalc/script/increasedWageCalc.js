const minWage = 5500;
let salary;
while (true) {
  salary = +prompt("Enter your salary to see your increased income : ");
  if (isNaN(salary)) {
    console.log("You must enter numbers as your salary, try again!");
    continue;
  } else {
    console.log(`Your salary now : ${salary}`);
    break;
  }
}

if (salary <= minWage) {
  console.log(`Your increased salary will be : ${salary * 1.5}`);
} else {
  console.log(`Your increased salary will be : ${salary * 1.1}`);
}
