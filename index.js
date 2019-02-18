const nodemailer = require("nodemailer");

const fs = require("fs");

const { parseHTML } = require("./parseHTML");

async function main() {
  let account = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: account.user, // generated ethereal user
      pass: account.pass // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  //Current newsletter html path
  const htmlPath = "./newsletter/1kabuki.html";

  const parsedHTML = await parseHTML(htmlPath);

  let mailOptions = {
    from: "FILEX Newsletter <filex@cusur.udg.mx>",
    to: "grochadc@gmail.com",
    subject: parsedHTML.title,
    html: parsedHTML.html
  };
  console.log("sending email...");
  console.log(`HTML body: ${mailOptions.html}`);
  let info = await transporter.sendMail(mailOptions);
  console.log("Sent email");
  console.log(`Message sent: ${info.messageId}`);
  console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
}

main().catch(console.error);
