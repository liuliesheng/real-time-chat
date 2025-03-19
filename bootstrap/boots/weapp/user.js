import $ from "../../$";
import { emitter } from "../../events";

// 缓存数据KEY
const CACHE_KEY = '__SYS_USER_PROFILE__';

// 缓存用户信息
let currentUserProfile = null;

/**
 * 获取用户信息
 * @param {*} options
 */
$.$define('getUserInfo', function(options = {}) {
	if ($.$platform.isWeapp) {
		if (!currentUserProfile) {
			currentUserProfile = $.getStorageSync(CACHE_KEY);
		}

		if (currentUserProfile && !options.force) {
			return Promise.resolve(currentUserProfile);
		}

		return $.$promise.getUserProfile(Object.assign({
			lang: 'zh_CN',
			desc: '此操作需要您授权基本信息',
		}, options)).then(function(res) {
			currentUserProfile = res.userInfo;

			$.setStorageSync(CACHE_KEY, currentUserProfile);

			return res.userInfo;
		}, function(err) {
			console.error('getUserInfo:', err);
			return customGetUserInfo(options);
		});
	} else {
		return $.$promise.getUserInfo(Object.assign({
			lang: 'zh_CN'
		})).then(function(res) {
			return res.userInfo;
		}, function(err) {
			console.error('getUserInfo:', err);
			return customGetUserInfo(options);
		});
	}
});

/**
 * 自定义获取用户信息
 * @return {Promise<{*}>}
 */
function customGetUserInfo(options) {
	return new Promise(function(resolve, reject) {
		emitter.once('sys.getUserInfo.result', (res) => {
			if (res && res.userInfo) {
				resolve(res.userInfo);
			} else {
				reject({
					errMsg: '授权失败!',
					isAuthDeny: true
				});
			}
		});
		emitter.emit('sys.getUserInfo.to', options);
	});
}
