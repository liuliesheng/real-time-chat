import $ from "../../$";

// 增加Promise最终方法
if (!Promise.prototype.finally) {
	Promise.prototype.finally = function(callback) {
		let P = this.constructor;
		return this.then(
			value => P.resolve(callback(value)).then(() => value),
			reason => P.resolve(callback(reason)).then(() => {
				throw reason
			})
		);
	};
}

// 增加Promise的强制转化成resolved状态
if (!Promise.prototype.resolved) {
	Promise.prototype.resolved = function(defaultValue = undefined) {
		return this.then(
			value => value,
			reason => defaultValue
		);
	}
}

function factory(promiseFactory, options = {}) {
	return function make(refresh = false) {
		if (!refresh) {
			if (options.refresh) {
				refresh = typeof options.refresh === 'function' ?
					options.refresh() : isRefresh(options.refresh);
			} else {
				refresh = isRefresh();
			}
		}

		if (!make.promise || refresh) {
			const args = Array.from(arguments);
			args.shift();

			make.promise = promiseFactory(...args).then(function(result) {
				return result;
			}, function(err) {
				make.promise = null;
				return Promise.reject(err);
			});
		}

		return make.promise;
	}
}

function isRefresh(max = 3) {
	if (!max) {
		max = 3;
	}

	return Math.floor(Math.random() * max) === 1;
}

$.$define('promiseCache', factory);
