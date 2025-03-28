<template>
	<view class="page">
		<XLoading />
		<Hint />

		<template v-if="loaded">
			<view class="store-info">
				<view class="store-content">
					<view class="text-black text-bold text-cut">付款给 {{info.title}}</view>
					<view class="text-gray text-cut margin-top-xs">{{info.address}}</view>
				</view>
				<image :src="info.logo" mode="aspectFill" class="store-logo"></image>
			</view>

			<view class="amount-box">
				<view class="amount-wrapper solid-bottom">
					<text>￥</text>
					<text v-if="amount">{{amount||'0.00'}}</text>
					<text class="text-gray" v-else>0.00</text>
				</view>
				<view class="padding-lr padding-bottom flex" style="position: relative;"
					  v-if="userInfo" @tap="payType=payType?0:1">
					<view class="flex-sub">账户余额 ￥{{userInfo.balance}}</view>
					<checkbox :checked="payType===1" :disabled="true" style="pointer-events: none;" />
				</view>
			</view>


			<view class="keyboard">
				<view class="text-gray text-sm text-center margin-bottom-sm">请手动输入金额</view>
				<view class="keyboard-wrapper flex">
					<view class="flex-sub keyboard-cmd">
						<view v-for="(item,index) in cmds" :key="index" class="cmd" :class="item==='0'?'cmd-lg':''"
							  @tap="onCmd(item)">
							<view class="text">{{item}}</view>
						</view>
					</view>
					<view class="keyboard-action flex flex-direction">
						<view class="flex-sub" @tap="onCmd('del')">
							<view class="text">删除</view>
						</view>
						<view class="flex-sub bg-orange text-white" @tap="goPay">
							<view class="text text-lg">
								<view class="">确定</view>
								<view class="">支付</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</template>
		<PageLoad @refresh="loadData" v-else />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: 0,
				info: null,
				userInfo: null,
				loaded: false,

				cmds: [
					'1', '2', '3',
					'4', '5', '6',
					'7', '8', '9',
					'0', '.',
				],
				amount: '',

				payType: 0
			}
		},
		onLoad(options) {
			this.id = parseInt(options.id);
			if (isNaN(this.id)) {
				uni.$hintError('参数错误！');
				return uni.$delayNavigateBack();
			}

			this.loadData();
		},
		methods: {
			// 加载数据
			loadData() {
				uni.$models.user.get().then((res) => {
					this.userInfo = res;
				});
				return uni.$models.store.getDetail(this.id).then(res => {
					this.info = res;
					this.loaded = true;
				});
			},

			// 处理输入命令
			onCmd(cmd) {
				let amount = this.amount;
				const dotIndex = amount.indexOf('.');

				if ('del' === cmd) {
					if (amount.length) {
						amount = amount.substr(0, amount.length - 1);
					}
					this.amount = amount;

					return;
				} else if (cmd === '.') {
					if (dotIndex !== -1 || amount.length === 0) {
						return;
					}
				} else {
					if (dotIndex === -1 && amount.length > 4) {
						return;
					}

					if (dotIndex !== -1 && (amount.length - dotIndex > 2)) {
						return;
					}
				}

				amount += cmd;

				// if (parseFloat(amount) > 20000) {
				// 	return;
				// }

				this.amount = amount;
			},

			// 去支付
			goPay() {
				if (!this.amount.length) {
					return;
				}

				uni.$models.store.goPay({
					amount: this.amount,
					shop_id: this.info.id,
					pay_type: this.payType,
				}).then((res) => {
					uni.redirectTo({
						url: './success?amount=' + this.amount
					})
				});
			}
		}
	}
</script>

<style>
	.store-info {
		position: relative;
		padding: 40rpx 30rpx;
		display: flex;
	}

	.store-content {
		padding-right: 30rpx;
		flex: 2;
		min-width: 0;
	}

	.store-logo {
		width: 88rpx;
		height: 88rpx;
		border-radius: 88rpx;
		overflow: hidden;
		flex: 0 0 auto;
	}

	.amount-box {
		border-radius: 16rpx 16rpx 0 0;
		background-color: white;
		height: calc(100vh - 188rpx);
		padding-top: 30rpx;
	}

	.amount-wrapper {
		border-radius: 10rpx;
		margin: 20rpx 30rpx;
		padding: 30rpx 10rpx;
		font-size: 72rpx;
		font-weight: 600;
		overflow: hidden;
	}

	.keyboard {
		position: fixed;
		width: 100%;
		bottom: 0;
		overflow: hidden;
	}

	.keyboard-wrapper {
		background-color: white;
		text-align: center;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
	}

	.keyboard-cmd {
		display: flex;
		flex-wrap: wrap;
	}

	.keyboard-cmd .cmd {
		width: 33.333333%;
		vertical-align: middle;
		position: relative;
		overflow: hidden;
		font-size: 58rpx;
		font-weight: 600;
		border-right: 1px solid rgba(0, 0, 0, 0.1);
	}

	.keyboard-cmd .cmd.cmd-lg {
		width: 66.666666%;
	}

	.keyboard-cmd .cmd:not(:nth-last-child(-n+2)) {
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	}

	.keyboard-cmd .cmd .text {
		padding-top: 50rpx;
		padding-bottom: 50rpx;
	}

	.keyboard-action {
		width: 150rpx;
	}

	.keyboard-action>view {
		position: relative;
	}

	.keyboard-action .text {
		transform: translateY(-50%);
		position: absolute;
		top: 50%;
		left: 0;
		width: 100%;
	}
</style>
