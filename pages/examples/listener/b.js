// pages/examples/listener/b.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 页面提交
     */
    onSubmit: function(e) {
        wx.emitter.trigger('wait.result', e.detail.value);
        wx.navigateBack({})
    }
})
