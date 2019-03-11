const emails = require("../../emails");
const fs = require("fs");

Object.defineProperty(Array.prototype, "flat", {
  value: function(depth = 1) {
    return this.reduce(function(flat, toFlatten) {
      return flat.concat(
        Array.isArray(toFlatten) && depth - 1
          ? toFlatten.flat(depth - 1)
          : toFlatten
      );
    }, []);
  }
});

fs.writeFile("flattened-emails.json", JSON.stringify(emails.flat()), () => {
  console.log("File written!");
});
