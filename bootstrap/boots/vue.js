import Vue from 'vue';
import defaultMixins from './default.mixins';
import pageMixin from "../../common/mixins/page";
import componentMixin from "../../common/mixins/component";

// 调用生命周期钩子函数
Vue.prototype.$callHook = function(name) {
	const callbacks = this.$options[name];
	if (!callbacks) {
		return;
	}

	const args = Array.prototype.shift.call(arguments);
	callbacks.forEach(cb => {
		cb.call(this, ...args)
	});
};

// 页面属性混合
(function() {
	const methods = Object.assign({}, defaultMixins, pageMixin, componentMixin.methods || {});
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
	if (!timeStamp) {
		return '';
	}
	return uni.$timeUtil.format.datetime(timeStamp, isSeconds);
});

// 友好的日期
Vue.filter('firendlyDate', (timeStamp) => {
	return uni.$timeUtil.fromNow(timeStamp);
});
