// Selecting DOM Elements

// Elements For Info Modal
const infoModal = document.querySelector(".info-message-wrapper");
const infoMessage = document.querySelector(".info-message");
const infoModalClose = document.querySelector(".info-message-wrapper i");

// Elements For Adding Income
const addIncomeInput = document.getElementById("inputIncomeAmount");
const addIncomeBtn = document.querySelector(".add-income");

// Elements For Adding Expense
const expenseItem = document.getElementById("inputExpenseItem");
const expenseDate = document.getElementById("inputDateTimeLocal");
const expenseAmount = document.getElementById("inputExpenseAmount");
const addExpenseBtn = document.querySelector(".add-expense");
const expensesTable = document.querySelector(".expenses-table tbody");

// Element For Removing Expense
const removeExpense = document.querySelector("i.fa-solid.fa-trash");

// Elements For Resetting and Saving
const clearBtn = document.querySelector(".clear");
const resetBtn = document.querySelector(".reset");
const incomeForm = document.getElementById("incomeForm");
const expenseForm = document.getElementById("expenseForm");
const wipeBtn = document.querySelector(".wipe");

// Elements For Final Table
const totalIncome = document.getElementById("totalIncome");
const totalExpense = document.getElementById("totalExpense");
const left = document.getElementById("left");

// Global Variables
let hideAuto; // Automatically hiding modal window

// Event Listeners

// Event Listener To Add Income
addIncomeBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // input validation and alerting end user about what is lack
  if (addIncomeInput.value == "") {
    alert("Input field cannot be empty, try again.");
  } else if (!Number.isInteger(+addIncomeInput.value)) {
    alert("Input field must be integer, try again.");
  } else if (+addIncomeInput.value <= 0) {
    alert("Input field must be positive, try again.");
  } else {
    const newIncome = {
      id: new Date().getTime(), //unique id with ms of now
      income: addIncomeInput.value, //user´s income amount input
    };
    // pushing income object to the array
    incomesArr.push(newIncome);

    // updating expenses key´s value with the modified array
    localStorage.setItem("incomes", JSON.stringify(incomesArr));
    const amount = +addIncomeInput.value;

    // calling function to update final table
    updateFinal(+amount);

    // resetting to initial state
    incomeForm.reset();

    // displaying informative modal for 2 secs
    displayModal("inc");
  }
});

// Event Listener To Add Expenses
addExpenseBtn.addEventListener("click", (e) => {
  e.preventDefault();
  // input validation and alerting end user about what is lack
  if (expenseItem.value == "") {
    alert("Expense Item field cannot be empty, try again.");
  } else if (expenseDate.value == "") {
    alert("Date field cannot be empty, try again.");
  } else if (expenseAmount.value == "") {
    alert("Expense Amount field cannot be empty, try again.");
  } else if (!Number.isInteger(+expenseAmount.value)) {
    alert("Expense Amount must be integer, try again.");
  } else if (+expenseAmount.value <= 0) {
    alert("Expense Amount must be positive, try again.");
  } else {
    const newExpense = {
      id: new Date().getTime(), //unique id with ms of now
      item: expenseItem.value, // user´s expense item input
      date: expenseDate.value, //user´s date input
      expense: expenseAmount.value, //user´s expense amount input
    };

    // calling function to create a new expense
    createExpense(newExpense);

    // pushing expense object to the array
    expensesArr.push(newExpense);

    // updating expenses key´s value with the modified array
    localStorage.setItem("expenses", JSON.stringify(expensesArr));

    // displaying informative modal for 2 secs
    displayModal("add");

    // storing expense amount value before reset
    const amount = expenseAmount.value.endsWith("₺")
      ? expenseAmount.value.substr(0, expenseAmount.value.length - 1)
      : expenseAmount.value;

    // resetting to initial state
    expenseItem.value = "";
    expenseAmount.value = "";
    expenseDate.value = "";

    // calling function to update final table
    updateFinal(0, +amount);
  }
});

// Event Listener To Remove Expense
expensesTable.addEventListener("click", (e) => {
  if (e.target == e.target.closest("tr").querySelector("td i")) {
    const idAttr = e.target.closest("tr").getAttribute("id");
    const amountEl = e.target.closest("tr").querySelector("td:nth-child(3)");
    let amount = amountEl.innerText.substr(0, amountEl.innerText.length - 1);
    amount = +amount * -1;

    // calling function to update final table
    updateFinal(0, amount);
    expensesTable.removeChild(e.target.closest("tr"));

    // updating local storage as well
    expensesArr = expensesArr.filter((expense) => expense.id != idAttr);
    localStorage.setItem("expenses", JSON.stringify(expensesArr));

    // displaying informative modal for 2 secs
    displayModal("del");
  }
});

// Event Listener To Clear Form
clearBtn.addEventListener("click", (e) => {
  incomeForm.reset();
  expenseItem.value = "";
  expenseAmount.value = "";
  expenseDate.value = "";
  // displaying informative modal for 2 secs
  displayModal("clr");
});

// Event Listener To Reset Expense Logs
resetBtn.addEventListener("click", (e) => {
  if (confirm("Do you really want to remove all expense logs of this month?")) {
    while (expensesTable.firstChild) {
      expensesTable.removeChild(expensesTable.firstChild);
    }
    resetBtn.disabled = "true";
    // displaying informative modal for 2 secs
    displayModal("res");
  }
});

