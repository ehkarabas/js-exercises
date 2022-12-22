// input validation of desired count of rows
let rowCount;
while (true) {
  rowCount = Number(
    prompt(`Enter count(bigger than 1) of rows to display :  `)
  );
  if (isNaN(rowCount)) {
    console.log("Enter only numbers, try again.");
    continue;
  } else if (rowCount <= 1) {
    console.log(`Enter bigger than 1, try again.`);
    continue;
  } else {
    console.log(`Your input = ${rowCount}`);
    break;
  }
}

// preliminary information output about rows count input
let result = `${"-".repeat(5)} Pattern of ${rowCount} rows ${"-".repeat(5)}\n`;

// final output
for (let i = 1; i <= rowCount; i++) {
  result +=
    " ".repeat(rowCount - i) + "0".repeat(i * 2 - 1) + " ".repeat(rowCount - i);
  result += "\n";
}
console.log(result);
