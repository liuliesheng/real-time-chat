<template>
	<view class="page" v-if="loaded">
		<XLoading />
		<Hint />

		<view class="status-tips bg-gradual-orange">
			{{info.stateTip}}
		</view>

		<!-- 售后商品信息 -->
		<view class="bg-white margin-top">
			<view class="cu-bar bottom-border">
				<view class="action">
					<text class="cuIcon-titles text-red"></text>
					<text>售后商品信息</text>
				</view>
			</view>

			<view class="cu-list goods-list">
				<view class="cu-item flex padding-sm">
					<view class="image-wrapper radius lg">
						<image :src="info.order_goods.goods_cover" mode="aspectFit" lazy-load="true"></image>
					</view>
					<view class="content flex-sub padding-lr-sm">
						<view class="title ellipsis-2 text-black">{{ info.order_goods.goods_title }}</view>
						<view class="text-gray text-sm margin-top-xs">
							<text>{{ info.order_goods.goods_spec || '' }}</text>
						</view>
						<view class="text-black">
							<text>退款：</text>
							<text>￥{{item.refund_money}}</text>
						</view>
					</view>
					<view class="action">
						<view class="text-price text-red text-lg text-bold text-right">{{ info.order_goods.goods_price }}</view>
						<view class="text-black text-sm text-right">×{{ info.order_goods.goods_num }}</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 收货地址信息 -->
		<view class="bg-white margin-top">
			<view class="cu-bar bottom-border">
				<view class="action">
					<text class="cuIcon-titles text-red"></text>
					<text>售后商品信息</text>
				</view>
				<view class="action text-blue text-sm" @tap="onCopyReceiver">复制</view>
			</view>
			<view class="flex align-center padding">
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
				return uni.$delayNavigateBack(1000);
			}

			this.loadData();
		},
		methods: {
			// 加载数据
			loadData() {
				return uni.$model.mall.getRefundDetail(this.id).then(res => {
					this.info = res;
					this.loaded = true;
				});
			},

			// 复制收货信息
			onCopyReceiver() {
				uni.setClipboardData({
					data: [
						"联系人：" + this.info.receiver_name,
						"手机号：" + this.info.receiver_phone,
						"收货地址：" + this.info.receiver_province + this.info.receiver_city +
						this.info.receiver_district + this.info.receiver_address,
					].join('\n'),
					success: () => {
						uni.$hintSuccess("已复制");
					}
				});
			}
		}
	}
</script>

<style scoped>
	.page {
		padding-bottom: 130upx;
	}

	.status-tips {
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
</style>
