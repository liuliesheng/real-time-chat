<template>
	<view class="page">
		<template v-if="loaded">
			<view class="margin bg-gradual-red radius bank" v-if="info.bank">
				<view class="text-xl">{{info.bank.bank_name}}</view>
				<view class="bank-no">
					{{info.bank.bank_account_show}}
				</view>
			</view>
			<view class="text-center" style="margin-top: 15%;" v-else>
				<view class="text-xsl">
					<text class="text-red cuIcon-roundclosefill"></text>
				</view>
				<view class="text-red text-lg">未绑定银行卡</view>
			</view>

			<view class="margin text-center">
				<view class="">更好银行卡请联系平台方</view>
				<view class="margin-top-sm text-orange">{{info.shop_change_mobile}}</view>
			</view>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: null,
				loaded: false
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
				return uni.$models.store.getMyBankInfo().then(res => {
					this.loaded = true;
					this.info = res;
				});
			}
		}
	}
</script>

<style>
	.page {
		background-color: white;
	}

	.bank {
		padding: 40rpx;
	}

	.bank-no {
		font-size: 16px;
		margin-top: 50rpx;
	}
</style>
