const {urls} = wx.config;
Page({
    data: {
        remark: "",
        remark_length: 0,
        wechat: "",
        email: "",
    },
    onLoad: function() {},
    onWechatInput: function(e) {
        this.setData({
            wechat: e.detail.value
        })
    },
    onEmailInput: function(e) {
        this.setData({
            email: e.detail.value
        });
    },
    onRemarkInput: function(e) {
        this.setData({
            remark: e.detail.value,
            remark_length: e.detail.value.length
        });
    },
    onSubmit: function() {
        if (!this.data.remark) {
            return wx.showModal({
                content: "请输入您宝贵的意见",
                showCancel: false
            });
        }
        const data = {
            wechat: this.data.wechat,
            remark: this.data.remark,
            system_info: wx.getSystemInfoSync(),
            email: this.data.email,
        };
        console.log(data);
        // wx.http.post(urls.public.feedback, data, () => {
        // 	wx.navigateBack();
        // });
        const db = wx.cloud.database();

        wx.showLoading();
        db.collection('feedback').add({
            data: data
        }).then(() => {
            wx.showTips('已提交');
			wx.delayNavigateBack(1200);
        }, () => {
            wx.showTips('提交失败，请稍后重试~');
        });
    }
});
