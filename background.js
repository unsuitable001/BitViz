const { app, BrowserWindow, dialog } = require('electron');
const path = require('path');

process.env.NODE_ENV = 'production';

const isDevelopment = process.env.NODE_ENV !== 'production';

let win;

function createWindow() {
  // Create main window, Do not display the window until it's fully loaded.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    icon: path.join(__dirname, 'icon.png'),
    webPreferences: {
      nodeIntegration: true,
      devTools: isDevelopment,
      // contextIsolation: true,
    },
  });

  win.loadFile('index.html');

  // Open the DevTools when run in dev mode.
  if (isDevelopment) {
    win.webContents.openDevTools();
  } else {
    win.removeMenu();
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    win = null;
  });

  // Emitted before close
  win.on('close', (event) => {
    let choice = dialog.showMessageBoxSync(win, {
      type: 'question',
      buttons: ['Yes', 'No'],
      title: 'Confirm Quit',
      message:
        'If you close the App, your progress will be lost.\nAre you sure you want to quit?',
    });

    if (choice == 1) {
      event.preventDefault();
    }
  });

  // Emitted when loaded. Display main window.
  win.once('ready-to-show', () => {
    win.maximize();
    win.show();
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});
