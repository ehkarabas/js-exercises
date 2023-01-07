/*
 An anagram is the result of rearranging the letters of a word to produce a new word (see wikipedia).

 Note: anagrams are case insensitive

 Complete the function to return true if the two arguments given are anagrams of each other; return false otherwise.

 isAnagram("foefet", "toffee") => output: true, 'The word "foefet" is an anagram of "toffee"'
 isAnagram("Buckethead", "DeathCubeK") => output: true, 'The word "Buckethead" is an anagram of "DeathCubeK"'
 isAnagram("Twoo", "WooT") => output: true, 'The word "Twoo" is an anagram of "WooT"'

 isAnagram("dumble", "bumble") => output: false, 'Characters do not match for test case "dumble", "bumble"'
 isAnagram("ound", "round") => output: false, 'Missing characters for test case "ound", "round"'
 isAnagram("apple", "pale") => output: false, 'Same letters, but different count'
*/

const anagramCheck = (str1, str2) => {
  return (
    str1.toLowerCase().split("").sort().join("") ===
    str2.toLowerCase().split("").sort().join("")
  );
};

// console.log("apple".split("").sort().join(""));

console.log(anagramCheck("foefet", "toffee")); // true
console.log(anagramCheck("Buckethead", "DeathCubeK")); // true
console.log(anagramCheck("Twoo", "WooT")); // true
console.log(anagramCheck("dumble", "bumble")); // false
console.log(anagramCheck("ound", "round")); // false
console.log(anagramCheck("apple", "pale")); // false
