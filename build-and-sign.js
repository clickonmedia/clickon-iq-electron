const packager = require("electron-packager");
require('dotenv').config();

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

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
  osxSign: {
    identity: process.env.IDENTITY,
    'hardened-runtime': true,
    entitlements: 'entitlements.plist',
    'entitlements-inherit': 'entitlements.plist',
    'signature-flags': 'library'
  },
  osxNotarize: {
    appleId: process.env.APPLE_ID,
    appleIdPassword: process.env.APPLE_ID_PWD,
    appBundleId: '1.0.0'
  }
});
