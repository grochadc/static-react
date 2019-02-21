import ReactDOMServer from "react-dom/server";
import App from "./App.js";
import React from "react";

console.log(ReactDOMServer.renderToStaticMarkup(<App />));
