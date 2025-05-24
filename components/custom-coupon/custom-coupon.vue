<template>
	<view class="coupons flex nowrap">
		<view class="coupons-left flex-sub flex nowrap align-center"
			  :style="{backgroundColor:coupon.ltBg, height:coupon.height}">
			<view class="coupons-left-number padding-lr-sm">
				<view class="flex nowrap justify-center align-center">
					<text class="text-gray h4">{{coupon.unit}}</text>
					<text class="h4 bold" :style="{color:coupon.color}">{{coupon.number}}</text>
				</view>
				<text class="text-xs block text-center"
					  :style="{color:coupon.color}">{{coupon.use_tips}}</text>
			</view>
			<view class="coupons-left-body flex-sub">
				<text class="block h5 primary-color">{{coupon.title}}</text>
				<text class="block text-sm text-gray">{{coupon.desc}}</text>
			</view>
			<text class="coupons-status" v-if="coupon.drawed"
				  :style="{backgroundColor:coupon.color}">{{coupon.drawed}}</text>
		</view>
		<view class="coupons-right text-white text-center block"
			  :style="{
			height:coupon.height, 
			lineHeight:coupon.height, 
			backgroundColor:coupon.color,
			opacity:coupon.disabled?0.8:1
		}" @tap="onBtnTap">{{coupon.btn}}</view>
		<view class="coupons-sawtooth"
			  :style="{
		height:coupon.height,
		backgroundColor:coupon.color,
		opacity:coupon.disabled?0.8:1
		}">
			<view class="coupons-sawtooth-circular" v-for="(item, index) in 10" :key="index"></view>
		</view>
	</view>
</template>
<script>
	export default {
		name: "custom-coupon",
		props: {
			coupon: {
				type: Object,
				default: function() {
					return {}
				}
			}
		},
		methods: {
			// 被点击
			onBtnTap(e) {
				if (this.coupon.disabled) {
					return;
				}

				this.$emit('actiontap', e);
			},
		}
	}
</script>
<style scoped>
	.coupons {
		border-top-left-radius: 10rpx;
		border-bottom-left-radius: 10rpx;
	}

	.coupons-left {
		width: 500rpx;
		height: 150rpx;
		border-radius: 8rpx;
		position: relative;
	}

	.coupons-left-number {
		width: 168rpx;
		border-right: 1px dashed #D2D2D2;
	}

	.coupons-left-body {
		width: 320rpx;
		padding-left: 10rpx;
		padding-right: 10rpx;
	}

	.coupons-status {
		color: #FFFFFF;
		padding: 0 10px;
		height: 36rpx;
		line-height: 36rpx;
		font-size: 20rpx;
		position: absolute;
		z-index: 1;
		right: 6px;
		top: 8px;
		border-radius: 36rpx;
	}

	.coupons-right {
		width: 130rpx;
		height: 150rpx;
		font-size: 32rpx;
	}

	.coupons-sawtooth {
		width: 8px;
		height: 150rpx;
		overflow: hidden;
		position: relative;
	}

	.coupons-sawtooth-circular {
		width: 10px;
		margin: 3px 5px;
		height: 10px;
		border-radius: 10px;
		background: #F8F8F8;
	}
</style>
