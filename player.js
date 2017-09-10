function Player(kongUsername, kongID, kongToken) {
    this.kongUsername = kongUsername;
    this.kongID = kongID;
    this.kongToken = kongToken;
    
    this.gameCode = getGameCode();
    this.gameVersion = getGameVersion();
    this.rayVersion = getRayVersion();
    
	this.getUsername = function() {
		return this.gameCode;
	}
	
    this.getUrl = function() {
        return "http://chat.kongregate.com/gamez/0022/7576/live/iou.swf?" + this.gameVersion + "&v=" + this.rayVersion + "&kongregate_username=" + this.kongUsername + "&kongregate_user_id=" + this.kongID + "&kongregate_game_auth_token=" + this.kongToken + "&kongregate_api_path=http%3A%2F%2Fchat.kongregate.com%2Fflash%2FAPI_AS3_" + this.gameCode + ".swf";
    }; 
}