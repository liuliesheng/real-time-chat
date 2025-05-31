<template>
	<custom-page class="page" :loaded="loaded" @refresh="loadData">
		<GoodsEvaluateList :list="data" />
		<custom-empty v-if="!data.length"></custom-empty>
	</custom-page>
</template>

<script>
	import GoodsEvaluateList from '../components/goods-evaluate-list.vue';
	export default {
		components: {
			GoodsEvaluateList
		},
		data() {
			return {
				goodsId: 0,

				data: [],
				page: 1,
				more: true,

				loaded: false
			};
		},
		onLoad(options) {
			this.goodsId = parseInt(options.goods_id);
			if (isNaN(this.goodsId)) {
				uni.$hintError('参数错误！');
				return uni.$back();
			}

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
			// 加载信息
			loadData: function(page = 1) {
				return uni.$models.mall.getGoodsEvaluateList({
					goods_id: this.goodsId,
					page: page,
				}).then(res => {
					this.data = page === 1 ? res.data : this.data.concat(res.data);
					this.more = res.data.length >= res.per_page;
					this.page = page;
					this.loaded = true;
				});
			},
		}
	}
</script>

<style>

</style>
