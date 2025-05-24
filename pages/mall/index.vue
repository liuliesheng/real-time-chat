<template>
	<custom-page class="page" :showNavbar="false" navbarBackgroundColor="bg-gradual-red" :loaded="true">
		<!-- #ifndef H5 -->
		<!-- <block slot="navbar-title">商城</block> -->
		<!-- #endif -->

		<custom-search :show-search-btn="false" :disabled="true"
					   :height="false"
					   @searchtap="navTo('/pages/mall/goods/list')"
					   :searchClass="isShowSearchBg?'bg-white':''">
			<template v-slot:right>
				<button class="cu-btn cuIcon" open-type="contact">
					<text class="cuIcon-service"></text>
				</button>
			</template>
		</custom-search>

		<mescroll-body ref="mescrollRef" @init="mescrollInit"
					   :down="{auto:false}" :up="{auto:false,empty:false}"
					   @down="downCallback" @up="upCallback">

			<swiper class="screen-swiper round-dot" style="min-height: 256rpx;"
					:indicator-dots="true" :circular="true"
					:autoplay="true" interval="5000" duration="500">
				<swiper-item v-for="(item,index) in bannerList" :key="index">
					<video :src="item.cover" autoplay loop muted :show-play-btn="false" :controls="false"
						   objectFit="cover" v-if="item.type=='video'"></video>
					<image :src="item.cover" mode="aspectFill" v-else></image>
				</swiper-item>
			</swiper>

			<view class="margin padding-lr radius bg-white">
				<custom-nav :list="navList"></custom-nav>
			</view>

			<view class="margin radius bg-white padding-lr">
				<custom-notice :items="noticeList" @icontap="navTo('/pages/index/notices')"></custom-notice>
			</view>

			<custom-titlebar :transparent="true" title="最近浏览" class="margin-top"></custom-titlebar>
			<GoodsList :list="goodsBrowseList" :horizontal="true" :radius="true"></GoodsList>

			<!-- <custom-titlebar title="精品推荐" class="margin-top"></custom-titlebar> -->
			<view class="margin margin-bottom-sm radius" style="overflow: hidden;">
				<scroll-view scroll-x class="bg-white nav goods-nav">
					<view class="flex text-center">
						<view class="cu-item flex-sub" v-for="(item,index) in goodsNavList" :key="item.key"
							  @tap="goodsTypeTap(item.key)" :class="item.key==goodsType?'text-red cur':''">
							<view class="text-lg bold">{{item.title}}</view>
							<view class="cu-tag round sm text-xs margin-top-xs"
								  :class="{
							'bg-red':item.key==goodsType,
							'bg-white text-grey':item.key!=goodsType,
						}">{{item.desc}}</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<GoodsList :list="data" :row="true"></GoodsList>
		</mescroll-body>
	</custom-page>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import GoodsList from './components/goods-list';
	import navList from '../index/nav-list.js';

	// 在页面中定义插屏广告
	let interstitialAd = null

	export default {
		mixins: [MescrollMixin],
		components: {
			GoodsList,
		},
		data() {
			return {
				// #ifdef H5
				showNavbar: false,
				// #endif
				// #ifndef H5
				showNavbar: true,
				// #endif

				isShowSearchBg: false,

				bannerList: [],
				noticeList: [],
				navList: navList,
				goodsBrowseList: [],

				goodsNavList: [{
					title: '全部',
					desc: '猜你喜欢',
					key: 'all'
				}, {
					title: '热销',
					desc: '当季优选',
					key: 'hot'
				}, {
					title: '特价',
					desc: '临期大促',
					key: 'discount'
				}, {
					title: '人气',
					desc: '大家在买',
					key: 'view'
				}],
				goodsType: 'all',

				page: 1,
				more: true,
				data: [],

				loaded: false,
			};
		},
		onLoad() {
			this.loadData();
			this.loadGoodsData();
		},
		onPageScroll(e) {
			this.isShowSearchBg = e.scrollTop >= 45;
		},
		methods: {
			// 上拉加载数据
			upCallback(mescroll) {
				if (mescroll.num > 1) {
					this.loadGoodsData(mescroll.num).then(() => {
						mescroll.endSuccess(this.data.length, this.more);
					}, () => {
						mescroll.endErr();
					});
				} else {
					this.loadData(mescroll.num).then(() => {
						mescroll.endSuccess();
					}, () => {
						mescroll.endErr();
					});
				}
			},

			// 数据加载
			async loadData() {
				const homeData = await uni.$models.basic.getHome();

				// 轮播图
				this.bannerList = homeData.banner_list;
				if (this.bannerList.length) {
					this.titleNViewBackground = this.bannerList[0].background;
				}

				this.noticeList = (homeData.notice_list || []).map((it) => {
					return it;
				});

				// 商品分类
				this.navList = (homeData.goods_category_list || []).map(it => ({
					icon: it.cover,
					text: it.title,
					url: `/pages/mall/goods/list?cid=${it.id}`
				}));

				// 最近浏览的商品
				this.goodsBrowseList = homeData.goods_browse_list || [];

				this.loaded = true;
			},

			// 筛选商品
			goodsTypeTap: function(type) {
				this.goodsType = type;
				this.loadGoodsData();
			},

			// 加载商品数据
			loadGoodsData: function(page = 1) {
				return uni.$models.mall.getGoodsList({
					page: page,
				}).then(res => {
					this.data = page === 1 ? res.data : this.data.concat(res.data);
					this.more = res.data.length >= res.per_page;
					this.page = page;
				});
			},
		}
	}
</script>

<style>
	page {
		background-color: #f7f7f7;
	}

	.goods-nav .cu-item {
		height: auto;
		line-height: 1.2;
		padding-top: 10px;
		padding-bottom: 10px;
	}
</style>
