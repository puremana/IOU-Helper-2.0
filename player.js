var player = new function(kongUsername, kongID, kongToken) {
    this.kongUsername = kongUsername;
    this.kongID = kongID;
    this.kongToken = kongToken;
    
    this.getUrl = function() {
        return "http://chat.kongregate.com/gamez/0022/7576/live/iou.swf?" + gameVersion + "&v=" + rayVersion + "&kongregate_username=" + kongUsername + "&kongregate_user_id=" + kongID + "&kongregate_game_auth_token=" + kongToken + "&kongregate_api_path=http%3A%2F%2Fchat.kongregate.com%2Fflash%2FAPI_AS3_" + _code + ".swf";
    }; 
}