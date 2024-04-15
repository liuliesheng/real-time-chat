// 中间件配置
// 创建一个中间件 wx.middleware();
// 系统内置中间件列表 wx.middlewares
module.exports = {
    appShow: [{
        name: 'print params',
        handle: function(next, options) {
            console.log('params:', options);
            next();
        }
    }],
    appHide: [],
    appRoute: [],
    appRouteDone: [],
    appUnhang: [],
};