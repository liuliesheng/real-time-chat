// 中间件配置
// 创建一个中间件 $.$middleware();
// 系统内置中间件列表 $.$middlewares
import bindUser from './bind-user';
import loadConfig from './load-config';

module.exports = {
	appLaunch: [
		bindUser,
		loadConfig
	],
	appShow: [
		bindUser
	],
	appHide: [],
	appRoute: [],
	appRouteDone: [],
	appUnhang: [],
};
