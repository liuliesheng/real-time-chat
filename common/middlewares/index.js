// 中间件配置
// 创建一个中间件 $.$middleware();
// 系统内置中间件列表 $.$middlewares
import appBindUser from './app-bind-user';

module.exports = {
	appLaunch: [
		appBindUser
	],
	appShow: [
		appBindUser
	],
	appHide: [],
	appRoute: [],
	appRouteDone: [],
	appUnhang: [],
};
