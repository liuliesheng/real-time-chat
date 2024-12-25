// 获取全局对象
const $ = (() => {
	if (typeof my !== 'undefined') {
		return my;
	} else if (typeof swan !== 'undefined') {
		return swan;
	} else if (typeof tt !== 'undefined') {
		return tt;
	} else if (typeof wx !== 'undefined') {
		return wx;
	}
	throw new Error('未适配的客户端，请手动在此处理');
})();

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
$.$$define($, '$define', function(key, value, isEnumerable = true) {
	$.$$define($, '$' + key, value, isEnumerable);
});

export default $;
