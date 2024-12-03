/** @var {*} $ */
import $ from "../../../$";
import {emitter} from "../../../events";

/**
 * 调用并授权地理位置权限
 * @param {string} invokeFunc
 * @param {*} options
 */
function invokeLocationAndAuth(invokeFunc, options) {
	return $.$promise[invokeFunc](options).catch(function(err) {
		err.isAuthDeny = $.$isAuthDeny(err);
		if (err.isAuthDeny) {
			$.$promise.showModal({
				title: '温馨提示',
				content: '此操作需要你的授权，我们不会泄露你的隐私，操作方法：【右上角···->设置->允许位置信息】',
				showCancel: false,
			});
			return Promise.reject(err);
		}

		if (err.errMsg.indexOf("require permission") !== -1) {
			$.$promise.showModal({
				title: '温馨提示',
				content: '此操作需要你的开启手机定位，我们不会泄露你的隐私',
				showCancel: false,
			});
			return;
		}

		$.$promise.showModal({
			title: '温馨提示',
			content: '授权地理位置失败：' + JSON.stringify(err),
			showCancel: false,
		});

		return Promise.reject(err);
	});
}

/**
 * 获取当前位置信息
 * @param {*} options
 * @return Promise<*>
 */
$.$define('getLocation', function(options) {
	return invokeLocationAndAuth('getLocation', options);
});

/**
 * 打开地图
 * @param {*} options
 * @return Promise<*>
 */
$.$define('openLocation', function(options) {
	return invokeLocationAndAuth('openLocation', options);
});

/**
 * 获取当前位置信息
 * @param {*} options
 * @return Promise<*>
 */
$.$define('chooseLocation', function(options) {
	return invokeLocationAndAuth('chooseLocation', options);
});


