<template>
	<view class="footer bg-black">
		<view class="margin-bottom-sm" v-if="phone" @tap="callPhone">联系电话：{{phone}}</view>
		<view class="margin-bottom-sm" v-if="company">{{company}}</view>
		<view class="margin-bottom-sm" v-if="wechatQrcode">
			<view class="margin-bottom-xs text-bold">微信二维码</view>
			<image :src="wechatQrcode" mode="aspectFill" show-menu-by-longpress="true" class="qrcode"></image>
		</view>
	</view>
</template>

<script>
	export default {
		name: "custom-footer",
		props: {
			company: String,
			phone: String,
			wechatQrcode: String,
		},
		methods: {
			callPhone() {
				uni.makePhoneCall({
					phoneNumber: this.phone
				});
			}
		}
	}
</script>

<style>
	.footer {
		padding: 60rpx 30rpx;
	}

	.qrcode {
		width: 240rpx;
		height: 240rpx;
	}
</style>
