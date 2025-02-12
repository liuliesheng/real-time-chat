import $ from "../$";
import {collectionUtil, random} from "../util/index";

const QQMapWX = require('../libs/qqmap-wx-jssdk.min.js');

/**
 * QQ地图key列表
 * @type {string[]}
 */
let qqMapKeys = [];

// QQ地图
$.$define('setQQMapKeys', function(keys) {
	qqMapKeys = keys;
});

/**
 * 获取腾讯地图实例
 * @return {QQMapWX}
 */
$.$define('getQQMap', function() {
	if (random(1, 3) === 2) {
		qqMapKeys = collectionUtil.shuffle(qqMapKeys); //打乱数组
	}

	const index = random(0, qqMapKeys.length - 1);

	// 实例化API核心类
	return new QQMapWX({
		key: qqMapKeys[index]
	});
});
