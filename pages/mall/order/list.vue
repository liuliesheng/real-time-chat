<template>
	<view class="page" v-if="loaded">
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

					<!-- 订单列表 -->
					<view class="cu-card dynamic no-card margin-top"
					      v-for="(item,index) in tabItem.data"
					      :key="item.id">
						<view class="cu-item shadow">
							<view class="padding flex flex-wrap">
								<text class="flex-sub">{{item.create_time}}</text>
								<text class="state" :style="{color: item.stateTipColor}">{{item.stateTip}}</text>
								<text v-if="item.state===9" class="cuIcon-delete"
								      @click="deleteOrder(index)"></text>
							</view>
							<!-- 商品列表 -->
							<view class="cu-list goods-list" @tap="linkTo" :data-url="'/pages/mall/order/detail?id='+item.id">
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
							<view class="padding flex flex-wrap justify-end">
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

							<view class="flex flex-wrap justify-end padding-lr padding-tb-sm" v-if="item.order_status !== 50">
								<button class="cu-btn round margin-left" @click="deleteOrder(index)" v-if="item.order_status===0">删除订单</button>
								<button class="cu-btn round margin-left" @click="cancelOrder(item)" v-if="item.order_status===10">取消订单</button>
								<button class="cu-btn round margin-left bg-red" @click="payOrder(index)" v-if="item.order_status===10">立即支付</button>
								<button class="cu-btn round margin-left bg-red" @click="confirmOrder(item)" v-if="item.order_status===20 || item.order_status===30">确认收货</button>
								<button class="cu-btn round margin-left bg-red" @click="confirmOrder(item)" v-if="item.order_status===40">去评价</button>
							</view>

						</view>
					</view>

				</mescroll-uni>
			</swiper-item>
		</swiper>
	</view>
	<PageLoad v-else />
</template>

