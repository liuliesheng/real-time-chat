<template>
	<view class="page-load" :class="!fixed?'content':''" @tap="refresh">
		<view class="load">
			<image src="/static/load.png" mode="widthFix" class="response"></image>
		</view>
	</view>
</template>

<script>
	export default {
		name: "PageLoad",
		props: {
			fixed: {
				type: Boolean,
				default: true
			}
		},
		created() {
			this.refreshThrottle = uni.$functionUtil.debounce(() => {
				this.$emit('refresh');
			}, 500);
		},
		methods: {
			refresh() {
				this.refreshThrottle();
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

	.load {
		position: absolute;
		top: 50%;
		left: 0;
		right: 0;
		transform: translateY(-100%);

		text-align: center;
	}

	.response {
		width: 320rpx;
		/* height: 96upx; */
		/* animation: mescrollDownRotate 1s linear infinite; */
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
