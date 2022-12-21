// ! Number guessing game

// ?Input Validation Function For Guess
function guessValidate(guess) {
  while (true) {
    guess = Number(prompt("Enter your guess : "));
    if (isNaN(guess)) {
      console.log("You need to enter numbers only, try again");
      continue;
    } else if (guess < 0 || guess > 100) {
      console.log("You need to enter numbers between 0 and 100, try again.");
      continue;
    } else {
      return guess;
    }
  }
}

// ?Input Validation Function For Game Loop
function againValidate(again) {
  while (true) {
    again = prompt(
      "Do you want to play again? Input y/Y for 'Yes', n/N for 'No' : "
    ).toLowerCase();
    if (again == "y") {
      console.log("Game is reloading...");
      return true;
    } else if (again == "n") {
      console.log("See you later, bye!");
      return false;
    } else {
      console.log(
        "You need to type y/Y for 'Yes' and n/N for 'No', try again."
      );
      continue;
    }
  }
}

// ?Function To Display Proximity Range If Guess Is Close Enough
function guessWrongRange(guess, num) {
  if (Math.abs(guess - num) <= 10) {
    console.log(
      `The difference between your guess(${guess}) and the number is maximum 10. You are so close!`
    );
    return true;
  } else {
    return false;
  }
}

// ?Function For To Dos If Guess Is Wrong
function guessWrong(guess, num, live) {
  if (live != 0 && guess < num) {
    console.log(`Try with higher.\nChances left : ${live - 1} `);
    return live;
  } else if (live != 0 && guess > num) {
    console.log(`Try with lower.\nChances left : ${live - 1} `);
    return live;
  } else {
    return live;
  }
}

// ?The Game
while (true) {
  let trial = 5;
  const rand = Math.round(Math.random() * 100);
  // console.log(rand);
  let again;

  for (; trial > 0; trial--) {
    let guess;
    guess = guessValidate(guess);
    if (guess == rand) {
      console.log("Congratulations, you win!");
      break;
    } else {
      if (guessWrongRange(guess, rand)) {
        trial = guessWrong(guess, rand, trial);
      } else {
        trial = guessWrong(guess, rand, trial);
      }
    }
  }
  if (trial == 0) {
    console.log(`Sorry, you lost. The number was : ${rand}`);
  }
  if (againValidate(again)) {
    continue;
  } else {
    break;
  }
}
