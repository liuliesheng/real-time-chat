<template>
	<custom-page class="page" :loaded="loaded">
		<view class="amount">
			<view class="text-sm margin-bottom-xs cf">
				账户余额（元）
				<view class="fr cu-btn sm cash-btn" @tap="linkTo" data-url="./cashout">提现</view>
			</view>
			<view class="amount-text">{{info.cash_amount}}</view>
		</view>

		<view class="grid col-4 grid-square text-center text-sm margin-top">
			<view class="padding-sm" @tap="linkTo" data-url="./bill-log">
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
			<view class="padding-sm" @tap="linkTo" data-url="./bank">
				<view class="icon">
					<image src="/static/icon/bank.png" mode="aspectFit"></image>
				</view>
				<view class="margin-top-xs">银行卡</view>
			</view>
		</view>
	</custom-page>
</template>

<script>
	export default {
		data() {
			return {
				info: null,
				loaded: false,

				type: '0',
				cashAmount: ''
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
				return uni.$models.user.getCashoutInfo().then(res => {
					this.loaded = true;
					this.info = res;
				});
			},

			// 确认提现
			confirm() {
				const cashAmount = parseFloat(this.cashAmount);
				const orginalAmount = parseFloat(this.info.cash_amount);
				if (isNaN(cashAmount) || cashAmount < 0.01) {
					return uni.$hintError('提现金额不能少于0.01元！');
				}

				if (cashAmount > orginalAmount) {
					return uni.$hintError('提现金额不足！');
				}

				return uni.$models.user.applyCashout({
					type: this.type,
					apply_money: this.cashAmount
				}).then((res) => {
					this.info.cash_amount = res.cash_amount;
					this.cashAmount = '';
				});
			}
		}
	}
</script>

<style>
	.amount {
		background-image: linear-gradient(#FF6B55, #FF3F5E);
		color: white;
		box-shadow: 0 3px 12px rgba(255, 64, 94, 0.24);
		padding: 100rpx 30rpx;
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
