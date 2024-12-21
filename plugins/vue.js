import Vue from 'vue';
import Loading from '@/components/loading';
import Hint from '@/components/hint';
import Empty from '@/components/empty.vue';
import LoadMore from '@/components/load-more.vue';
// #ifdef H5
import pageMixin from "@/config/page.js";
import componentMixin from "@/config/component.js";
// #endif

Vue.component('Hint', Hint);
Vue.component('Loading', Loading);
Vue.component('Empty', Empty);
Vue.component('LoadMore', LoadMore);

// 调用生命周期钩子函数
Vue.prototype.$callHook = function(name) {
	const callbacks = this.$options[name];
	if (!callbacks) return;

	const args = Array.prototype.shift.call(arguments);
	callbacks.forEach(cb => cb.call(this, ...args))
};

// #ifdef H5
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
// #endif

