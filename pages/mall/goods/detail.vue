<template>
	<custom-page class="page" :loaded="loaded || loadError" @refresh="loadData">
		<template v-if="loaded">
			<!-- 商品轮播图 -->
			<view class="" style="overflow: hidden;">
				<swiper class="screen-swiper round-dot" style="min-height: 356rpx;"
						:indicator-dots="true" :circular="true"
						:autoplay="false" interval="5000" duration="500"
						@tap="previewImage" :data-urls="swiperList">
					<swiper-item v-if="info.video">
						<video :src="info.video" :controls="false"></video>
					</swiper-item>
					<swiper-item v-for="(item,index) in swiperList" :key="index" :data-current="index">
						<image :src="item" mode="aspectFill"></image>
					</swiper-item>
				</swiper>
			</view>
			<!-- /商品轮播图 -->

			<!-- 商品基本信息 -->
			<view class="margin padding radius bg-white" style="overflow: hidden;">
				<view class="favorite text-sm" @tap="toggleFavorite">
					<template v-if="info.is_favorite">
						<view class="cuIcon-favorfill text-orange text-xxl"></view>
						<text>想买</text>
					</template>
					<template v-else>
						<view class="cuIcon-favor text-xxl"></view>
						<text>想买</text>
					</template>
				</view>
				<view class="text-xl text-black">{{ info.title }}</view>


				<view class="margin-top">
					<view class="cu-tag light bg-red sm">特价</view>
					<view class="cu-tag light bg-red sm">24h发货</view>
					<view class="cu-tag light bg-red sm" v-if="info.is_free_freight">包邮</view>
				</view>
				<view class="text-gray margin-top">
					<view class="">规格：</view>
					<view class="">场景：</view>
				</view>

				<view class="margin-top">
					<text class="text-price text-red text-xl">{{ info.price }}</text>
					<text class="text-price text-gray margin-left-sm"
						  style="text-decoration: line-through;">{{ info.market_price }}
					</text>
				</view>
			</view>
			<!-- /商品基本信息 -->

			<!-- 商品优惠信息 -->
			<view class="margin radius bg-white goods-discount" style="overflow: hidden;">
				<view class="cu-bar">
					<view class="action text-bold">商品优惠</view>
				</view>
				<view class="item">
					<view class="cu-item-title">
						<view class="cu-tag light bg-red sm">样品</view>
					</view>
					<text>样品每人限购3份，超出则该商品全部按原价</text>
				</view>
				<view class="item">
					<view class="cu-item-title">
						<view class="cu-tag light bg-red sm">券</view>
					</view>
					<text>可使用优惠券</text>
				</view>
				<view class="item">
					<view class="cu-item-title">
						<view class="cu-tag light bg-red sm">赠送</view>
					</view>
					<text>购买正品赠送【麻辣火锅】</text>
				</view>
				<view class="item">
					<view class="cu-item-title">
						<view class="cu-tag light bg-red sm">赠送</view>
					</view>
					<text>该商品享受7折优惠</text>
				</view>
				<view class="item text-sm text-grey solid-top">
					<text class="cuIcon-info margin-right-xs"></text>
					<text>样品不支持7天无理由退换货</text>
				</view>
			</view>
			<!-- /商品优惠信息 -->

			<!-- 发圈素材 -->
			<view class="margin radius bg-white" style="overflow: hidden;">
				<view class="cu-bar">
					<view class="action text-bold">发圈素材</view>
					<view class="action">
						<button class="cu-btn round line-grey sm">下载素材</button>
					</view>
				</view>
				<view class="padding-lr">
					<view class="grid col-4 grid-square">
						<view class="bg-img" v-for="(item,index) in avatar" :key="index"
							  :style="[{ backgroundImage:'url(' + avatar[index] + ')' }]"></view>
					</view>
				</view>
			</view>
			<!-- /发圈素材 -->

			<!-- 发圈文案 -->
			<view class="margin radius bg-white" style="overflow: hidden;">
				<view class="cu-bar">
					<view class="action text-bold">发圈文案</view>
					<view class="action">
						<button class="cu-btn round line-grey sm">复制文案</button>
					</view>
				</view>
				<view class="padding">
					发圈文案发圈文案发圈文案发圈文案发圈文案
				</view>
			</view>
			<!-- /发圈文案 -->

			<!-- 商品详情 -->
			<view class="margin radius bg-white" style="overflow: hidden;">
				<view class="cu-bar">
					<view class="action text-bold">商品详情</view>
				</view>
				<view class="padding rich-text bg-white" style="padding-top: 0;">
					<MPHtml :content="info.content" />
				</view>
			</view>
			<!-- /商品详情 -->

			<custom-titlebar :transparent="true" title="最近浏览" class="margin-top"></custom-titlebar>
			<GoodsList :list="goodsList" :row="true" :radius="true"></GoodsList>

			<!-- 食品顾问 -->
			<view class="margin flex">
				<image src="../../../static/bg/wallet.png" mode="widthFix" style="width: 100%;"></image>
			</view>
			<!-- /食品顾问 -->

			<!-- 食品顾问 -->
			<view class="fixed-share-btn" @tap="showShareTap">
				<image src="../../../static/icon/wechat.png" mode="aspectFill"></image>
			</view>
			<!-- /分销按钮 -->

			<!-- 商品详情 -->
			<custom-share-popup ref="sharePopup"></custom-share-popup>
			<!-- /商品详情 -->

			<!-- 商品规格 -->
			<GoodsSku ref="sku" :info="info" />
			<!-- /商品规格 -->

			<!-- 底部操作栏 -->
			<view class="cu-bar bg-white tabbar shop foot">
				<!-- #ifdef MP -->
				<!-- 			<button class="action" open-type="contact">
					<view class="cuIcon-service text-green"></view>
					<text>客服</text>
				</button> -->
				<!-- #endif -->
				<view class="action" @tap="linkTo" data-url="../cart/index">
					<view class="cuIcon-cart">
						<view class="cu-tag badge" v-if="info.cart_count">{{info.cart_count}}</view>
					</view>
					购物车
				</view>
				<view class="cu-btn bg-green round" @tap="toBuy(1)">试样品</view>
				<view class="btn-group flex flex-sub">
					<view class="cu-btn bg-orange round flex-sub btn-shoppcart" @tap="toShoppingCart">加入购物车</view>
					<view class="cu-btn bg-red round flex-sub btn-buy"
						  @tap="toBuy()">立即订购</view>
				</view>
			</view>
			<!-- /底部操作栏 -->
		</template>
		<custom-empty type="loaderr" v-else-if="loadError"></custom-empty>
	</custom-page>
