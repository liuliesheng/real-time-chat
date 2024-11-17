import $ from "../$";

function factory(promiseFactory, options = {}) {
	return function make(refresh = false) {
		if (!refresh) {
			if (options.refresh) {
				refresh = options.refresh && options.refresh();
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

function isRefresh() {
	return Math.floor(Math.random() * 3) === 1;
}

$.$define('promiseCache', factory);
