// the function
const leapYearCheck = function (year) {
  return year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)
    ? `${year} is a leap year.`
    : `${year} is not a leap year.`;
};

// output
console.log(leapYearCheck(2000)); // 2000 is a leap year.
console.log(leapYearCheck(2002)); // 2002 is not a leap year.
console.log(leapYearCheck(2020)); // 2020 is a leap year.
console.log(leapYearCheck(2023)); // 2023 is not a leap year.
console.log(leapYearCheck(2024)); // 2024 is a leap year.
