const {app, BrowserWindow} = require('electron')
const isDev = require('electron-is-dev');
const path = require('path');

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    app.quit();
});

// main-process
let mainWindow = null;

function createMainWindow() {
    mainWindow = new BrowserWindow({
        resizable: false,
        width: 1400,
        height: 1000,
        show: false,

        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: true,
        },
    })
    const startURL = isDev
        ? 'http://localhost:3000'
        : `file://${path.join(__dirname, '../build/index.html')}`;

    mainWindow.loadFile("../renderers/home.js");
    mainWindow.loadURL(startURL);
    mainWindow.removeMenu();

    mainWindow.once('ready-to-show', () => mainWindow.show());
}

app.whenReady().then(() => {
  createMainWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})