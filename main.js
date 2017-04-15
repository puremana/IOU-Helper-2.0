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
  //mainWindow.loadURL('http://chat.kongregate.com/gamez/0022/7576/live/iou.swf?1490992967&v=0.0.66&kongregate_username=B00sted&kongregate_user_id=29710164&kongregate_game_auth_token=3654d1479797a808001aaa0fc9ca57ffd2e7a953d16154be1cc9a7f19e7c5f50&kongregate_api_path=http:%2F%2Fchat.kongregate.com%2Fflash%2FAPI_AS3_e484058d20b8d502f91dbab1c2195150.swf');
  
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows    'nodeIntegration': false
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});


