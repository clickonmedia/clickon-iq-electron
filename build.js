const packager = require("electron-packager");
packager({
  dir: __dirname,
  name: "IQ Workflow",
  buildPath: __dirname,
  electronVersion: "21.0.0",
  version: "1.0.0",
  buildVersion: "1.0.0",
  overwrite: true,
  asar: true,
  icon: "library/browserLikeWindow/assets/appicon.ico",
  prune: true,
  appVersion: "1.0.0",
  platform: "darwin",
  arch: "x64",
  out: "out",
});