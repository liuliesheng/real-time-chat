<template>
	<div class="login">
		<view v-show="showErrMsg" class="tips animated" :class="{slideInDown:showErrMsgCount,slideOutUp:!showErrMsgCount}">{{showErrMsg}}</view>
		<form @submit="onSubmit">
			<view class="form-group">
				<view class="form-item">
					<input id="mobile" name="mobile" placeholder="手机号" type="text"/>
				</view>
				<view class="form-item">
					<input id="password" name="password" placeholder="密码" type="password"/>
				</view>
			</view>

			<view class="form-btn-group">
				<button form-type='submit'>登录</button>
			</view>
		</form>

		<view :class="{show:isShowLoading}" class="loading">
			<image src="/static/images/loading.gif" style="width: 100%" mode="widthFix"/>
			Loading...
		</view>
	</div>
</template>

<script>
export default {
	name: "login",
	data() {
		return {
			isShowLoading: false,
			showLoadingCount: 0,

			showErrMsg:'',
			showErrMsgCount:0
		};
	},
	methods: {
		showLoading() {
			this.showLoadingCount++;
			this.isShowLoading = true;
		},

		hideLoading() {
			this.showLoadingCount--;
			if (this.showLoadingCount <= 0) {
				this.showLoadingCount = 0;
				setTimeout(()=> {
					this.isShowLoading = false;
				},500);
			}
		},

		hintError: function(msg) {
			this.showErrMsg = msg;
			this.showErrMsgCount++;
			setTimeout(() => {
				let showErrMsgCount = this.showErrMsgCount - 1;
				if (showErrMsgCount < 0) {
					showErrMsgCount = 0;
				}

				this.showErrMsgCount = showErrMsgCount;
			}, 1500);
		},

		/**
		 * 登录
		 */
		onSubmit: function(e) {
			const data = e.detail.value;
			console.log(data);

			uni.$http.post('member/login', {
				username: 'admin',
				password: '123456'
			}, {
				loading: this,
				hint:this
			}).then(function() {
				console.log(this)
			});

			// uni.showLoading();
			// setTimeout(() => {
			// 	uni.navigateBack();
			// 	uni.$showTips('登录成功！');
			// 	// uni.$delayNavigateBack(1200);
			// }, 1000);
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.login {
	}

	.tips{
		position: fixed;
		z-index: 1200;
		top: 0;
		left: 0;
		width: 100%;
		padding: 20upx;
		background-color: red;
		transition: all 0.1s;
		color: white;
	}

	.tips.bounceIn{
	}

	.loading {
		position: fixed;
		/*background-color: rgba(0, 0, 0, 0.8);*/
		background-color: #feeceb;
		box-shadow: 0 0 15px #feeceb;
		top: 15%;
		left: 50%;
		transform: translateX(-50%);
		border-radius: 10upx;
		z-index: -10;
		color: white;
		padding: 30upx;
		width: 50%;
		text-align: center;
		transition: all .5s;
		opacity: 0;
	}

	.loading.show{
		opacity: 1;
		z-index: 9999;
	}
</style>
