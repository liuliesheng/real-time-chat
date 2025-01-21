<template>
	<view class="page" v-if="loaded">
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
		<GoodsList :list="goodsList"></GoodsList>
	</view>
	<PageLoad v-else/>
</template>

<script>
import GoodsList from './components/goods-list';

export default {
	components: {
		GoodsList
	},
	data() {
		return {
			swiperList: [],
			categoryList: [],
			goodsList: [],
			loaded:false
		};
	},
	onLoad() {
		this.loadData();
	},
	methods: {
		/**
		 * 数据加载
		 */
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

			this.loaded=true;
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
