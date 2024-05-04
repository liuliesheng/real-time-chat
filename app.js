//app.js
import "./bootstrap/index";

wx.emitter.on('wx.userinfo.to',function(){
	wx.navigateTo({
		url: '/pages/user/auth/auth',
	});
});

App({
    onLaunch: function() {},
    globalData: {
        userInfo: null
    }
});