import Vue from 'vue';
import loading from '@/components/loading';
import hint from '@/components/hint';

Vue.component('hint', hint);
Vue.component('loading', loading);

Vue.prototype.$callHook = function(name) {
	const callbacks = this.$options[name];
	if (!callbacks) return;

	const args = Array.prototype.shift.call(arguments);
	callbacks.forEach(cb => cb.call(this, ...args))
};

Vue.prototype.$backgroundAudioData = {
	playing: false,
	playTime: 0,
	formatedPlayTime: '00:00:00'
};

// 页面跳转
Vue.prototype.__linkTo__ = function(e) {
	const target = e.detail.target || e.currentTarget || e.target;
	const url = target.dataset.url;
	uni.navigateTo({
		url
	});
};
