//app.js
import "./bootstrap/index";

wx.emitter.on('sys.getUserInfo.to', function() {
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