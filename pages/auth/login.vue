<template>
	<div class="page">
		<XLoading />
		<Hint />

		<view class="back-btn cuIcon-close" @click="navBack"></view>

		<view class="left-bottom-sign"></view>
		<view class="right-top-sign"></view>

		<form class="form-wrapper" @submit="onSubmit">
			<view class="left-top-sign">LOGIN</view>
			<view class="welcome">
				欢迎回来！
			</view>
			<view class="form-group margin-lr">
				<view class="cu-form-group">
					<input id="mobile" v-model="form.username" placeholder="手机号" type="text" />
				</view>
				<view class="cu-form-group" style="border-bottom: 1upx solid #eee;">
					<input id="password" v-model="form.password" placeholder="密码" type="password" />
				</view>
			</view>

			<view class="block text-sm margin-lr" @tap="checkAgreement">
				<text :class="agreement?'cuIcon-roundcheckfill text-blue':'cuIcon-roundcheck'"></text>
				<text class="title">请认真阅读并同意</text>
				<text class="text-blue" @click="navToAgreementDetail('member')">《用户服务协议》</text>
				<text class="text-blue" @click="navToAgreementDetail('privacy')">《隐私权政策》</text>
			</view>

			<view class="form-btn-group">
				<button class="cu-btn block lg" form-type='submit'>登录</button>
			</view>
		</form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				agreement: false,
				form: {
					username: '',
					password: ''
				}
			};
		},
		methods: {
			// 返回上一页
			navBack() {
				uni.navigateBack();
			},
			//同意协议
			checkAgreement() {
				this.agreement = !this.agreement;
			},
			//打开协议
			navToAgreementDetail(name) {
				uni.navigateTo({
					url: '/pages/auth/agreement?name=' + name
				})
			},

			/**
			 * 登录
			 */
			onSubmit: function(e) {
				const data = e.detail.value;
				if (!this.agreement) {
					return uni.$hintError('请先确认用户服务协议与隐私权政策！');
				}

				uni.$http.post('login', this.form, {
					loading: this,
					hint: this
				}).then(function() {
					uni.$hintSuccess('登录成功！');
					uni.$delayNavigateBack(1200);
				});
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	.page {
		position: relative;
		width: 100vw;
		height: 100vh;
		max-width: 1120upx;
		overflow: hidden;
		background: #fff;
	}


	.back-btn {
		position: absolute;
		left: 20rpx;
		top: calc(var(--status-bar-height) + 20rpx);
		z-index: 90;
		padding: 20rpx;
		font-size: 48rpx;
		color: #606266;
	}

	.left-top-sign {
		font-size: 120rpx;
		color: #f8f8f8;
		position: relative;
		left: -12rpx;
	}

	.right-top-sign {
		position: absolute;
		top: 80rpx;
		right: -30rpx;
		z-index: 95;

		&:before,
		&:after {
			display: block;
			content: "";
			width: 400rpx;
			height: 80rpx;
			background: #b4f3e2;
		}

		&:before {
			transform: rotate(50deg);
			border-top-right-radius: 50px;
		}

		&:after {
			position: absolute;
			right: -198rpx;
			top: 0;
			transform: rotate(-50deg);
			border-top-left-radius: 50px;
		}
	}

	.left-bottom-sign {
		position: absolute;
		left: -270rpx;
		bottom: -320rpx;
		border: 100rpx solid #d0d1fd;
		border-radius: 50%;
		padding: 180rpx;
	}

	.form-wrapper {
		position: relative;
		z-index: 90;
		top: 15vh;
	}

	.welcome {
		position: relative;
		left: 50rpx;
		top: -90rpx;
		font-size: 46rpx;
		color: #555;
		text-shadow: 1px 0px 1px rgba(0, 0, 0, .3);
	}
</style>
