const nodemailer = require("nodemailer");

/*
const opts = {
  host,
  auth: {
    user,
    pass
  }
};

const content = {
  from,
  subject,
  html
};
*/

async function send(recipients, content, opts) {
  if (Array.isArray(recipients)) {
    recipients = recipients.join();
  }

  let mailContent = {
    ...content,
    to: recipients
  };

  let transportOpts = {
    ...opts,
    port: 587,
    secure: false,
    tls: {
      rejectUnauthorized: false
    }
  };

  let transporter = await nodemailer.createTransport(transportOpts);
  transporter.sendMail(mailContent);
}

module.exports = {
  send
};
