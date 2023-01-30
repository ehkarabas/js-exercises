// Selecting DOM Elements For Error Handling And Creating Select Element Content With Country Names

const select = document.getElementById("select");
const errorWrap = document.getElementById("errorWrap");
const errorImg = document.getElementById("errorImg");
const errorText = document.getElementById("errorText");

fetch("https://restcountries.com/v3.1/all")
  .then((res) => {
    // defining an error if response is negative
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);

    // converting response to json
    const data = res.json();

    // hiding error card if it has appeared previously
    errorWrap.classList.add("hidden");

    // returning json
    return data;
  })
  .then((json) => {
    // storing all country names in an array
    const names = [].map.call(json, (obj) => obj.name.common);
    // sorting names according to ascending ASCII order
    names.sort();

    // building select element(dropdown menu) with all countries
    names.forEach((name) => {
      const option = document.createElement("option");
      option.value = name;
      option.innerText = name;
      select.appendChild(option);
    });
  })
  // if an error occurs displaying it
  .catch((err) => {
    errorWrap.classList.remove("hidden");
    errorImg.src = "./images/404.png";
    errorText.innerText = err;
  });

// Event Listener To Display Country Card
select.addEventListener("click", (e) => {
  // Selecting DOM Elements To Create Country Card
  const card = document.getElementById("card");
  const image = document.getElementById("image");
  const country = document.getElementById("country");
  const region = document.getElementById("region");
  const capital = document.getElementById("capital");
  const languages = document.getElementById("languages");
  const currencies = document.getElementById("currencies");
  const population = document.getElementById("population");
  const borders = document.getElementById("borders");
  const mapEl = document.getElementById("map");

  // Resetting all text content before render new countries´ infos
  country.innerText = "";
  region.innerText = "";
  capital.innerText = "";
  languages.innerText = "";
  currencies.innerText = "";
  population.innerText = "";
  borders.innerText = "";
  map.href = "";
  card.classList.add("hidden");

  // Starting to fetch if clicked one is not the initial item of select element
  if (e.target.value != "Select Country") {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => {
        // defining an error if response is negative
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);

        // converting response to json
        const data = res.json();

        // hiding error card if it has appeared previously
        errorWrap.classList.add("hidden");

        // returning json
        return data;
      })
      .then((json) => {
        // matching country data for the selected item
        const nation = json.filter(
          (nation) => nation.name.common == e.target.value
        )[0];

        // destructuring country infos
        let {
          name: { common: nameC },
          flags: flagsC,
          region: regionC,
          capital: capitalC,
          languages: languagesC,
          currencies: currenciesC,
          population: populationC,
          borders: bordersC,
          maps: { googleMaps: mapC },
        } = nation;

        // throwing an error if country name doesnt exist
        if (!nameC) throw new Error("Country is not available in database");
        country.innerText = nameC;
        // placing country flag into the country card
        image.src = `${flagsC.png}`;
        // rendering region info of the country on the card
        region.innerText = regionC;
        // if exists rendering capital info of the country on the card(e.g. antarctica doesnt have)
        if (capitalC) {
          capitalC.forEach((cptl) => {
            capital.innerText += `${cptl} `;
          });
        } else {
          capital.innerText = `N.A.`;
        }
        // if exists rendering languages info of the country on the card(e.g. antarctica doesnt have)
        if (languagesC) {
          Object.values(languagesC).forEach((language, i, arr) => {
            if (arr.length > 1 && i != arr.length - 1) {
              languages.innerText += ` ${language},`;
            } else {
              languages.innerText += ` ${language} `;
            }
          });
        } else {
          languages.innerText = `N.A.`;
        }
        // if exists rendering currencies info of the country on the card(e.g. antarctica doesnt have)
        if (currenciesC) {
          Object.values(currenciesC).forEach((currencyObj, i, arrMain) => {
            Object.values(currencyObj).forEach((currency, j, arr) => {
              if (j % 2 && arrMain.length > 1 && i != arrMain.length - 1) {
                currencies.innerText += ` ${currency},`;
              } else {
                currencies.innerText += ` ${currency} `;
              }
            });
          });
        } else {
          currencies.innerText = `N.A.`;
        }
        // rendering population info of the country on the card
        const numberWithCommas = (number) => {
          let numberStr = number.toString();
          let numberStrLength = numberStr.length;
          let newNumberStr = "";

          for (let i = 0; i < numberStrLength; i++) {
            if (i % 3 === 0 && i !== 0) {
              newNumberStr += ".";
            }
            if (i == 0) {
              newNumberStr += numberStr.slice(-1);
            } else if (i == numberStrLength - 1) {
              newNumberStr += numberStr[0];
            } else {
              newNumberStr += numberStr.slice(i * -1 - 1, i * -1);
            }
          }
          return Array.from(newNumberStr).reverse().join("");
        };
        population.innerText = numberWithCommas(populationC);
        // population.innerText = populationC.toLocaleString(); // Alternative Way Of The Function Above :)

        // rendering borders info of the country on the card(islands doesnt have any borders)
        if (bordersC) {
          bordersC.forEach((border, i, arr) => {
            if (arr.length > 1 && i != arr.length - 1) {
              borders.innerText += ` ${border},`;
            } else {
              borders.innerText += ` ${border} `;
            }
          });
        } else {
          borders.innerText = `None`;
        }
        // rendering google maps info of the country on the card
        mapEl.href = `${mapC}`;

        // displaying country card when everthing done
        card.classList.remove("hidden");
        // resetting value of the select element
        e.target.value = "Select Country";
      })
      // if an error occurs displaying it
      .catch((err) => {
        errorWrap.classList.remove("hidden");
        card.classList.add("hidden");
        errorImg.src = "./images/404.png";
        errorText.innerText = err;
      });
  }
});
