const failedEmails = require("./data/resend");
const succesfulEmails = require("./data/succesful");
const fs = require("fs");

console.log("Failed ", failedEmails.length);
console.log("Successful ", succesfulEmails.length);

const resendEmails = failedEmails.filter(
  email => succesfulEmails.indexOf(email) == -1 //not found on succesful
);
console.log("Need to resend", resendEmails, resendEmails.length);

fs.writeFile("resend2.js", JSON.stringify(resendEmails), () =>
  console.log("File written")
);
