<template>
	<custom-page class="page" :loaded="loaded">
		<template v-for="coupon in data">
			<custom-coupon :coupon="coupon" class="margin" @actiontap="navTo('/pages/index/index')"></custom-coupon>
		</template>

		<view class="foot padding bg-white">
			<view class="text-center" @tap="linkTo"
				  data-url="/pages/index/coupon">
				<text class="cuIcon-cardboardfill text-red margin-right-xs"></text>
				<text>更多优惠券</text>
				<text class="cuIcon-right margin-left-xs"></text>
			</view>
		</view>
	</custom-page>
</template>

<script>
	export default {
		data() {
			return {
				data: [],
				page: 1,
				more: true,
				keywords: '',
				loaded: false
			}
		},
		onLoad(options) {
			this.source = parseInt(options.source);
			this.loadData();
		},
		onPullDownRefresh() {
			this.loadData().finally(() => {
				uni.stopPullDownRefresh();
			});
		},
		onReachBottom() {
			if (!this.more) {
				return;
			}

			this.loadData(this.page + 1);
		},
		methods: {
			// 加载地址
			loadData: function(page = 1) {
				return uni.$models.coupon.getUserList({
					page: page,
				}).then(res => {
					res.data = res.data.map(item => {
						return {
							color: '#FF3456',
							ltBg: "#FFFFFF",
							height: '180rpx',
							title: "全场通用券",
							number: item.coupon.number_text,
							use_tips: item.coupon.use_tips,
							desc: "有效期至 " + (item.expire_time || item.coupon.end_time),
							btn: "使用",
						};
					});
					this.data = page === 1 ? res.data : this.data.concat(res.data);
					this.more = res.data.length >= res.per_page;
					this.page = page;
					this.loaded = true;
				}, () => {
					uni.navigateBack();
				});
			},
		}
	}
</script>

<style>
	.foot {
		position: fixed;
		z-index: 99;
		left: 0;
		right: 0;
		bottom: 0;
	}
</style>
