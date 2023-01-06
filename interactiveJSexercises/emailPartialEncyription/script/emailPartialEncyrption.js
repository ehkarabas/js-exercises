// Code a JavaScript function to hide email addresses from unauthorized users for protection.

// Test Data: console.log(protect_email("robin_singh@example.com")); "robin...@example.com"

// Defining conversion function
const protect_email = (email) => {
  const atMarkIndex = email.indexOf("@");
  return email
    .split("", atMarkIndex - 4)
    .concat(Array(4).fill("."))
    .concat("@".concat(email.slice(email.indexOf("@") + 1)).split(""))
    .join("");

  // Alternative Structure
  // email.split("@")[0].slice(0, email.split("@")[0].length - 4) + "....@" + email.split("@")[1]
};

// Exact input validation with regex pattern
let email;
while (true) {
  email = prompt("Enter your email : ");
  if (email.match(/(^[a-zA-Z])\w{4,}[@]\w{4,}[.](com|edu)/gi) == null) {
    console.log(
      "Your email must start with a letter, must have more than 4 alphanumeric chars(underscore inclusive) before and after @ and your emails TLD must be com or edu, try again."
    );
    continue;
  } else {
    // console.log(`Email you inputted : ${email}`);
    break;
  }
}

// Outputting the result
console.log(protect_email(email));
