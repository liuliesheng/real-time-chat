<script>
	export default {
		globalData: {
			userInfo: null
		},
		onLaunch: function() {
			console.log('App Launch');
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		}
	};
</script>

<style>
	/*每个页面公共css */
	/* #ifndef APP-PLUS-NVUE */
	/* colorui */
	@import "common/styles/colorui/main.css";
	@import "common/styles/colorui/icon.css";

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
