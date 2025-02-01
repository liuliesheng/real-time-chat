//初始化基础配置
import $ from "../$";

let config = null;

try {
	config = require('../../common/config/app.js');

	if (typeof config === 'function') {
		config = config() || {};
	}
} catch (e) {
	console.warn("/common/config/app.js not found!");
	config = {};
}

let appConfig = $.getLaunchOptionsSync ? $.getLaunchOptionsSync() : {};
// if (typeof __wxConfig !== 'undefined') {
// 	appConfig = __wxConfig;
// }

$.$define('config', Object.assign(config, appConfig));
