import $ from "../$";
import { collectionUtil, random } from "../util/index";
import md5 from '../libs/md5';

/**
 * 获取腾讯地图实例
 * @return {QQMapWX}
 */
$.$define('getQQMap', function() {
	if (random(1, 3) === 2) {
		$.$config.QQMapKeys = collectionUtil.shuffle($.$config.QQMapKeys); //打乱数组
	}

	const QQMapKeys = $.$config.QQMapKeys;
	const index = random(0, QQMapKeys.length - 1);

	const QQMapWX = require('../libs/qqmap-wx-jssdk.min.js');
	// 实例化API核心类
	return new QQMapWX({
		key: QQMapKeys[index]
	});
});

// 双精度小数点库
$.$defineOfFunc('BigNumber', function() {
	return require('../libs/bignumber');
});

// MD5
$.$define('md5', md5.hexMD5);

/**
 * 获取二维码实例
 * @return {QRCode}
 */
$.$defineOfFunc('QRCode', function() {
	return require('../libs/qrcode');
});
