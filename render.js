    var gameCode = "";
    var gameVersion = "";
    var rayVersion = "";

window.onload = function() {
	
    const {remote} = require('electron');
    const TabGroup = require("electron-tabs");
    var fs = require('fs');
    var accounts = require('./storage/accounts.json');
    const {BrowserWindow} = remote;
    const win = BrowserWindow.getFocusedWindow();
    
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
    
    function saveJSON() {
        fs.writeFile("test.txt", infoArray, function(err) {
            if(err) {
                return console.log(err);
            }

            //alert("The file was saved!");
        }); 
    }
    
    Promise.all([setVersions, setRayVersion]).then(values => { 
        var vers = values[0].split(",");
        vers.push(values[1]);
    
        loadPlayers(vers);
    });
    
    function loadPlayers(versionArray) {
        let tabGroup = new TabGroup();
        
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