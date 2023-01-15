// functions to display rules window after some time

function setWithExpiry(key, value = null, interval) {
  const now = new Date();
  const keyValue = {
    value: value,
    expiry: now.getTime() + interval,
  };
  localStorage.setItem(key, JSON.stringify(keyValue));
}

function getWithExpiry(key) {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() >= item.expiry) {
    console.log(now.getTime() >= item.expiry);
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
}

// displaying minutes left to reload rules window
if (localStorage.getItem("rulesReset")) {
  const rulesResetWrapper = document.createElement("div");
  const rulesResetTime = document.createElement("p");
  const rulesResetNow = document.createElement("button");
  const text = document.createTextNode(localStorage.getItem("rulesReset"));
  const btnText = document.createTextNode("Reset Now");
  rulesResetTime.appendChild(text);
  rulesResetNow.appendChild(btnText);
  rulesResetWrapper.appendChild(rulesResetTime);
  rulesResetWrapper.appendChild(rulesResetNow);
  rulesResetWrapper.style.display = "flex";
  rulesResetWrapper.style.alignItems = "center";
  rulesResetWrapper.style.gap = "0.5rem";
  rulesResetNow.style.padding = "0.5rem";
  rulesResetNow.id = "reset";

  const footer = document.querySelector("footer");
  const footerLogo = document.querySelector(".fixed-bottom");
  footer.style.justifyContent = "space-between";
  footerLogo.before(rulesResetWrapper);
}

// highscore structure
const highScore = document.querySelector(".high-score");
const hScore = document.querySelector(".hScore");
console.log(localStorage.getItem("highScore"));
if (localStorage.getItem("highScore")) {
  highScore.textContent = localStorage.getItem("highScore");
}

// checking if it is first run or not
if (!getWithExpiry("againCheck")) {
  localStorage.setItem("firstRun", "yes");
  hScore.style.display = "none";
}

// recording inputs
let highest, lowest;
localStorage.setItem("highest", 100);
localStorage.setItem("lowest", 0);

// console.log(Date());
// console.log(new Date().getTime());
// console.log(
//   JSON.stringify({
//     value: 5,
//     expiry: new Date().getTime() + 1800000,
//   })
// );
// console.log(
//   JSON.parse(
//     JSON.stringify({
//       value: 5,
//       expiry: new Date().getTime() + 1800000,
//     })
//   )
// );

// replay function
function replay() {
  document.querySelector(".again").classList.toggle("hidden");
  document.querySelector(".again").addEventListener("click", () => {
    // if at least half an hour passed from last click on 'Play Again' displaying rules window again
    if (!getWithExpiry("againCheck")) {
      if (localStorage.getItem("firstRun") == "yes") {
        setWithExpiry("againCheck", "first", 1800000);
      } else {
        setWithExpiry("againCheck", "plus1", 1800000);
      }
    } else {
      const againCheckStrVal = localStorage.getItem("againCheck");

      const againCheckParsedVal = JSON.parse(againCheckStrVal);

      againCheckParsedVal.value = "inSession";

      const againCheckUpdatedVal = JSON.stringify(againCheckParsedVal);

      localStorage.setItem("againCheck", againCheckUpdatedVal);
    }

    // structure to displaying minutes left to reload rules window
    localStorage.setItem("firstRun", "no");

    const minsLeft = Number(
      (
        (JSON.parse(localStorage.getItem("againCheck")).expiry -
          new Date().getTime()) /
        60000
      ).toFixed(2)
    );

    localStorage.setItem(
      "rulesReset",
      `${minsLeft} mins left to rules reload.`
    );

    // refreshing the page
    window.location.reload();
  });
}

// console.log(Boolean(document.getElementById("reset")));
// reset structure
if (document.getElementById("reset")) {
  document.getElementById("reset").addEventListener("click", () => {
    localStorage.clear();
    window.location.reload();
  });
}

const modalWin = document.querySelector("#modalWrapper");
const modal = document.querySelector("#modal");
const gamePage = document.querySelector("#gamePage");
const modalClose = document.querySelector("#modalClose");
const gotIt = document.querySelector("#gotIt");

