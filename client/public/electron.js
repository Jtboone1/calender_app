const { app } = require('electron')
const contextMenu = require('electron-context-menu');
const {createAuthWindow} = require('../main/authentication-process');
const createMainWindow  = require('../main/application-process');
const authService = require('../services/auth-service');

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


// Enables right-click to inspect element
contextMenu({
    prepend: (params, browserWindow) => [{
        label: 'Rainbow',
        // Only show it when right-clicking images
        visible: params.mediaType === 'image'
    }]
});