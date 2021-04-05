const { app, BrowserWindow } = require('electron')
const isDev = require('electron-is-dev')
const path = require('path')

let mainWindow

function createMainWindow() {
    mainWindow = new BrowserWindow({
        resizable: true,
        width: 1200,
        height: 850,
        show: false,

        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: true
        },
    })
    const startURL = isDev
        ? 'http://localhost:3000'
        : `file://${path.join(__dirname, '../build/index.html')}`;

    mainWindow.loadFile("../renderers/home.html");

    mainWindow.loadURL(startURL);
    mainWindow.once('ready-to-show', () => mainWindow.show())

    mainWindow.on('closed', () => {
        app.quit();
        mainWindow = null;
    })
}

module.exports = createMainWindow
