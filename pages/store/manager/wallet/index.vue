<template>
	<view class="page">
		<template v-if="loaded">
			<view class="margin padding amount radius-lg">
				<view class="margin-bottom-xs">账号余额（元）</view>
				<view class="flex">
					<view class="flex-sub">
						<text class="amount-text">{{info.order_money||"0.00"}}</text>
					</view>
					<view class="">
						<button class="cu-btn cash-btn" @tap="linkTo" data-url="./cashout">提现</button>
					</view>
				</view>
			</view>

			<view class="grid col-4 grid-square text-center text-sm">
				<view class="padding-sm" @tap="linkTo" data-url="./mywallet-log">
					<view class="icon">
						<image src="/static/icon/bill.png" mode="aspectFit"></image>
					</view>
					<view class="margin-top-xs">收入明细</view>
				</view>
				<view class="padding-sm" @tap="linkTo" data-url="./cashout-log">
					<view class="icon">
						<image src="/static/icon/cashout.png" mode="aspectFit"></image>
					</view>
					<view class="margin-top-xs">提现记录</view>
				</view>
				<view class="padding-sm" @tap="linkTo" data-url="./mybank">
					<view class="icon">
						<image src="/static/icon/bank.png" mode="aspectFit"></image>
					</view>
					<view class="margin-top-xs">银行卡</view>
				</view>
			</view>
		</template>
		<PageLoad v-else />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {},
				loaded: true
			}
		},
		onLoad() {
			this.loadData();
		},
		onPullDownRefresh() {
			this.loadData().finally(() => {
				uni.stopPullDownRefresh();
			});
		},
		methods: {
			// 加载数据
			loadData() {
				return uni.$models.store.getMyDetail().then(res => {
					this.loaded = true;
					this.info = res;
				});
			}
		}
	}
</script>

<style>
	.amount {
		background-image: linear-gradient(#FF6B55, #FF3F5E);
		box-shadow: 0 9px 12px rgba(255, 64, 94, 0.24);
		color: white;
	}

	.amount-text {
		font-size: 64rpx;
	}

	.cash-btn {
		background-color: rgba(0, 0, 0, 0.2) !important;
		color: white;
	}

	.icon {
		position: relative;
		width: 72rpx;
		height: 72rpx;
		margin: 0 auto;
	}

	.icon image {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
	}
</style>
