//-------------------------------------//
// Send an array of emails one by one  //
//-------------------------------------//

const nodemailer = require("nodemailer");
const emails = require(process.argv[5]);
const fs = require("fs");
const log = require("./lib/replaceLine");

const { parseCSS } = require("./parseCSS");

let sender = process.argv[2];
let pass = process.argv[3];
let articlePath = process.argv[4];

console.log("starting script", sender, pass, articlePath, emails);

let failed = []; //Failed email adresses will be pushed here arr [see 56:9]
let promises; //Promises for sent mails will be pushed here to use with Promise.all [see ]

async function main() {
  if (sender === undefined) {
    console.log("Please specify credentials");
    throw new Error("No credentials, aborting...");
    return;
  }
  console.log("Sending a single email...");
  let transportOpts = {
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: sender,
      pass: pass
    },
    tls: {
      rejectUnauthorized: false
    }
  };

  console.log("Creating transporter...");
  let transporter = nodemailer.createTransport(transportOpts);

  console.log("Parsing CSS...");
  const parsedHTML = await parseCSS(articlePath);

  let counter = 1;

  //map all promises to use with Promise.all
  promises = emails.map(async (email, index, arr) => {
    let mailOptions = {
      from: "FILEX Newsletter <filexnewsletter@gmail.com>",
      to: email,
      subject: parsedHTML.title,
      html: parsedHTML.html
    };

    transporter
      .sendMail(mailOptions)
      .then(() => {
        counter++;
        log(
          `${counter}/${arr.length + 1}Succesful email sent to ${email}`,
          Boolean(index == arr.length)
        );
      })
      .catch(() => {
        counter++;
        log(
          `${counter}/${arr.length + 1} Failed email to ${email}`,
          Boolean(index == arr.length)
        );
        failed.push(email);
      });
  });
  console.log("Waiting for email confirmation...");
}

console.log("Starting main function...");
main()
  .then(() =>
    //Wait for all promises to finish (even rejected ones)
    Promise.all(promises.map(p => p.catch(() => undefined))).then(
      fs.writeFile(
        `./data/failed/failed-${new Date()}`,
        `module.exports = {
          date: ${JSON.stringify(new Date())},
          emails: ${JSON.stringify(failed)}}`,
        () => console.log("File written")
      )
    )
  )
  .catch(console.error);
