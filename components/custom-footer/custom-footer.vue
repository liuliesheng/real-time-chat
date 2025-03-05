<template>
	<view class="padding bg-black">
		<view class="" v-if="phone" @tap="callPhone">联系电话：{{phone}}</view>
		<view class="" v-if="wechat_qrcode">官方公众号</view>
		<view class="" v-if="company">{{company}}</view>
	</view>
</template>

<script>
	export default {
		name: "custom-footer",
		props: {
			phone: String,
			wechat_qrcode: String,
			company: String,
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

</style>
