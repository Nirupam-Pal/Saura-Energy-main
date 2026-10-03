import React from "react";
import ReactDOM from "react-dom/client";
import "@/index.css";
import App from "@/App";

// Pages prerendered at build time (scripts/prerender.mjs) carry their <head>
// tags in static HTML. React re-adds them on mount, so drop the static copies
// first to avoid duplicate titles and canonicals.
document.head.querySelectorAll("[data-prerendered]").forEach((el) => el.remove());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
