const packager = require("electron-packager");
packager({
  dir: __dirname,
  name: "iqworkflow",
  buildPath: __dirname,
  electronVersion: "6.0.9",
  version: "1.0.0",
  buildVersion: "1.0.0",
  overwrite: true,
  asar: true,
  icon: "library/browserLikeWindow/assets/appicon.ico",
  prune: true,
  appVersion: "1.0.0",
  platform: "all",
  out: "out",
});