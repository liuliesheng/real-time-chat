<template>
	<custom-page class="page" :loaded="true">
		<view class="wrapper">
			<view class="text-center" style="font-size: 240rpx;">
				<text class="cuIcon-roundcheckfill text-green"></text>
			</view>
			<view class="text-center text-black tips">支付成功</view>
			<view class="text-center margin-top amount">￥{{amount}}</view>
		</view>
		<view class="go-home">
			<button class="cu-btn block lg"
					@tap="toHome">返回首页</button>
		</view>
	</custom-page>
</template>

<script>
	export default {
		data() {
			return {
				amount: ''
			}
		},
		onLoad(options) {
			this.amount = parseFloat(options.amount).toFixed(2);
		},
		methods: {
			toHome() {
				uni.navigateBack({
					delta: 100
				})
			}
		}
	}
</script>

<style>
	.page {
		background-color: white;
	}

	.wrapper {
		margin-top: 15%;
	}

	.tips {
		font-weight: 400;
		font-size: 18px;
	}

	.amount {
		font-weight: 700;
		font-size: 36px;
	}

	.go-home {
		margin: 15% 30rpx 30rpx 30rpx;
	}
</style>
