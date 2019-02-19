const { parseHTML } = require("./lib/parseHTML");

(async () => {
  console.log((await parseHTML("./newsletter/1kabuki.html")).html);
})().catch(console.error);
