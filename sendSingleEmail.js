const nodemailer = require("nodemailer");

const fs = require("fs");
const { parseCSS } = require("./parseCSS");

let sender = process.argv[2];
let pass = process.argv[3];

async function main(cli) {
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

  let mailOptions = {
    from: "FILEX Newsletter <filexnewsletter@gmail.com>",
    to: "genbx21@gmail.com",
    subject: parsedHTML.title,
    html: parsedHTML.html
  };

  let info = await transporter.sendMail(mailOptions);
  console.log("Waiting for email confirmation...");
}

main().catch(console.error);
