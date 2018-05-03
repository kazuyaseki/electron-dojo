const { app, BrowserWindow, globalShortcut } = require('electron');
const path = require('path');
let mainWindow;
const { setMainMenu } = require('./main-menu');
const { setShortcuts } = require('./shortcuts');

app.on('ready', () => {
  mainWindow = new BrowserWindow();
  mainWindow.loadURL(path.join('file://', __dirname, 'index.html'));
  setMainMenu(mainWindow);

  // Register a 'CommandOrControl+X' shortcut listener.
  const ret = globalShortcut.register('CommandOrControl+O', () => {
    mainWindow.webContents.executeJavaScript(`
      console.log(document.activeElement.tagName); 
      if(document.activeElement && document.activeElement.tagName.match(/^(input|textarea)$/i)) {
        document.activeElement.value += '###';        
      }
    `);
  });

  if (!ret) {
    console.log('registration failed');
  }

  // Check whether a shortcut is registered.
  console.log(globalShortcut.isRegistered('CommandOrControl+O'));
});
