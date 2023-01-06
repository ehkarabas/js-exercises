// Code a JavaScript function to calculate the average of all elements in an array.
// Test Data: console.log(average([1,2,3,4,5])); 3


// Exact input validation with regex pattern
let numArrStr, numArr;
while (true) {
  numArrStr = prompt("Enter more than one integers : ");
  // console.log(numArr.match(/^-?\d+([.|,]\d+)?( \-?\d+([.|,]\d+)?)+$/));
  if (
    numArrStr.match(
      /^-?\d+([.|,]\d+)?( \-?\d+([.|,]\d+)?)+$/
    ) == null
  ) {
    console.log(
      "You must enter 2 or more numbers(float ones can be delimited by comma or dot) seperated with one whitespace, try again."
    );
    continue;
  } else {
    numArr = numArrStr.split(" ");
    numArr.forEach((number, index) => {
      // If delimited by comma, converting it to dot before string to number conversion
      if (numArr[index].includes(",")) {
        numArr[index] =
          number.slice(0, number.indexOf(",")) +
          "." +
          number.slice(number.indexOf(",") + 1);
      }
      // String to number conversion
      numArr[index] = Number(numArr[index]);
    });
    console.log("Array of numbers you inputted : ", numArr);
  }
  break;
}

// Defining a function to calculate average
const arrAverageCalc = (arr) => {
  // Calculating sum of inputted numbers
  const sumNumArr = arr.reduce((sum, currVal) => sum + currVal);
  // Calculating average of inputted numbers
  const averageOfNumArr = Number((sumNumArr / arr.length).toFixed(2));
  // Outputting the result
  console.log("Sum of numbers you inputted = ", sumNumArr);
  console.log(
    `Average of ${numArr.length} numbers you inputted = `,
    averageOfNumArr
  );
  // Returning the result
  return averageOfNumArr;
};

// Invoking the function
arrAverageCalc(numArr);
