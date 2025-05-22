<template>
	<custom-page class="page" :loaded="loaded">
		<template v-for="coupon in data">
			<custom-coupon :coupon="coupon" class="margin"></custom-coupon>
		</template>

		<view class="foot padding">
			<button class="cu-btn round block bg-gradual-red lg" @tap="linkTo"
					data-url="/pages/index/coupon">更多优惠券</button>
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
							drawed: "已抢" + item.coupon.give_num + "张"
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