<script>
	import orderNav from './order-nav';
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				tabCur: 0,
				navList: orderNav,
				loaded: false,
			};
		},
		onLoad(options) {
			this.tabCur = +(options.state || 0);
			this.loadData();
		},
		methods: {
			// 初始化滚动条
			mescrollInit(index, mescroll) {
				this.navList[index].mescroll = mescroll;
				// this.mescroll = mescroll;

				if (index === this.tabCur) { // 组件初始化完毕
					this.useFrame(this.tabCur);
				}
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
					res.data.forEach((item) => {
						const { stateTip, stateTipColor } = this.orderStateExp(item.order_status);
						item.stateTip = stateTip;
						item.stateTipColor = stateTipColor;
						item.goods_num = this.getGoodsCount(item.goods);
					});

					navItem.data = page === 1 ? res.data : navItem.data.concat(res.data);
					navItem.more = res.data.length >= res.per_page;
					navItem.page = page;
					navItem.loaded = true;

					this.loaded = true;

					navItem.mescroll && navItem.mescroll.endSuccess(res.data.length, this.more);
				}, () => {
					navItem.mescroll && navItem.mescroll.endErr();
				}).finally(() => {
					navItem.loading = false;
				});
			},

			/// 使用指定的滚动条
			useFrame(index) {
				this.mescroll = this.navList[index].mescroll;
			},

			//swiper 切换
			changeTab(e) {
				const index = this.tabCur = e.target.current;
				const navItem = this.navList[index];
				this.useFrame(index);

				//tab切换只有第一次需要加载数据
				if (navItem.loaded === true) {
					return;
				}

				this.loadData();
			},

			//顶部tab点击
			tabClick(index) {
				this.tabCur = index;
			},

			//删除订单
			deleteOrder(index) {
				const list = this.navList[this.tabCur].data;
				const item = list[index];

				uni.showModal({
					content: '是否确认删除订单？',
					success: (res) => {
						if (res.cancel) {
							return;
						}

						uni.$model.mall.deleteOrder(item.id, {
							loading: true
						}).then((res) => {
							list.splice(index, 1);
							uni.$hintSuccess('订单已删除！');
						});
					}
				});
			},

			//取消订单
			cancelOrder(item) {
				uni.showModal({
					content: '是否确认取消订单？',
					success: (res) => {
						if (res.cancel) {
							return;
						}

						uni.$model.mall.setOrderCancel(item.id, {
							loading: true
						}).then((res) => {
							const { stateTip, stateTipColor } = this.orderStateExp(0);
							item.order_status = 0;
							item.stateTip = stateTip;
							item.stateTipColor = stateTipColor;
							uni.$hintSuccess('订单已取消！');

							//取消订单后删除待付款中该项
							const list = this.navList[1].data
							const index = list.findIndex(val => val.id === item.id);
							index !== -1 && list.splice(index, 1);
						});
					}
				});
			},

			// 支付订单
			payOrder(index) {
				const list = this.navList[this.tabCurrentIndex].data;
				const item = list[index];
				const typeMap = {
					0: 10,
					1: 20
				};

				// 更新列表
				const updateList = () => {
					const { stateTip, stateTipColor } = this.orderStateExp(20);

					// 更新全部订单列表
					const order = this.navList[0].data.find(val => val.id === item.id);
					if (index !== -1) {
						order.order_status = 0;
						order.stateTip = stateTip;
						order.stateTipColor = stateTipColor;
					}

					// 更新待支付订单列表
					item.order_status = 0;
					item.stateTip = stateTip;
					item.stateTipColor = stateTipColor;
					this.navList[1].data.splice(index, 1);

					// 待收货列表增加
					this.navList[2].data.unshift(item);
				};

				uni.showActionSheet({
					itemList: ['余额支付', '微信支付'],
					success: (res) => {
						const type = typeMap[res.tapIndex];
						uni.$model.mall.getOrderPaymentInfo({
							id: item.id,
							type: type
						}, {
							loading: true
						}).then((res) => {
							if (res.state === 1) { // 余额支付
								updateList();
								uni.$hintSuccess('已支付！');
							} else { // 微信支付
								uni.requestPayment({
									...res,
									success: () => {
										updateList();
										uni.$hintSuccess('已支付！');
									}
								});
							}
						});
					}
				});
			},

			// 确认订单
			confirmOrder(item) {
				uni.showModal({
					content: '是否确认收货？',
					success: (res) => {
						if (res.cancel) {
							return;
						}

						uni.$model.mall.setOrderReceipt(item.id, {
							loading: true
						}).then((res) => {
							const { stateTip, stateTipColor } = this.orderStateExp(40);
							item.order_status = 40;
							item.stateTip = stateTip;
							item.stateTipColor = stateTipColor;
							uni.$hintSuccess('已确认收货！');

							//确认订单后删除待收货列表，增加待评价列表
							// const list = this.navList[1].data
							// const index = list.findIndex(val => val.id === item.id);
							// index !== -1 && list.splice(index, 1);
						});
					}
				});
			},

			//订单状态文字和颜色
			orderStateExp(state) {
				let stateTip = '',
					stateTipColor = '#fa436a';
				switch (+state) {
					case 0:
						stateTipColor = '#909399';
						stateTip = '已取消';
						break;
					case 10:
						stateTip = '待付款';
						break;
					case 20:
						stateTip = '待发货';
						break;
					case 30:
						stateTip = '待收货';
						break;
					case 40:
						stateTip = '待评价';
						break;
					case 50:
						stateTip = '已完成';
					case 60:
						stateTip = '订单已关闭';
						stateTipColor = '#909399';
						break;
						//更多自定义
				}
				return { stateTip, stateTipColor };
			},

			// 计算商品数量
			getGoodsCount(goodsList) {
				return goodsList.reduce(function(result, it) {
					return result + it.goods_num;
				}, 0);
			}
		}
	}
</script>

<style scoped lang="scss">
	.nav {
		position: relative;
		z-index: 9000;
	}

	.order-frame {
		height: calc(100vh - 90upx);
	}

	.goods-list .cu-item .title {
		font-size: 16px;
		font-weight: bold;
		color: #333333;
		height: 88upx;
	}

	.goods-list .cu-item .image-wrapper {
		width: 212rpx;
		height: 212rpx;
	}

	.m-price {
		font-size: 26rpx;
		text-decoration: line-through;
		margin-left: 10rpx;
		color: #999;
	}
</style>
