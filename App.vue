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
</style>
