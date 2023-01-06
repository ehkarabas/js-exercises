// Filter out the vowels (a, e, i, o, u) in a given string and combine the remaining letters that are not vowels.

// Examples:
// Input: "day" Output: "d"
// Input: "apple" Output: "ppl"
// Input: "javascript" Output: "jvscrpt"

// Exact input validation with regex pattern
let word;
while (true) {
  word = prompt("Enter a string with only letters : ");
  // console.log(word.match(/^[A-Za-z]+$/));
  if (word.match(/^[A-Za-z]+$/) == null) {
    console.log("Your must enter only letters without any spaces, try again.");
    continue;
  } else {
    console.log(`The word you inputted : ${word}`);
    break;
  }
}

// Regex for letters with no whitespaces : ^[A-Za-z]+$

// Defining a function that filters only consonants from a string
const consonantsFilter = (mixedStr) => {
  let wordArr = mixedStr.split("");
  let consonantsOnly = wordArr.filter((letter) => !"aeoui".includes(letter));
  return consonantsOnly;
};

// Outputting the result
console.log(consonantsFilter(word));
