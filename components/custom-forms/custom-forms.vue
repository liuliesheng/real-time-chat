<template>
	<form>
		<view class="cu-form-group">
			<view class="title">您的姓名</view>
			<input placeholder="两字短标题" name="input"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">您的手机号</view>
			<input placeholder="三字标题" name="input"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">您想了解的内容</view>
			<input placeholder="统一标题的宽度" name="input"></input>
		</view>
	</form>
</template>

<script>
	export default {
		name: "custom-forms",
		props: {
			items: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style>

</style>
