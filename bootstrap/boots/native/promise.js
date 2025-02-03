import $ from "../../$";

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
