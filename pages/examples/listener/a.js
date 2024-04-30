// pages/examples/listener/a.js

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		result: null
	},


	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		console.log(this);
		wx.emitter.on('wait.result', (res) => {
			this.setData({
				result: JSON.stringify(res)
			});
		});
	},
	toBPage: function() {
		wx.navigateTo({
			url: './b',
		})
	}

});
