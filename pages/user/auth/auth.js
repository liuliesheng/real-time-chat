// pages/user/auth.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		userInfo: null,
	},
	onLoad: function (options) {
	},
	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {
		wx.emitter.trigger('wx.userinfo.result', this.data.userInfo);
	},

	/**
	 * 获取用户信息
	 */
	getUserInfo: function (e) {
		console.log(e)
		this.data.userInfo = e.detail;
		wx.navigateBack();
	}
})
