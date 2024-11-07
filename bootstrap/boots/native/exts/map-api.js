import $ from "../../../$";
import {collectionUtil, random} from "../../../util/index";

const QQMapWX = require('../../../libs/qqmap-wx-jssdk.min.js');

// QQ地图
$.$define('getQQMap', (function() {
	/**
	 * QQ地图key列表
	 * @type {string[]}
	 */
	let qqMapKeys = [
		'XUKBZ-6V23F-4A3JU-NBO5F-E7FQ7-5CFR7',
		'PO6BZ-MXAKD-EM74T-HC5OK-E5KV6-A6FKG',
		'5AMBZ-H6BR3-IC53J-3532N-7LDEQ-OBBIT',
	];

	/**
	 * 获取腾讯地图实例
	 * @return {QQMapWX}
	 */
	return function() {
		if (random(1, 3) === 2) {
			qqMapKeys = collectionUtil.shuffle(qqMapKeys); //打乱数组
		}
		const index = random(0, qqMapKeys.length - 1);

		// 实例化API核心类
		return new QQMapWX({
			key: qqMapKeys[index]
		});
	};
})());
