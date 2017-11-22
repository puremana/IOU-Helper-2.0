function Player(kongUsername, kongID, kongToken, code, gameVersion, rayVersion) {
    this.kongUsername = kongUsername;
    this.kongID = kongID;
    this.kongToken = kongToken;
    
    this.gameCode = code;
    this.gameVersion = gameVersion;
    this.rayVersion = rayVersion;
    
	this.getUsername = function() {
		return this.kongUsername;
	}
	
    this.getDetails = function() {
        return this.kongUsername + "," + this.kongID + "," + this.kongToken;
    }
    
    this.getUrl = function() {
        return "http://chat.kongregate.com/gamez/0022/7576/live/iou.swf?" + "&v=" + this.rayVersion + "&kongregate_username=" + this.kongUsername + "&kongregate_user_id=" + this.kongID + "&kongregate_game_auth_token=" + this.kongToken + "&kongregate_api_path=http%3A%2F%2Fchat.kongregate.com%2Fflash%2FAPI_AS3_" + this.gameCode + ".swf";
    }; 
    
    this.getTestUrl = function() {
        return "http://iourpg.com/test.swf?" + "&v=" + this.rayVersion + "&kongregate_username=" + this.kongUsername + "&kongregate_user_id=" + this.kongID + "&kongregate_game_auth_token=" + this.kongToken + "&kongregate_api_path=http%3A%2F%2Fchat.kongregate.com%2Fflash%2FAPI_AS3_" + this.gameCode + ".swf";
    }; 
}