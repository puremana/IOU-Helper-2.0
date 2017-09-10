const {app, BrowserWindow} = require('electron');
const path = require('path');

let mainWindow;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    app.quit();
});

let ppapi_flash_path;

// Specify flash path.
// On Windows, it might be /path/to/pepflashplayer.dll
// On OS X, /path/to/PepperFlashPlayer.plugin
// On Linux, /path/to/libpepflashplayer.so
if(process.platform  == 'win32'){
  ppapi_flash_path = path.join(__dirname, 'pepflashplayer64.dll');
} else if (process.platform == 'linux') {
  ppapi_flash_path = path.join(__dirname, 'libpepflashplayer.so');
} else if (process.platform == 'darwin') {
  ppapi_flash_path = path.join(__dirname, 'PepperFlashPlayer.plugin');
}

app.commandLine.appendSwitch('ppapi-flash-path', ppapi_flash_path);

// Specify flash version, for example, v18.0.0.203
app.commandLine.appendSwitch('ppapi-flash-version', '25.0.0.127');

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    'width': 800,
    'height': 600,
	'frame': false,
    'webPreferences': {'plugins': true, 'allowRunningInsecureContent': true}
  });
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows    'nodeIntegration': false
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});


