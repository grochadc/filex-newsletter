import "@babel/polyfill";
import fs from "fs";
import util from "util";
import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "./App";

const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const copyFile = util.promisify(fs.copyFile);

//Create a template engine and attach it to any String
String.prototype.interpolate = function(params) {
  const names = Object.keys(params);
  const vals = Object.values(params);
  return new Function(...names, `return \`${this}\`;`)(...vals);
};

const html = ReactDOMServer.renderToStaticMarkup(<App />);

(async () => {
  copyFile("./src/style.css", "./build/style.css");
  const template = await readFile("./src/template.html", "utf8");
  //Pass a context object to fill the template
  const result = template.interpolate({
    css: "style.css",
    html,
    title: "Simple e-mail HTML"
  });
  await writeFile("./build/index.html", result);
  console.log("HTML Compiled! Check build/ folder!");
})().catch(console.error);
