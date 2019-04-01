const { parseCSS } = require("./parseCSS");
const fs = require("fs");

parseCSS("./newsletter/1kabuki.html").then(result => {
  fs.writeFile("./newsletter/parsed/1kabuki.html", result.html, () =>
    console.log("File written")
  );
});
