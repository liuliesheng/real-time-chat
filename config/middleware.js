// 中间件配置
// 创建一个中间件 uni.middleware();
// 系统内置中间件列表 uni.middlewares

import testAppIsStart from './middlewares/test-app-is-start'
import printParams from './middlewares/print-params'

module.exports = {
	appLaunch: [
		testAppIsStart,
	],
	appShow: [
		printParams
	],
	appHide: [],
	appRoute: [],
	appRouteDone: [],
	appUnhang: [],
};
