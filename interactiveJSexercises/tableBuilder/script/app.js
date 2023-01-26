// given data
students = [
  "C1234 - John Doe, London, Full-Stack",
  "C2345 - Jane Doe, London, Data-Science",
  "C2346 - Mary Ann, Paris, AWS-Devops",
  "C2347 - Adam Smith, Texas, AWS-Devops",
  "C2444 - Michael Great, Arizona, Full-Stack",
  "C2555 - William Cash, Manchester, Data-Science",
  "C2455 - Patrick Jane, Madrid, Full-Stack",
];

// selecting table body to append rows
const tbody = document.querySelector("table tbody");

// selecting button to create and then display the table
const btn = document.querySelector("button");

// adding click event listener on the button
btn.addEventListener("click", () => {
  // seperating each student info with comma inside the array
  const studentsComma = students.map((student) => {
    student = student.replace("-", ",").split(",");
    student.splice(1, 1, ...student[1].trim().split(" "));
    return student;
  });

  console.log(studentsComma);

  // creating rows and displaying on screen
  studentsComma.forEach((student) => {
    const tr = document.createElement("tr");
    student.forEach((studentInfo) => {
      const td = document.createElement("td");
      td.innerText = studentInfo;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });

  // deleting rows from screen after 5 seconds

  // selecting p element to display timer on screen after clicking the button
  const timeDisplay = document.getElementById("time");

  // building counter
  let counter = 5;
  timeDisplay.innerText = `5 secs left to refreshing the table`;
  const tableRefreshTime = setInterval(() => {
    counter--;
    timeDisplay.innerText = `${counter} secs left to refreshing the table`;
  }, 1000);
  // disabling button to prevent duplicating the table content
  btn.setAttribute("disabled", true);
  // removing all rows after 5 seconds, enabling button again and resetting p element content
  setTimeout(() => {
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
    clearInterval(tableRefreshTime);
    timeDisplay.innerText = "";
    btn.removeAttribute("disabled");
  }, 5000);
});
