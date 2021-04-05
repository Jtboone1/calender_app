// main/authentication-process.js

const {BrowserWindow} = require('electron');
const authService = require('../services/auth-service');
const createMainWindow = require('./application-process');

let win = null;

function createAuthWindow() {
    destroyAuthWin();

    win = new BrowserWindow({
        width: 600,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            enableRemoteModule: false,
            contextIsolation: true
        }
    });

    win.loadURL(authService.getAuthenticationURL());

    const {session: {webRequest}} = win.webContents;

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

    win.on('authenticated', () => {
        destroyAuthWin();
    });

    win.on('closed', () => {
        win = null;
    });
}

function destroyAuthWin() {
    if (!win) return;
    win.close();
    win = null;
}

function createLogoutWindow() {
    const logoutWindow = new BrowserWindow({
        show: false,
    });

    logoutWindow.loadURL(authService.getLogOutUrl());

    logoutWindow.on('ready-to-show', async () => {
        logoutWindow.close();
        await authService.logout();
    });
}

module.exports = {
    createAuthWindow,
    createLogoutWindow,
};