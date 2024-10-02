import Vue from 'vue'
import pageHead from '../components/page-head.vue'
import pageFoot from '../components/page-foot.vue'
import uLink from '@/components/uLink.vue'

// vue extend
(function() {
	Vue.component('page-head', pageHead);
	Vue.component('page-foot', pageFoot);
	Vue.component('uLink', uLink);
})();

uni.$define('parseHtmlImgs', function(nodes) {
	nodes.forEach(node => {
		if (node.name === 'img' && node.attrs && node.attrs['data-img-size-val']) {
			const sizes = node.attrs['data-img-size-val'].split(',');
			const width = uni.upx2px(720 * 0.9);
			const height = parseInt(width * (sizes[1] / sizes[0]));
			node.attrs.style = `width:${width};height:${height};`;
		}
		if (Array.isArray(node.children)) {
			parseImgs(node.children);
		}
	});
	return nodes;
});

// 监听获取用户信息事件
uni.$emitter.on('sys.getUserInfo.to', function() {
	uni.navigateTo({
		url: '/pages/user/auth/auth'
	});
});
