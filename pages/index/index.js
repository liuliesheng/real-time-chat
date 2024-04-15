//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        result: '',
        error: '',
    },

    onLoad: function() {
        // this.setData({
            // data: data
        // });
        // wx.http.get('http://www.baidu.com').then(function(res) {
        //     console.log(res);
        // });
    },
    onScanCodeTap: function() {
        wx.scanCode({
            onlyFromCamera: true,
            success: (res) => {
                console.log('success', res);
                const result = res.result;
                this.scanCodePayment(result);
            },
            fail: (res) => {
                console.log('error', res);
                this.setData({
                    error: JSON.stringify(res),
                });
            },
        })
    },

    // 扫码支付
    scanCodePayment: function(authCode) {
        wx.request({
            url: 'http://x5.51daoteng.com/api/sweep_code_payment/createOrder',
            data: {
                auth_code: authCode,
                merchant_id: 1
            },
            success: (res) => {
                console.log('response success', res);
                res = res.data;
                if (res.code !== 1) {
                    this.setData({
                        error: res.msg,
                    });
                    return;
                }
                this.queryOrder(res.data);
            },
            fail: (res) => {
                console.log('response fail', res);
                this.setData({
                    error: JSON.stringify(res),
                });
            },
        });
    },

    // 查询订单
    queryOrder: function(orderSn) {
        setTimeout(() => {
            this.queryOrderRequest(orderSn);
        }, 3000);
    },

    // 查询订单请求
    queryOrderRequest: function(orderSn) {
        wx.request({
            url: 'http://x5.51daoteng.com/api/sweep_code_payment/queryOrder',
            data: {
                order_sn: orderSn,
                merchant_id: 1
            },
            success: (res) => {
                console.log('response success', res);
                res = res.data;
                if (res.code !== 1) {
                    this.setData({
                        error: res.msg,
                    });
                    return;
                }

                const orderStatus = res.data;
                if (10000 === orderStatus) {
                    this.setData({
                        result: '支付中...',
                    });
                    this.queryOrder(orderSn);
                } else if (10001 === orderStatus) {
                    this.setData({
                        result: '支付成功',
                    });
                } else if (10002 === orderStatus) {
                    this.setData({
                        result: '订单已关闭',
                    });
                } else if (10004 === orderStatus) {
                    this.setData({
                        result: '订单已超时',
                    });
                } else {
                    this.setData({
                        result: '订单失败',
                    });
                }
            },
            fail: (res) => {
                console.log('response fail', res);
                this.setData({
                    error: JSON.stringify(res),
                });
            },
        });
    }
})