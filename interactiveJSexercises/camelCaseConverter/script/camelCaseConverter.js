const camelCaseConverter = (string) => {
  return string.search("-") === -1
    ? string
        .trim()
        .split(" ")
        .map((word, index) =>
          index >= 1
            ? word[0].toUpperCase() + word.slice(1).toLowerCase()
            : word[0].toLowerCase() + word.slice(1)
        )
        .join("")
    : string
        .trim()
        .split("-")
        .map((word, index) =>
          index >= 1
            ? word[0].toUpperCase() + word.slice(1).toLowerCase()
            : word[0].toUpperCase() + word.slice(1)
        )
        .join("");
};

const kebabOrWspaces = document.getElementById("kebabOrWspaces");
const camelCase = document.getElementById("camelCase");
const inputLog = document.getElementById("inputLog");
const inputLogWrap = document.getElementsByClassName("input-logger")[0];
const btn = document.getElementById("convert");

btn.addEventListener("click", (e) => {
  e.preventDefault();
  if (kebabOrWspaces.value == "") {
    alert("You must enter something first, try again");
    kebabOrWspaces.value = "";
    return;
  }

  inputLogWrap.classList.remove("hidden");
  inputLog.textContent = kebabOrWspaces.value;
  inputLog.style.fontWeight = 700;
  camelCase.value = camelCaseConverter(kebabOrWspaces.value);
  kebabOrWspaces.value = "";
});
