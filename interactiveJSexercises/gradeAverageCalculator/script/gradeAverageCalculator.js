function gradeValidate(score,examNo) {
  while (true) {
    let infoString;
    if (examNo=="mid") {
      infoString = "midterm";
    } else {
      infoString = "final";
    }
    score = Number(prompt(`your ${infoString} score : `));
    if (isNaN(score)) {
      console.log("You need to enter numbers only, try again");
      continue;
    } else if (score < 0 || score > 100) {
      console.log("You need to enter numbers between 0 and 100, try again.");
      continue;
    } else {
	  console.log(`inputted ${infoString} score : ${score}`);
      return score;
    }
  }
}

let again;
do {
  let avg;
  let midterm;
  midterm = gradeValidate(midterm,"mid");

  let final;
  final = gradeValidate(final);

  avg = midterm * 0.4 + final * 0.6;
  console.log(`Your grade is ${avg}`);
  again = prompt("Do you want to continue(y/Y)?");
} while (again.toLowerCase() == "y");
console.log("See you later, Bye!");