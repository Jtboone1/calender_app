const {app, BrowserWindow} = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');//what is this?

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        resizable: false,
        width:1600,
        height:1200,
        show: false
    });
    const startURL = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`;

    mainWindow.loadURL(startURL);
    mainWindow.setMenuBarVisibility(false) // what is this ?
    mainWindow.once('ready-to-show', () => mainWindow.show());
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.whenReady().then(() => {//what is this?
    installExtension(REACT_DEVELOPER_TOOLS)//what is this?
        .then((name) => console.log(`Added Extension:  ${name}`))//what is this?
        .catch((err) => console.log('An error occurred: ', err));//what is this?
});

app.on('ready', createWindow);
