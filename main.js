const { app } = require("electron");
const electron = require("electron");

/*
NOTE: Code signing required

https://www.npmjs.com/package/update-electron-app#faq

require('update-electron-app')({
  repo: 'https://github.com/clickonmedia/clickon-iq-electron.git',
  updateInterval: '1 hour',
  logger: require('electron-log')
});
*/

/*
NOTE: Code signing required

https://medium.com/geekculture/auto-update-electron-apps-using-github-releases-c1c890f603e0

const { ipcRenderer, app, autoUpdater  } = require('electron');

const server = `hazel-clickon-iq-electron-ffil5axyj-clickonmedia.vercel.app`;
const url = `${server}/update/${process.platform}/${app.getVersion()}`;

autoUpdater.setFeedURL({ url });

const UPDATE_CHECK_INTERVAL = 10 * 60 * 1000;

setInterval(() => {
  autoUpdater.checkForUpdates()
}, UPDATE_CHECK_INTERVAL);

autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: 'info',
    buttons: ['Restart', 'Later'],
    title: 'Application Update',
    message: process.platform === 'win32' ? releaseNotes : releaseName,
    detail: 'A new version has been downloaded. Restart the application to apply the updates.'
  }
dialog.showMessageBox(dialogOpts).then((returnValue) => {
    if (returnValue.response === 0) autoUpdater.quitAndInstall()
  })
})
*/

const BrowserLikeWindow = require("./library/browserLikeWindow");
let browser;
if(require('electron-squirrel-startup')) return;
app.whenReady().then(() => {
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;
  browser = new BrowserLikeWindow({
    controlHeight: 99,
    controlPanel: "renderer/control.html",
    startPage: "https://iqworkflow.app/workspace",
    blankTitle: "New tab",
    //debug: true, // will open controlPanel's devtools,
    widthAuto: width,
    heightAuto: height
  });

// FIXME: instead of using this iqTabs array, 
// use browser.tabs[] to loop over the correct quantity of tabs from browserLikeWindow/index.js
// in the newTab method [line 490], push to a shared state array?
const iqTabs = [1,2,3,4,5,6,7,8,9];
iqTabs.forEach(i => {
  electron.globalShortcut.register(`CommandOrControl+${i}`, () => {
    browser.switchTab(browser.tabs[i-1]);
  });
});

// CMD + down arrow
electron.globalShortcut.register('CommandOrControl+Down', () => {
  if(browser.tabs.length > 1) {
    const currentIndex = browser.tabs.findIndex(tab => tab === browser.currentViewId);
      if(currentIndex === browser.tabs.length-1) {
        browser.switchTab(browser.tabs[0]);
      } else {
        browser.switchTab(browser.tabs[currentIndex+1]);
      }
  }
});

// CMD + up arrow
electron.globalShortcut.register('CommandOrControl+Up', () => {
  if(browser.tabs.length > 1) {
    const currentIndex = browser.tabs.findIndex(tab => tab === browser.currentViewId);
      if(currentIndex === 0) {
        browser.switchTab(browser.tabs[browser.tabs.length-1]);
      } else {
        browser.switchTab(browser.tabs[currentIndex-1]);
      }
  }
});

  browser.on("closed", () => {
    browser = null;
  });
});

app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (browser === null) {
    createWindow();
  }
});
