    var gameCode = "";
    var gameVersion = "";
    var rayVersion = "";

window.onload = function() {
	
    const {remote} = require('electron');
    const TabGroup = require("electron-tabs");
    const ipc = require('electron').ipcRenderer;
    var fs = require('fs');
    var accounts = require('./storage/accounts.json');
    const opn = require('opn');
    const {BrowserWindow} = remote;
    const win = BrowserWindow.getFocusedWindow();
    var dialog = remote.require('dialog');
    var tabGroup = new TabGroup();
    
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
	  
    function zoomOut() {
        var ri = document.getElementById("right-interface");
        ri.setZoomFactor(0.5);
    }
    
    //File
    document.getElementById("iiourpg").onclick = function() {
        let tab = tabGroup.addTab({
                title: "IOURPG",
                src: "http://d2452urjrn3oas.cloudfront.net/iou.swf?",
                visible: true,
                active: true,
                webviewAttributes: {
                    plugins: true
                }
        });
    }
    document.getElementById("ikong").onclick = function() {
        mainWindow = new BrowserWindow({
            'width': 400,
            'height': 400,
            'frame': false
        });
        mainWindow.loadURL(`file://${__dirname}/kong.html`);
    }

    ipc.on("asd", function(event, message){
        console.log(message);
      alert(message) // prints "pong"
    })
    
    document.getElementById("itest-client").onclick = function() {
        let tab = tabGroup.addTab({
                title: "IOURPG",
                src: "http://d2452urjrn3oas.cloudfront.net/iou.swf?",
                visible: true,
                active: true,
                webviewAttributes: {
                    plugins: true
                }
        });
    }
    document.getElementById("isave").onclick = function() {
        saveAccounts();
    }
    document.getElementById("isave-as").onclick = function() {
        alert("hi");
        require('electron').remote.dialog.showSaveDialog(function (fileName) {
            alert(fileName);
        }); 
    }
    document.getElementById("iload").onclick = function() {

    }
    
    //Links
    document.getElementById("liou-helper").onclick = function() {
        opn('http://www.iouhelper.com/');
    }
    document.getElementById("liou-helper-discord").onclick = function() {
        opn('https://discord.gg/wczWVmZ');
    }
    document.getElementById("lmulticalc").onclick = function() {
        opn('https://docs.google.com/spreadsheets/d/1QGBm6KtcOZraqSkLWVuqTF16vUD7rrOvIpdh59bFLmg/edit#gid=357923173');
    }    
    document.getElementById("liou-discord").onclick = function() {
        opn('https://discord.gg/zynuQcP');
    }
    document.getElementById("liou-forum").onclick = function() {
        opn('https://iourpg.com/forum/');
    }
    document.getElementById("liou-wiki").onclick = function() {
        opn('http://iourpg.wikia.com/wiki/Idle_Online_Universe_Wiki');
    }
    document.getElementById("lcard-calculator").onclick = function() {
        opn('http://iouhelper.com/cards.html');
    }
    
    var setVersions = new Promise(
        function (resolve, reject) {
        var http = require('http');

        var options = {
            host: 'www.kongregate.com',
            path: '/games/iouRPG/idle-online-universe'
        }
        var request = http.request(options, function (res) {
            var data = '';
            res.on('data', function (chunk) {
                data += chunk;
            });
            res.on('end', function () {
                gameCode = data.substring(data.indexOf('API_AS3_') + 8, data.indexOf('.swf\",\"preview\"'));
                gameVersion = data.substring(data.indexOf('\"game_version\":') + 15, data.indexOf(',\"flash_var_prefix\"'));
                
                resolve(gameCode + "," + gameVersion);
            });
        });
        request.on('error', function (e) {
            reject(e.message);
        });
        request.end();
        
    }
    );
    
    var setRayVersion = new Promise(
        function (resolve, reject) {
        var ranHost = "/v.txt?d=506" + Math.floor((Math.random() * 1000) + 1);
        
        var http = require('http');

        var options = {
            host: 'd2452urjrn3oas.cloudfront.net',
            path: ranHost
        }
        var request = http.request(options, function (res) {
            var data = '';
            res.on('data', function (chunk) {
                data += chunk;
            });
            res.on('end', function () {
                resolve(data);
            });
        });
        request.on('error', function (e) {
            reject(e.message);
        });
        request.end();
    }
    );
    
    function saveAccounts() {
        fs.writeFile("./storage/accounts.json", accounts, function(err) {
            if(err) {
                alert(console.log(err));
            }
            alert("Accounts were saved.");
        }); 
    }
    
    Promise.all([setVersions, setRayVersion]).then(values => { 
        var vers = values[0].split(",");
        vers.push(values[1]);
    
        loadPlayers(vers);
    });
    
    function loadPlayers(versionArray) {
        for (acc in accounts) {
            var player = new Player(acc, accounts[acc][0], accounts[acc][1], versionArray[0], versionArray[1], versionArray[2]);
        
            let tab = tabGroup.addTab({
                title: player.getUsername(),
                src: player.getUrl(),
                visible: true,
                active: true,
                webviewAttributes: {
                    plugins: true
                }
            });
        }  
    }
    
}