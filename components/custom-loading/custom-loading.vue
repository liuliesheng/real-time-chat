<template>
	<view class="loading" v-show="isShowLoading">
		<!-- bounceIn:showLoadingCount, -->
		<view class="cu-load load-modal animated" :class="{bounceOut:!showLoadingCount}">
			<image src="/static/logo.png" class="margin-top loading-img" mode="aspectFit"></image>
			<view class="gray-text text-xs">加载中...</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {},
		data() {
			return {
				isShowLoading: false,
				showLoadingCount: 0,
			};
		},
		created: function() {
			this.$root.showLoading = this.showLoading;
			this.$root.hideLoading = this.hideLoading;
		},
		methods: {
			showLoading() {
				this.showLoadingCount++;
				this.isShowLoading = true;
			},

			hideLoading() {
				this.showLoadingCount--;
				if (this.showLoadingCount <= 0) {
					this.showLoadingCount = 0;
					setTimeout(() => {
						this.isShowLoading = false;
					}, 200);
				}
			},

		}
	}
</script>

<style scoped>
	.loading {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background-color: transparent;
		z-index: 9999;
	}

	.cu-load {
		box-shadow: 0 0 30upx rgba(0, 0, 0, 0.1);
	}

	.cu-load .loading-img {
		animation: turn 1s linear infinite;
	}

	@keyframes turn {
		0% {
			-webkit-transform: rotate(0deg);
		}

		25% {
			-webkit-transform: rotate(90deg);
		}

		50% {
			-webkit-transform: rotate(180deg);
		}

		75% {
			-webkit-transform: rotate(270deg);
		}

		100% {
			-webkit-transform: rotate(360deg);
		}
	}
</style>
