const nodemailer = require("nodemailer");
const emails = require("./failed-emails.js");
const { send } = require("./lib/emails/send");
const { parseCSS } = requre("./parseCSS");

(async () => {
  const parsedHTML = await parseCSS("./newsletter/2muxes.html");
  const content = {
    from: "filexnewsletter@gmail.com",
    subject: parsedHTML.title,
    html: parsedHTML.html
  };

  const account = await nodemailer.createTestAccount();
  const opts = {
    host: "smtp.ethereal.email",
    auth: {
      user: account.user,
      pass: account.pass
    }
  };

  let info = await transporter.sendMail(mailOptions);
  let preview = nodemailer.getTestMessageUrl(info);
  console.log(preview);
})();
