// year input validation
let dateYear;
while (true) {
  dateYear = +prompt("Enter the year of a date : ");
  if (isNaN(dateYear)) {
    console.log("Enter only number as the year of a date, try again.");
    continue;
  } else {
    console.log(`The year of a date you inputted : ${dateYear}`);
    break;
  }
}


// month input validation
let dateMonth;
while (true) {
  dateMonth = +prompt("Enter the month of a date : ");
  if (isNaN(dateMonth)) {
    console.log("Enter only number as the month of a date, try again.");
    continue;
  } else if (!(dateMonth >= 1 && dateMonth <= 12)) {
    console.log("You must input between 1 and 12 as a month, try again.");
    continue;
  } else {
    console.log(`The month of a date you inputted : ${dateYear}`);
    break;
  }
}

// checking if the year is leap year followed by printing the result 
if (dateMonth == 2) {
  if (dateYear % 400 == 0 || (dateYear % 4 == 0 && dateYear % 100 != 0)) {
    console.log(`${dateMonth}nd of the ${dateYear} has 29 days.`);
  } else {
    console.log(`${dateMonth}nd of the ${dateYear} has 28 days.`);
  }
} else if (
  dateMonth == 1 ||
  dateMonth == 3 ||
  dateMonth == 5 ||
  dateMonth == 7 ||
  dateMonth == 8 ||
  dateMonth == 10 ||
  dateMonth == 12
) {
  console.log(`Month no: ${dateMonth} of the ${dateYear} has 31 days.`);
} else {
  console.log(`Month no: ${dateMonth} of the ${dateYear} has 30 days.`);
}
