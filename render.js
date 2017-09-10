window.onload = function() {
	
    const {remote} = require('electron');
    const TabGroup = require("electron-tabs");
    var fs = require('fs');
    const {BrowserWindow} = remote;
    const win = BrowserWindow.getFocusedWindow();
    var gameCode = "";
    var gameVersion = "";
    var rayVersion = "";
    
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
	
    function getVersions() {
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
                var dataArray = data.split("_");
                for (d in dataArray) {
                    if (d == 1390) {
                        var as = dataArray[d].split(".");
                        gameCode = as[0];
                    }  
                }
                
                var infoArray = data.split(":");
                for (i in infoArray) {
                    if (i == 541) {
                        var sa = infoArray[i].split(",");
                        gameVersion = sa[0];
                    }
                }
                
                
                
                fs.writeFile("test.txt", infoArray, function(err) {
                    if(err) {
                        return console.log(err);
                    }

                    //alert("The file was saved!");
                }); 
                //alert(infoArray);
            });
        });
        request.on('error', function (e) {
            alert(e.message);
        });
        request.end();
    }
    
    function getRayVersion() {
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
                rayVersion = data;
            });
        });
        request.on('error', function (e) {
            alert(e.message);
        });
        request.end();
    }
    
    getVersions();
    getRayVersion();
    
	let tabGroup = new TabGroup();
	let tab = tabGroup.addTab({
        title: "Electron",
        //src: "http://chat.kongregate.com/gamez/0022/7576/live/iou.swf?adroll_pix_id='K4TGNDGRN5BBLEIDMF2Q6O&v=0.1.33&kongregate_username=Level1Pro&kongregate_user_id=23483082&kongregate_game_auth_token=77080b261b7f66b0e982e05670ac9f0ecca4391bbd3e2a830b3c0f13dc264843&kongregate_api_path=http:%2F%2Fchat.kongregate.com%2Fflash%2FAPI_AS3_9dd7566dd62ffc3204bfbf6e2781ce2e.swf",
        src: "http://www.google.com",
        visible: true,
        active: true,
        webviewAttributes: {
            plugins: true
        }
	});

}