    var gameCode = "";
    var gameVersion = "";
    var rayVersion = "";

window.onload = function() {
	
    const {remote} = require('electron');
    const TabGroup = require("electron-tabs");
    const ipc = require('electron').ipcRenderer;
    const copy = require('copy-to-clipboard');
    const dragula = require("dragula");
    var fs = require('fs');
    var accounts;
    function loadAccounts() {
        return new Promise((resolve, reject) => {
            fs.readFile(__dirname + '/storage/accounts.json', 'utf8', function (err, data) {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });  
        });
    }
    var promise = loadAccounts();
    promise.then((msg) => {
        accounts = JSON.parse(msg);
    });
    //var accounts = require('./storage/accounts.json');
    const opn = require('opn');
    const {BrowserWindow} = remote;
    const win = remote.getCurrentWindow();
    var dialog = remote.require('dialog');
    var tabGroup = new TabGroup({
        ready: function (tabGroup) {
            dragula([tabGroup.tabContainer], {
                direction: "horizontal"
            });
        }
    });
    var vers = [];
    var tabList = [];
    
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
        tabList.push(tab);
    }
    document.getElementById("ikong").onclick = function() {
        mainWindow = new BrowserWindow({
            'width': 400,
            'height': 400,
            'frame': false,
            'icon': __dirname + '/settings.png',
            'title': 'Kongregate Account'
        });
        mainWindow.loadURL(`file://${__dirname}/kong.html`);
    }

    ipc.on("sendKong", function(event, message){
        var pJson = [message.id, message.token];
        accounts[message.user] = pJson;
        saveAccounts();
        var player2 = new Player(message.user, message.id, message.token, vers[0], vers[1], vers[2]);
        let tab = tabGroup.addTab({
                title: message.user,
                src: player2.getUrl(),
                visible: true,
                active: true,
                webviewAttributes: {
                    plugins: true
                }
        });
        tabList.push(tab);
    })
    
    ipc.on("sendSettings", function(event, message){
        alert("Settings Saved.");
    });
    
    document.getElementById("itest-client").onclick = function() {
        var username = tabGroup.getActiveTab().getTitle();
        if ((username == null) || username == "IOURPG") {
            let tab = tabGroup.addTab({
                    title: "IOURPG Test",
                    src: "http://iourpg.com/test.swf",
                    visible: true,
                    active: true,
                    webviewAttributes: {
                        plugins: true
                    }
            });
            tabList.push(tab);
        }
        else {
            for (acc in accounts) {
            if (acc == username) {
                var player3 = new Player(acc, accounts[acc][0], accounts[acc][1], vers[0], vers[1], vers[2]);
                let tab = tabGroup.addTab({
                        title: player3.getUsername() + " Test",
                        src: player3.getTestUrl(),
                        visible: true,
                        active: true,
                        webviewAttributes: {
                            plugins: true
                        }
                });
                tabList.push(tab);
            }
        }
        }
    }
    document.getElementById("isave").onclick = function() {
        saveAccounts();
        
    }
    document.getElementById("isave-as").onclick = function() {
        require('electron').remote.dialog.showSaveDialog( { defaultPath: "accounts.json" }, function(fileName) { 
            fs.writeFile(fileName, JSON.stringify(accounts), "utf8");
            alert("Accounts saved.");
        });
        
    }
    document.getElementById("iload").onclick = function() {
        var prom = loadJson();
        prom.then((msg) => {
            var accounts2 = JSON.parse(msg);
                for (acc in accounts2) {
                    var player2 = new Player(acc, accounts2[acc][0], accounts2[acc][1], vers[0], vers[1], vers[2]);
                    var aJson = [accounts2[acc][0], accounts2[acc][1]];
                    accounts[acc] = aJson;
                    let tab = tabGroup.addTab({
                        title: player2.getUsername(),
                        src: player2.getUrl(),
                        visible: true,
                        active: true,
                        webviewAttributes: {
                            plugins: true
                        }
                    });
                    tabList.push(tab);
                }
            });
    }
    
    function loadJson() {
        return new Promise((resolve, reject) => {
                require('electron').remote.dialog.showOpenDialog( { defaultPath: "accounts.json" }, function(fileName) { 
                fs.readFile(fileName.toString(), 'utf8', function (err, data) {
                    if (err) {
                        reject(err);
                    }
                    resolve(data);
                });  
            });
        });
    }
    
    //Settings
    document.getElementById("ssettings").onclick = function() {
         mainWindow = new BrowserWindow({
            'width': 400,
            'height': 400,
            'frame': false,
            'icon': __dirname + '/settings.png',
            'title': 'Settings'
        });
        mainWindow.loadURL(`file://${__dirname}/settings.html`);
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
        fs.writeFile("storage/accounts.json", JSON.stringify(accounts), "utf8");
    }
    
    function saveAccountsFromTab() {
        var aJson = {};
        for (acc in accounts) {
            for (gTab in tabList) {
                if (acc == tabList[gTab].getTitle()) {
                    aJson[acc] = [accounts[acc][0], accounts[acc][1]];
                }
            }   
        }
        accounts = aJson;
        saveAccounts();
    }
    
    Promise.all([setVersions, setRayVersion]).then(values => { 
        vers = values[0].split(",");
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
            tabList.push(tab);
        }  
    }
    
    tabGroup.on("tab-removed", (tab, tabGroup) => {
        saveAccountsFromTab();
    });
    
    //Tools
    document.getElementById("trefresh").onclick = function() {
        singleRefresh();
    }
    
    function singleRefresh() {
        var aTab = tabGroup.getActiveTab();
        if (aTab.getTitle() != null) {
            if (aTab.getTitle() == "IOURPG") {
                aTab.webview.loadURL("http://d2452urjrn3oas.cloudfront.net/iou.swf?");
            }
            else if (aTab.getTitle() == "IOURPG Test") {
                aTab.webview.loadURL("http://iourpg.com/test.swf");
            }
            else {
                for (acc in accounts) {
                    if (aTab.getTitle() == acc) {
                        var player4 = new Player(acc, accounts[acc][0], accounts[acc][1], vers[0], vers[1], vers[2]);
                        aTab.webview.loadURL(player4.getUrl());
                    }
                }
            }
        }
        else {
            alert("You can't refresh with zero tabs.");
        }
    }
    
    document.getElementById("trefresh-all").onclick = function() {
        refreshAll();
    }
    
    function refreshAll() {
        if (tabList.length > 0) {
            for (gTab in tabList) {
                if (tabList[gTab].getTitle() == "IOURPG") {
                    tabList[gTab].webview.loadURL("http://d2452urjrn3oas.cloudfront.net/iou.swf?");
                }
                else if (tabList[gTab].getTitle() == "IOURPG Test") {
                    tabList[gTab].webview.loadURL("http://iourpg.com/test.swf");
                }
                else {
                     for (acc in accounts) {
                        if (tabList[gTab].getTitle() == acc) {
                            var player5 = new Player(acc, accounts[acc][0], accounts[acc][1], vers[0], vers[1], vers[2]);
                            tabList[gTab].webview.loadURL(player5.getUrl());
                        }
                    }
                }
            }
        }
        else {
            alert("You can't refresh with zero tabs.");
        }  
    }
    
    document.getElementById("tcopy-details").onclick = function() {
        var a = tabGroup.getActiveTab().getTitle();
        if ((a != "IOURPG") && (a != "IOURPG Test") && (a != null)) {
            for (acc in accounts) {
                if (a == acc) {
                    var player6 = new Player(acc, accounts[acc][0], accounts[acc][1], vers[0], vers[1], vers[2]);
                    copy(player6.getDetails());
                    alert("Copied account details to clipboard.");
                }
            }
        }
        else {
            alert("You cannot copy these account details.");
        }
    }
    
    document.getElementById("tcopy-url").onclick = function() {
        var a = tabGroup.getActiveTab().getTitle();
        if ((a != "IOURPG") && (a != "IOURPG Test") && (a != null)) {
            for (acc in accounts) {
                if (a == acc) {
                    var player6 = new Player(acc, accounts[acc][0], accounts[acc][1], vers[0], vers[1], vers[2]);
                    copy(player6.getUrl());
                    alert("Copied account URL to clipboard.");
                }
                else if (a == acc + " Test") {
                    var player6 = new Player(acc, accounts[acc][0], accounts[acc][1], vers[0], vers[1], vers[2]);
                    copy(player6.getTestUrl());
                    alert("Copied test account URL to clipboard.");
                }
            }
        }
        else {
            alert("You cannot copy these account details.");
        }
    }
    
    document.getElementById("body").onkeydown = function(e){
        switch (e.which) {
            case 112: //f1
                //alert("f1");
                break;
            case 113: //f2
                //alert("f2");
                break;
            case 114: //f3
                //alert("f3");
                break;
            case 115: //f4
                //alert("f4");
                break;
            case 116: //f5
                singleRefresh();
                break;
            case 117: //f5
                refreshAll();
                break;
            default:
                break;
        }
    }
}