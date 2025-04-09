<template>
	<view class="support" v-if="data">
		<view class="">
			<image :src="data.icon" mode="aspectFill" class="support-icon" v-if="data.icon"></image>
			<text>{{data.title}}提供技术支持</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "custom-technical-support",
		props: {
			info: Object,
		},
		data() {
			const data = this.info ? this.info : getApp().globalData.support;
			return {
				data: data
			};
		},
		created() {
			uni.$emitter.on('refresh-global-config', this.refresh);
		},
		detached() {
			uni.$emitter.off('refresh-global-config', this.refresh);
		},
		methods: {
			refresh(config) {
				if (this.info || !getApp().globalData.support) {
					return;
				}

				this.data = getApp().globalData.support;
			}
		}
	}
</script>

<style scoped>
	.support {
		text-align: center;
		padding: 30rpx;
		color: rgba(0, 0, 0, 0.2);
	}

	.support-icon {
		width: 32rpx;
		height: 32rpx;
		vertical-align: middle;
		margin-right: 10rpx;
	}
</style>
