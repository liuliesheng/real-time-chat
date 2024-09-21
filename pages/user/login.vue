<template>
	<div class="login">
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
	</div>
</template>

<script>
export default {
	name: "login",
	data() {
		return {};
	},
	methods: {
		/**
		 * 登录
		 */
		onSubmit: function(e) {
			const data = e.detail.value;
			console.log(data);

			uni.$.showLoading();
			setTimeout(() => {
				uni.$.showTips('登录成功！');
				uni.$.delayNavigateBack(1200);
			}, 1000);
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.login {
	}
</style>
