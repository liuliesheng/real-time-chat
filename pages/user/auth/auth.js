// pages/user/auth.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: null,
    },
    onLoad: function(options) {},
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {
        wx.emitter.trigger('sys.userinfo.result', this.data.userInfo);
    },

    /**
     * 获取用户信息
     */
    getUserInfo: function(e) {
        this.data.userInfo = e.detail;
        if (e.detail.userInfo) {
            wx.navigateBack();
        }
    }
});
