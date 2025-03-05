<template>
	<view class="page">
		<template v-if="loaded">
			<view class="margin radius" style="overflow: hidden;">
				<custom-swiper :list="swiperList" />
			</view>

			<view class="margin">
				<custom-menu :list="menus" />
			</view>

			<custom-titlebar title="产品列表" :transparent="true" />
			<view class="cu-card case" v-if="productList.length">
				<view class="cu-item shadow" v-for="(item,index) in productList" :key="item.id">
					<view class="image">
						<image :src="item.cover" mode="widthFix"></image>
						<view class="cu-tag bg-blue">史诗</view>
						<view class="cu-bar bg-shadeBottom"> <text
								  class="text-cut">我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。</text></view>
					</view>
					<view class="padding-sm text-gray text-sm">
						<text class="cuIcon-attentionfill margin-lr-xs"></text> 10
						<text class="cuIcon-appreciatefill margin-lr-xs"></text> 20
						<text class="cuIcon-messagefill margin-lr-xs"></text> 30
					</view>
				</view>
			</view>

			<custom-titlebar title="案例列表" :transparent="true" />
			<view class="cu-card case" v-if="caseList.length">
				<view class="cu-item shadow" v-for="(item,index) in caseList" :key="item.id">
					<view class="image">
						<image :src="item.cover" mode="widthFix"></image>
						<view class="cu-tag bg-blue">史诗</view>
						<view class="cu-bar bg-shadeBottom"> <text
								  class="text-cut">我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。</text></view>
					</view>
					<view class="padding-sm text-gray text-sm">
						<text class="cuIcon-attentionfill margin-lr-xs"></text> 10
						<text class="cuIcon-appreciatefill margin-lr-xs"></text> 20
						<text class="cuIcon-messagefill margin-lr-xs"></text> 30
					</view>
				</view>
			</view>

			<view class="margin radius" style="overflow: hidden;">
				<custom-map address="河南省郑州市惠济区" />
			</view>

			<view class="margin radius" style="overflow: hidden;">
				<custom-card title="留言给我们">
					<custom-forms :items="leavingMsgForm.items" />
				</custom-card>
			</view>

			<custom-floating-button :list="floatingButtionList" :radius="true" />

			<custom-footer v-bind="enterpriseInfo" />

		</template>
		<PageLoad @refresh="loadData" v-else />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loaded: true,

				swiperList: [],
				menus: [],
				productList: [],
				caseList: [],
				floatingButtionList: [],
				leavingMsgForm: {},
				enterpriseInfo: {},
			}
		},
		onLoad(options) {
			this.loadData();
		},
		methods: {
			async loadData() {
				const baseConfig = await uni.$http.get('plugin/website/index/index');

				// 轮播图
				const swiperList = baseConfig.banners;
				this.swiperList = swiperList;
				if (this.swiperList.length) {
					this.titleNViewBackground = swiperList[0].background;
				}

				// 菜单列表
				this.menus = baseConfig.menus || [];

				// 产品列表
				this.productList = baseConfig.product_list || [];

				// 案例列表
				this.caseList = baseConfig.case_list || [];

				// 留言表单配置
				this.leavingMsgForm = baseConfig.leavingMsgForm || {};

				// 企业信息
				this.enterpriseInfo = baseConfig.enterprise_info || {};

				// 悬浮按钮
				this.floatingButtionList = baseConfig.floating_buttion_list || [];
			},
		}
	}
</script>

<style>

</style>
