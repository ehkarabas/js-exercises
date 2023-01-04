// ?Sentence Capitalizer
console.log(`${"-".repeat(5)} Sentence Capitalizer ${"-".repeat(5)}`);
// Convert a text into sentence format.
// Example:
// From : "a Good Developer MAY bE aBle to Search Solutions to the Problems."
// To : "A good developer may be able to search solutions to the problems."

// defining a function to capitalize the sentence
const sentenceCapitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// input validation by regex pattern to match a sentence containing at least two words
// URL https://regexr.com/75iq9
let strToCapitalize;
while (true) {
  strToCapitalize = prompt("Type a sentence to capitalize : ");
  if (
    strToCapitalize.search(
      /(^[a-zA-Z]{1})([\w-!“”"`$&+,:;=?@#|'<>.^*()%/.\\]+)[ ]{1,}([a-zA-Z]{1})[ -!“”"`$&+,:;=?@#|'<>.^*()%/.\w\\]*/gi
    )
  ) {
    console.log(
      "Type  a sentence beginning with a letter, containing 2 or more words that begin with a letter, and spaces between the words. Try again. "
    );
    continue;
  } else {
    console.log(`Sentence you inputted : ${strToCapitalize}`);
    break;
  }
}

// outputting the result
console.log(`Capitalized sentence : ${sentenceCapitalize(strToCapitalize)}`);
