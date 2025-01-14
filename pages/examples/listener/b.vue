<template>
	<div class="b">
		<form @submit="onSubmit">
			<view class="form-group">
				<view class="form-item">
					<label for="wechat">你的名字</label>
					<input id="wechat" name="name" placeholder="你的名字" type="text"/>
				</view>

				<view class="form-item">
					<label for="email">你的邮箱</label>
					<input id="email" maxlength="48" name="email" placeholder="请输入邮箱地址(可选)" type="text"/>
				</view>
			</view>

			<view class="form-btn-group">
				<button form-type="submit">提交</button>
			</view>
		</form>
	</div>
</template>

<script>
export default {
	name: 'b',
	data() {
		return {};
	},
	methods: {
		/**
		 * 页面提交
		 */
		onSubmit: function(e) {
			uni.$emitter.trigger('wait.result', e.detail.value);
			uni.navigateBack({});
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.b {
	}
</style>
