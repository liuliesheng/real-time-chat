import $ from "../../$";

// 系统信息
const systemInfo = $.getSystemInfoSync();

// 系统信息
$.$define('systemInfo', systemInfo);

// 是否在开发者工具
$.$define('isDev', systemInfo.platform === 'devtools');

/**
 * 授权是否被拒绝
 * @param {*} res
 * @return {boolean}
 */
$.$define('isAuthDeny', function(err) {
	if (!err || !err.errMsg) return false;
	return err.errMsg.indexOf('fail auth deny') !== -1;
});

/**
 * 当前页面是否正在显示
 * @param {*} pageObj
 * @return {boolean}
 */
$.$define('isShowPage', function(pageObj) {
	return getCurrentPages()[0].route === pageObj.route;
});

/**
 * 获取当前页面
 * @return {*}
 */
$.$define('getCurrentPage', function() {
	const pages = getCurrentPages();
	const currentPage = pages[pages.length - 1];

	return currentPage.$vm ? currentPage.$vm : currentPage;
});

/**
 * 当前页面需要显示返回首页按钮
 * @return {*}
 */
$.$define('isShowHomeButton', function() {
	const pages = getCurrentPages();
	return pages.length === 1;
});

/**
 * 返回上一页面实例
 * @param {function} [cb]
 * @return {boolean}
 */
$.$define('prePage', function(cb) {
	const pages = getCurrentPages();
	let prePage = pages[pages.length - 2];

	if (!prePage) {
		return null;
	}

	prePage = prePage.$vm ? prePage.$vm : prePage;

	if (cb) {
		cb(prePage);
	}

	return prePage;
});

// 数组转对象
$.$define('arr2obj', function(prefix, data, initIndex = 0) {
	const result = {};
	for (let i = 0; i < data.length; i++) {
		const newKey = prefix + '[' + (i + initIndex) + ']';
		result[newKey] = data[i];
	}
	return result;
});

// 增加对微信原始API支持promise
$.$define('promise', new Proxy($, {
	get: function(target, key, receiver) {
		const wxFunc = Reflect.get(target, key, receiver);
		return function(options) {
			return new Promise(function(resolve, reject) {
				wxFunc(Object.assign(options || {}, {
					success: resolve,
					fail: reject
				}));
			});
		}
	}
}));

// 延迟返回上一页
$.$define('back', function(delay = 1500, options = {}) {
	setTimeout(function() {
		$.navigateBack(options);
	}, delay);
});

// 错误提示
$.$define('hintError', function(msg) {
	$.showToast({
		title: msg,
		icon: 'none',
		// duration: 1500000
	});
});

// 成功提示
$.$define('hintSuccess', function(msg) {
	$.showToast({
		title: msg,
		icon: 'success',
	});
});


// 重写停止下拉刷新方法
(function() {
	const stopPullDownRefresh = $.stopPullDownRefresh;
	$.$$define($, 'stopPullDownRefresh', function handle(options = {}) {
		if (options.sound) {
			playAudio(handle);
		}

		stopPullDownRefresh.call(this);
	});

	// 播放提示音
	function playAudio(stopPullDownRefresh) {
		if (!stopPullDownRefresh.audioContext) {
			const audioContext = $.$config.stopPullDownRefreshAudio;
			if (typeof audioContext !== 'object') {
				stopPullDownRefresh.audioContext = $.createInnerAudioContext();
				stopPullDownRefresh.audioContext.src = $.$config.stopPullDownRefreshAudio;
			} else {
				stopPullDownRefresh.audioContext = audioContext;
			}
		}

		stopPullDownRefresh.audioContext.play();
	}
})();
