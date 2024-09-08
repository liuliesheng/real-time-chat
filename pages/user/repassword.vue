<template>
	<div class="repassword">

		<form @submit="onSubmit">
			<view class="form-group form-simple">
				<view class="form-item">
					<input id="oldpassword" name="oldpassword" placeholder="旧密码" type="password"/>
				</view>
				<view class="form-item">
					<input id="password" name="password" placeholder="新密码" type="password"/>
				</view>
				<view class="form-item">
					<input id="repassword" name="repassword" placeholder="确认密码" type="password"/>
				</view>
			</view>

			<view class="form-btn-group">
				<button form-type='submit'>确认</button>
			</view>
		</form>

	</div>
</template>

<script>
export default {
	name: "repassword",
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
				uni.$.showTips('更新成功！');
				uni.$.delayNavigateBack(1200);
			});
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.repassword {
	}
</style>
