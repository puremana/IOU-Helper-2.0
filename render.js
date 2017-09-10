window.onload = function() {
	
    const {remote} = require('electron');
    const TabGroup = require("electron-tabs");
    const {BrowserWindow} = remote;
    const win = BrowserWindow.getFocusedWindow();

    document.getElementById("exit").onclick = function() {
        win.close();
    }

    document.getElementById("max").onclick = function() {
        zoomOut();
        win.isMaximized() ? win.unmaximize() : win.maximize();
    }

    document.getElementById("min").onclick = function() {
        win.minimize();
    }
	  
    function zoomOut() {
        var ri = document.getElementById("right-interface");
        ri.setZoomFactor(0.5);
    }
	
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