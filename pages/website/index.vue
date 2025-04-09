<template>
	<view class="page">
		<XLoading />
		<Hint />

		<template v-if="loaded">
			<view class="margin radius" style="overflow: hidden;" v-if="bannerList.length">
				<custom-swiper :list="bannerList" />
			</view>

			<view class="margin" v-if="navList">
				<custom-nav :list="navList" />
			</view>

			<view class="" v-if="articleList.length">
				<custom-titlebar title="文章列表" :transparent="true" style="margin-bottom: -30rpx;"
								 :isMore="true" moreUrl='/pages/website/article/index' />
				<ArticleList :list="articleList" />
			</view>

			<view class="" v-if="productList.length">
				<custom-titlebar title="产品列表" :transparent="true" style="margin-bottom: -30rpx;"
								 :isMore="true" moreUrl='/pages/website/product/index' />
				<ProductList :list="productList" />
			</view>

			<view class="" v-if="caseList.length">
				<custom-titlebar title="案例列表" :transparent="true" style="margin-bottom: -30rpx;"
								 :isMore="true" moreUrl='/pages/website/case/index' />
				<ProductList :list="caseList" />
			</view>

			<view class="margin radius bg-white" style="overflow: hidden;">
				<custom-titlebar title="企业地址" :transparent="true" />
				<custom-map :address="websiteInfo.address"
							:latitude="websiteInfo.lat"
							:longitude="websiteInfo.lng" />
			</view>

			<view class="margin radius" style="overflow: hidden;">
				<custom-card title="留言给我们">
					<custom-forms :items="leavingMsgForm.items"
								  :isLoading="isLeavingMsgLoading"
								  @submit="submitLeavingMsg" />
				</custom-card>
			</view>

			<custom-footer :company="websiteInfo.title"
						   :phone="websiteInfo.phone"
						   :wechatQrcode="websiteInfo.wechat_qrcode" />

			<custom-floating-button :list="floatingButtionList" :radius="true" />

		</template>
		<PageLoad @refresh="loadData" v-else />
	</view>
</template>

<script>
	import ArticleList from './components/article-list.vue';
	import ProductList from './components/product-list.vue';
	import CaseList from './components/case-list.vue';
	export default {
		components: {
			ArticleList,
			ProductList,
			CaseList
		},
		data() {
			return {
				loaded: false,

				bannerList: [],
				noticeList: [],
				navList: [],
				articleList: [],
				productList: [],
				caseList: [],
				floatingButtionList: [],
				leavingMsgForm: {},
				isLeavingMsgLoading: false,
				websiteInfo: {},
			}
		},
		onLoad(options) {
			this.loadData();
		},
		methods: {
			async loadData() {
				const baseConfig = await uni.$http.get('plugin/website/index/index');
				this.loaded = true;

				// 轮播图
				const bannerList = baseConfig.banner_list;
				this.bannerList = bannerList;
				if (this.bannerList.length) {
					this.titleNViewBackground = bannerList[0].background;
				}

				// 通知列表
				this.noticeList = baseConfig.notice_list || [];

				// 菜单列表
				this.navList = baseConfig.nav_list || [];

				// 文章列表
				this.articleList = baseConfig.article_list || [];

				// 产品列表
				this.productList = baseConfig.product_list || [];

				// 案例列表
				this.caseList = baseConfig.case_list || [];

				// 留言表单配置
				this.leavingMsgForm = baseConfig.leaving_msg_form || {};

				// 企业信息
				this.websiteInfo = baseConfig.website_info || {};

				// 悬浮按钮
				this.floatingButtionList = baseConfig.floating_button_list || [];
			},

			// 提交留言
			submitLeavingMsg({ values, forms }) {
				this.isLeavingMsgLoading = true;
				uni.$http.post('plugin/website/index/submitleavingmsg', {
					data: forms
				}, {
					loading: false,
					hint: this
				}).then(() => {
					this.hintSuccess('已提交');
				}).finally(() => {
					this.isLeavingMsgLoading = false;
				});
			}
		},
	}
</script>

<style>
</style>
