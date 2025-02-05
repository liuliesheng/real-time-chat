<template>
	<view class="page" v-if="loaded">
		<XLoading />
		<Hint />

		<view class="order-status bg-gradual-orange">
			{{info.stateTip}}
		</view>

		<!-- 收货地址信息 -->
		<view class="bg-white padding flex align-center">
			<view class="text-xxl margin-right-sm">
				<text class="cuIcon-locationfill text-pink"></text>
			</view>
			<view class="flex-sub">
				<view class="text-black">
					<text class="margin-right-xs">{{ info.receiver_name }}</text>
					<text class="text-gray">{{ info.receiver_phone }}</text>
				</view>
				<view class="text-black">
					<text>{{ info.receiver_province }}</text>
					<text class="margin-left-xs">{{ info.receiver_city }}</text>
					<text class="margin-left-xs">{{ info.receiver_district }}</text>
					<text class="margin-left-xs">{{ info.receiver_address }}</text>
				</view>
			</view>
		</view>

		<!-- 商品信息 -->
		<view class="bg-white margin-top">
			<view class="cu-bar bottom-border">
				<view class="action">
					<text class="cuIcon-titles text-red"></text>
					<text>商品信息</text>
				</view>
			</view>

			<view class="cu-list goods-list">
				<view class="cu-item flex padding-sm" v-for="(goodsItem,goodsIndex) in info.goods_list" :key="goodsItem.id">
					<view class="image-wrapper radius lg" :class="{loaded: goodsItem.loaded}">
						<image :src="goodsItem.goods_cover" mode="aspectFit" lazy-load="true"
						       @load="imageOnLoad(goodsItem)"></image>
					</view>
					<view class="content flex-sub padding-lr-sm">
						<view class="title ellipsis-2 text-black">{{ goodsItem.goods_title }}</view>
						<view class="text-gray text-sm margin-top-xs">
							<text>{{ goodsItem.goods_spec || '' }}</text>
						</view>
						<view class="">
							<button class="cu-btn text-sm" @tap.stop.prevent="linkTo"
							        :data-url="'../refund/apply?order_goods_id='+goodsItem.id">退款</button>
						</view>
					</view>
					<view class="action">
						<view class="text-price text-red text-lg text-bold text-right">{{ goodsItem.goods_price }}</view>
						<view class="text-black text-sm text-right">×{{ goodsItem.goods_num }}</view>
					</view>
				</view>
			</view>

			<view class="padding-lr padding-tb-sm">
				<view class="flex text-sm">
					<view class="flex-sub">商品总价</view>
					<view class="flex-sub text-right text-price">{{info.total_amount}}</view>
				</view>
				<view class="flex text-sm margin-top-sm">
					<view class="flex-sub">运费</view>
					<view class="flex-sub text-right text-price">{{info.delivery_amount}}</view>
				</view>
				<view class="flex text-lg text-black margin-top">
					<view class="flex-sub">需付费</view>
					<view class="flex-sub text-right text-price text-red">{{info.pay_amount}}</view>
				</view>
			</view>
		</view>

		<!-- 订单信息 -->
		<view class="bg-white margin-top order-info">
			<view class="cu-bar bottom-border">
				<view class="action">
					<text class="cuIcon-titles text-red"></text>
					<text>订单信息</text>
				</view>
			</view>
			<view class="padding-lr padding-tb-sm text-sm">
				<view class="flex">
					<view class="title">订单号：</view>
					<view class="flex-sub">{{info.order_no}}</view>
					<view class="text-blue" @tap="copy(info.order_no)">复制</view>
				</view>
				<view class="flex margin-top-sm">
					<view class="title">下单时间：</view>
					<view class="flex-sub">{{info.create_time | date(true)}}</view>
				</view>
				<view class="flex margin-top-sm" v-if="info.pay_status==20 && info.pay_amount>0">
					<view class="title">支付方式：</view>
					<view class="flex-sub">
						<text v-if="info.pay_type===10">余额支付</text>
						<text v-else-if="info.pay_type===20">微信支付</text>
						<text v-else-if="info.pay_type===30">支付宝支付</text>
					</view>
				</view>
				<view class="flex margin-top">
					<view class="title">订单备注：</view>
					<view class="flex-sub">{{info.buyer_remark}}</view>
				</view>
			</view>
		</view>

		<!-- 物流信息 -->
		<view class="bg-white margin-top order-info" v-if="info.delivery_type==10 && info.delivery_status==20">
			<view class="cu-bar bottom-border">
				<view class="action">
					<text class="cuIcon-titles text-red"></text>
					<text>物流信息</text>
				</view>
			</view>
			<view class="padding-lr padding-tb-sm text-sm">
				<view class="flex">
					<view class="title">物流单号：</view>
					<view class="flex-sub">{{info.express_no}}</view>
					<view class="text-blue" @tap="copy(info.express_no)">复制</view>
				</view>
				<view class="flex margin-top-sm">
					<view class="title">物流名称：</view>
					<view class="flex-sub">{{info.express_company}}</view>
				</view>
				<view class="flex margin-top-sm">
					<view class="title">发货时间：</view>
					<view class="flex-sub">{{info.delivery_time | date(true)}}</view>
				</view>
			</view>
		</view>

		<!-- 底部操作栏 -->
		<view class="cu-bar bg-white foot flex justify-end padding-lr">
			<button class="cu-btn round text-sm margin-left-sm"
			        @tap.stop.prevent="deleteOrder" v-if="info.order_status===0">删除订单</button>
			<button class="cu-btn round text-sm margin-left-sm"
			        @tap.stop.prevent="cancelOrder" v-if="info.order_status===10">取消订单</button>
			<button class="cu-btn bg-red round text-sm margin-left-sm"
			        @tap.stop.prevent="payOrder" v-if="info.order_status===10">立即支付</button>
			<button class="cu-btn round text-sm margin-left-sm"
			        @tap.stop.prevent="linkTo" :data-url="'./express?id='+info.id"
			        v-if="info.delivery_type==10 && info.delivery_status==20">查看物流</button>
			<button class="cu-btn bg-red round text-sm margin-left-sm"
			        @tap.stop.prevent="confirmOrder" v-if="info.order_status===20 || info.order_status===30">确认收货</button>
			<button class="cu-btn bg-red round text-sm margin-left-sm"
			        @tap.stop.prevent="confirmOrder" v-if="info.order_status===40">去评价</button>
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
			};
		},
		onLoad(options) {
			this.id = parseInt(options.id);

			if (isNaN(this.id)) {
				uni.$hintError('参数错误！');
				return uni.$delayNavigateBack();
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
				return uni.$model.mall.getOrderDetail(this.id).then(res => {
					this.info = res;
					this.loaded = true;
				});
			},

			// 删除订单
			deleteOrder() {
				uni.showModal({
					content: '是否确认删除订单？',
					success: (res) => {
						if (res.cancel) {
							return;
						}

						uni.$model.mall.deleteOrder(this.id, {
							loading: this,
							hint: this,
						}).then((res) => {
							this.hintSuccess('订单已删除！');
							uni.$delayNavigateBack(1000);
						});
					}
				});
			},

			//取消订单
			cancelOrder(index) {
				uni.showModal({
					content: '是否确认取消订单？',
					success: (res) => {
						if (res.cancel) {
							return;
						}

						uni.$model.mall.setOrderCancel(this.id, {
							loading: this,
							hint: this,
						}).then((res) => {
							this.parseOrderStatus(0);
							this.hintSuccess('订单已取消！');
						});
					}
				});
			},

			// 支付订单
			payOrder(index) {
				// 更新列表
				const updateList = () => {
					this.parseOrderStatus(20);
				};

				const payTypeMap = {
					0: 10,
					1: 20
				};
				uni.showActionSheet({
					itemList: ['余额支付', '微信支付'],
					success: (res) => {
						const type = payTypeMap[res.tapIndex];

						uni.$model.mall.getOrderPaymentInfo({
							id: this.id,
							type: type
						}, {
							loading: this,
							hint: this,
						}).then((res) => {
							if (res.state === 1) { // 余额支付
								updateList();
								this.hintSuccess('已支付！');
							} else { // 微信支付
								uni.requestPayment({
									...res,
									success: () => {
										updateList();
										this.hintSuccess('已支付！');
									}
								});
							}
						});
					}
				});
			},

			// 确认订单
			confirmOrder(index) {
				uni.showModal({
					title: '确认收到货了吗？',
					content: '为了保障您的售后权益，请收到商品检查无误后再确认收货？',
					success: (res) => {
						if (res.cancel) {
							return;
						}

						uni.$model.mall.setOrderReceipt(this.id, {
							loading: this,
							hint: this,
						}).then((res) => {
							//确认订单后删除待收货列表，增加待评价列表
							this.parseOrderStatus(40);
							this.hintSuccess('已确认收货！');
						});
					}
				});
			},

			// 重新解析订单状态
			parseOrderStatus(state) {
				const { stateTip, stateTipColor } = uni.$model.mall.parseOrderState(state);

				this.info.order_status = state;
				this.info.stateTip = stateTip;
				this.info.stateTipColor = stateTipColor;
			},
		}
	}
</script>

<style scoped>
	.page {
		padding-bottom: 130upx;
	}

	.order-status {
		padding: 100upx 30upx;
		text-align: center;
		font-size: 24px;
		font-weight: bold;
	}

	.goods-list .cu-item .title {
		font-size: 16px;
		font-weight: bold;
		color: #333333;
		height: 80upx;
	}

	.goods-list .cu-item .image-wrapper {
		width: 160rpx;
		height: 160rpx;
	}

	.order-info .title {
		width: 160upx;
	}
</style>
