const {app, BrowserWindow} = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');

//Added by Andrew
//this bit allows for right-click context menu;
// -- wanted this for inspect element functionality
const contextMenu = require('electron-context-menu');

contextMenu({
    prepend: (params, browserWindow) => [{
        label: 'Rainbow',
        // Only show it when right-clicking images
        visible: params.mediaType === 'image'
    }]
});
//this bit seem to not be necessary
// let win;
// (async () => {
//     await app.whenReady();
//     win = new BrowserWindow();
// })();
//END of Added by Andrew

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        resizable: true,
        width: 1600,
        height: 1200,
        show: false,

        webPreferences: {
            contextIsolation: true
        }
    });
    const startURL = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`;

    mainWindow.loadURL(startURL);

    mainWindow.once('ready-to-show', () => mainWindow.show());
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', createWindow);
