<template>
	<view class="page">
		<template v-if="loaded">
			<view class="padding solid-bottom calendar">
				<picker mode="date" :value="selectDate" @change="changeDate" fields="month">
					<view class="flex">
						<view class="flex-sub">{{selectDate||'选择日期'}}</view>
						<view class="action">
							<text class="cuIcon-calendar"></text>
						</view>
					</view>
				</picker>
			</view>
			<view class="cu-list menu" v-if="data.length">
				<view class="cu-item padding-tb" v-for="(item,index) in data" :key="item.id">
					<view class="content">
						<view class="">收款 — {{item.user.nickname}}</view>
						<view class="text-sm">当前余额 <text class="text-blue">{{item.cur_shop_money}}</text> 元</view>
						<view class="text-gray">{{item.create_time}}</view>
					</view>
					<view class="action">￥{{item.shop_amount}}</view>
				</view>
			</view>
			<Empty @refresh="loadData" v-else />
		</template>
		<PageLoad v-else />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loaded: false,
				data: [],
				page: 1,
				more: true,

				selectDate: ''
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
		onReachBottom() {
			if (!this.more) {
				return;
			}

			this.loadData(this.page + 1);
		},
		methods: {
			loadData(page = 1) {
				return uni.$models.store.getMyOrderList({
					date: this.selectDate,
					page: page,
				}).then((res) => {
					this.data = page === 1 ? res.data : this.data.concat(res.data);
					this.more = res.data.length >= res.per_page;
					this.page = page;
					this.loaded = true;
				});
			},
			changeDate(e) {
				const date = e.detail.value;
				this.selectDate = date;
				this.loadData();
			}
		},
	}
</script>

<style>
	.page {
		background-color: white;
		padding-top: 92rpx;
	}

	.calendar {
		position: fixed;
		width: 100%;
		left: 0;
		top: 0;
		z-index: 9999;
		background-color: white;
	}

	.cu-list.menu>.cu-item {
		padding: 30rpx;
	}
</style>
