// pages/examples/getUserInfo/getUserInfo.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        hasUserInfo: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
		wx.sys.getUserInfo().then((res) => {
            this.setData({
                userInfo: res,
                userInfoStr: JSON.stringify(res),
                hasUserInfo: true
            })
        });
    },

    getUserInfo: function() {
        wx.sys.getUserInfo({
            force: true, //强制获取
            success: (res) => {
                this.setData({
                    userInfo: res,
                    userInfoStr: JSON.stringify(res),
                    hasUserInfo: true
                })
            }
        });
    }
});