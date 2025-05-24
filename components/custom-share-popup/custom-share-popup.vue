<template>
	<view class="share-wrapper cu-modal bottom-modal" :class="isShow?'show':''" @tap="cancel">
		<view class="cu-dialog share-dialog padding" @tap.stop.prevent="stopPrevent">
			<view class="flex flex-wrap list">
				<view class="flex-sub flex list-item">
					<image src="../../static/icon/wechat.png" mode="aspectFill" class="icon"></image>
					<button class="flex-sub text text-cut share-btn" open-type="share">发送给朋友</button>
				</view>
				<view class="flex-sub flex list-item">
					<image src="../../static/icon/wechat.png" mode="aspectFill" class="icon"></image>
					<view class="flex-sub text text-cut">分享海报</view>
				</view>
			</view>

			<view class="margin-top">
				<button class="cu-btn block bg-white lg" @tap="cancel">取消</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "custom-share-popup",
		data() {
			return {
				isShow: false,
			};
		},
		methods: {
			// 显示弹窗
			open(type) {
				this.isShow = true;
			},
			// 取消弹框
			cancel() {
				this.isShow = false;
			},
		}
	}
</script>

<style>
	.share-wrapper {}

	.share-dialog {
		text-align: left;
		background-color: rgb(245, 245, 245);
	}

	.share-dialog .icon {
		width: 96rpx;
		height: 96rpx;
	}

	.share-dialog .text {
		vertical-align: middle;
		line-height: 96rpx;
		padding-left: 10px;
		padding-right: 10px;
	}

	.list {
		margin-left: -15px;
		margin-right: -15px;
	}

	.list .list-item {
		background-color: white;
		border-radius: 96rpx;
		overflow: hidden;
		padding: 10px;
		margin: 10px;
	}

	.share-btn {
		text-align: left;
		font-size: inherit;
		height: auto;
	}

	.share-btn.button-hover {
		background-color: unset;
	}
</style>
