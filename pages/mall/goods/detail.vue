<template>
	<custom-page class="page" :loaded="loaded" @refresh="loadData">
		<template v-if="loaded">
			<!-- 商品轮播图 -->
			<view class="" style="overflow: hidden;">
				<swiper class="screen-swiper round-dot" style="min-height: 356rpx;"
						:indicator-dots="true" :circular="true"
						:autoplay="true" interval="5000" duration="500"
						@tap="previewImage" :data-urls="swiperList">
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

				<view class="flex justify-between margin-top">
					<view class="">销量: {{ info.sale_count }}</view>
					<view class="">浏览量: {{ info.view_count }}</view>
				</view>
			</view>
			<!-- /商品基本信息 -->

			<!-- 商品优惠信息 -->
			<view class="bg-white cu-list menu">
				<view class="cu-item arrow" @tap="toChooseSpec">
					<view class="cu-item-title">购买类型</view>
					<view class="flex-sub">
						<text v-if="chooseSpec.length">{{chooseSpecText}}</text>
						<text v-else>选择规格</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="cu-item-title">优惠券</view>
					<view class="flex-sub text-red">
						<text v-if="info.coupon && info.coupon.length">选择优惠券</text>
						<text v-else>无</text>
					</view>
				</view>
				<!--<view class="cu-item">
				<view class="cu-item-title">促销活动</view>
				<view class="flex-sub">
					<view>新人首单送20元无门槛代金券</view>
					<view>订单满50减10</view>
					<view>订单满100减30</view>
					<view>单笔购买满两件免邮费</view>
				</view>
			</view> -->
				<view class="cu-item" v-if="info.services&&info.services.length">
					<view class="cu-item-title">服务</view>
					<view class="flex-sub">{{servicesText}}</view>
				</view>
			</view>
			<!-- /商品优惠信息 -->

			<!-- 商品规格 -->
			<GoodsSku ref="sku" :info="info" />
			<!-- /商品规格 -->

			<!-- 商品评价 -->
			<view class="cu-bar bg-white margin-top solid-bottom"
				  @tap="linkTo" :data-url="'./evaluate-list?goods_id='+info.id">
				<view class="action">
					评价（{{info.evaluate_list_count}}）
				</view>
				<view class="action">
					<text class="cuIcon-right"></text>
				</view>
			</view>
			<GoodsEvaluateList :list="info.evaluate_list" />
			<!-- 商品评价 -->


			<!-- 商品详情 -->
			<view class="cu-bar bg-white margin-top solid-bottom">
				<view class="action">图文详情</view>
			</view>
			<view class="padding rich-text bg-white">
				<MPHtml :content="info.content" />
			</view>
			<!-- /商品详情 -->

			<!-- #ifdef MP-WEIXIN -->
			<ad unit-id="adunit-dca118409648c077" ad-type="video"></ad>
			<!-- #endif -->

			<!-- 底部操作栏 -->
			<view class="cu-bar bg-white tabbar shop foot">
				<!-- #ifdef MP -->
				<button class="action" open-type="contact">
					<view class="cuIcon-service text-green"></view>
					<text>客服</text>
				</button>
				<!-- #endif -->
				<view class="action" @tap="toggleFavorite">
					<template v-if="info.is_favorite">
						<view class="cuIcon-favorfill text-orange"></view>
						<text>已收藏</text>
					</template>
					<template v-else>
						<view class="cuIcon-favor"></view>
						<text>收藏</text>
					</template>
				</view>
				<view class="action" @tap="linkTo" data-url="../cart/index">
					<view class="cuIcon-cart">
						<view class="cu-tag badge" v-if="info.cart_count">{{info.cart_count}}</view>
					</view>
					购物车
				</view>
				<view class="btn-group flex">
					<view class="cu-btn bg-gradual-orange round flex-sub" @tap="toShoppingCart">加入购物车</view>
					<view class="cu-btn bg-gradual-red round flex-sub margin-left-sm"
						  @tap="toBuy">立即订购</view>
				</view>
			</view>
			<!-- /底部操作栏 -->
		</template>
	</custom-page>
</template>

<script>
	import MPHtml from '@/components/mp-html/mp-html';
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue";
	import GoodsSku from '../components/goods-sku.vue';
	import GoodsEvaluateList from '../components/goods-evaluate-list.vue';

	export default {
		components: {
			MPHtml,
			uniNumberBox,
			GoodsSku,
			GoodsEvaluateList
		},
		data() {
			return {
				info: null,
				loaded: false,
				chooseSpec: [],
			};
		},
		computed: {
			swiperList() {
				if (!this.info) {
					return [];
				}
				return this.info.picture;
			},
			chooseSpecText() {
				return this.chooseSpec.map(it => it.title).join(';');
			},
			servicesText() {
				return this.info ? this.info.services.map(it => it.title).join(' · ') : '';
			}
		},
		onLoad(options) {
			this.id = parseInt(options.id);
			if (isNaN(this.id)) {
				uni.$hintError('参数错误！');
				return uni.$back();
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
				return uni.$models.mall.getGoodsDetail(this.id).then(res => {
					this.info = res;
					this.loaded = true;
				});
			},

			// 商品收藏
			toggleFavorite() {
				const options = {
					loading: this,
					hint: this
				};
				if (!this.info.is_favorite) {
					return uni.$models.favorite.favoriteGoods(this.id, options).then(res => {
						this.info.is_favorite = 1;
					});
				} else {
					return uni.$models.favorite.unfavoriteGoods(this.id, options).then(res => {
						this.info.is_favorite = 0;
					});
				}
			},

			// 开始选择规格
			toChooseSpec(type) {
				return this.$refs.sku.open(type).then((res) => {
					if (res.confirm) {
						this.chooseSpec = res.spec;
					}

					return res;
				});
			},

			// 开始加入购物车
			toShoppingCart() {
				this.toChooseSpec('cart').then((res) => {
					if (res.cancel) {
						return;
					}

					return uni.$models.mall.addShoppingCart({
						goods_id: this.id,
						goods_sku_id: res.sku.id,
						count: res.count
					}, {
						loading: this,
						hint: this
					}).then((count) => {
						this.info.cart_count = count;
					});
				});
			},

			// 开始立即购买
			toBuy() {
				this.toChooseSpec('buy').then((res) => {
					if (res.cancel) {
						return;
					}

					uni.$logged({
						loginUserInfo: true
					}).then(() => {
						uni.navigateTo({
							url: `../order/create?goods_id=${this.info.id}&goods_sku_id=${res.sku.id}&count=${res.count}`
						});
					});
				});
			},
		}
	}
</script>

<style scoped>
	.page {
		padding-bottom: 130rpx;
	}

	.cu-item-title {
		width: 140rpx;
	}

	.cu-bar.tabbar.shop .action {
		width: 96rpx;
		font-size: 20rpx;
	}

	.cu-bar.tabbar.shop .action [class*="cuIcon-"] {
		width: 54rpx;
	}

	.cu-bar.tabbar .btn-group {
		justify-content: space-between;
	}
</style>
