const numToRoman = (num) => {
  let roman = "";
  let result = num;

  // thousoands
  if (Math.trunc(result / 1000) > 0) {
    roman += "M".repeat(Math.trunc(result / 1000));
    // updating number for hundreds
    result -= Math.trunc(result / 1000) * 1000;
  }

  // hundreds
  if (result / 1000 >= 0.9) {
    roman += "CM";
    // updating number for tens
    result -= Math.trunc(result / 100) * 100;
  } else if (result / 1000 >= 0.5) {
    roman += "D".concat("C".repeat(Math.trunc(result / 100) - 5));
    // updating number for tens
    result -= Math.trunc(result / 100) * 100;
  } else if (result / 500 >= 0.8) {
    roman += "CD";
    // updating number for tens
    result -= Math.trunc(result / 100) * 100;
  } else {
    roman += "C".repeat(Math.trunc(result / 100));
    // updating number for tens
    result -= Math.trunc(result / 100) * 100;
  }

  // tens
  if (result / 100 >= 0.9) {
    roman += "XC";
    // updating number for ones
    result -= Math.trunc(result / 10) * 10;
  } else if (result / 100 >= 0.5) {
    roman += "L".concat("X".repeat(Math.trunc(result / 10) - 5));
    // updating number for ones
    result -= Math.trunc(result / 10) * 10;
  } else if (result / 50 >= 0.8) {
    roman += "XL";
    // updating number for ones
    result -= Math.trunc(result / 10) * 10;
  } else {
    roman += "X".repeat(Math.trunc(result / 10));
    // updating number for ones
    result -= Math.trunc(result / 10) * 10;
  }

  // ones
  if (result / 10 >= 0.9) {
    roman += "IX";
  } else if (result / 10 >= 0.5) {
    roman += "V".concat("I".repeat(result - 5));
  } else if (result / 5 >= 0.8) {
    console.log(result / 5);
    roman += "IV";
  } else {
    roman += "I".repeat(result);
  }

  return roman;
};

const decimalNum = document.getElementById("decimal");
const romanNum = document.getElementById("roman");
const inputLog = document.getElementById("inputLog");
const inputLogWrap = document.getElementsByClassName("input-logger")[0];
const btn = document.getElementById("convert");

btn.addEventListener("click", (e) => {
  e.preventDefault();
  if (decimalNum.value == "") {
    alert("You must enter a number first, try again");
    decimalNum.value = "";
    return;
  }

  if (!Number.isInteger(+decimalNum.value)) {
    alert("Only integers allowed, try again.");
    decimalNum.value = "";
    return;
  }

  let num = +decimalNum.value;
  if (num >= 4000 || num <= 0) {
    alert(
      "Number must be lower than 4000 and greater than 0, try again with new number."
    );
    decimalNum.value = "";
    return;
  }

  inputLogWrap.classList.remove("hidden");
  inputLog.textContent = num;
  inputLog.style.fontWeight = 700;
  romanNum.value = numToRoman(num);
  decimalNum.value = "";
});
