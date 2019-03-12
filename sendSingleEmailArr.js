const nodemailer = require("nodemailer");
const emails = require("./data/resend2.js");
const fs = require("fs");

const { parseCSS } = require("./parseCSS");

let sender = process.argv[2];
let pass = process.argv[3];

let failed = [];
let promises;

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
  const parsedHTML = await parseCSS("./newsletter/2muxes.html");

  emails.forEach(async email => {
    let mailOptions = {
      from: "FILEX Newsletter <filexnewsletter@gmail.com>",
      to: email,
      subject: parsedHTML.title,
      html: parsedHTML.html
    };

    transporter
      .sendMail(mailOptions)
      .then(() => console.log("Email sent to", email))
      .catch(() => {
        console.error("Failed email", email);
        failed.push(email);
      });
  });
  console.log("Waiting for email confirmation...");
}

main()
  .then(() =>
    Promise.all(promises.map(p => p.catch(() => undefined))).then(
      fs.writeFile(
        `.data/failed/failed-${new Date()}`,
        `module.exports = {
          date: ${JSON.stringify(new Date())},
          emails: ${JSON.stringify(failed)}}`
      )
    )
  )
  .catch(console.error);
