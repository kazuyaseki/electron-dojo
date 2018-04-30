const { app, BrowserWindow } = require('electron');
const path = require('path');
let mainWindow;
const { setMainMenu } = require('./main-menu');

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    show: false
  });
  mainWindow.loadURL(path.join('file://', __dirname, 'index.html'));
  // 準備できてから見せることによってネイティブアプリっぽさを演出する
  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });
  setMainMenu();
});
