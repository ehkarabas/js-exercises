// Selecting DOM elements

// DOM elements displaying general weather conditions and date&time
const app = document.querySelector(".weather-app");
const name = document.querySelector(".name");
const temp = document.querySelector(".temp");
const date = document.querySelector(".date");
const time = document.querySelector(".time");
const condition = document.querySelector(".condition");
const icon = document.querySelector(".icon");
// DOM elements displaying detailed weather conditions
const cloud = document.querySelector(".cloud");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");

// DOM elements receiving input from end user
const form = document.getElementById("locationInput");
const search = document.querySelector(".search");
const btn = document.querySelector(".submit");

// DOM element for preset cities
const cities = document.querySelectorAll(".city");

// Setting default city on page loads
let cityInput = "sakarya";

// Click event for preset cities in the panel
cities.forEach((city) => {
  city.addEventListener("click", (e) => {
    // Changing the default city to the clicked one
    cityInput = e.target.innerText;
    // Function that fetches and displays weather data
    fetchWeatherData();
    // Fade out the app
    app.style.opacity = "0";
  });
});

// Submit event
form.addEventListener("submit", (e) => {
  // Preventing default behaviour of the form
  e.preventDefault();
  // Throwing an alert if the input field(search bar) is empty
  if (search.value == "") {
    alert("Type a city name first.");
  } else {
    // Changing default city with the input
    cityInput = search.value;
    // Function that fetches and displays weather data
    fetchWeatherData();
    // Clearing input field
    search.value = "";
    // Fade out the app
    app.style.opacity = "0";
  }
});

// Function returning a day of the week from a date
const dayOfTheWeek = (month, day, year) => {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return weekday[new Date(`${month}/${day}/${year}`).getDay()];
};

// API Key : 30b79186871044b4b3111559232701
// localtime : "2023-01-27 5:17"

const fetchWeatherData = () => {
  console.log("ok");
  fetch(
    `https://api.weatherapi.com/v1/current.json?key=30b79186871044b4b3111559232701&q=${cityInput}&aqi=no`
  )
    // taking data in json format and convert it to JS object
    .then((onfulfilled) => onfulfilled.json())
    .then((data) => {
      // console.log(data);

      // displaying temperature
      const temperature = Math.round(+data.current.temp_c).toFixed(0);
      temp.innerText = temperature + "°";
      // displaying weather condition
      condition.innerText = data.current.condition.text;
      // getting date and time from the city and extract year, month, day, time to individual variables
      const dateData = data.location.localtime;
      const y = parseInt(dateData.substr(0, 4));
      const m = parseInt(dateData.substr(5, 2));
      const d = parseInt(dateData.substr(8, 2));
      const t = dateData.substr(11);

      // reformat date and display on screen
      date.innerText = `${dayOfTheWeek(m, d, y)} ${d}/${m}/${y}`;
      time.innerText = t;

      // displaying name of the city on screen
      name.innerText = data.location.name;

      // displaying weather icon on screen
      const iconId = data.current.condition.icon.substr(
        "//cdn.weatherapi.com/weather/64x64/".length
      );

      icon.src = "./assets/weather-icons/" + iconId;

      // displaying weather details on panel
      cloud.innerText = data.current.cloud + "%";
      humidity.innerText = data.current.humidity + "%";
      wind.innerText = data.current.wind_kph + "km/h";

      // set default time of day
      let timeOfDay = "day";
      // getting unique id´s for each weather condition
      const code = data.current.condition.code;
      // change to night if its night time in the city
      if (!data.current.is_day) {
        timeOfDay = "night";
      }
      if (code == 1000) {
        // setting background image to clear if the weather is clear
        app.style.backgroundImage = `url(./assets/images/${timeOfDay}/clear.jpg)`;
        // changing the button´s background color depending on if its day or night
        if (timeOfDay == "night") {
          btn.style.backgroundColor = "#181e27";
        } else {
          btn.style.backgroundColor = "#e5ba92";
        }
      }
      // setting background image to cloudy if the weather is cloudy
      else if (
        [
          1003, 1006, 1009, 1030, 1069, 1087, 1135, 1273, 1276, 1279, 1282,
        ].includes(code)
      ) {
        app.style.backgroundImage = `url(./assets/images/${timeOfDay}/cloudy.jpg)`;
        if (timeOfDay == "night") {
          btn.style.backgroundColor = "#181e27";
        } else {
          btn.style.backgroundColor = "#fa6d1b";
        }
      }
      // setting background image to rainy if the weather is rainy
      else if (
        [
          1063, 1069, 1072, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195,
          1204, 1207, 1240, 1243, 1246, 1249, 1252,
        ].includes(code)
      ) {
        app.style.backgroundImage = `url(./assets/images/${timeOfDay}/rainy.jpg)`;
        if (timeOfDay == "night") {
          btn.style.backgroundColor = "#325c80";
        } else {
          btn.style.backgroundColor = "#647d75";
        }
      }
      // setting background image to snowy if the weather is snowy
      else {
        app.style.backgroundImage = `url(./assets/images/${timeOfDay}/snowy.jpg)`;
        if (timeOfDay == "night") {
          btn.style.backgroundColor = "#1b1b1b";
        } else {
          btn.style.backgroundColor = "#4d72aa";
        }
      }
      // fading in the page once all is done
      app.style.opacity = "1";
    })
    // throwing an alert if the user types a city that doesnt exist
    .catch(() => {
      alert("City not found, please try again");
      app.style.opacity = "1";
    });
};

// calling the function on page load
fetchWeatherData();

// fading in the page
app.style.opacity = "1";
