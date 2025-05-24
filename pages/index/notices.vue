<template>
	<custom-page class="page" :loaded="loaded">
		<view class="cu-card dynamic">
			<view class="cu-item shadow" v-for="item in data" :key="item.id">
				<view class="cu-list menu">
					<view class="cu-item">
						<view class="content padding-tb-sm">
							<view><text class="cuIcon-noticefill text-blue margin-right-xs"></text> {{item.title}}</view>
							<view class="text-gray text-sm">发布于 {{item.create_time}}</view>
						</view>
					</view>
				</view>
				<view class="text-content solid-top" style="padding-top: 15px;">
					{{item.content}}
				</view>
			</view>
		</view>
	</custom-page>
</template>

<script>
	export default {
		data() {
			return {
				data: [],
				page: 1,
				more: true,
				keywords: '',
				loaded: false
			}
		},
		onLoad(options) {
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
			// 加载地址
			loadData: function(page = 1) {
				return uni.$models.basic.getNoticeList({
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
