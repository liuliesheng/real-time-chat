<template>
	<view class="page">
		<template v-if="loaded">
			<view class="margin padding amount radius-lg">
				<view style="opacity: 0.8;">账号余额（元）</view>
				<view class="amount-text margin-top-xs">{{info.order_money}}</view>
			</view>

			<view class="cu-list menu sm-border margin-top">
				<view class="cu-item arrow">
					<view class="content" @tap="linkTo" data-url="./info" data-logged>
						<text class="cuIcon-homefill text-grey"></text>
						<text>我的店铺</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content" @tap="linkTo" data-url="./wallet/index" data-logged>
						<text class="cuIcon-moneybagfill text-grey"></text>
						<text>我的钱包</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content" @tap="linkTo" data-url="./setting">
						<text class="cuIcon-settingsfill text-grey"></text>
						<text>设置</text>
					</view>
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
				return uni.$models.store.getMyDetail().then(res => {
					this.loaded = true;
					if (res.status !== 1) {
						uni.redirectTo({
							url: './apply'
						})
					} else {
						this.info = res;
						uni.setNavigationBarTitle({
							title: res.title
						})
					}
				});
			}
		}
	}
</script>

<style>
	.store-name {
		font-size: 18px;
		font-weight: 600;
	}

	.amount {
		background-image: linear-gradient(#FF6B55, #FF3F5E);
		box-shadow: 0 9px 12px rgba(255, 64, 94, 0.24);
		color: white;
	}

	.amount-text {
		font-size: 64rpx;
	}
</style>
