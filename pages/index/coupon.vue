<template>
	<custom-page class="page" :loaded="loaded">
		<template v-for="(coupon,index) in data">
			<custom-coupon :coupon="coupon" class="margin" @actiontap="onGiveTap(index)"></custom-coupon>
		</template>
	</custom-page>
</template>

<script>
	function makeCouponData(coupon) {
		const hasGive = coupon.user_give_count < coupon.max_give_num;
		return Object.assign(coupon, {
			color: '#FF3456',
			ltBg: "#FFFFFF",
			height: '180rpx',
			title: "全场通用券",
			btn: hasGive ? "领取" : '已领取',
			number: coupon.number_text,
			use_tips: coupon.use_tips,
			desc: "有效期至 " + coupon.end_time,
			drawed: "已抢" + coupon.give_num + "张",
			disabled: !hasGive,
		});
	}
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
				return uni.$models.coupon.getList({
					page: page,
				}).then(res => {
					res.data = res.data.map(makeCouponData);
					this.data = page === 1 ? res.data : this.data.concat(res.data);
					this.more = res.data.length >= res.per_page;
					this.page = page;
					this.loaded = true;
				}, () => {
					uni.navigateBack();
				});
			},
			// 领取优惠券
			onGiveTap(index) {
				const coupon = this.data[index];
				uni.$models.coupon.give(coupon.id).then(() => {
					coupon.give_num++;
					coupon.user_give_count++;
					Object.assign(coupon, makeCouponData(coupon));
				});
			}
		}
	}
</script>

<style>
</style>
