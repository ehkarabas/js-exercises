// Time Counter
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");
const screen = document.getElementById("screen");
let counter = 0;

start.addEventListener("click", () => {
  start.disabled = true;
  const st = setInterval(() => {
    counter++;
    screen.innerText = `${Math.trunc(counter / 3600)} hours ${Math.trunc(
      counter / 60
    )} mins ${counter % 60} secs`;
    stop.addEventListener("click", () => {
      start.disabled = false;
      clearInterval(st);
    });
  }, 1000);
});

reset.addEventListener("click", () => {
  counter = 0;
  screen.innerText = counter;
});

// Click Counter

let count = 0;
let increase = document.getElementById("increase");
let decrease = document.getElementById("decrease");
let reset2 = document.getElementById("reset2");
let span = document.getElementsByTagName("span")[0];

let button = document.querySelectorAll(".btn");

button.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    console.log(e.currentTarget);
    console.log(e.currentTarget.classList);
    let current = e.currentTarget.classList;
    if (current.contains("increase")) {
      count++;
    } else if (current.contains("decrease")) {
      count--;
    } else {
      count = 0;
    }

    count < 0
      ? (span.style.color = "red")
      : count > 0
      ? (span.style.color = "green")
      : (span.style.color = "#fff");
    span.textContent = count;
  });
});
