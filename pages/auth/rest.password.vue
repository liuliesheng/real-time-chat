<template>
	<custom-page class="page" :loaded="true">
		<form @submit="onSubmit">
			<view class="cu-form-group margin-top">
				<view class="title required">原密码</view>
				<input id="oldpassword" name="oldpassword" placeholder="原密码" type="password" />
			</view>
			<view class="cu-form-group">
				<view class="title required">新密码</view>
				<input id="password" name="password" placeholder="新密码" type="password" />
			</view>
			<view class="cu-form-group">
				<view class="title required">确认密码</view>
				<input id="repassword" name="repassword" placeholder="确认密码" type="password" />
			</view>

			<view class="padding">
				<button class="cu-btn block bg-gradual-red lg" form-type='submit'>确认</button>
			</view>
		</form>
	</custom-page>
</template>

<script>
	export default {
		name: "repassword",
		data() {
			return {};
		},
		methods: {
			onSubmit: function(e) {
				const data = e.detail.value;
				uni.$models.user.restPassword(data, {
					hint: this,
					loading: this
				}).then(() => {
					this.hintSuccess('已修改！');
					uni.$logout();
					uni.$back();
				});
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
