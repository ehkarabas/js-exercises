// *VARIABLES

const userChoice = document.getElementById("your-choice");
const pcChoice = document.getElementById("pc-choice");
const select = document.querySelector(".select");
let userSelect; // User choice
let pcRandom; // PC choice

// Storing scores
const scoreUser = document.getElementById("you");
const scorePc = document.getElementById("pc");
const domTopScore = document.querySelector(".top-score");

// Modal selectors
const resultDiv = document.querySelector(".result-msg");
const containerEl = document.querySelector(".container");
const modalEl = document.querySelector(".modal-container");
const modalBtn = document.querySelector("#modal-ok");

// Result message
const final = document.getElementById("final");

// * EVENT LISTENERS
// Ekrandan tıklanan elemente göre bizim seçimimizi ekrana yazdırır.

select.addEventListener("click", (e) => {
  // console.log(e.target.className)
  // console.log(e.target.getAttribute("alt"))
  // Preventing null clicks
  if (e.target.getAttribute("alt")) {
    userSelect = e.target.getAttribute("alt");
    userChoice.innerHTML = `<img src="./assets/${userSelect}.png"></img>`;
    pc();
    result();
  }
});

const pcArr = ["rock", "paper", "scissors"]; // PC options

// Defining a function to print PC choice
const pc = () => {
  pcRandom = pcArr[Math.floor(Math.random() * 3)];
  // pcRandom = 'rock'

  // console.log(pcRandom)
  pcChoice.innerHTML = `<img src="./assets/${pcRandom}.png"></img>`;
};

// Defining a function to calculate results and finish the match at score 10
const result = () => {
  switch (userSelect) {
    case "rock":
      if (pcRandom == "paper") {
        lost();
      } else if (pcRandom == "scissors") {
        win();
      }
      break;

    case "paper":
      if (pcRandom == "scissors") {
        lost();
      } else if (pcRandom == "rock") {
        win();
      }
      break;
    case "scissors":
      if (pcRandom == "rock") {
        lost();
      } else if (pcRandom == "paper") {
        win();
      }
      break;

    default:
      break;
  }

  // Deuce case
  if (userSelect == pcRandom) {
    resultDiv.classList.add("active");
    resultDiv.innerHTML = "It's a draw";
    containerEl.style.boxShadow = "3px 3px 10px 1px #FFC538";
    resultDiv.style.backgroundColor = "#FFC538";
  }

  // Displaying final message if user wins
  if (scoreUser.innerText == "10") {
    final.innerHTML = `🎉 You Win 🥳`;
    document.querySelector(".modal").style.backgroundColor = "#5AB7AC";
    modalBtn.style.color = "#5AB7AC";
    topScoreCheck();
  }

  // Finishing the match
  if (scorePc.innerText == "10" || scoreUser.innerText == "10") {
    modal();
  }
};

// Displaying a message for round result if user loses
const lost = () => {
  resultDiv.classList.add("active");
  resultDiv.innerHTML = "You Lost";
  containerEl.style.boxShadow = "3px 3px 10px 1px #fb778b";
  resultDiv.style.backgroundColor = "#fb778b";
  scorePc.innerText++;
};

// Displaying a message for round result if user wins
const win = () => {
  resultDiv.classList.add("active");
  resultDiv.innerHTML = "You Win";
  containerEl.style.boxShadow = "3px 3px 10px 1px #5AB7AC";
  resultDiv.style.backgroundColor = "#5AB7AC";
  scoreUser.innerText++;
};

// Defining a function to show modal window
const modal = () => {
  modalEl.classList.add("show");
};

// Closing modal window and reloading the page when play again button clicked
modalBtn.addEventListener("click", () => {
  // modalEl.classList.remove("show");
  modalEl.style.display = "none";
  window.location.reload();
});

// Getting value of high score from local storage
let storagedScore = localStorage.getItem("highScore");
console.log(storagedScore);

let topScore; // Value will be printed on screen

// Checking if the winning score is a top score
if (storagedScore) {
  topScore = `10 - ${storagedScore}`;
} else {
  topScore = "0 - 0";
}

// Printing top score
domTopScore.innerText = topScore;

// Defining a function to check if the winning score is a top score
const topScoreCheck = () => {
  storagedScore || localStorage.setItem("highScore", scorePc.innerText);
  if (storagedScore >= scorePc.innerText) {
    localStorage.setItem("highScore", +scorePc.innerText);
  }
};

// console.log("10" >= 5); // Type coercion

// Worst Practice
// const rock = document.querySelector(".rock");
// const paper = document.querySelector(".paper");
// const scissors = document.querySelector(".scissors");

// rock.addEventListener("click", () => {
//   userChoice.innerHTML = `<img src="./assets/rock.png"></img>`;
// });
// paper.addEventListener("click", () => {
//   userChoice.innerHTML = `<img src="./assets/paper.png"></img>`;
// });
// scissors.addEventListener("click", () => {
//   userChoice.innerHTML = `<img src="./assets/scissors.png"></img>`;
// });
