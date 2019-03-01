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
        let regex = /entregado a (\S*@\S*)/m;
        failedEmails = emails.map(email => {
          let result = regex.exec(email.parts[0].body);
          if (Array.isArray(result)) {
            return result[1];
          }
        });
        writeFile("failed-emails.json", JSON.stringify(failedEmails)).then(() =>
          console.log("File written")
        );
      });
    });
  })
  .catch(console.error);
