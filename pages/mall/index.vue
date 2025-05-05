<template>
	<custom-page class="page" :showNavbar="false" navbarBackgroundColor="bg-gradual-red" :loaded="true">
		<!-- #ifndef H5 -->
		<!-- <block slot="navbar-title">商城</block> -->
		<!-- #endif -->

		<custom-search :show-search-btn="false" :disabled="true"
					   @searchtap="navTo('/pages/mall/goods/list')" />

		<mescroll-body ref="mescrollRef" @init="mescrollInit"
					   :down="{auto:false}" :up="{auto:false,empty:false}"
					   @down="downCallback" @up="upCallback">

			<swiper class="screen-swiper round-dot" style="min-height: 256rpx;"
					:indicator-dots="true" :circular="true"
					:autoplay="true" interval="5000" duration="500">
				<swiper-item v-for="(item,index) in swiperList" :key="index">
					<video :src="item.cover" autoplay loop muted :show-play-btn="false" :controls="false"
						   objectFit="cover" v-if="item.type=='video'"></video>
					<image :src="item.cover" mode="aspectFill" v-else></image>
				</swiper-item>
			</swiper>

			<custom-nav :list="navList"></custom-nav>

			<custom-titlebar title="优惠券"></custom-titlebar>
			<template v-for="coupon in coupons">
				<custom-coupon :coupon="coupon" class="margin"></custom-coupon>
			</template>

			<custom-titlebar title="回馈会员"></custom-titlebar>
			<custom-pic-group class="margin-bottom"></custom-pic-group>

			<custom-titlebar title="豪礼放送"></custom-titlebar>
			<custom-pic-group class="margin-bottom"></custom-pic-group>

			<custom-titlebar title="商品海报"></custom-titlebar>
			<custom-poster></custom-poster>

			<custom-titlebar title="二维码"></custom-titlebar>
			<custom-qrcode></custom-qrcode>

			<custom-titlebar title="倒计时"></custom-titlebar>
			<view class="margin">
				<text class="h6 color-gray bold">默认属性</text>
			</view>
			<view class="margin-top">
				<custom-count-down :timer="time1"></custom-count-down>
			</view>
			<view class="margin">
				<text class="h6 color-gray bold">边框形式</text>
			</view>
			<view class="margin-top">
				<custom-count-down :timer="time2"
								   fontColor="#008AFF" borderColor="#008AFF" fontSize="22rpx"
								   spacing="10rpx" splitorColor="#008AFF"></custom-count-down>
			</view>
			<view class="margin">
				<text class="h6 color-gray bold">背景形式</text>
			</view>
			<view class="margin-top">
				<custom-count-down :timer="time2"
								   fontColor="#FFFFFF" bgColor="#008AFF" borderColor="#008AFF" fontSize="22rpx"
								   spacing="10rpx" splitorColor="#008AFF"></custom-count-down>
			</view>
			<view class="margin">
				<text class="h6 color-gray bold">结束监听</text>
			</view>
			<view class="margin-top">
				<custom-count-down :splitorText="[':',':',':','']" :timer="time3" @endDo="endDo"></custom-count-down>
			</view>

			<custom-titlebar title="PK"></custom-titlebar>
			<custom-pk :title="title" :status="PKStatus" :progress="PKProgress" @choose="choose"></custom-pk>

			<custom-floating-button :list="[{text:'首页'}]"></custom-floating-button>

			<custom-titlebar title="数字键盘"></custom-titlebar>
			<custom-number-keyboard></custom-number-keyboard>

			<custom-titlebar title="音乐播放器"></custom-titlebar>
			<view style="background-color:#36395A;">
				<custom-audio-player :list="audios" />
			</view>

			<custom-titlebar title="富文本编辑器"></custom-titlebar>
			<custom-editor />
			<editor :show-img-toolbar="true" />

			<!-- #ifdef MP-WEIXIN -->
			<ad unit-id="adunit-1125620a898275d6"></ad>
			<!-- #endif -->

			<custom-titlebar title="精品推荐"></custom-titlebar>
			<GoodsList :list="goodsList"></GoodsList>
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

				navList: navList,

				swiperList: [],
				categoryList: [],

				page: 1,
				more: true,
				goodsList: [],

				loaded: false,

				coupons: [{
						color: '#9F6DFA',
						ltBg: "#FFFFFF",
						height: '180rpx',
						unit: "￥",
						number: 5,
						txt: "满50元可用",
						title: "全场通用券",
						desc: "有效期至 2018-05-20",
						btn: "领取",
						drawed: "已抢2100张"
					},
					{
						color: '#FF3456',
						ltBg: "#FFFFFF",
						height: '180rpx',
						unit: "￥",
						number: 10,
						txt: "满50元可用",
						title: "电器专场用券",
						desc: "有效期至 2018-05-28",
						btn: "已领取",
						drawed: "已抢2800张"
					},
					{
						color: '#FF8830',
						ltBg: "#FFFFFF",
						height: '180rpx',
						unit: "￥",
						number: 100,
						txt: "满500元可用",
						title: "服饰专场用券",
						desc: "有效期至 2018-05-28",
						btn: "领券"
					}
				],

				time1: uni.$timeUtil.format.datetime(new Date().getTime() + 100000, true),
				time2: uni.$timeUtil.format.datetime(new Date().getTime() + 100000, true),
				time3: uni.$timeUtil.format.datetime(new Date().getTime() + 100000, true),

				title: ['赞同', '反对'],
				PKProgress: [70, 30, '7000 票', '3000 票'],
				PKStatus: 'button',

				audios: [{
						title: "我们都一样",
						singer: "张杰",
						epname: "杰哥精选",
						coverImgUrl: "https://7465-test01-632ffe-1258717418.tcb.qcloud.la/personal/player/images/jie02.jpg?sign=00e5e68d81145037000a162e2220736a&t=1556345760",
						src: "https://7465-test01-632ffe-1258717418.tcb.qcloud.la/personal/player/song/%E6%88%91%E4%BB%AC%E9%83%BD%E4%B8%80%E6%A0%B7%20-%20%E5%BC%A0%E6%9D%B0.mp3?sign=008d62b6bea06a8a6814b5f284fac0ac&t=1556345730"
					},
					{
						title: "明天过后",
						singer: "张杰",
						epname: "杰哥精选",
						coverImgUrl: "https://7465-test01-632ffe-1258717418.tcb.qcloud.la/personal/player/images/jie01.jpg?sign=0d4ea8bb72553d22404e2fe8d3866d05&t=1556206405",
						src: "https://7465-test01-632ffe-1258717418.tcb.qcloud.la/personal/player/song/%E6%98%8E%E5%A4%A9%E8%BF%87%E5%90%8E%20-%20%E5%BC%A0%E6%9D%B0.mp3?sign=ffdea83268ce7f0eb76e70f514a9fa44&t=1556119851"
					}
				]
			};
		},
		onLoad() {
			// 在页面onLoad回调事件中创建插屏广告实例
			// #ifdef MP-WEIXIN
			if (wx.createInterstitialAd) {
				interstitialAd = wx.createInterstitialAd({
					adUnitId: 'adunit-3e248324e734cf57'
				})
				interstitialAd.onLoad(() => {});
				interstitialAd.onError((err) => {});
				interstitialAd.onClose(() => {});
				interstitialAd.createTime = Math.floor(new Date().getTime());
			}
			// #endif

			this.loadData();
		},
		onShow() {
			const now = Math.floor(new Date().getTime());
			// 在适合的场景显示插屏广告
			if (interstitialAd && now - 5 > interstitialAd.createTime) {
				interstitialAd.show().catch((err) => {
					console.error(err)
				})
			}
		},
		methods: {
			// 上拉加载数据
			upCallback(mescroll) {
				if (mescroll.num > 1) {
					this.loadGoodsData(mescroll.num).then(() => {
						mescroll.endSuccess(this.goodsList.length, this.more);
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
				const baseConfig = await uni.$http.get('app/mall/index/index');

				// 轮播图
				const swiperList = baseConfig.banners;
				this.swiperList = swiperList;
				if (this.swiperList.length) {
					this.titleNViewBackground = swiperList[0].background;
				}

				// 商品分类
				this.categoryList = baseConfig.category_list || [];

				// 商品
				this.goodsList = baseConfig.goods_list || [];

				this.loaded = true;
			},

			// 加载商品数据
			loadGoodsData: function(page = 1) {
				return uni.$models.mall.getGoodsList({
					page: page,
				}).then(res => {
					this.goodsList = page === 1 ? res.data : this.goodsList.concat(res.data);
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
</style>
<style scoped lang="scss">
</style>
