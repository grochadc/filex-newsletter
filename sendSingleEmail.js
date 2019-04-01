const nodemailer = require("nodemailer");

const fs = require("fs");
const { parseCSS } = require("./parseCSS");

async function main(cli) {
  console.log("Sending a single email...");
  let transportOpts = {
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: cli.sender,
      pass: cli.pass
    },
    tls: {
      rejectUnauthorized: false
    }
  };
  if (process.argv[2] === "test") {
    console.log("Creating test account...");
    const account = await nodemailer.createTestAccount();
    transportOpts = {
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: account.user,
        pass: account.pass
      },
      tls: {
        rejectUnauthorized: false
      }
    };
  }

  console.log("Creating transporter...");
  let transporter = nodemailer.createTransport(transportOpts);

  console.log("Parsing CSS...");
  const parsedHTML = await parseCSS("./newsletter/2muxes.html");

  let mailOptions = {
    from: "FILEX Newsletter <filexnewsletter@gmail.com>",
    to: cli.reciever,
    subject: parsedHTML.title,
    html: parsedHTML.html
  };

  let info = await transporter.sendMail(mailOptions);
  console.log("Waiting for email confirmation...");
  if (transportOpts.host == "smtp.ethereal.email") {
    console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
  }
}

main({
  sender: process.argv[2],
  pass: process.argv[3],
  reciever: process.argv[4]
}).catch(console.error);

filexnewsletter@gmail.com
