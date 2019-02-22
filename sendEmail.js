const nodemailer = require("nodemailer");
const emails = require("./emails.js");

const fs = require("fs");
const { parseCSS } = require("./parseCSS");

async function main(cli) {
  let transportOpts;

  if (cli) {
    console.log("Got info from arguments!");
    transportOpts = {
      host: cli.server,
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: cli.user,
        pass: cli.pass
      },
      tls: {
        rejectUnauthorized: false
      }
    };
  } else {
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
  const parsedHTML = await parseCSS();

  emails.forEach(async (chunk, i) => {
    let chunkedEmails = chunk.join();

    let mailOptions = {
      from: "FILEX Newsletter <filexnewsletter@gmail.com>",
      to: chunkedEmails,
      subject: parsedHTML.title,
      html: parsedHTML.html
    };

    console.log("Sending email...", i + 1);
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent!", i + 1);
    if (transportOpts.host == "smtp.ethereal.email") {
      console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
    }
  });
  console.log("Waiting for emails confirmation...");
}

module.exports = {
  sendEmail: main
};
