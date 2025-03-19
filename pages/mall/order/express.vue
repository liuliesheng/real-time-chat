<template>
	<view class="page" v-if="loaded">
		<XLoading />
		<Hint />

		<!-- 收货地址信息 -->
		<view class="bg-white padding flex align-center solid-bottom">
			<view class="text-xxl margin-right-sm">
				<text class="cuIcon-locationfill text-pink"></text>
			</view>
			<view class="flex-sub">
				<view class="text-black">
					<text class="margin-right-xs">{{ info.order.receiver_name }}</text>
					<text class="text-gray">{{ info.order.receiver_phone }}</text>
				</view>
				<view class="text-black">
					<text>{{ info.order.receiver_province }}</text>
					<text class="margin-left-xs">{{ info.order.receiver_city }}</text>
					<text class="margin-left-xs">{{ info.order.receiver_district }}</text>
					<text class="margin-left-xs">{{ info.order.receiver_address }}</text>
				</view>
			</view>
		</view>

		<view class="bg-white order-info solid-bottom">
			<view class="padding-lr padding-tb-sm text-sm">
				<view class="flex">
					<view class="title">物流单号：</view>
					<view class="flex-sub">{{info.order.express_no}}</view>
					<view class="text-blue" @tap="copy(info.express_no)">复制</view>
				</view>
				<view class="flex margin-top-sm">
					<view class="title">物流名称：</view>
					<view class="flex-sub">{{info.order.express_company}}</view>
				</view>
				<view class="flex margin-top-sm">
					<view class="title">发货时间：</view>
					<view class="flex-sub">{{info.order.delivery_time | date(true)}}</view>
				</view>
			</view>
		</view>

		<view class="cu-timeline margin-top">
			<view class="cu-time">至今</view>
			<view class="cu-item" v-for="(item,index) in info.data" :key="index"
			      :class="index===0?'cur text-blue':''">
				<view class="content">
					<text class="margin-right-xs">{{item.ftime}}</text>
					<text>{{ item.context }}</text>
				</view>
			</view>
		</view>
	</view>
	<PageLoad v-else />
</template>

<script>
	export default {
		data() {
			return {
				id: 0,
				info: null,
				loaded: false
			}
		},
		onLoad(options) {
			this.id = parseInt(options.id);

			if (isNaN(this.id)) {
				uni.$hintError('参数错误！');
				return uni.$delayNavigateBack(1000);
			}

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
				return uni.$model.mall.getExpressTracks(this.id).then(res => {
					this.info = res;
					this.loaded = true;
				});
			},
		}
	}
</script>

<style>
	.page {
		/* background-color: white; */
	}

	.order-info .title {
		width: 160rpx;
	}
</style>
