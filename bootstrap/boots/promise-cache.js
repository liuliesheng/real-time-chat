import $ from "../$";

function factory(promiseFactory, options = {}) {
	let promise = null;

	return function(refresh = false) {
		if (!refresh) {
			if (options.refresh) {
				refresh = options.refresh && options.refresh();
			} else {
				refresh = refresh();
			}
		}

		if (!promise || refresh) {
			const args = Array.from(arguments);
			args.shift();
			promise = promiseFactory(...args).then(function(result) {
				return result;
			}, function(err) {
				promise = null;
				return Promise.reject(err);
			});
		}

		return promise;
	}
}

function refresh() {
	return Math.floor(Math.random() * 3) === 1;
}

$.$define('promiseCache', factory);
