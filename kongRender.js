window.onload = function() {
    const {remote} = require('electron');
    const {BrowserWindow} = remote;
    const win = BrowserWindow.getFocusedWindow();
    const ipc = require('electron').ipcRenderer;
    
    document.getElementById("exit").onclick = function() {
        win.close();
    }

    document.getElementById("max").onclick = function() {
        if (win.isMaximized()) {
            win.unmaximize();
        }
        else {
            win.maximize();
        }
    }

    document.getElementById("min").onclick = function() {
        win.minimize();
    }
    
    document.getElementById("submitKong").onclick = function() {
        var kongUser = document.getElementById('kkong-user').value;
        var kongID = document.getElementById('kkong-id').value;
        var kongToken = document.getElementById('kkong-token').value;
        var jsonDetails = {
            "user": kongUser,
            "id": kongID,
            "token": kongToken
        }
        ipc.send('subKong', jsonDetails);
        win.close();
    }
}