//------------------------------------------//
// Convert emails from a simple array to an //
// array of chunks with 100 emails each    //
//-----------------------------------------//
const emails = require("../../emailsSrc/flattened-emails.js");
const fs = require("fs");

Object.defineProperty(Array.prototype, "chunk", {
  value: function(chunkSize) {
    var R = [];
    for (var i = 0; i < this.length; i += chunkSize)
      R.push(this.slice(i, i + chunkSize));
    return R;
  }
});

fs.writeFile("../emails.js", JSON.stringify(emails.chunk(100)), () =>
  console.log("File written")
);
