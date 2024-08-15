<script>
export default {
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
@import './styles/uni.css';
@import './styles/base.css';
@import './styles/animate.css';
@import './styles/iconfont.css';
@import './styles/list.css';

/* 以下样式用于 hello uni-app 演示所需 */
page {
	background-color: #f4f5f6;
	height: 100%;
	font-size: 28upx;
	line-height: 1.8;
}

.uni-header-logo {
	padding: 30upx;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 10upx;
}

.uni-header-image {
	width: 100px;
	height: 100px;
}

.uni-hello-text {
	color: #7a7e83;
}

.uni-hello-addfile {
	text-align: center;
	line-height: 300upx;
	background: #fff;
	padding: 50upx;
	margin-top: 10px;
	font-size: 38upx;
	color: #808080;
}


/* #endif */
</style>
