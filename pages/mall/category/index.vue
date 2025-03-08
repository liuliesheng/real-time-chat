<template>
	<view class="page">
		<!-- #ifndef H5 -->
		<cu-custom bgColor="bg-gradual-red">
			<block slot="content">分类</block>
		</cu-custom>
		<!-- #endif -->

		<!-- #ifdef MP-WEIXIN -->
		<ad unit-id="adunit-1125620a898275d6" @load="onAdLoaded" id="ad"></ad>
		<!-- #endif -->

		<template v-if="loaded">
			<view class="VerticalBox" :style="[{top:offsetTop+'px'}]">
				<scroll-view class="VerticalNav nav" scroll-y scroll-with-animation
							 :scroll-top="verticalNavTop" v-if="categories.length">
					<view class="cu-item padding-tb" :class="index==tabCur?'text-green cur':''"
						  v-for="(item,index) in categories" :key="index"
						  @tap="TabSelect" :data-id="index">
						{{item.title}}
					</view>
				</scroll-view>
				<mescroll-uni class="VerticalMain" ref="mescrollRef" :fixed="false"
							  :up="{auto:false,empty:false}"
							  @init="mescrollInit" @down="downCallback" @up="upCallback">
					<!--商品列表-->
					<view class="cu-list goods-list" v-if="data.length">
						<template v-for="(item,index) in data">
							<ad unit-id="adunit-02012c56bdf50736" ad-type="grid" v-if="index==2"></ad>

							<view class="cu-item flex padding-sm" :id="'main-'+item.id" :key="item.id"
								  @tap="linkTo" :data-url="'/pages/mall/goods/detail?id='+item.id">
								<view class="image-wrapper radius lg">
									<image :src="item.cover" mode="aspectFit" lazy-load="true"></image>
								</view>
								<view class="content flex-sub">
									<view class="title ellipsis-2 text-black">{{ item.title }}</view>
									<view class="text-gray text-sm margin-top-xs">
										<text class="sales">月销 {{ item.sale_count || 0 }}</text>
									</view>
									<view class="flex flex-wrap margin-top-xs">
										<text class="text-price text-red text-xl text-bold">{{ item.price }}</text>
										<text v-if="item.market_price > item.price"
											  class="m-price">￥{{ item.market_price }}</text>
									</view>
								</view>
							</view>
						</template>
					</view>
					<Empty type="goods" v-else></Empty>
				</mescroll-uni>
			</view>
		</template>
		<PageLoad @refresh="loadData" v-else />
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				categories: [],
				data: [],
				page: 1,
				more: true,
				loaded: false,

				tabCur: 0,
				mainCur: 0,
				verticalNavTop: 0,

				adHeight: 0
			};
		},
		computed: {
			choiceCate() {
				return this.categories[this.tabCur];
			},
			offsetTop() {
				return this.CustomBar + this.adHeight;
			}
		},
		onLoad() {
			this.loadData();
		},
		onReady() {
			setTimeout(() => {
				this.calcAdHeight();
			}, 300);
		},
		methods: {
			// 计算广告的高度
			calcAdHeight() {
				// #ifdef MP-WEIXIN
				const query = this.createSelectorQuery();
				query.select('#ad').boundingClientRect();
				query.exec((node) => {
					this.adHeight = node[0].height;
				});
				// #endif
			},

			// 广告加载完毕
			onAdLoaded(e) {
				this.calcAdHeight();
			},

			// 加载数据
			loadData() {
				return uni.$model.mall.getCategoryList().then((res) => {
					this.categories = res;

					if (this.categories.length) {
						if (this.categories[this.tabCur]) {
							this.tabCur = 0;
						}

						if (!this.loaded) {
							this.loadGoodsData();
						}
					} else {
						if (!this.loaded) {
							setTimeout(() => {
								this.mescroll.endSuccess(0, false);
							}, 500);
						}
						this.data = [];
					}

					this.loaded = true;
				});
			},
			upCallback(mescroll) {
				if (this.loaded) {
					return;
				}

				this.loadGoodsData(mescroll.num).then((res) => {
					mescroll.endSuccess(res.data.length, this.more);
				}, () => {
					mescroll.endErr();
				});
			},
			loadGoodsData(page = 1) {
				if (!this.categories.length) {
					return Promise.resolve();
				}

				const category = this.categories[this.tabCur];
				return uni.$model.mall.getGoodsList({
					category_id: category.id,
					page: page,
				}).then((res) => {
					this.data = page === 1 ? res.data : this.data.concat(res.data);
					this.more = res.data.length >= res.per_page;
					this.page = page;

					return res;
				});
			},
			TabSelect(e) {
				this.tabCur = e.currentTarget.dataset.id;
				// this.mainCur = e.currentTarget.dataset.id;
				// this.verticalNavTop = (e.currentTarget.dataset.id - 1) * 50;
				this.mescroll.resetUpScroll();
			},
			VerticalMain(e) {
				return false;

				// #ifdef MP-ALIPAY
				return false //支付宝小程序暂时不支持双向联动
				// #endif
				let that = this;
				let tabHeight = 0;
				if (this.load) {
					for (let i = 0; i < this.list.length; i++) {
						let view = uni.createSelectorQuery().select("#main-" + this.list[i].id);
						view.fields({
							size: true
						}, data => {
							this.list[i].top = tabHeight;
							tabHeight = tabHeight + data.height;
							this.list[i].bottom = tabHeight;
						}).exec();
					}
					this.load = false
				}
				let scrollTop = e.detail.scrollTop + 10;
				for (let i = 0; i < this.list.length; i++) {
					if (scrollTop > this.list[i].top && scrollTop < this.list[i].bottom) {
						this.verticalNavTop = (this.list[i].id - 1) * 50
						this.tabCur = this.list[i].id
						return false
					}
				}
			}
		},
	}
</script>

<style scoped>
	.fixed {
		position: fixed;
		z-index: 99;
	}

	.VerticalBox {
		display: flex;
		position: fixed;
		bottom: 0;
		height: 100vh;
		width: 100%;
	}

	.VerticalNav.nav {
		width: 160upx;
		white-space: initial;
		background-color: #f1f1f1;
		flex-shrink: 0;
	}

	.VerticalNav.nav .cu-item {
		width: 100%;
		text-align: center;
		/* background-color: #fff; */
		margin: 0;
		border: none;
		height: auto;
		padding: 15px 10px;
		line-height: 1.2;
		position: relative;
	}

	.VerticalNav.nav .cu-item.cur {
		background-color: #fff;
	}

	.VerticalNav.nav .cu-item.cur::after {
		content: "";
		width: 8upx;
		height: 30upx;
		border-radius: 10upx;
		position: absolute;
		background-color: currentColor;
		top: 0;
		left: 5upx;
		bottom: 0;
		margin: auto;
	}

	.VerticalMain {
		background-color: #fff;
		flex: 1;
	}

	.goods-list .cu-item {
		/* background-color: white; */
	}

	.goods-list .cu-item .title {
		color: #333333;
		font-size: 14px;
		line-height: 1.2;
		height: 33.6px;
	}

	.goods-list .cu-item .image-wrapper {
		width: 120rpx;
		height: 120rpx;
		margin-right: 20rpx;
	}

	.m-price {
		font-size: 26rpx;
		text-decoration: line-through;
		margin-left: 10rpx;
		color: #999;
	}
</style>
