<template>
	<view class="page">
		<XLoading />
		<Hint />

		<scroll-view scroll-x class="bg-white nav shadow">
			<view class="flex text-center">
				<view class="cu-item flex-sub"
				      v-for="(item, index) in navList" :key="index"
				      :class="tabCur === index?'text-red cur':''"
				      @click="tabClick(index)">
					{{ item.text }}
				</view>
			</view>
		</scroll-view>
		<swiper class="order-frame" :current="tabCur" duration="300" @change="changeTab">
			<swiper-item v-for="(tabItem,tabIndex) in navList" :key="tabIndex">
				<mescroll-uni :ref="'mescrollRef'+tabIndex"
				              @init="mescrollInit(tabIndex,$event)"
				              @down="downCallback" @up="upCallback">

					<PageLoad :content="true" v-if="!tabItem.loaded" />

					<!-- 订单列表 -->
					<view class="cu-card dynamic no-card margin-top"
					      v-for="(item,index) in tabItem.data"
					      :key="item.id">
						<view class="cu-item shadow" @tap="linkTo" :data-url="'/pages/mall/order/detail?id='+item.id">
							<view class="padding flex flex-wrap">
								<text class="flex-sub">{{item.create_time}}</text>
								<text class="state" :style="{color: item.stateTipColor}">{{item.stateTip}}</text>
							</view>
							<!-- 商品列表 -->
							<view class="cu-list goods-list">
								<view class="cu-item flex padding-sm"
								      v-for="(goodsItem,goodsIndex) in item.goods" :key="goodsItem.id">
									<view class="image-wrapper radius lg" :class="{loaded: goodsItem.loaded}">
										<image :src="goodsItem.goods_cover" mode="aspectFit" lazy-load="true"
										       @load="imageOnLoad(goodsItem)"></image>
									</view>
									<view class="content flex-sub padding-lr-sm">
										<view class="title ellipsis-2 text-black">{{ goodsItem.goods_title }}</view>
										<view class="text-gray text-sm margin-top-xs">
											<text>{{ goodsItem.goods_spec || '' }}</text>
										</view>
									</view>
									<view class="action">
										<view class="text-price text-red text-lg text-bold text-right">{{ goodsItem.goods_price }}</view>
										<view class="text-black text-sm text-right">×{{ goodsItem.goods_num }}</view>
									</view>
								</view>
							</view>

							<!-- 商品价格信息 -->
							<view class="padding flex flex-wrap justify-end text-sm">
								<view class="text-gray margin-left">
									<text class="margin-right-xs">共</text>
									<text class="text-red text-xl">{{ item.goods_num }}</text>
									<text class="margin-left-xs">件商品</text>
								</view>
								<view class="text-gray margin-left">
									<text class="margin-right-xs">总价</text>
									<text class="text-price text-xl"> {{ item.total_amount }}</text>
								</view>
								<view class="text-black margin-left">
									<text class="margin-right-xs">实付款</text>
									<text class="text-price text-red text-xl"> {{ item.pay_amount }}</text>
								</view>
							</view>

							<view class="flex justify-end padding-lr padding-tb-sm" v-if="item.order_status !== 50">
								<button class="cu-btn round text-sm margin-left-sm "
								        @tap.stop.prevent="deleteOrder(index)" v-if="item.order_status===0">删除订单</button>
								<button class="cu-btn round text-sm margin-left-sm"
								        @tap.stop.prevent="cancelOrder(index)" v-if="item.order_status===10">取消订单</button>
								<button class="cu-btn bg-red round text-sm margin-left-sm"
								        @tap.stop.prevent="payOrder(index)" v-if="item.order_status===10">立即支付</button>
								<button class="cu-btn bg-red round text-sm margin-left-sm"
								        @tap.stop.prevent="confirmOrder(index)" v-if="item.order_status===20 || item.order_status===30">确认收货</button>
								<button class="cu-btn bg-red round text-sm margin-left-sm"
								        @tap.stop.prevent="confirmOrder(index)" v-if="item.order_status===40">去评价</button>
							</view>

						</view>
					</view>

				</mescroll-uni>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import orderNavMixin from './order-nav-mixins';
	import orderListMixin from './order-list-mixins';
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin, orderNavMixin, orderListMixin],
		data() {
			return {};
		},
		onLoad(options) {
			this.tabCur = parseInt(options.state) || 0;
		},
		methods: {
			// 初始化滚动条
			mescrollInit(index, mescroll) {
				this.navList[index].mescroll = mescroll;
				if (index === this.tabCur) { // 组件初始化完毕
					this.useFrame(this.tabCur);
				}
			},

			// 使用指定的滚动条
			useFrame(index) {
				this.mescroll = this.navList[index].mescroll;
			},

			// 上拉加载数据
			upCallback(mescroll) {
				this.loadData(mescroll.num);
			},

			//获取订单列表
			loadData(page = 1) {
				const index = this.tabCur;
				const navItem = this.navList[index];
				if (navItem.loading === true) {
					return;
				}
				navItem.loading = true;

				uni.$model.mall.getOrderList({
					page: page,
					state: navItem.state
				}).then((res) => {
					navItem.data = page === 1 ? res.data : navItem.data.concat(res.data);
					navItem.more = res.data.length >= res.per_page;
					navItem.page = page;
					navItem.loaded = true;

					navItem.mescroll && navItem.mescroll.endSuccess(res.data.length, this.more);
				}, () => {
					navItem.mescroll && navItem.mescroll.endErr();
				}).finally(() => {
					navItem.loading = false;
				});
			},
		}
	}
</script>

<style scoped lang="scss">
	.nav {
		position: relative;
		z-index: 1000;
	}

	.order-frame {
		height: calc(100vh - 90upx);
	}

	.goods-list .cu-item .title {
		font-size: 16px;
		line-height: 1.2;
		font-weight: bold;
		color: #333333;
		height: 38.4px;
	}

	.goods-list .cu-item .image-wrapper {
		width: 160rpx;
		height: 160rpx;
	}

	.m-price {
		font-size: 26rpx;
		text-decoration: line-through;
		margin-left: 10rpx;
		color: #999;
	}
</style>
