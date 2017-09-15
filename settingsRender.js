window.onload = function() {
    const {remote} = require('electron');
    const {BrowserWindow} = remote;
    var win = remote.getCurrentWindow();
    const ipc = require('electron').ipcRenderer;
    
    document.getElementById("settings-exit").onclick = function() {
        win.close();
    }

    document.getElementById("settings-max").onclick = function() {
        if (win.isMaximized()) {
            win.unmaximize();
        }
        else {
            win.maximize();
        }
    }

    document.getElementById("settings-min").onclick = function() {
        win.minimize();
    }
    
    document.getElementById("saveSettings").onclick = function() {
//        var kongUser = document.getElementById('kkong-user').value;
//        var kongID = document.getElementById('kkong-id').value;
//        var kongToken = document.getElementById('kkong-token').value;
//        var jsonDetails = {
//            "user": kongUser,
//            "id": kongID,
//            "token": kongToken
//        }
        ipc.send('subSettings', "s");
    }
}