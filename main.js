'use strict';

const electron = require('electron');
const app = electron.app;
const ipc = require('electron').ipcMain
const remote = require('electron').remote;

require('electron-debug')({showDevTools: true});

// browser-window creates a native window
const BrowserWindow = electron.BrowserWindow;
let mainWindow = null;
let accessToken = null;

// Allows for live-reload while developing the app
require('electron-reload')(__dirname + '/build');

function createWindow() {
  // Initialize the window to our specified dimensions
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 900,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false
    }
  });

  // Tell Electron where to load the entry point from
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Clear out the main window when the app is closed
  mainWindow.on('closed', function () {

    mainWindow = null;

  });

}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
