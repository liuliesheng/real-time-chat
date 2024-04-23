/**
 * 函数工具类
 */
const _ = {};
export default _;

/**
 * 尝试执行方法
 * @param {function} func
 * @param {*} [param]
 * @param {*} [thisArg]
 */
_.safeCallback = function(func, param, thisArg) {
	try {
		func && func.call(thisArg, param);
	} catch (e) {
		console.error(e);
	}
};

/**
 * callbacksTransformPromise
 * @param {function} func
 * @param {*} [options]
 * @return {Promise}
 */
_.callbacksTransformPromise = function(func, options) {
	return new Promise((resolve, reject) => {
		func(Object.assign(options || {}, {
			success: resolve,
			fail: reject,
			complete: undefined
		}));
	});
};

/**
 * 在原有的回调函数贴上新的回调函数
 * @param {*} obj
 * @param {string} name
 * @param {function} callback
 */
_.attachCallback = function(obj, name, callback) {
	if (obj[name]) {
		const func = obj[name];
		obj[name] = function(options) {
			callback.call(this, options);
			func.call(this, options);
		};
	} else {
		obj[name] = function(options) {
			callback.call(this, options);
		};
	}
	return obj;
};
/**
 * 创建并返回一个像节流阀一样的函数，当重复调用函数的时候，至少每隔 wait毫秒调用一次该函数。对于想控制一些触发频率较高的事件有帮助。
 * 默认情况下，throttle将在你调用的第一时间尽快执行这个function，并且，如果你在wait周期内调用任意次数的函数，都将尽快的被覆盖。
 * 如果你想禁用第一次首先执行的话，传递{leading: false}，还有如果你想禁用最后一次执行的话，传递{trailing: false}。
 * @param {function} func
 * @param {number} wait
 * @param {*} [options]
 * @return {function(): *}
 */
_.throttle = function(func, wait, options) {
	let context, args, result;
	let timeout = null;
	let previous = 0;
	if (!options) options = {};
	const later = function() {
		previous = options.leading === false ? 0 : _.now();
		timeout = null;
		result = func.apply(context, args);
		if (!timeout) context = args = null;
	};
	return function() {
		const now = _.now();
		if (!previous && options.leading === false) previous = now;
		const remaining = wait - (now - previous);
		context = this;
		args = arguments;
		if (remaining <= 0 || remaining > wait) {
			if (timeout) {
				clearTimeout(timeout);
				timeout = null;
			}
			previous = now;
			result = func.apply(context, args);
			if (!timeout) context = args = null;
		} else if (!timeout && options.trailing !== false) {
			timeout = setTimeout(later, remaining);
		}
		return result;
	};
};

/**
 * 返回 function 函数的防反跳版本, 将延迟函数的执行(真正的执行)在函数最后一次调用时刻的 wait 毫秒之后.
 * 对于必须在一些输入（多是一些用户操作）停止到达之后执行的行为有帮助。
 * 例如: 渲染一个Markdown格式的评论预览, 当窗口停止改变大小之后重新计算布局, 等等.
 * 传参 immediate 为 true， debounce会在 wait 时间间隔的开始调用这个函数 。
 * (并且在 waite 的时间之内，不会再次调用）在类似不小心点了提交按钮两下而提交了两次的情况下很有用。
 * @param {function} func
 * @param {number} wait
 * @param {boolean} [immediate]
 * @return {function(): *}
 */
_.debounce = function(func, wait, immediate) {
	let timeout, args, context, timestamp, result;

	const later = function() {
		const last = _.now() - timestamp;

		if (last < wait && last >= 0) {
			timeout = setTimeout(later, wait - last);
		} else {
			timeout = null;
			if (!immediate) {
				result = func.apply(context, args);
				if (!timeout) context = args = null;
			}
		}
	};

	return function() {
		context = this;
		args = arguments;
		timestamp = _.now();
		const callNow = immediate && !timeout;
		if (!timeout) timeout = setTimeout(later, wait);
		if (callNow) {
			result = func.apply(context, args);
			context = args = null;
		}

		return result;
	};
};

