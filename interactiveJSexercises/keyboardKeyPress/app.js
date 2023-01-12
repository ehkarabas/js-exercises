// Google Fonts Integration
let link = document.createElement("link");
link.setAttribute("rel", "preconnect");
link.setAttribute("href", "https://fonts.googleapis.com");
document.head.appendChild(link);

link = document.createElement("link");
link.setAttribute("rel", "preconnect");
link.setAttribute("href", "https://fonts.gstatic.com");
link.setAttribute("crossorigin", "");
document.head.appendChild(link);

link = document.createElement("link");
link.setAttribute("rel", "stylesheet");
link.setAttribute(
  "href",
  "https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;700&display=swap"
);
document.head.appendChild(link);

let body = document.getElementsByTagName("body")[0];
body.style.fontFamily = `'Fira Code', monospace`;

// Selecting Elements
let pChar = document.getElementById("char");
let pAscii = document.getElementById("ascii");
let divChar = document.getElementsByTagName("div")[0];
let divAscii = document.getElementsByTagName("div")[1];
let pInitial = document.getElementById("initialMsg");
document.addEventListener("keydown", (e) => {
  // Hiding Initial Message
  pInitial.style.display = "none";

  // Building action info message
  pChar.textContent = "You pressed ";
  pChar.style.fontSize = "2rem";
  pChar.style.fontWeight = "700";

  // Building pressed key info message
  let pCharSpan = document.createElement("span");
  pCharSpan.style.color = "green";
  e.keyCode == 32
    ? (pCharSpan.innerText = "Space")
    : (pCharSpan.innerText = e.key);
  pCharSpan.style.fontWeight = "700";
  pChar.appendChild(pCharSpan);

  // Styling div of ASCII code
  divAscii.style.padding = "0 2rem";
  divAscii.style.boxShadow = "0px 5px 15px rgba(0, 0, 0, 0.35)";

  // Building ASCII code info message
  pAscii.innerText = e.keyCode;
  pAscii.style.color = "green";
  pAscii.style.fontSize = "2rem";
  pAscii.style.fontWeight = "700";
});
