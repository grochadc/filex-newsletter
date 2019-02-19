const fs = require("fs");
const path = require("path");
const util = require("util");
const inlineCSS = require("inline-css");
const { JSDOM } = require("jsdom");

const readFile = util.promisify(fs.readFile);

async function main() {
  const htmlInput = await readFile("./newsletter/1kabuki.html");
  const dom = new JSDOM(htmlInput);
  const html = await inlineCSS(htmlInput, {
    url: `file://${__dirname}${path.win32.dirname(
      "/newsletter/styles/index.css"
    )}`
  });
  return {
    html,
    title: dom.window.document.title
  };
}

module.exports = { parseCSS: main };
