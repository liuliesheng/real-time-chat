<template>
	<view class="page" v-if="loaded">
		<XLoading />
		<Hint />

		<!--收货地址-->
		<view class="flex align-center bg-white padding"
		      @tap="linkTo" data-url="/pages/user/address/list?source=1">
			<view class="text-xxl margin-right-sm">
				<text class="cuIcon-locationfill text-pink"></text>
			</view>
			<view class="flex-sub" v-if="info.user_address">
				<view class="text-black">
					<text class="cu-tag bg-red radius text-xs user-address-default"
					      v-if="info.user_address.is_default">默认</text>
					<text>{{info.user_address.province}}{{info.user_address.city}}{{info.user_address.district}}</text>
				</view>
				<view class="text-black text-bold text-xl margin-top-sm">{{info.user_address.address}}</view>
				<view class="text-black margin-top-sm">
					<text>{{info.user_address.name}}</text>
					<text class="margin-left-sm">{{info.user_address.phone}}</text>
				</view>
			</view>
			<view class="flex-sub" v-else>添加收货地址</view>
			<view class="cuIcon-right text-gray"></view>
		</view>

		<!--商品列表-->
		<view class="cu-list goods-list" v-if="info.goods_list.length">
			<view class="cu-item flex padding-sm"
			      v-for="(item,index) in info.goods_list" :key="item.id"
			      @tap="linkTo" :data-url="'../goods/detail?id='+item.goods_id">
				<view class="image-wrapper radius lg">
					<image :src="item.goods_cover" mode="aspectFit" lazy-load="true"></image>
				</view>
				<view class="content flex-sub padding-lr-sm">
					<view class="title ellipsis-2 text-black">{{ item.goods_title }}</view>
					<view class="text-gray text-sm margin-top-xs">
						<text>{{ item.goods_spec || '' }}</text>
					</view>
					<view class="flex margin-top-xs" @tap.stop.prevent="stopPrevent">
						<view class="flex-sub text-lg text-bold">
							<text class="text-price text-red">{{ item.goods_price }}</text>
						</view>
						<view style="display: inline-block;">
							<uni-number-box :min="1" :max="100" size="sm" :value="item.goods_num"
							                @change="changeItemNum(item,$event)">
							</uni-number-box>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!--订单金额信息-->
		<view class="cu-list menu price-info">
			<view class="cu-item">
				<view class="content">商品金额</view>
				<view class="action text-black text-price text-bold">{{goodsTotalAmount}}</view>
			</view>
			<view class="cu-item">
				<view class="content">运费</view>
				<view class="action text-black text-price text-bold">0.00</view>
			</view>
			<view class="cu-item arrow">
				<view class="content">优惠券</view>
				<view class="action">
					<text class="text-red" v-if="info.user_coupon_list.length">{{info.user_coupon_list.length}}张可用</text>
					<text class="text-gray" v-else>无可用</text>
				</view>
			</view>
			<view class="cu-item solid-top">
				<view class="content"></view>
				<view class="action">
					<text class="text-black">合计：</text>
					<text class="text-red text-price text-bold">{{orderAmount}}</text>
				</view>
			</view>
		</view>

		<!--支付方式-->
		<view class="cu-bar">
			<view class="action">支付方式</view>
		</view>
		<radio-group class="block">
			<!-- #ifndef MP-ALIPAY -->
			<view class="cu-form-group" @tap.stop="payType='20'">
				<view class="title">
					<text class="text-xxl margin-right-xs">
						<text class="cuIcon-weixin text-green"></text>
					</text>
					<text>微信支付</text>
				</view>
				<radio class='radio' :checked="payType=='20'"></radio>
			</view>
			<!-- #endif -->
			<view class="cu-form-group" @tap.stop="payType='10'">
				<view class="title">
					<text class="text-xxl margin-right-xs" style="vertical-align: sub;">
						<text class="cuIcon-card text-pink"></text>
					</text>
					<text>余额支付</text>
					<text class="text-sm text-red">(￥{{info.user_balance}})</text>
				</view>
				<radio class='radio' :checked="payType=='10'"></radio>
			</view>
		</radio-group>

		<!--底部栏-->
		<view class="cu-bar foot padding-lr bg-white">
			<view class="flex-sub">
				<text class="text-xxl text-price text-bold text-red">{{orderAmount}}</text>
			</view>
			<view class="">
				<button class="cu-btn bg-red round" @tap="goOrder" :disabled="isGoOrder || isSubmitDisabled">提交订单</button>
			</view>
		</view>

	</view>
	<PageLoad v-else />
</template>

