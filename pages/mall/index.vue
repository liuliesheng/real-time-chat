<template>
	<view class="page" v-if="loaded">
		<cu-custom bgColor="bg-gradual-red">
			<block slot="content">商城</block>
		</cu-custom>

		<template v-if="loaded">
			<mescroll-body ref="mescrollRef" @init="mescrollInit"
			               @down="downCallback" @up="upCallback">

				<view class="" style="overflow: hidden;">
					<swiper class="screen-swiper round-dot" style="min-height: 256upx;"
					        :indicator-dots="true" :circular="true"
					        :autoplay="true" interval="5000" duration="500">
						<swiper-item v-for="(item,index) in swiperList" :key="index">
							<video :src="item.cover" autoplay loop muted :show-play-btn="false" :controls="false"
							       objectFit="cover" v-if="item.type=='video'"></video>
							<image :src="item.cover" mode="aspectFill" v-else></image>
						</swiper-item>
					</swiper>
				</view>

				<ad unit-id="adunit-1125620a898275d6"></ad>

				<GoodsList :list="goodsList"></GoodsList>
			</mescroll-body>
		</template>
		<PageLoad v-else />
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import GoodsList from './components/goods-list';

	// 在页面中定义插屏广告
	let interstitialAd = null

	export default {
		mixins: [MescrollMixin],
		components: {
			GoodsList
		},
		data() {
			return {
				swiperList: [],
				categoryList: [],

				page: 1,
				more: true,
				goodsList: [],

				loaded: false
			};
		},
		onLoad() {
			// 在页面onLoad回调事件中创建插屏广告实例
			if (wx.createInterstitialAd) {
				interstitialAd = wx.createInterstitialAd({
					adUnitId: 'adunit-3e248324e734cf57'
				})
				interstitialAd.onLoad(() => {});
				interstitialAd.onError((err) => {});
				interstitialAd.onClose(() => {});
				interstitialAd.createTime = Math.floor(new Date().getTime());
			}

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
				const baseConfig = await uni.$http.get('plugin/mall/index/index');

				// // 轮播图
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
				return uni.$model.mall.getGoodsList({
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
