<template>
	<view class="page-load" :class="content?'content':''" v-else>
		<view class="loading">
			<image src="/static/logo.png" mode="aspectFit" class="response"></image>
		</view>
	</view>
</template>

<script>
	export default {
		name: "PageLoad",
		props: {
			content: {
				type: Boolean,
				default: false
			}
		}
	}
</script>

<style scoped>
	.page-load {
		/* background-color: white; */
		position: absolute;
		left: 0;
		top: 0;
		height: 100%;
		width: 100%;
		z-index: 99;
	}

	.page-load.content {
		position: relative;
		height: 100vh;
	}

	.loading {
		position: absolute;
		top: 50%;
		left: 0;
		right: 0;
		transform: translateY(-100%);
	}

	.response {
		height: 96upx;
		animation: mescrollDownRotate 1s linear infinite;
	}

	@keyframes mescrollDownRotate {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}
</style>
