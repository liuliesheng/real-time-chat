<template>
	<view class="page" v-if="loaded">
		<XLoading />
		<Hint />

		<!-- 商品轮播图 -->
		<view class="" style="overflow: hidden;">
			<swiper class="screen-swiper round-dot" style="min-height: 356upx;"
			        :indicator-dots="true" :circular="true"
			        :autoplay="true" interval="5000" duration="500"
			        @tap="previewImage" :data-urls="swiperList" :data-current="index">
				<swiper-item v-for="(item,index) in swiperList" :key="index" :data-current="index">
					<image :src="item" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- /商品轮播图 -->

		<!-- 商品基本信息 -->
		<view class="padding bg-white">
			<view class="text-xl text-black">{{ info.title }}</view>
			<view class="margin-top">
				<text class="text-price text-red text-xl">{{ info.price }}</text>
				<text class="text-price text-gray margin-left-sm"
				      style="text-decoration: line-through;">{{ info.market_price }}
				</text>
			</view>

			<view class="flex margin-top">
				<view class="flex-sub">销量: {{ info.sale_count }}</view>
				<view class="flex-sub">库存: {{ info.stock }}</view>
				<view class="flex-sub">浏览量: {{ info.view_count }}</view>
			</view>
		</view>
		<!-- /商品基本信息 -->

		<!-- 商品优惠信息 -->
		<view class="bg-white cu-list menu">
			<view class="cu-item arrow" @tap="chooseSpec=true">
				<view class="cu-item-title">购买类型</view>
				<view class="flex-sub ">选择规格</view>
			</view>
			<view class="cu-item arrow">
				<view class="cu-item-title">优惠券</view>
				<view class="flex-sub text-red">选择优惠券</view>
			</view>
			<view class="cu-item">
				<view class="cu-item-title">促销活动</view>
				<view class="flex-sub">
					<view>新人首单送20元无门槛代金券</view>
					<view>订单满50减10</view>
					<view>订单满100减30</view>
					<view>单笔购买满两件免邮费</view>
				</view>
			</view>
			<view class="cu-item">
				<view class="cu-item-title">服务</view>
				<view class="flex-sub">7天无理由退换货 · 假一赔十 ·</view>
			</view>
		</view>
		<!-- /商品优惠信息 -->

		<!-- 商品规格 -->
		<view class="cu-modal bottom-modal" :class="chooseSpec?'show':''" @tap="chooseSpec=false">
			<view class="cu-dialog spec-dialog" @tap.stop.prevent="stopPrevent">

				<view class="flex padding-lr padding-tb-sm">
					<image class="spec-image margin-right radius" :src="info.cover"></image>
					<view class="flex-sub">
						<view class="text-price text-red text-lg">320.00</view>
						<view>库存：
							<text>22</text>
						</view>
						<view>已选：
							<text>XL</text>
						</view>
					</view>
				</view>

				<view class="padding-tb-sm padding-lr">
					<view class="text-lg text-gray">
						颜色
					</view>
					<view class="flex-wrap spec-val-list margin-top-sm">
						<view class="cu-tag round light bg-red">红色</view>
						<view class="cu-tag round">蓝色</view>
						<view class="cu-tag round">绿色</view>
					</view>
				</view>

				<view class="padding-tb-sm padding-lr">
					<view class="text-lg text-gray">
						颜色
					</view>
					<view class="flex-wrap spec-val-list margin-top-sm">
						<view class="cu-tag round light bg-red">红色</view>
						<view class="cu-tag round">蓝色</view>
						<view class="cu-tag round">绿色</view>
					</view>
				</view>

				<view class="padding flex flex-direction">
					<button class="cu-btn bg-red lg" @tap="chooseSpec=false">完成</button>
				</view>
			</view>
		</view>
		<!-- /商品规格 -->

		<!-- 商品评价 -->
		<view class="padding bg-white margin-top">
			<view class="">评价（65）</view>
		</view>
		<!-- 商品评价 -->

		<!-- 商品详情 -->
		<view class="padding bg-white margin-top">
			<view class="text-black text-center padding">图文详情</view>
			<view class="rich-text margin-top">
				<MPHtml :content="info.content" />
			</view>
		</view>
		<!-- /商品详情 -->

		<view class="cu-bar bg-white tabbar border shop foot">
			<button class="action" open-type="contact">
				<view class="cuIcon-service text-green">
					<view class="cu-tag badge"></view>
				</view>
				客服
			</button>
			<view class="action text-orange">
				<view class="cuIcon-favorfill"></view>
				已收藏
			</view>
			<view class="action">
				<view class="cuIcon-cart">
					<view class="cu-tag badge">99</view>
				</view>
				购物车
			</view>
			<view class="bg-orange submit">加入购物车</view>
			<view class="bg-red submit">立即订购</view>
		</view>
	</view>
	<PageLoad v-else />
</template>

<script>
	import MPHtml from '@/components/mp-html/mp-html'

	export default {
		components: {
			MPHtml
		},
		data() {
			return {
				info: null,
				loaded: false,
				chooseSpec: false,
			};
		},
		computed: {
			swiperList() {
				if (!this.info) {
					return [];
				}

				return this.info.picture;
			}
		},
		onLoad(options) {
			this.id = parseInt(options.id);
			if (isNaN(this.id)) {
				uni.$delayNavigateBack()
				return uni.$hintError('参数错误！');
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
				return uni.$model.mall.getGoodsDetail(this.id).then(res => {
					this.info = res;
					this.loaded = true;
				});
			}
		}
	}
</script>

<style scoped>
	.cu-item-title {
		width: 140rpx;
	}

	.cu-dialog.spec-dialog {
		text-align: left;
		overflow: visible;
		background-color: white;
		border-radius: 12rpx 12rpx 0 0;
	}

	.spec-image {
		width: 170rpx;
		height: 170rpx;
		margin-top: -40rpx;
		flex-shrink: 0;
	}
</style>
