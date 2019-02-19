const { JSDOM } = require("jsdom");
const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);

async function parseHTML(htmlPath, stylesPath) {
  //Make stylesPath default to index.css
  const styles = await readFile(
    stylesPath ? stylesPath : "./newsletter/styles/index.css",
    "utf8"
  );

  if (htmlPath === undefined) {
    throw new Error("htmlPath is not specified and it is required");
  }
  const html = await readFile(htmlPath, "utf8");

  const dom = new JSDOM(html);

  dom.window.document.body.querySelector("#styles").innerHTML = styles;

  return {
    html: dom.window.document.body.innerHTML,
    title: dom.window.document.title
  };
}

module.exports = {
  parseHTML
};
