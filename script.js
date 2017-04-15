window.onload = function() {
	  const {remote} = require('electron');
	  const {BrowserWindow} = remote;
	  const win = BrowserWindow.getFocusedWindow();

	  document.getElementById("exit").onclick = function() {
		win.close();
	  }
	  
	  document.getElementById("max").onclick = function() {
		win.isMaximized() ? win.unmaximize() : win.maximize();
	  }
	  
	  document.getElementById("min").onclick = function() {
		win.minimize();
	  }
	
	const TabGroup = require("electron-tabs");

	
	let tabGroup = new TabGroup();
	let tab = tabGroup.addTab({
	title: "Electron",
	src: "http://chat.kongregate.com/gamez/0022/7576/live/iou.swf?1490992967&v=0.0.66&kongregate_username=B00sted&kongregate_user_id=29710164&kongregate_game_auth_token=3654d1479797a808001aaa0fc9ca57ffd2e7a953d16154be1cc9a7f19e7c5f50&kongregate_api_path=http:%2F%2Fchat.kongregate.com%2Fflash%2FAPI_AS3_e484058d20b8d502f91dbab1c2195150.swf",
	visible: true,
	webviewAttributes: {
          plugins: true
        }
	});
}