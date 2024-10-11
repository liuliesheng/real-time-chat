//初始化基础配置
import $ from "../$";

let config = null;

try {
	config = require('../../config/app.js');

	if (typeof config === 'function') {
		config = config() || {};
	}
} catch (e) {
	console.warn(e);
	config = {};
}

let appConfig = {};
if (typeof __wxConfig !== 'undefined') {
	appConfig = __wxConfig;
}

$.$define('config', Object.assign(config, appConfig));
