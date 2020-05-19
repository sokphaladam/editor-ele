const { app,  BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

function onCreateWindow()
{
  let window = new BrowserWindow({
    width: 800,
    height: 500,
    webPreferences: {
      nodeIntegration: true
    }
  });

  window.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);

  window.on('closed', () => {
    window = null;
  })
}

app.on('ready', onCreateWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
})