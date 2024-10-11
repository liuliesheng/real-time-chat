import $ from "../api";

// 对全局对象添加新属性
Object.defineProperty($, '$$define', {
	enumerable: true,
	get: function() {
		return function(obj, key, value, isEnumerable = true) {
			Object.defineProperty(obj, key, {
				enumerable: isEnumerable,
				get: function() {
					return value;
				}
			});
		};
	}
});

// 增加wx对象添加新属性
// const $uni = typeof uni !== 'undefined' ? uni : {};
$.$$define($, '$define', function(key, value, isEnumerable = true) {
	$.$$define($, '$' + key, value, isEnumerable);
	// $.$$define($uni, '$' + key, value, isEnumerable);
});
