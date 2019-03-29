const fs = require("fs");
const util = require("util");
const templatePath = process.argv[2];
const context = require(templatePath);

const resultPath = process.argv[3];

function parse(template, context) {
  const keys = Object.keys(context);
  const vals = Object.values(context);
  return new Function(...keys, `return \`${template}\`;`)(...vals);
}

/*Context should have the following structure:
  {
  title,
  subtitle,
  image,
  body,
  vocabulary
}
 */

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
(async () => {
  const template = await readFile("./newsletter/0template.html");
  writeFile(resultPath, parse(template, context));
})();
