const minWage = 5500;
let income;
while (true) {
  income = +prompt("Enter your total income : ");
  if (isNaN(income)) {
    console.log("You must enter numbers as your income, try again!");
    continue;
  } else if (income<0) {
	console.log("You must enter positive numbers as your income, try again!");
	continue;
  } else {
    console.log(`Your income : ${income}`);
    break;
  }
}

let expense;
while (true) {
  expense = +prompt("Enter your total expenses : ");
  if (isNaN(expense)) {
    console.log("You must enter numbers as your expenses, try again!");
    continue;
  } else if (expense<0) {
	console.log("You must enter positive numbers as your expenses, try again!");
	continue;
  } else {
    console.log(`Your expenses : ${expense}`);
    break;
  }
}

if (income >= expense + minWage) {
  console.log(`You are eligible for the credit!🤑`);
} else {
  console.log(
    `Unfortunately you are ineligible for the credit.🥹
    What you can do to be eligible for the credits is:
    You need to increase your income-expenses difference by at least +${Math.abs(
      income - (expense + minWage)
    )}.`
  );
}
