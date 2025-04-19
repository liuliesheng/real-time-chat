<template>
	<custom-page class="page" :loaded="true">
		<custom-search v-model="search" @search="loadData()" :isBackButton="true" />

		<mescroll-body ref="mescrollRef" @init="mescrollInit"
					   :down="{auto:false}" :up="{auto:false,empty:false}"
					   @down="downCallback" @up="upCallback">
			<GoodsList :list="data"></GoodsList>
		</mescroll-body>
	</custom-page>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import GoodsList from '../components/goods-list';
	export default {
		mixins: [MescrollMixin],
		components: {
			GoodsList
		},
		data() {
			return {
				loaded: false,

				page: 1,
				more: true,
				search: '',
				data: [],
			};
		},
		onLoad() {
			// this.loadData();
		},
		methods: {
			// 上拉加载数据
			upCallback(mescroll) {
				this.loadData(mescroll.num).then(() => {
					mescroll.endSuccess(this.data.length, this.more);
				}, () => {
					mescroll.endErr();
				});
			},

			// 加载数据
			loadData: function(page = 1) {
				if (this.search === '') {
					this.data = [];
					return Promise.resolve();
				}

				return uni.$models.mall.getGoodsList({
					search: this.search,
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

<style scoped>

</style>
