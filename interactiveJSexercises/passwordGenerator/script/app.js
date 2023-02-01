generate.addEventListener("click", () => {
  // defining collections of password components
  const specialChars = "!@#$%^&*()_+~|}{[]:;?><,./-=".split("");
  const asciiUpperArr = [...Array(26)].map((_, ascii) => ascii + 65);
  const asciiLowerArr = [...Array(26)].map((_, ascii) => ascii + 97);
  const alphabetUpper = asciiUpperArr.map((ascii) =>
    String.fromCharCode(ascii)
  );
  const alphabetLower = asciiLowerArr.map((ascii) =>
    String.fromCharCode(ascii)
  );
  const alphabetCombined = alphabetLower.concat(alphabetUpper);
  const numbers = [...Array(10).keys()];
  const passwordContent = [];
  // creating password from components according to generation rules
  for (let i = 2; i >= 1; i--) {
    const lengthSpecial = specialChars.length;
    const lengthNumbers = numbers.length;
    const lengthUppers = alphabetUpper.length;
    const lengthLowers = alphabetLower.length;
    const lengthCombined = alphabetCombined.length;
    // adding 2 random special characters, numbers and lowercase/uppercase letters in the array
    passwordContent.push(
      specialChars[Math.floor(Math.random() * lengthSpecial)]
    );
    passwordContent.push(numbers[Math.floor(Math.random() * lengthNumbers)]);
    passwordContent.push(
      alphabetCombined[Math.floor(Math.random() * lengthCombined)]
    );
    if (i == 1) {
      // adding 1 random number, lowercase letter, uppercase letter, lowercase/uppercase letter in the array
      passwordContent.push(numbers[Math.floor(Math.random() * lengthNumbers)]);
      passwordContent.push(
        alphabetUpper[Math.floor(Math.random() * lengthUppers)]
      );
      passwordContent.push(
        alphabetLower[Math.floor(Math.random() * lengthLowers)]
      );
      passwordContent.push(
        alphabetCombined[Math.floor(Math.random() * lengthCombined)]
      );
    }
  }
  // console.log(passwordContent);
  // generating final result in random placement order
  let result = "";
  for (let i = 10; i >= 1; i--) {
    const randomIndex = Math.floor(Math.random() * passwordContent.length);
    result += passwordContent.splice(randomIndex, 1)[0].toString();
  }
  // console.log(result);
  // rendering the result on the screen
  display.classList.remove("hidden");
  password.innerText = result;
});
