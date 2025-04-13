<template>
	<custom-page class="page" :loaded="loaded">
		<custom-search v-model="search" @search="loadData()" />
		<store-list :list="data" @refresh="loadData()"></store-list>
	</custom-page>
</template>

<script>
	import StoreList from './components/store-list.vue';
	export default {
		components: {
			StoreList,
		},
		data() {
			return {
				loaded: false,
				data: [],
				page: 1,
				more: true,
				search: '',
				categoryId: 0,

				location: null
			}
		},
		onLoad(options) {
			this.categoryId = parseInt(options.cid);
			this.$callHook('onPullDownRefresh');
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
			loadData(page = 1) {
				return this.getLocation().then(res => {
					return uni.$models.store.getList({
						lng: res.longitude,
						lat: res.latitude,
						keywords: this.search,
						category_id: this.categoryId,
						page: page,
						nearby: this.tabCur === 'nearby' ? 1 : 0
					})
				}).then((res) => {
					this.data = page === 1 ? res.data : this.data.concat(res.data);
					this.more = res.data.length >= res.per_page;
					this.page = page;
					this.loaded = true;
				});
			},


			getLocation() {
				this.location = {
					errMsg: "getLocation:ok",
					horizontalAccuracy: undefined,
					latitude: 34.86739,
					longitude: 113.61694,
					verticalAccuracy: 0,
				};

				if (this.location) {
					return Promise.resolve(this.location);
				}

				return uni.$getLocation({
					type: 'gcj02'
				}).then((res) => {
					console.log(res);
					return res;
				});
			},
		}
	}
</script>

<style>

</style>
