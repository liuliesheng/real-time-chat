<template>
	<view class="page">
		<template v-if="loaded">
			<view class="margin padding amount radius-lg">
				<view class="text-sm margin-bottom-xs cf">
					账户余额（元）
					<view class="fr text-blue" @tap="linkTo" data-url="./index">提现记录</view>
				</view>
				<view class="amount-text">{{info.cash_amount}}</view>
			</view>

			<view class="margin padding bg-white radius">
				<scroll-view scroll-x class="bg-white nav">
					<view class="flex text-center">
						<view class="cu-item flex-sub" :class="'0'==type?'text-orange cur':''"
							  @tap="type='0'">
							<image src="/static/icon/wechat.png" mode="widthFix" class="icon"></image>微信余额
						</view>
						<view class="cu-item flex-sub" :class="'1'==type?'text-orange cur':''"
							  @tap="type='1'">
							<image src="/static/icon/balance.png" mode="widthFix" class="icon"></image>转余额
						</view>
					</view>
				</scroll-view>

				<view class="flex cash-wrapper margin-top">
					<view class="cash-amount-icon">￥</view>
					<input class="cash-amount-input" :min="0.00" type="digit" v-model="cashAmount"
						   placeholder="请输入提现金额" />
					<view class="text-blue text-sm cash-amount-all" @tap="cashAmount=info.cash_amount">全部</view>
				</view>
				<view class="flex margin-top-sm">
					<view class="flex-sub">
						账户余额：￥{{info.cash_amount}}
					</view>
					<view class="" v-if="type!='1'">
						提现费率 {{info.service_rate*100}}%
					</view>
				</view>
			</view>

			<view class="margin">
				<button class="cu-btn block bg-gradual-orange lg shadow radius" @tap="confirm"
						:disabled="info.cash_amount<0.01">确认提现</button>
			</view>
		</template>
		<PageLoad v-else />
	</view>
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
		box-shadow: 0 9px 12px rgba(255, 64, 94, 0.24);
	}

	.amount-text {
		font-size: 64rpx;
	}

	.cash-wrapper {
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		padding: 10rpx 0;
	}

	.cash-amount-icon {
		width: 86rpx;
		font-size: 64rpx;
		text-align: center;
	}

	.cash-amount-input {
		font-size: 52rpx;
	}

	.cash-amount-all {
		white-space: nowrap;
		line-height: 84rpx;
	}

	.nav .icon {
		width: 44rpx;
		display: inline-block;
		vertical-align: middle;
		margin-right: 10rpx;
	}
</style>
