//--------------------------------------//
// Check the INBOX for rejected emails //
// or mail delivery errors            //
//-----------------------------------//
const imaps = require("imap-simple");
const fs = require("fs");
const util = require("util");

const writeFile = util.promisify(fs.writeFile);

let config = {
  imap: {
    user: "filexnewsletter@gmail.com",
    password: "F173x2014",
    host: "imap.gmail.com",
    port: 993,
    tls: true,
    authTimeout: 3000,
    tlsOptions: {
      rejectUnauthorized: false
    }
  }
};

imaps
  .connect(config)
  .then(function(connection) {
    console.log("Connected!");
    return connection.openBox("INBOX").then(function() {
      console.log("Inbox opened");
      var searchCriteria = ["UNSEEN"];

      var fetchOptions = {
        bodies: ["HEADER", "TEXT"],
        markSeen: false
      };

      return connection.search(searchCriteria, fetchOptions).then(emails => {
        failedEmails = emails.map(email => {
          let regex = /entregado a (\S*@\S*)/m;
          let result = regex.exec(email.parts[0].body);
          //result is an arr and the second item is the match
          if (result !== null && result[1] !== undefined) {
            return result[1];
          }
        });
        let blockedEmails = emails.map(email => {
          let regex = /para (.*@.*\.com) se ha bloqueado/m;
          let result = regex.exec(email.parts[0].body);
          if (result !== null && result[1] !== undefined) return result[1];
        });
        console.log("Blocked emails", blockedEmails);
        console.log("Failed emails", failedEmails);
        writeFile(
          "failed-emails.json",
          JSON.stringify([[...failedEmails], [...blockedEmails]])
        ).then(() => console.log("File written"));
      });
    });
  })
  .catch(console.error);
