// A company wants to give a 10% pay raise to those who earn less than 3000TL and wants to know how much total will be paid to those who received the raise. Type the relevant code.

const wages = [3000, 2891, 3500, 4200, 7000, 2500];

const raisedWagesSum = wages
  .filter((wage) => wage < 3000)
  .map((wage) => Number((wage * 1.1).toFixed(2)))
  .reduce((sum, currentWage) => (sum += currentWage));
console.log(raisedWagesSum); // 5930.1

// Verification
console.log(wages.filter((wage) => wage < 3000)); // (2) [2891, 2500]
console.log(
  wages
    .filter((wage) => wage < 3000)
    .map((wage) => Number((wage * 1.1).toFixed(2)))
); // (2) [3180.1, 2750]
console.log(
  wages
    .filter((wage) => wage < 3000)
    .map((wage) => Number((wage * 1.1).toFixed(2)))
    .reduce((sum, currentWage) => (sum += currentWage))
); // 5930.1
