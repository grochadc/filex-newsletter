const nodemailer = require("nodemailer");

const fs = require("fs");
const { parseCSS } = require("./parseCSS");

async function main(cli) {
  let transportOpts;

  if (cli.user && cli.pass && cli.server) {
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

  let mailOptions = {
    from: "FILEX Newsletter <filex@cusur.udg.mx>",
    to: "grochadc@gmail.com",
    subject: parsedHTML.title,
    html: parsedHTML.html
  };
  console.log("Sending email...");
  let info = await transporter.sendMail(mailOptions);
  console.log("Email sent!");
  console.log(`Message sent: ${info.messageId}`);
  if (transportOpts.host == "smtp.ethereal.email") {
    console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
  }
}

module.exports = {
  sendEmail: main
};
