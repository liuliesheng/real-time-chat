<template>
	<view class="page">
		<template v-if="loaded">
			<template v-if="categories.length>1">
				<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
					<view class="cu-item" :class="index==tabCur?'text-green cur':''"
						  v-for="(item,index) in categories" :key="index"
						  @tap="tabSelect(index)">
						{{item.title}}
					</view>
				</scroll-view>
			</template>
			<ProductList :list="data" :isCard="true" v-if="data.length" />
			<Empty type="article" v-else />
		</template>
		<PageLoad @refresh="loadData" v-else />
	</view>
</template>

<script>
	import ProductList from '../components/product-list.vue';
	export default {
		components: {
			ProductList
		},
		data() {
			return {
				data: [],
				page: 1,
				more: true,
				keywords: '',
				loaded: false,

				categories: [],
				tabCur: 0,
				scrollLeft: 0,
			}
		},
		onLoad(option) {
			this.loadCategoires();
			this.loadData();
		},
		onPullDownRefresh() {
			this.loadData().finally(() => {
				uni.stopPullDownRefresh();
			});
		},
		onReachBottom() {
			if (!this.more) {
				return;
			}

			this.loadData(this.page + 1);
		},
		methods: {
			// 加载数据
			loadData: function(page = 1) {
				const categoryId = this.categories[this.tabCur] ? this.categories[this.tabCur].id : 0;
				return uni.$http.get('/plugin/website/product', {
					keywords: this.keywords,
					page: page,
					category_id: categoryId
				}).then(res => {
					this.data = page === 1 ? res.data : this.data.concat(res.data);
					this.more = res.data.length >= res.per_page;
					this.page = page;
					this.loaded = true;
				}, () => {
					uni.navigateBack();
				});
			},

			// 加载分类列表
			loadCategoires: function() {
				uni.$http.get('plugin/website/article_category/index').then((res) => {
					this.categories = [{
						id: 0,
						title: '全部',
					}].concat(res.data);
				});
			},
			// 切换分类
			tabSelect(index) {
				this.tabCur = index;
				this.scrollLeft = (index - 1) * 60;
				this.loadData();
			}
		}
	}
</script>

<style>

</style>
