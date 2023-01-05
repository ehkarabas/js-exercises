/*
Write a code that given two sorted arrays, returns merged array of these inputs.

For example:
A = [12, 14, 16]; 
B = [11, 13, 17];
expectedOutput = [11, 12, 13, 14, 16, 17];
*/

const arr1 = [12, 14, 16],
  arr2 = [11, 13, 17];

const concateAndSortArrs = (a, b) => {
  const concatenatedArrs = a.concat(b);
  concatenatedArrs.sort((i, j) => i - j);
  return concatenatedArrs;
};

console.log(concateAndSortArrs(arr1, arr2)); // (6) [11, 12, 13, 14, 16, 17]

const arr3 = [],
  arr4 = [],
  arr5 = [],
  arr6 = [];

// Trying with more than 2 arrays
for (let i = 0; i < 3; i++) {
  arr3.push(Math.round(Math.random() * 100));
  arr4.push(Math.round(Math.random() * 100));
  arr5.push(Math.round(Math.random() * 100));
  arr6.push(Math.round(Math.random() * 100));
}

console.log(
  concateAndSortArrs(
    concateAndSortArrs(arr1, arr2),
    concateAndSortArrs(
      concateAndSortArrs(arr3, arr4),
      concateAndSortArrs(arr5, arr6)
    )
  )
); // (18) [11, 12, 13, 14, 16, 17, 19, 20, 21, 32, 41, 41, 41, 43, 71, 72, 83, 95]
