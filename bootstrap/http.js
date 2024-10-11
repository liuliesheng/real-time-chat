import $ from './native';
/**
 * 防重复请求
 * @type {*}
 * @private
 */
const UNIQUE_REQUEST_LIST = {};

/**
 * 处理请求
 * @param {*} options
 * @return {Promise}
 */
function requestAdapter(options) {
	return new Promise((resolve, reject) => {
		// 请求前的数据转换
		if (options.transformRequest) {
			try {
				options.data = options.transformRequest.call(options.thisArg, options.data, options);
			} catch (e) {
				reject({
					errMsg: e.message,
					error: e,
					config: options
				});
			}
		}

		// 请求成功之后的处理
		options.success = (res) => {
			try {
				res.config = options;
				if (options.transformResponse) {
					res.data = options.transformResponse.call(options.thisArg, res.data);
				}
				resolve(res);
			} catch (e) {
				reject({
					errMsg: e.message,
					error: e,
					options: options,
					response: res
				});
			}
		};

		// 请求失败之后的处理
		options.fail = (err) => {
			err.config = options;
			reject(err);
		};

		// 请求完成之后的处理
		options.complete = () => {
			//删除唯一请求标识
			if (options.name) delete UNIQUE_REQUEST_LIST[options.name];
		};

		$.request(options);
	});
}

/**
 * 文件上传请求适配器
 * @param {*} options
 * @return {Promise}
 */
function uploadAdapter(options) {
	if (options.data) {
		options.formData = options.data;
	}
	return new Promise((resolve, reject) => {
		const uploadTask = $.uploadFile(Object.assign({}, options, {
			success: (res) => {
				res.config = options;
				if (!options.dataType || options.dataType === 'json') {
					try {
						res.data = JSON.parse(res.data);
						resolve(res);
					} catch (e) {
						e.config = options;
						reject(e);
					}
				}
			},
			fail: (err) => {
				err.config = options;
				reject(err);
			},
			complete: undefined
		}));
		uploadTask.onProgressUpdate(options.onProgressUpdate);
	});
}

/**
 * 请求类
 */
export class Http {

	/**
	 * 默认构造器
	 * @param {*} options
	 */
	constructor(options = {}) {
		/**
		 * 默认配置
		 * @type {*}
		 */
		this.defaults = Object.assign({}, options || {});

		/**
		 * 拦截器
		 * @type {{request: Array, response: Array}}
		 */
		this.interceptors = {
			request: [],
			response: [],
			catchs: null
		};
	}

	/**
	 * 请求
	 * @param {*} options
	 * @returns {Promise}
	 */
	request(options) {
		//合并默认配置
		options = Object.assign({}, this.defaults, options);

		// Support baseURL config
		if (options.baseURL && !isAbsoluteURL(options.url)) {
			options.url = combineURL(options.baseURL, options.url);
		}

		//获取适配器
		let adapter = null;
		if (options.filePath || options.isUpload) {
			adapter = uploadAdapter;
		} else {
			if (options.name) {
				if (UNIQUE_REQUEST_LIST[options.name]) {
					return Promise.reject({
						errMsg: '请求被拒绝',
						options: options,
						isCancel: true,
						isRepeat: true
					});
				}
				UNIQUE_REQUEST_LIST[options.name] = true;
			}

			adapter = requestAdapter;
		}

		//拼接拦截器
		const chain = [].concat(this.interceptors.request, [{
			fulfilled: adapter,
			rejected: null
		}], this.interceptors.response);

		let promise = Promise.resolve(options);
		chain.forEach(interceptor => promise = promise.then(interceptor.fulfilled, interceptor.rejected));
		if (this.interceptors.catchs) {
			promise.catch(this.interceptors.catchs);
		}

		return promise;
	}

	/**
	 * 添加请求拦截器
	 * @param {function} [fulfilled]
	 * @param {function} [rejected]
	 * @return {number}
	 */
	addRequestInterceptor(fulfilled, rejected) {
		return this.interceptors.request.push({
			fulfilled: fulfilled,
			rejected: rejected
		}) - 1;
	}

	/**
	 * 移除拦截器
	 * @param {number} number
	 */
	removeRequestInterceptor(number) {
		this.interceptors.request.splice(number, 0);
	};

	/**
	 * 添加服务器结果拦截器
	 * @param {function} [fulfilled]
	 * @param {function} [rejected]
	 * @return {number}
	 */
	addResponseInterceptor(fulfilled, rejected) {
		return this.interceptors.response.push({
			fulfilled: fulfilled,
			rejected: rejected
		}) - 1;
	};

	/**
	 * 移除拦截器
	 * @param {number} number
	 */
	removeResponseInterceptor(number) {
		this.interceptors.response.splice(number, 0);
	};

}

/**
 * 快捷请求
 * @param {string} url
 * @param {string|*} [data]
 * @param {*} [options]
 * @returns {Promise}
 */
['get', 'post', 'put', 'delete'].forEach(method => {
	Http.prototype[method] = function(url, data, options) {
		return this.request(Object.assign({}, this.defaults, options || {}, {
			url: url,
			data: data,
			method: method,
		}));
	};
});


/**
 * 默认http请求
 * @type {Http}
 */
export const http = new Http();

/**
 * 是否是绝对url
 * @param {string} url
 * @returns {boolean}
 */
export const isAbsoluteURL = (url) => {
	// A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
	// RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
	// by any combination of letters, digits, plus, period, or hyphen.
	return /^([a-z][a-z\d+-.]*:)?\/\//i.test(url);
};

/**
 * 组合url
 * @param {string} baseURL
 * @param {string} relativeURL
 * @returns {string}
 */
export const combineURL = (baseURL, relativeURL) => {
	return relativeURL
		? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
		: baseURL;
};
