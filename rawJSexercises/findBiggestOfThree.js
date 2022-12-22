// Definition via function expression
// !Number.MAX_VALUE is the biggest number in javascript
const findBiggestOfThree = function (num1, num2, num3 = -Number.MAX_VALUE) {
  let biggest = num1;
  if (num2 >= biggest) {
    biggest = num2;
  }
  if (num3 >= biggest) {
    biggest = num3;
  }
  console.log(biggest);
  return biggest;
};

// Output examples
findBiggestOfThree(100, 200, 200); // 200
findBiggestOfThree(10, 20, 30); // 30
findBiggestOfThree(-1, -4, 0); // 0
findBiggestOfThree(-1, -4, -30); // -1
// Nested invoking example
findBiggestOfThree(
  findBiggestOfThree(3, 66, -5),
  findBiggestOfThree(-100, 0, 54),
  findBiggestOfThree(546, 3453, 4)
); // 66 \n 54 \n 3453 \n 3453(result)
// Calling with less arguments
findBiggestOfThree(3, 5); //5(via default parameter)
