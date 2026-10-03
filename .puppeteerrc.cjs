const { join } = require("path");

// Used only by scripts/prerender.mjs at build time.
module.exports = {
  // Keep the browser inside the project so it survives into the build step on
  // hosts (like Render) that only persist the project folder.
  cacheDirectory: join(__dirname, "node_modules", ".cache", "puppeteer"),
  // The prerender runs headless only, so skip the full Chrome download.
  chrome: { skipDownload: true },
  "chrome-headless-shell": { skipDownload: false },
};
