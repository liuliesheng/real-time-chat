/**
 * 格式化日期
 * @param {Date} date
 * @return {string}
 */
function formatTime(date) {
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const hour = date.getHours();
	const minute = date.getMinutes();
	const second = date.getSeconds();
	return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':');
}

/**
 * 格式化数字
 * @param {*} n
 * @return {string}
 */
function formatNumber(n) {
	n = n.toString();
	return n[1] ? n : '0' + n
}

/**
 * 字符串转日期对象
 * @param {string} str
 * @return {Date}
 */
function stringToDate(str) {
	return new Date(Date.parse(str.replace(/-/g, '/')));
}

/**
 * 字符串转时间戳
 * @param {string} str
 * @return {Number}
 */
function stringToTime(str) {
	return Math.floor(stringToDate(str).getTime() / 1000);
}

/**
 * 执行回调函数
 * @param {function} func
 * @param {*} param
 * @param {*} thisArg
 */
function safeCallback(func, param, thisArg) {
	try {
		func && func.call(thisArg, param);
	} catch (e) {
		console.error(e);
	}
}


/**
 * callbacksTransformPromise
 * @param {function} func
 * @param {*} options
 * @return {Promise}
 */
function callbacksTransformPromise(func, options) {
	return new Promise((resolve, reject) => {
		func(Object.assign(options, {
			success: resolve,
			fail: reject,
			complete: undefined
		}));
	});
}

//随机打乱数组
function shuffle(arr) {
	return arr.slice().sort(function() {
		return 0.5 - Math.random();
	});
}

export default {
	formatTime,
	stringToDate,
	stringToTime,
	safeCallback,
	callbacksTransformPromise,
	shuffle,
};
