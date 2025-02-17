import Vue from 'vue';
import pageMixin from "@/common/config/page.js";
import componentMixin from "@/common/config/component.js";

// 调用生命周期钩子函数
Vue.prototype.$callHook = function(name) {
	const callbacks = this.$options[name];
	if (!callbacks) return;

	const args = Array.prototype.shift.call(arguments);
	callbacks.forEach(cb => cb.call(this, ...args))
};

// 页面属性混合
(function() {
	const methods = Object.assign({}, pageMixin, componentMixin.methods || {});
	Vue.mixin({
		methods: methods
	});
})();

// 价格过滤器
Vue.filter('price', function(price, fixed = 0) {
	if (!price || isNaN(price)) {
		return 0
	}
	return fixed > 0 ? parseFloat(price).toFixed(fixed) : +parseFloat(price).toFixed(2);
});

// 日期
Vue.filter('date', (timeStamp, isSeconds = false) => {
	if (!timeStamp) return '';
	return uni.$timeUtil.format.datetime(timeStamp, isSeconds);
})
