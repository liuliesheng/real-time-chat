<template>
	<view class="page">
		<template v-if="loaded">
			<CaseList :list="data" :isCard="true" v-if="data.length" />
			<Empty type="article" v-else />
		</template>
		<PageLoad @refresh="loadData" v-else />
	</view>
</template>

<script>
	import CaseList from '../components/case-list.vue';
	export default {
		components: {
			CaseList
		},
		data() {
			return {
				data: [],
				page: 1,
				more: true,
				keywords: '',
				loaded: false
			}
		},
		onLoad(option) {
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
				return uni.$http.get('/plugin/website/case', {
					keywords: this.keywords,
					page: page,
				}).then(res => {
					this.data = page === 1 ? res.data : this.data.concat(res.data);
					this.more = res.data.length >= res.per_page;
					this.page = page;
					this.loaded = true;
				}, () => {
					uni.navigateBack();
				});
			},
		}
	}
</script>

<style>

</style>
