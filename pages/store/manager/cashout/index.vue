<template>
	<view class="page">
		<template v-if="loaded">
			<view class="margin padding bg-white radius ">
				<scroll-view scroll-x class="bg-white nav">
					<view class="flex text-center">
						<view class="cu-item flex-sub" :class="'0'==type?'text-orange cur':''"
							  @tap="type='0'">
							<image src="/static/icon/wechat.png" mode="widthFix" class="icon"></image>微信
						</view>
						<view class="cu-item flex-sub" :class="'1'==type?'text-orange cur':''"
							  @tap="type='1'">
							<image src="/static/icon/ico-bank.png" mode="widthFix" class="icon"></image>银行卡
						</view>
						<view class="cu-item flex-sub" :class="'2'==type?'text-orange cur':''"
							  @tap="type='2'">
							<image src="/static/icon/balance.png" mode="widthFix" class="icon"></image>余额
						</view>
					</view>
				</scroll-view>

				<view class="flex amount-wrapper solid-bottom">
					<view class="">￥</view>
					<input type="digit" v-model="amount" class="flex-sub amount" placeholder="0.00" />
					<view class="text-blue text-sm cash-amount-all" @tap="amount=info.order_money">全部</view>
				</view>
				<view class="flex">
					<view class="flex-sub">
						账户余额：￥{{info.order_money}}
					</view>
					<view class="flex-sub text-right" v-if="type!='2'">
						提现费率 0.1%
					</view>
				</view>
			</view>

			<view class="margin">
				<button class="cu-btn block bg-gradual-orange lg shadow radius" @tap="confirm"
						:disabled="!amount">确认提现</button>
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
				amount: '',
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
			},

			// 提交
			confirm() {
				return uni.$models.store.applyCashout({
					money: this.amount,
					type: this.type,
				}).then((res) => {
					this.info.order_money = res.order_money;
					this.amount = '';
				});
			}
		}
	}
</script>

<style>
	.amount-wrapper {
		border-radius: 10rpx;
		margin: 20rpx 0;
		padding: 30rpx 10rpx;
		font-size: 64rpx;
		font-weight: 600;
		overflow: hidden;
		align-items: center;
	}

	.amount-wrapper .amount {
		font-size: 64rpx;
		line-height: 48rpx;
		height: 64rpx;
		color: black;
	}

	.amount-wrapper .cash-amount-all {
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
