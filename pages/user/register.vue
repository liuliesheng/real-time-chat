<template>
	<div class="register">
		<view class="title">注册</view>
		<form bindsubmit="onSubmit">
			<view class="form-group">
				<view class="form-item">
					<input id="mobile" name="mobile" type="text" placeholder="手机号"/>
				</view>
				<view class="form-item">
					<input id="password" name="password" type="password" placeholder="密码"/>
				</view>
				<view class="form-item">
					<input id="repassword" name="repassword" type="password" placeholder="确认密码"/>
				</view>
				<view class="form-item">
					<input id="verify" name="verify" type="text" placeholder="验证码"/>
				</view>
			</view>

			<view class="form-btn-group">
				<button form-type='submit'>注册</button>
			</view>
		</form>
	</div>
</template>

<script>
export default {
	name: "register",
	data() {
		return {};
	},
	methods:{
		/**
		 * 注册
		 */
		onSubmit: function(e) {
			const data = e.detail.value;
			console.log(data);

			uni.$.showLoading();
			setTimeout(() => {
				uni.$.showTips('注册成功！');
				uni.$.delayNavigateBack(1200);
			});
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.register {
	}
	page{
		padding: 30upx;
	}

	.title{
		margin: 50upx auto;
		text-align: center;
		font-weight: bold;
	}

</style>