<script>
	export default {
		data() {
			return {
				// 根据商品信息购买
				goodsId: null,
				goodsSkuId: null,
				goodsNum: 1,

				// 根据购物车信息购买
				cartIds: null,

				info: null,
				loaded: false,

				// 支付方式
				payType: '10',

				// 是否下单中
				isGoOrder: false
			};
		},
		computed: {
			// 商品总金额
			goodsTotalAmount() {
				const result = this.info.goods_list.reduce((result, item) => {
					return result.plus(item.total_price);
				}, uni.$BigNumber(0));
				return result.toFixed(2);
			},
			// 订单支付金额
			orderAmount() {
				return this.goodsTotalAmount;
			},

			// 是否禁用提交订单按钮
			isSubmitDisabled() {
				// 如果不是余额支付，则忽略
				if ('10' != this.payType) {
					return false;
				}

				return uni.$BigNumber(this.orderAmount).gt(this.info.user_balance);
			}
		},
		onLoad(options) {
			if (options.goods_id && options.goods_sku_id) {
				this.goodsId = +options.goods_id;
				this.goodsSkuId = +options.goods_sku_id;
				this.goodsNum = +options.count;
				this.goodsNum = this.goodsNum || 1;
				if (!this.goodsId) {
					uni.$hintError('参数错误！');
					return uni.$delayNavigateBack(1500);
				}

				if (!this.goodsSkuId) {
					uni.$hintError('参数错误！');
					return uni.$delayNavigateBack(1500);
				}
			} else if (options.cart_ids) {
				this.cartIds = options.cart_ids;
				if (!this.cartIds) {
					uni.$hintError('参数错误！');
					return uni.$delayNavigateBack(1500);
				}
			} else {
				uni.$hintError('参数错误！');
				return uni.$delayNavigateBack(1500);
			}

			this.loadData();
		},
		methods: {
			// 加载数据
			loadData() {
				const options = {
					hint: this
				};
				if (this.goodsId) {
					return uni.$model.mall.getAdvanceOrderFormGoods({
						goods_id: this.goodsId,
						goods_sku_id: this.goodsSkuId,
						goods_num: this.goodsNum,
					}).then((res) => {
						this.info = res;
						this.loaded = true;
					});
				} else {
					return uni.$model.mall.getAdvanceOrderFormCart({
						ids: this.cartIds
					}).then((res) => {
						this.info = res;
						this.loaded = true;
					});
				}
			},

			// 用户重新选择了地址
			onChoiceAddress(info) {
				this.$set(this.info, 'user_address', info);
			},

			// 改变商品数量
			changeItemNum(item, num) {
				item.goods_num = num;
				this.calcItemTotalPrice(item);
				item.total_price = uni.$BigNumber(item.goods_price).multipliedBy(num).toFixed(2);
			},

			// 计算商品总价格
			calcItemTotalPrice(item) {
				const totalPrice = uni.$BigNumber(item.goods_price)
					.multipliedBy(item.goods_num).toFixed(2);
				this.$set(item, 'total_price', totalPrice);
			},

			// 立即下单
			goOrder() {
				if (this.isGoOrder) {
					return;
				}

				if (!this.info.user_address) {
					return uni.$hintError("请选择收货地址！");
				}

				const order = {
					platform: 'wx_mini',
					receiver_name: this.info.user_address.name,
					receiver_phone: this.info.user_address.phone,
					receiver_gender: this.info.user_address.gender,
					receiver_province: this.info.user_address.province,
					receiver_city: this.info.user_address.city,
					receiver_district: this.info.user_address.district,
					receiver_address: this.info.user_address.address,
				};

				this.isGoOrder = true;
				if (this.goodsId) {
					return uni.$model.mall.createOrderFormGoods(Object.assign({
						goods_id: this.goodsId,
						goods_sku_id: this.goodsSkuId,
						goods_num: this.info.goods_list[0].goods_num,
					}, order), {
						successTips: false
					}).then((info) => {
						this.goPay(info);
					}, () => {
						this.isGoOrder = false;
					});
				} else {
					return uni.$model.mall.createOrderFormCart(Object.assign({
						ids: this.cartIds,
					}, order), {
						successTips: false
					}).then((info) => {
						this.goPay(info);
					}, () => {
						this.isGoOrder = false;
					});
				}
			},

			// 去支付
			goPay(order) {
				uni.$model.mall.getOrderPaymentInfo({
					id: order.id,
					type: this.payType
				}, {
					loading: this,
					hint: this,
				}).then((res) => {
					if (res.state === 1) { // 余额支付
						this.hintSuccess('已支付！');
					} else { // 微信支付
						uni.requestPayment({
							...res,
							success: () => {
								this.hintSuccess('已支付！');
							}
						});
					}
				}).finally(() => {
					setTimeout(() => {
						uni.redirectTo({
							url: './list'
						});
					}, 1500);
				});
			}
		}
	}
</script>

<style scoped>
	.page {
		padding-bottom: 130upx;
	}

	.user-address-default {
		line-height: 1.2;
		height: auto;
		padding: 4upx 6upx;
		margin-right: 6upx;
	}

	.goods-list {
		margin-top: 30upx;
		background-color: white;
	}

	.goods-list .cu-item .title {
		font-size: 16px;
		line-height: 1.2;
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

	.cu-list.menu.price-info>.cu-item:after {
		width: 0;
	}

	.cu-list.menu.price-info>.cu-item.solid-top::after {
		left: 30upx;
		top: 0;
		width: calc(200% - 120upx);
		border-top: 1upx solid rgba(0, 0, 0, 0.1);
	}
</style>
