Page({
    onLoad: function() {
        wx.sys.getUserInfo().then(console.log);
    },
});