const { ipcRenderer, app, autoUpdater  } = require('electron');

const server = `hazel-clickon-iq-electron-ffil5axyj-clickonmedia.vercel.app`;
const url = `${server}/update/${process.platform}/${app.getVersion()}`;

autoUpdater.setFeedURL({ url });

module.exports = function(options = {}) {
    const { browserWindowId } = options;

    const ipcRendererSend = (ation, value) => {
        ipcRenderer.send(ation, value, { browserWindowId })
    }

    return {
        sendEnterURL: (url) => { ipcRendererSend('url-enter', url) },
        sendChangeURL: (url) => { ipcRendererSend('url-change', url) },

        sendGoBack: () => { ipcRendererSend('act', 'goBack') },
        sendGoForward: () => { ipcRendererSend('act', 'goForward') },
        sendReload: () => { ipcRendererSend('act', 'reload') },
        sendStop: () => { ipcRendererSend('act', 'stop') },

        sendNewTab: (url) => { ipcRendererSend('new-tab', url); },
        sendSwitchTab: (id) => { ipcRendererSend('switch-tab', id) },
        sendCloseTab: (id) => { ipcRendererSend('close-tab', id) },
    };
}