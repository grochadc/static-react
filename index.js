import "@babel/polyfill";
import fs from "fs";
import util from "util";
import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "./src/App.js";

const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const copyFile = util.promisify(fs.copyFile);

String.prototype.interpolate = function(params) {
  const names = Object.keys(params);
  const vals = Object.values(params);
  return new Function(...names, `return \`${this}\`;`)(...vals);
};

const html = ReactDOMServer.renderToStaticMarkup(<App />);

(async () => {
  const template = await readFile("./src/template.html", "utf8");
  const result = template.interpolate({
    html,
    title: "Simple e-mail HTML",
    cssFile: "styles.css"
  });
  copyFile("./src/styles.css", "./build/styles.css");
  await writeFile("./build/index.html", result);
  console.log("HTML Compiled! Check build/ folder!");
})().catch(console.error);
