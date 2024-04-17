// pages/examples/listener/a.js
import listener from '../../../bootstrap/listener.js';

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
        listener.on('wait.result', (res) => {
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

})
