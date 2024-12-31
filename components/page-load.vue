<template>
	<view class="flex bg-white" style="height: 100vh" v-else>
		<view class="flex-sub">
			<image src="https://image.weilanwl.com/gif/loading-white.gif"
			       mode="aspectFit" class="gif-white response"></image>
		</view>
	</view>
</template>

<script>
	export default {
		name: "PageLoad"
	}
</script>

<style scoped>
	.response {
		height: 320upx;
		margin-top: 50%;
	}
</style>
