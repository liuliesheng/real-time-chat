// 中间件配置
// 创建一个中间件 $.$middleware();
// 系统内置中间件列表 $.$middlewares

import appLoadParams from './middlewares/app-load-params'
import appShowParams from './middlewares/app-show-params'

module.exports = {
	appLaunch: [
		appLoadParams,
	],
	appShow: [
		appShowParams
	],
	appHide: [],
	appRoute: [],
	appRouteDone: [],
	appUnhang: [],
};
