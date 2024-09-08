<template>
	<div class="register">
		<form @submit="onSubmit">
			<view class="form-group">
				<view class="form-item">
					<input id="mobile" name="mobile" placeholder="手机号" type="text"/>
				</view>
				<view class="form-item">
					<input id="password" name="password" placeholder="密码" type="password"/>
				</view>
				<view class="form-item">
					<input id="repassword" name="repassword" placeholder="确认密码" type="password"/>
				</view>
				<view class="form-item">
					<input id="verify" name="verify" placeholder="验证码" type="text"/>
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
	methods: {
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
</style>
