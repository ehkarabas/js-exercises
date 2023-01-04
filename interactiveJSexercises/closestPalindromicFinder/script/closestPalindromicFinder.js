// ? Finding Closest Palindromic Number
console.log(`${"-".repeat(5)} Closest Palindromic Number ${"-".repeat(5)}`);

/*
Find the closest palindrome number for your code:

Example:
Input: 216
Output: 212

Input: 100
Output: 99

Input: 77
Output: 77

NOTE: 
- palindrome number is number is same from left - right side
- If the number itself is a palindrome, return that number.
- If two palindrome numbers distance is same choose smaller number.
*/

// definition of the function that finding out a number is palindromic or not
const isPalindrome = (str) =>
  true ? str == str.split("").reverse().join("") : false;

// input validation
let numStr;
while (true) {
  numStr = prompt(
    "Type a number higher than 10 or lower than -10 to find its closest palindromic number : "
  );
  if (isNaN(numStr)) {
    console.log("Type only numbers, try again.");
    continue;
  } else if (Math.abs(Number(numStr)) < 10) {
    console.log(
      "The number must be higher than 10 or lower than -10, try again"
    );
    continue;
  } else {
    console.log(`Number you inputted : ${numStr}`);
    break;
  }
}

// finding closest palindromic number
let numNum = Number(numStr),
  palindromicPositiveCheck = numNum,
  palindromicNegativeCheck = numNum,
  result;
if (isPalindrome(numStr)) {
  console.log(`The number(${numStr}) you inputted is palindromic number.`);
} else {
  let numNum = Number(numStr);
  while (true) {
    palindromicPositiveCheck += 1;
    palindromicNegativeCheck -= 1;
    if (
      isPalindrome(palindromicPositiveCheck.toString()) &&
      isPalindrome(palindromicNegativeCheck.toString())
    ) {
      result = palindromicNegativeCheck;
      break;
    } else if (isPalindrome(palindromicPositiveCheck.toString())) {
      result = palindromicPositiveCheck;
      break;
    } else if (isPalindrome(palindromicNegativeCheck.toString())) {
      result = palindromicNegativeCheck;
      break;
    } else {
      continue;
    }
  }
  console.log(
    `Closest palindromic number to the number you inputted (${numStr}) : ${result}`
  );
}
