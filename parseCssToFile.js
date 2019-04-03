let path = {
  in: process.argv[2],
  out: process.argv[3]
};
if (path.in && path.out) {
  const { parseCSS } = require("./parseCSS");
  const fs = require("fs");
  parseCSS(path.in).then(result => {
    fs.writeFile(path.out, result.html, () => console.log("File written"));
  });
} else {
  console.log("Missing argument");
}
