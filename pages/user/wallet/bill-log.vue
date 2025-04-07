<template>
	<custom-page class="page" :loaded="loaded">
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
			<view class="cu-item"
				  v-for="(item, index) in data"
				  :key="index">
				<view class="content">
					<view class="">
						<text v-if="'1'==tabCur">付款给 {{item.shop.title}}</text>
						<text v-if="'2'==tabCur">在 {{item.shop.title}} 的消费返利</text>
						<text v-if="'3'==tabCur">来自 {{item.user.nickname}} 的成员</text>
					</view>
					<view class="text-gray">
						{{item.create_time}}
					</view>
				</view>
				<view class="action margin-right-sm">
					<view class="text-red" v-if="'1'==tabCur">
						-￥{{item.total_amount}}
					</view>
					<view class="text-green" v-else-if="'2'==tabCur">
						+￥{{item.user_rebate_amount}}
					</view>
					<view class="text-green" v-else-if="'3'==tabCur">
						+￥{{item.partner_rebate_amount}}
					</view>
				</view>
			</view>
		</view>
	</custom-page>
</template>

<script>
	export default {
		data() {
			return {
				loaded: false,
				data: [],
				page: 1,
				total: 1,
				more: true,

				selectDate: '',

				tabCur: '1',
				userInfo: {}
			}
		},
		onLoad() {
			this.loadUserInfo();
			this.loadData();
		},
		onPullDownRefresh() {
			this.loadUserInfo();
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
			loadUserInfo() {
				uni.$models.user.get().then((res) => {
					this.userInfo = res;
				});
			},
			loadData(page = 1) {
				return uni.$models.store.getUserOrderList({
					page: page,
					type: this.tabCur
				}).then((res) => {
					this.data = page === 1 ? res.data : this.data.concat(res.data);
					this.more = res.data.length >= res.per_page;
					this.page = page;
					this.loaded = true;
				});
			},
			tabSelect(key) {
				this.tabCur = key;
				this.data = [];
				this.loadData();
			},
		}
	}
</script>

<style>
	.page {
		padding-top: 90rpx;
	}

	.cu-list.menu .cu-item {
		padding-top: 10rpx;
		padding-bottom: 10rpx;
	}

	.cu-list.menu .action {
		width: auto;
	}
</style>
