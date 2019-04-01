const rl = require("readline");

module.exports = function(str, end) {
  rl.clearLine(process.stdout);
  rl.cursorTo(process.stdout, 0);
  process.stdout.write(str);
  if (end) {
    process.stdout.write("\n");
  }
};
