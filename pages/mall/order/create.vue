<template>
	<view class="page" v-if="loaded">

		<!--收货地址-->
		<view class="flex align-center bg-white padding"
		      @tap="linkTo" data-url="/pages/user/address/list?source=1">
			<view class="text-xxl margin-right-sm">
				<text class="cuIcon-locationfill text-pink"></text>
			</view>
			<view class="flex-sub">
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
			<view class="cuIcon-right text-gray"></view>
		</view>

		<!--商品列表-->
		<view class="cu-list goods-list" v-if="info.goods.length">
			<view class="cu-item flex padding-sm"
			      v-for="(item,index) in info.goods" :key="item.id"
			      @tap="linkTo" :data-url="'../goods/detail?id='+item.goods_id">
				<view class="image-wrapper radius lg">
					<image :src="item.goods_cover" mode="aspectFit" lazy-load="true"></image>
				</view>
				<view class="content flex-sub padding-lr-sm">
					<view class="title ellipsis-2 text-black">{{ item.title }}</view>
					<view class="text-gray text-sm margin-top-xs">
						<text>{{ item.spec || '' }}</text>
					</view>
					<view class="flex margin-top-xs" @tap.stop.prevent="stopPrevent">
						<view class="flex-sub text-lg text-bold">
							<text class="text-price text-red">{{ item.price }}</text>
						</view>
						<view style="display: inline-block;">
							<uni-number-box :min="1" :max="100" size="sm"
							                :value="item.num"
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
				<view class="action text-black text-price text-bold">0.00</view>
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
					<text class="text-red text-price text-bold">0.00</text>
				</view>
			</view>
		</view>

		<!--底部栏-->
		<view class="cu-bar foot padding-lr bg-white">
			<view class="flex-sub">
				<text class="text-xxl text-price text-bold text-red">0.00</text>
			</view>
			<view class="">
				<button class="cu-btn bg-red round">提交订单</button>
			</view>
		</view>

		{{info}}
	</view>
	<PageLoad v-else />
</template>

<script>
	export default {
		data() {
			return {
				goodsId: null,
				cartIds: null,

				info: null,
				loaded: false
			};
		},
		onLoad(options) {
			if (options.goods_id) {
				this.goodsId = +options.goods_id;
				if (!this.goodsId) {
					uni.$hintError('参数错误！');
					return uni.$delayNavigateBack(1500);
				}
			} else if (options.cart_ids) {
				this.cartIds = options.cart_ids;
				if (!this.cart_ids) {
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
						goods_id: this.goodsId
					}).then((res) => {
						this.info = res;
						this.loaded = true;
					});
				} else {
					return uni.$model.mall.getAdvanceOrderFormShoppingCart({
						goods_id: this.goodsId
					}).then((res) => {
						this.info = res;
						this.loaded = true;
					});
				}
			},

			// 用户重新选择了地址
			onChoiceAddress(info) {
				console.log(info)
				this.$set(this.info, 'user_address', info);
			}
		}
	}
</script>

<style scoped>
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