// Event Listener To Manually Close Modal Window Before Timer Expires
infoModalClose.addEventListener("click", () => {
  clearTimeout(hideAuto);
  infoModal.classList.toggle("hidden");
});

// Event Listener To Manually Wipe Local Storage Data Before Auto Reset
wipeBtn.addEventListener("click", () => {
  if (
    confirm(
      "Are you sure to wipe all data permanently before monthly auto reset?"
    )
  ) {
    localStorage.removeItem("expenses");
    localStorage.removeItem("incomes");
    expensesArr = [];
    incomesArr = [];
    // deleting expense rows from UI
    while (expensesTable.firstChild) {
      expensesTable.removeChild(expensesTable.firstChild);
    }

    // re-render everything

    // rendering expenses table via local storage datas
    getExpensesFromLocalStorage();

    // rendering final table via local storage datas
    renderFinalTable();

    // displaying informative modal for 2 secs
    displayModal("wip");
  }
});

// Functions

// Function to Display Modal Window According To Actions
const displayModal = (condition) => {
  infoModal.classList.toggle("hidden");
  switch (condition) {
    case "inc":
      infoModal.style.backgroundColor = "yellowgreen";
      infoMessage.innerText = "Income successfully added.";
      break;

    case "add":
      infoModal.style.backgroundColor = "green";
      infoMessage.innerText = "Expense successfully added.";
      break;

    case "del":
      infoModal.style.backgroundColor = "red";
      infoMessage.innerText = "Expense successfully deleted.";
      break;

    case "clr":
      infoModal.style.backgroundColor = "salmon";
      infoMessage.innerText = "Form cleared.";
      break;

    case "res":
      infoModal.style.backgroundColor = "darkslategray";
      infoMessage.innerText = "Resetted temporarily.";
      break;

    case "wip":
      infoModal.style.backgroundColor = "sienna";
      infoMessage.innerText = "Data wiped permanently.";
      break;

    default:
      break;
  }
  hideAuto = setTimeout(() => {
    infoModal.classList.toggle("hidden");
  }, 2000);
};

// Function to Update Final Table
const updateFinal = (incr = 0, decr = 0) => {
  let income = totalIncome.innerText ? +totalIncome.innerText : 0;
  let expenses = totalExpense.innerText ? +totalExpense.innerText : 0;
  income += incr;
  expenses += decr;
  let total = income - expenses;
  totalIncome.innerText = income;
  totalExpense.innerText = expenses;
  left.innerText = total;
};

// Function To Create Expenses On Page
const createExpense = (object) => {
  const { id, item, date, expense } = object;

  // creating elements
  const tr = document.createElement("tr");
  tr.setAttribute("id", id);

  const td1 = document.createElement("td");
  const td2 = document.createElement("td");
  const td3 = document.createElement("td");
  const td4 = document.createElement("td");
  const i = document.createElement("i");
  i.setAttribute("class", "fa-solid fa-trash");

  // modifying elements with inputs
  const dateEdited = date.replace("T", " ");
  const amount = expense.endsWith("₺")
    ? expense.substr(0, expenseAmount.value.length - 1)
    : expense;
  td1.innerText = dateEdited;
  td2.innerText = item;
  td3.innerText = amount + "₺";

  td4.appendChild(i);

  // finalizing table row element
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);

  // displaying table row on screen
  expensesTable.appendChild(tr);

  // activating Reset Logs button
  resetBtn.removeAttribute("disabled");
};

// Function To Render Expenses Table
const getExpensesFromLocalStorage = () => {
  // get expenses from localStorage and load to UI
  expensesArr.forEach((expense) => {
    createExpense(expense);
  });
};

// Function To Render Final Table
const renderFinalTable = () => {
  let income = 0;
  let expense = 0;
  let total = 0;
  if (incomesArr != []) {
    incomesArr.forEach((object) => {
      income += +object.income;
    });
  }
  if (expensesArr != []) {
    expensesArr.forEach((object) => {
      expense += +object.expense;
    });
  }
  total = income - expense;
  totalIncome.innerText = income;
  totalExpense.innerText = expense;
  left.innerText = total;
};

// Function To Wipe Data Monthly
const monthlyWipe = (y, m) => {
  expensesArr.forEach((object) => {
    const objYear = object.date.substr(0, 4);
    const objMonth = object.date.substr(5, 2);
    if (+objYear != y || +objMonth != m) {
      localStorage.removeItem("expenses");
      localStorage.removeItem("incomes");
      expensesArr = [];
      incomesArr = [];
      return;
    }
  });
};

// On Page Loads

// Arrays for local storage
let expensesArr = JSON.parse(localStorage.getItem("expenses")) || [];
console.log(expensesArr);
let incomesArr = JSON.parse(localStorage.getItem("incomes")) || [];
console.log(incomesArr);

window.addEventListener("load", () => {
  // allowing only current month's schedule on date-time input
  const monthStr =
    new Date().getMonth() + 1 < 10
      ? "0" + (new Date().getMonth() + 1).toString()
      : (new Date().getMonth() + 1).toString();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  const day = new Date(year, month, 0).getDate();
  expenseDate.min = `${year}-${monthStr}-01T00:00`;
  expenseDate.max = `${year}-${monthStr}-${day}T00:00`;

  if (expensesTable.children.length == 0) {
    resetBtn.disabled = "true";
  }
  // rendering expenses table via local storage datas
  getExpensesFromLocalStorage();

  // rendering final table via local storage datas
  renderFinalTable();

  // resetting local storage if logs are from previous months
  monthlyWipe(year, month);
});
