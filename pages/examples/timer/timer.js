// pages/examples/timer/timer.js
Page({
	timer: {
		id: 0,
		start: function () {
			//如果计时器已开启，则直接返回，避免申请过多的计时器，造成内存泄露
			if (this.id) return;
			this.id = setInterval(this.handler, 1000);
			//立即执行一下，避免出现时间间隔
			this.handler();
			console.log('timer start...');
		},
		stop: function () {
			if (this.id) {
				clearInterval(this.id);
				console.log('timer stop...');
			}
			//销毁后要重置为 0
			this.id = 0;
		},
		handler: null,
	},

	/**
	 * 页面的初始数据
	 */
	data: {
		datetime: wx.timeUtil.format()
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.timer.handler = this.updateDatetime;
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		this.timer.start();
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {
		this.timer.stop();
	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {
		this.timer.stop();
	},

	/**
	 * 更新时间
	 */
	updateDatetime: function () {
		this.setData({ datetime: wx.timeUtil.format() });
	},

})
