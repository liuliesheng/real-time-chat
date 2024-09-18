import Vue from 'vue'
import pageHead from '../components/page-head.vue'
import pageFoot from '../components/page-foot.vue'
import uLink from '@/components/uLink.vue'

const $ = uni.$;

// vue extend
(function() {
	Vue.prototype.$backgroundAudioData = {
		playing: false,
		playTime: 0,
		formatedPlayTime: '00:00:00'
	};
	Vue.prototype.$callHook = function(name) {
		const callbacks = this.$options[name];
		if (!callbacks) return;

		const args = Array.prototype.shift.call(arguments);
		callbacks.forEach(cb => cb.call(this, ...arguments))
	};
	Vue.component('page-head', pageHead);
	Vue.component('page-foot', pageFoot);
	Vue.component('uLink', uLink);
})();

// formid
(function() {
	// 收集formid
	const FORMID_LIST = [];
	$.define('pushFormid', function(formid) {
		// if (wx.isDev) return;
		if (FORMID_LIST.length > 100) {
			FORMID_LIST.shift();
		}
		FORMID_LIST.push(formid);
	});

	// 拉取formid
	$.define('pullFormid', function(num = 1) {
		return FORMID_LIST.splice(0, num);
	});

	// 推送formid
	Vue.prototype.__pushFormid__ = function(e) {
		if (!e.detail.formId) return;
		$.pushFormid(e.detail.formId);

		this.__linkTo__(e);
	};

	// 页面跳转
	Vue.prototype.__linkTo__ = function(e) {
		const target = e.detail.target || e.currentTarget || e.target;
		const url = target.dataset.url;
		uni.navigateTo({
			url
		});
	};

	// 设置data值
	Vue.prototype.setValue = function(e) {
		if (e.detail && e.detail.formId) {
			$.pushFormid(e.detail.formId);
		}
		this.setData(e.target.dataset);
	};
})();

// 监听获取用户信息事件
uni.$.emitter.on('sys.getUserInfo.to', function() {
	uni.$.navigateTo({
		url: '/pages/user/auth/auth'
	});
});
