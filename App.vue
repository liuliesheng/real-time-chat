<script>
	import Vue from 'vue';
	export default {
		globalData: {
			shareUid: 0,
			distributorIdK: 0,
		},
		onLaunch: function(options) {
			console.log('App Launch', options);
			uni.$emitter.emit('appLaunch', {
				app: this,
				options: options
			});

			Vue.prototype.MenuButtonRect = {
				width: 0,
				height: 0,
				top: 0,
				right: 0,
				left: 0,
				bottom: 0,
			};

			// #ifdef MP-WEIXIN
			Vue.prototype.MenuButtonRect = uni.getMenuButtonBoundingClientRect();
			// #endif

			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform === 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					Vue.prototype.TabBar = 0;
					// #endif

					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					Vue.prototype.TabBar = 0;
					// #endif

					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					Vue.prototype.TabBar = 0;
					// #endif

					Vue.prototype.CustomBarUnH5 = Vue.prototype.CustomBar;
					// #ifdef H5
					Vue.prototype.CustomBarUnH5 = 0;
					// #endif
				}
			});
		},
		onShow: function(options) {
			console.log('App Show', options);
			uni.$emitter.emit('appShow', {
				app: this,
				options: options
			});
		},
		onHide: function(options) {
			console.log('App Hide', options);
			uni.$emitter.emit('appHide', {
				app: this,
				options: options
			});
		},
		onPageNotFound: function(options) {
			console.log('App PageNotFound', options);
			uni.$emitter.emit('appPageNotFound', {
				app: this,
				options: options
			});
		},

		methods: {}
	};
</script>

<style>
	/*每个页面公共css */
	/* #ifndef APP-PLUS-NVUE */
	/* colorui */
	@import "common/colorui/main.css";
	@import "common/colorui/icon.css";

	/* base */
	@import 'common/styles/base.css';
	@import 'common/styles/animate.css';
	@import 'common/styles/form.css';
	@import 'common/styles/colorui.adapter.css';
	/* #endif */

	uni-app {
		max-width: 1120upx;
		margin: 0 auto;
	}

	uni-tabbar.uni-tabbar-bottom,
	uni-tabbar.uni-tabbar-bottom .uni-tabbar,
	uni-tabbar.uni-tabbar-top,
	uni-tabbar.uni-tabbar-top .uni-tabbar {
		max-width: 1120upx;
		left: auto;
		right: auto;
	}

	uni-tabbar.uni-tabbar-bottom .uni-tabbar,
	uni-tabbar.uni-tabbar-top .uni-tabbar {
		width: 100%;
	}

	.fixed,
	.foot {
		max-width: 1120upx;
	}

	.max-width {
		max-width: 1120upx;
	}

	.page {
		overflow-x: hidden;
		min-height: 100vh;
	}

	uni-toast {
		z-index: 10000;
	}

	@keyframes show {
		0% {
			transform: translateY(-50px);
		}

		60% {
			transform: translateY(40upx);
		}

		100% {
			transform: translateY(0px);
		}
	}

	@-webkit-keyframes show {
		0% {
			transform: translateY(-50px);
		}

		60% {
			transform: translateY(40upx);
		}

		100% {
			transform: translateY(0px);
		}
	}
</style>
