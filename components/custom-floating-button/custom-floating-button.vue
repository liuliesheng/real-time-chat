<template>
	<view class="floating-btn-group">
		<button class="floating-btn-action cu-btn cuIcon bg-white shadow">
			<text class="cuIcon-service"></text>
		</button>
		<button class="floating-btn-action cu-btn cuIcon bg-white shadow">
			<text class="cuIcon-phone"></text>
		</button>
	</view>
</template>

<script>
	export default {
		name: "custom-floating-button",
		props: {
			list: {
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
	.floating-btn-group {
		position: fixed;
		bottom: 60rpx;
		right: 30rpx;
		width: 90rpx;
	}

	.floating-btn-group .floating-btn-action {
		width: 90rpx;
		height: 90rpx;
		border-radius: 250px;
		padding: 0;
		font-size: 28px;
	}

	.floating-btn-group .floating-btn-action:not(:last-child) {
		margin-bottom: 20rpx;
	}
</style>
