// ! Finding whether it is prime number, prime numbers to the inputted number, prime factors of the inputted number

// ?Input Validation
let isPrime;
while (true) {
  isPrime = Number(prompt("Enter a number to check if it is prime or not : "));
  if (isNaN(isPrime)) {
    console.log("Enter numbers only, try again.");
    continue;
  } else if (isPrime < 2) {
    console.log("Enter numbers bigger than 2, try again.");
    continue;
  } else {
    console.log(`The number you inputted : ${isPrime}`);
    break;
  }
}

// !Checking whether inputted number is prime number
function primeChecker(num) {
  if (num == 2) {
    return 2;
  } else {
    for (let i = 2; i < num; i++) {
      if (num % i == 0) {
        // console.log(`${num} is not a prime number`);
        return false;
        break;
      }
    }
    return num;
  }
}

// * Printing whether inputted number is prime number
if (primeChecker(isPrime)) {
  console.log(`${isPrime} is a prime number.`);
} else {
  console.log(`${isPrime} is not a prime number.`);
}

// ! Finding all prime numbers to the inputted number
function primeDivisors(num) {
  const primeDivisorsList = [];
  if (num == 2) {
    primeDivisorsList.push(2);
    console.log("Prime Divisors : 2");
  } else {
    for (let i = 2; i < num; i++) {
      if (primeChecker(i)) {
        primeDivisorsList.push(i);
      }
    }
  }
  // console.log(`All prime numbers to ${isPrime} : ${primeDivisorsList}`);
  // for (let y = 0; y < primeDivisorsList.length; y++) {
  //   console.log(`${primeDivisorsList[y]} is a prime divisor of ${num}.`);
  // }
  return primeDivisorsList;
}

// * Printing all prime numbers to the inputted number
console.log(`All prime divisors to ${isPrime} : `, primeDivisors(isPrime));

// ! Finding all prime factors of the inputted number
function primeFactors(num) {
  const primeFactors = [];
  const primeDivisorsList = primeDivisors(num);
  let numCopy = num;
  for (let i in primeDivisorsList) {
    if (num < primeDivisors[i]) {
      break;
    }
    while (numCopy % primeDivisorsList[i] == 0) {
      numCopy /= primeDivisorsList[i];
      primeFactors.push(primeDivisorsList[i]);
    }
  }
  console.log(`Prime factors of ${num} : `, primeFactors);
  return primeFactors;
}

// * Printing all prime factors of the inputted number
primeFactors(isPrime);