// console.log(getWithExpiry("againCheck"));
// console.log(localStorage.getItem("firstReplay"));

// displaying rules window again if at least half an hour passed from last click on 'Play Again'
if (
  localStorage.getItem("firstRun") == "yes" ||
  !["first", "inSession"].includes(getWithExpiry("againCheck"))
) {
  modalWin.addEventListener("click", () => {
    modalWin.style.display = "none";
    modal.style.display = "none";
  });

  modalClose.addEventListener("click", () => {
    modalWin.style.display = "none";
    modal.style.display = "none";
  });

  gotIt.addEventListener("click", () => {
    modalWin.style.display = "none";
    modal.style.display = "none";
  });
} else {
  modalWin.style.display = "none";
  modal.style.display = "none";
  // logging minutes left to display rules window again
  if (getWithExpiry("againCheck")) {
    console.log(
      "Minutes left to display rules window again :",
      Number(
        (
          (JSON.parse(localStorage.getItem("againCheck")).expiry -
            new Date().getTime()) /
          60000
        ).toFixed(2)
      )
    );
  }
}

// selecting DOM element objects
const secretNumber = Math.trunc(Math.random() * 100) + 1;
console.log(secretNumber);
let attempt = 0;
let score = 7;
let guessInput = document.querySelector(".guess");
let bodyImg = document.querySelector("#gamePage main .images img");
const msg = document.querySelector(".message");
const displayMessage = function (message) {
  msg.textContent = message;
};

// changing body image when input onfocus
attempt == 0 &&
  guessInput.addEventListener("focus", () => {
    bodyImg.src = "./images/cute.gif";
  });

// game part
document.querySelector(".check").addEventListener("click", () => {
  const guess = Number(guessInput.value);
  if (guess < 0 || guess > 100) {
    displayMessage("Allowed range: 1-100");
  } else if (!guess) {
    displayMessage("Input your guess");
  } else if (guess == secretNumber) {
    displayMessage("Congratulations!");
    bodyImg.src = "./images/guess.png";
    // updating highscore
    if (!localStorage.getItem("highScore")) {
      localStorage.setItem("highScore", `${score}`);
    }
    if (score > Number(localStorage.getItem("highScore"))) {
      localStorage.setItem("highScore", `${score}`);
      highScore.textContent = score;
    }
    replay();
  } else if (guess != secretNumber) {
    if (score > 1) {
      if (guess < secretNumber) {
        if (guess > localStorage.getItem("lowest")) {
          localStorage.setItem("lowest", guess);
        }
        displayMessage(
          `${localStorage.getItem("lowest")} to ${
            Number(localStorage.getItem("highest")) < 100
              ? localStorage.getItem("highest")
              : 100
          }`
        );
      }
      if (guess > secretNumber) {
        if (guess < localStorage.getItem("highest")) {
          localStorage.setItem("highest", guess);
        }
        displayMessage(
          `${
            Number(localStorage.getItem("lowest")) > 0
              ? localStorage.getItem("lowest")
              : 0
          } to ${localStorage.getItem("highest")}`
        );
      }
      // displayMessage(guess > secretNumber ? `` : "Try with higher");
      attempt++;
      score--;
      document.querySelector(".score").textContent = score;
      document.querySelector(".attempt").textContent = attempt;
      if (attempt == 6) {
        document.querySelector(".last").classList.toggle("hidden");
      }
    } else {
      displayMessage("You lost.");
      bodyImg.src = "./images/sad.png";
      document.querySelector(".score").textContent = 0;
      document.querySelector(".attempt").textContent = 7;
      document.querySelector(".last").classList.toggle("hidden");
      document.querySelector(".btn").classList.toggle("hidden");
      document.querySelector(".guess").classList.toggle("hidden");
      replay();
    }
  }
});

// const testObj = { value: "first", expiry: 1673734106884 };

// localStorage.setItem("test", JSON.stringify(testObj));

// const testVal = localStorage.getItem("test");
// console.log(testVal);

// const parsedTest = JSON.parse(testVal);
// console.log(parsedTest);

// parsedTest.value = "plus1";
// console.log(parsedTest);
