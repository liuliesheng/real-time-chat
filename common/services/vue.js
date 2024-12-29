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

for (const k in pageMixin) {
	if (!Vue.prototype[k] && pageMixin.hasOwnProperty(k)) {
		Vue.prototype[k] = pageMixin[k];
	}
}

if (componentMixin.methods) {
	const methods = componentMixin.methods;
	for (const k in methods) {
		if (!Vue.prototype[k] && methods.hasOwnProperty(k)) {
			Vue.prototype[k] = methods[k];
		}
	}
}

// 价格过滤器
Vue.filter('price', function(price, fixed = 0) {
	if (!price || isNaN(price)) {
		return 0
	}
	return fixed > 0 ? parseFloat(price).toFixed(fixed) : +parseFloat(price).toFixed(2);
})