</template>

<script>
	import MPHtml from '@/components/mp-html/mp-html';
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue";
	import GoodsList from '../components/goods-list';
	import GoodsSku from '../components/goods-sku.vue';
	import GoodsEvaluateList from '../components/goods-evaluate-list.vue';

	export default {
		components: {
			MPHtml,
			uniNumberBox,
			GoodsSku,
			GoodsList,
			GoodsEvaluateList
		},
		data() {
			return {
				info: null,
				loaded: false,
				loadError: false,

				chooseSpec: [],

				goodsList: [],
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
			this.loadGoodsData();
		},

		onPullDownRefresh() {
			this.loadData().finally(() => {
				uni.stopPullDownRefresh();
			});

			this.loadGoodsData();
		},

		methods: {
			// 加载数据
			loadData() {
				return uni.$models.mall.getGoodsDetail(this.id).then(res => {
					this.info = res;
					this.loaded = true;
				}, () => {
					if (!this.loaded) {
						this.loadError = true;
					}
				});
			},

			// 加载商品数据
			loadGoodsData() {
				return uni.$models.mall.getGoodsList({
					limit: 10,
				}).then(res => {
					this.goodsList = res.data;
				});
			},

			// 商品收藏
			toggleFavorite() {
				const options = {
					loading: this,
					hint: this
				};
				if (!this.info.is_favorite) {
					return uni.$models.user.favorite('goods', this.id, options).then(res => {
						this.info.is_favorite = 1;
					});
				} else {
					return uni.$models.user.unfavorite('goods', this.id, options).then(res => {
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

			// 显示分享
			showShareTap() {
				this.$refs.sharePopup.open();
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
			toBuy(sample = 0) {
				this.toChooseSpec('buy').then((res) => {
					if (res.cancel) {
						return;
					}

					uni.$logged({
						loginUserInfo: true
					}).then(() => {
						uni.navigateTo({
							url: `../order/create?goods_id=${this.info.id}&goods_sku_id=${res.sku.id}&count=${res.count}&sample=${sample}`
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

	.screen-swiper video {
		pointer-events: all;
	}

	.favorite {
		float: right;
		text-align: center;
	}

	.cu-item-title {
		width: 140rpx;
	}

	.goods-discount .item {
		padding: 20rpx 30rpx;
		word-break: break-all;
	}

	.goods-discount .cu-item-title {
		width: 76rpx;
		display: inline-block;
	}

	.cu-bar.tabbar.shop .action {
		width: 96rpx;
		font-size: 20rpx;
	}

	.cu-bar.tabbar.shop .action [class*="cuIcon-"] {
		width: 54rpx;
	}

	.cu-bar.tabbar.shop .btn-group {
		justify-content: space-between;
	}

	.btn-shoppcart {
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
	}

	.btn-buy {
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
	}

	.fixed-share-btn {
		position: fixed;
		right: 30rpx;
		bottom: 160rpx;
		width: 96rpx;
		height: 96rpx;
	}

	.fixed-share-btn image {
		position: absolute;
		height: 100%;
		width: 100%;
	}
</style>
