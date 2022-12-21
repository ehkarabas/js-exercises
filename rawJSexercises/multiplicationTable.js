let multiplicationData = "";
let result;
for (let i = 1; i <= 10; i++) {
  console.log("=".repeat(15), i, "=".repeat(15));
  for (let j = 1; j <= 10; j++) {
    result = i * j;
    // Storing multiplication data as rows&cols
    multiplicationData += result + "\t";
    console.log(`${i} x ${j} = ${result}\n`);
  }
  multiplicationData += "\n";
}
console.log(multiplicationData);