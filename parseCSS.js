const fs = require("fs");
const path = require("path");
const util = require("util");
const inlineCSS = require("inline-css");
const { JSDOM } = require("jsdom");

const readFile = util.promisify(fs.readFile);

async function main() {
  const htmlInput = await readFile("./static-parsing/build/index.html");
  const html = await inlineCSS(htmlInput, {
    url: " "
  });

  const dom = new JSDOM(htmlInput);
  const result = {
    html,
    title: dom.window.document.title
  };
  return result;
}

module.exports = { parseCSS: main };
