<template>
	<custom-page class="page" :loaded="loaded">
		<custom-search :show-search-btn="false" :disabled="true"
					   @searchtap="navTo('/pages/store/list')" />

		<custom-nav :list="navList" @itemtap="navItemClick" />

		<scroll-view scroll-x class="bg-white nav solid-bottom" style="z-index: 9;"
					 scroll-with-animation :scroll-left="scrollLeft">
			<view class="cu-item" :class="'default'==tabCur?'text-green cur':''"
				  @tap="tabSelect('default')">
				默认排序
			</view>
			<view class="cu-item" :class="'nearby'==tabCur?'text-green cur':''"
				  @tap="tabSelect('nearby')">
				离我最近
			</view>
		</scroll-view>

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

				navList: [],

				tabCur: 'default',
				scrollLeft: 0,

				location: null
			}
		},
		onLoad() {
			this.$callHook('onPullDownRefresh');
		},
		onPullDownRefresh() {
			this.loadCategories();
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
			// 加载分类
			loadCategories() {
				return uni.$models.store.getCategories().then((data) => {
					this.navList = data.map((item) => {
						return {
							id: item.id,
							text: item.title,
							icon: item.cover
						};
					});

					return this.navList;
				});
			},

			// 加载数据
			loadData(page = 1) {
				return this.getLocation().then(res => {
					return uni.$models.store.getList({
						lng: res.longitude,
						lat: res.latitude,
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
			tabSelect(key) {
				this.tabCur = key;
				// this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
				this.loadData();
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

			// nav item click
			navItemClick({ data }) {
				uni.navigateTo({
					url: './list?cid=' + data.id
				})
			},

		}
	}
</script>

<style>

</style>
