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
	/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
	/* colorui */
	@import "styles/colorui/main.css";
	@import "styles/colorui/icon.css";

	@import './styles/base.css';
	@import './styles/animate.css';
	@import './styles/form.css';
	@import './styles/colorui.adapter.css';
	/* #endif */

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
