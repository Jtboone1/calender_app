const {app, BrowserWindow} = require('electron')
const contextMenu = require('electron-context-menu');
const authService = require('../services/auth-service');
const isDev = require('electron-is-dev');
const path = require('path');


// first time log-in calls {createAuthWindow()}
//  after Authentication, createAuthWindow() spawns application window
async function showWindow() {
    try {
        await authService.refreshTokens();
        return createMainWindow();
    } catch (err) {
        createAuthWindow();
    }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', showWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    app.quit();
});


// main-process
let mainWindow = null;

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

    mainWindow.loadFile("../renderers/home.js");

    mainWindow.loadURL(startURL);

    mainWindow.once('ready-to-show', () => mainWindow.show());

    // temporary work around the force login everytime
    // prevents auth0 account-token caching; for demonstration purposes
    mainWindow.once('ready-to-show', () => createLogoutWindow());
}


// auth-process
let authWindow = null;

function createAuthWindow() {
    destroyAuthWin();

    authWindow = new BrowserWindow({
        width: 600,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            enableRemoteModule: false,
            contextIsolation: true
        }
    });

    authWindow.loadURL(authService.getAuthenticationURL());

    const {session: {webRequest}} = authWindow.webContents;

    const filter = {
        urls: [
            'http://localhost/callback*'
        ]
    };

    webRequest.onBeforeRequest(filter, async ({url}) => {
        await authService.loadTokens(url);
        createMainWindow(); // Entry to main application after log-in
        return destroyAuthWin();
    });

    authWindow.on('authenticated', () => {
        destroyAuthWin();
    });

    authWindow.on('closed', () => {
        authWindow = null;
    });
}

function destroyAuthWin() {
    if (!authWindow) return;
    authWindow.close();
    authWindow = null;
}

function createLogoutWindow() {
    const logoutWindow = new BrowserWindow({
        width: 600,
        height: 800,
        show: false,
        webPreferences: {
            nodeIntegration: false,
            enableRemoteModule: false,
            contextIsolation: true
        }
    });

    logoutWindow.loadURL(authService.getLogOutUrl());

    logoutWindow.on('ready-to-show', async () => {
        logoutWindow.close();
        await authService.logout();
    });
}

// Right-click context menu
contextMenu({
    prepend: (params, browserWindow) => [
        {
            label: 'Edit Calender',
            submenu: [
                {id: 'addEvent', label: 'Add Event'},
                {id: 'deleteEvent', label: 'Delete Event'}
            ]
        },
        {
            label: 'Window',
            submenu: [
                {role: 'minimize'},
                {role: 'zoom'}
            ],
            visible: params.inspect
        }]
});

module.exports = {
    createLogoutWindow,
}