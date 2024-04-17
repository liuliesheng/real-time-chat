// pages/user/login/login.js
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
     * 登录
     */
    onSubmit: function(e) {
        const data = e.detail.value;

        wx.showLoading();
        wx.cloud.callFunction({
            name: 'user',
            data: {
                __ACTION__: 'login',
                user: data.mobile,
                password: data.password
            }
        }).then((res) => {
            res = res.result;
            console.log(res);

            if (res.code !== 1) {
                return wx.showTips(res.msg);
            }

            wx.showTips('登录成功！');
			wx.delayNavigateBack(1200);
        }, (err) => {
            console.log(err);
            wx.showTips('登录失败，请稍后再试~');
        });
    }
})