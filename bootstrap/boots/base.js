import $ from "../$";
import cache from "../cache";
import Validate from "../validate";
import {emitter, EventEmitter} from "../events";
import {default as observer, Observer} from "../observer";
import middleware from "../middleware";
import {logins, Request, upload} from "../http";
import * as util from "../util";

// 初始化基础配置
(function() {
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
})();

// 常用方法
$.$define('random', util.random);
$.$define('isEmpty', util.isEmpty);
$.$define('isArray', util.isArray);
$.$define('isObject', util.isObject);
$.$define('toObject', util.toObject);
$.$define('assign', util.assign);

$.$define('collectionUtil', util.collectionUtil);
$.$define('stringUtil', util.stringUtil);
$.$define('numberUtil', util.numberUtil);
$.$define('timeUtil', util.timeUtil);
$.$define('functionUtil', util.functionUtil);

// 事件类
$.$define('emitter', new EventEmitter());
$.$define('EventEmitter', EventEmitter);

// 观察者
$.$define('observer', observer);
$.$define('Observer', Observer);

// 中间件
$.$define('middleware', middleware);

// 请求类
$.$define('http', new Request());
$.$define('Http', Request);
$.$define('upload', upload);
$.$define('logins', logins);

// 初始化缓存
$.$define('cache', cache);

// 初始化验证器
$.$define('Validate', Validate);