/**
 * 创建一个函数,调用不超过count 次。 当count已经达到时，最后一个函数调用的结果将被记住并返回。
 * @param {function} func
 * @param {number} count
 * @return {function(): *}
 */
_.before = function(func, count) {
	let memo;
	return function() {
		if (--count > 0) {
			memo = func.apply(this, arguments);
		}
		if (count <= 1) func = null;
		return memo;
	};
};

/**
 * 创建一个只能调用一次的函数。重复调用改进的方法也没有效果，只会返回第一次执行时的结果。
 * 作为初始化函数使用时非常有用, 不用再设一个boolean值来检查是否已经初始化完成.
 * @param {function} func
 * @return {function(): *}
 */
_.once = function(func) {
	return _.before(func, 2);
};

/**
 * 创建一个函数, 只有在运行了 count 次之后才有效果. 在处理同组异步请求返回结果时,
 * 如果你要确保同组里所有异步请求完成之后才 执行这个函数, 这将非常有用。
 * @param {function} func
 * @param {number} count
 * @return {Function}
 */
_.after = function(func, count) {
	return function() {
		if (--count < 1) {
			return func.apply(this, arguments);
		}
	};
};

/**
 * 获取当前时间戳
 * @type {function()}
 */
_.now = Date.now || function() {
	return new Date().getTime();
};

/**
 * 生成一个中间件函数
 * @param {function,string} bindFunc
 * @param {*} [context]
 * @param bindFunc
 * @param context
 * @return {function(): *}
 */
_.middleware = function(bindFunc, context) {
	// 中间件函数
	const queue = [];

	// 执行中间件
	const middleware = function() {
		let index = 0;
		const next = function() {
			const func = queue[index++];
			if (func) {
				return func.call(context, next, ...arguments);
			} else {
				return bindFunc.apply(context, arguments);
			}
		};
		return next.apply(context, arguments);
	};

	if (typeof bindFunc !== "function") {
		if (context) {
			const name = bindFunc;
			bindFunc = context[bindFunc];
			if (typeof bindFunc !== "function")
				throw new TypeError(`context key ${name} must is function`);

			//替换原函数
			context[name] = middleware;
		} else {
			throw new TypeError("parameter 1 must is function");
		}
	}

	/**
	 * 添加中间件
	 * @param {function} func
	 */
	middleware.add = (...func) => {
		func.forEach(cb => {
			if (typeof cb === 'function') {
				queue.push(cb);
			}
		});
	};

	/**
	 * 移除中间件
	 * @param index
	 * @return {*[]}
	 */
	middleware.remove = (index) => {
		if (isNaN(index)) index = queue.indexOf(index);
		if (index < 0) return undefined;
		return queue.splice(index, 1);
	};

	/**
	 * 获取长度
	 * @return {number}
	 */
	middleware.getLength = () => queue.length;

	return middleware;
};

/**
 * 回调器
 * @return {Array}
 */
_.callbacks = function() {
	const callbacks = [];
	callbacks.exec = (options) => {
		callbacks.forEach((item) => {
			let func = options.name ? item[options.name] : item;
			if (func) func.apply(options.thisArg, options.params);
		});
		if (options.clear) callbacks.splice(0, callbacks.length);
	};
	return callbacks;
};

/**
 * 大于未来某个时刻可是执行
 * @param {Function} func
 * @param {number} wait
 * @param {*} context
 * @return {Function}
 */
_.gtFuture = function(func, wait, context) {
	let prevTime = 0;
	return function() {
		const currentTime = new Date().getTime();

		if (!prevTime) prevTime = currentTime;

		const diffTime = currentTime - prevTime;
		if (diffTime < wait) return;

		prevTime = currentTime;
		func.call(context, diffTime, ...arguments);
	}
};

_.ltFuture = function(func, wait, context) {
	let prevTime = new Date().getTime();
	return function() {
		const currentTime = new Date().getTime();

		const diffTime = currentTime - prevTime;
		if (diffTime > wait) return;

		prevTime = currentTime;
		func.call(context, diffTime, ...arguments);
	}
};
