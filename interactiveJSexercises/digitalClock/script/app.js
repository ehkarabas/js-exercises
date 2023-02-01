// checking if a lang key is present in local storage, if not present, setting a default value to the key
if (!localStorage.getItem("lang")) {
  localStorage.setItem("lang", "tr-TR");
}

// selecting active language element
const activeLang = document.querySelector(".activeLang");

// defining a function to update active language field and its corresponding key´s value in local storage
const activeLangUpdater = (lang) => {
  const textStr =
    lang == "en-EN"
      ? " English"
      : lang == "tr-TR"
      ? " Turkish"
      : lang == "ru-RU"
      ? " Russian"
      : lang == "de-DE"
      ? " Deutsch"
      : lang == "it-IT"
      ? "Italian"
      : lang == "es-ES"
      ? " Spanish"
      : "";
  const iconTag =
    lang == "en-EN"
      ? "fi-us"
      : lang == "tr-TR"
      ? "fi-tr"
      : lang == "ru-RU"
      ? "fi-ru"
      : lang == "de-DE"
      ? "fi-de"
      : lang == "it-IT"
      ? "fi-it"
      : lang == "es-ES"
      ? "fi-es"
      : "";
  const icon = document.createElement("i");
  const text = document.createTextNode(textStr);
  icon.classList.add("fi", `${iconTag}`, "fis");
  activeLang.innerText = "";
  activeLang.appendChild(icon);
  activeLang.appendChild(text);
  localStorage.setItem("lang", lang);
};

// rendering active langage field
activeLangUpdater(localStorage.getItem("lang"));

// defining a function to render/update date & time on screen
const showTime = () => {
  // selecting date & time fields
  const time = document.getElementById("time");
  const date = document.getElementById("date");
  // storing localstorage key´s value in a variable
  const lang = localStorage.getItem("lang");
  // rendering/updating fields
  time.innerText = new Date().toLocaleString(lang, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: lang == "tr-TR" ? false : true,
  });
  date.innerText = new Date().toLocaleString(lang, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// running the renderer function every second
let timer = setInterval(showTime, 1000);

// selecting active language field wrapper
const lang = document.querySelector(".lang");

// click listener for the active language change
lang.addEventListener("click", (e) => {
  if (e.target.id) {
    // updating active language field
    activeLangUpdater(e.target.id);
    // stopping active screen renderer
    clearInterval(timer);
    // setting screen renderer again with the updated active language
    timer = setInterval(showTime, 1000);
  }
});
