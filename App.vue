<script>
	import Vue from 'vue';
	export default {
		globalData: {
			userInfo: null,
		},
		onLaunch: function(options) {
			console.log('App Launch', options);

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
				}
			});

			this.initUserState();
		},
		onShow: function(options) {
			console.log('App Show', options);
		},
		onHide: function(options) {
			console.log('App Hide', options);
		},

		methods: {
			// 初始化用户状态
			initUserState() {
				// 从缓存中加载用户数据
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						this.globalData.userInfo = res.data;
					}
				});

				// 从缓存中加载SessionId
				uni.getStorage({
					key: 'session_id',
					success: (res) => {
						this.globalData.sessionId = res.data;
					}
				});
			}
		}
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
