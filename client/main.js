import React from "react";
import { hydrate } from "react-dom";
import App from "./App";

// hydrate for server-side-rendering
hydrate(<App />, document.getElementById("root"));