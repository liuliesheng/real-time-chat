<template>
	<view class="page" v-if="loaded">
		<XLoading />
		<Hint />

		<view class="cu-list menu-avatar" v-if="data.length">
			<view class="cu-item"
				  v-for="(item, index) in data"
				  :key="index">

				<view class="cu-avatar round lg"
					  :style="'background-image:url('+item.user.avatar+');'">
				</view>
				<view class="content">
					<view class="text-grey">
						<text class="margin-right-xs">{{item.user.nickname}}</text>
						<text class="cuIcon-male text-blue" v-if="item.user.gender==1"></text>
						<text class="cuIcon-female text-pink" v-else-if="item.user.gender==2"></text>
					</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">
							共访问了{{item.view_count}}次
						</view>
					</view>
				</view>
				<view class="action">
					<view class="text-gray text-sm">
						{{item.update_time | firendlyDate}}
					</view>
				</view>
			</view>
		</view>
		<Empty @refresh="loadData" v-else />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: 0,
				data: [],
				page: 1,
				more: true,
				keywords: '',
				loaded: false
			};
		},
		onLoad(options) {
			this.id = parseInt(options.id);
			if (isNaN(this.id)) {
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
			// 加载地址
			loadData: function(page = 1) {
				return model.getBrowseUserList({
					id: this.id,
					page: page,
				}).then(res => {
					this.data = page === 1 ? res.data : this.data.concat(res.data);
					this.more = res.data.length >= res.per_page;
					this.page = page;
					this.loaded = true;
				}, () => {
					// uni.navigateBack();
				});
			},
		}
	}
</script>

<style>
	.cu-list.menu-avatar>.cu-item .action {
		width: 128rpx;
	}
</style>
