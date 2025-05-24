<template>
	<custom-page class="page" :loaded="loaded">
		<view class="cu-list menu-avatar margin radius" v-if="loaded">
			<view class="cu-item">
				<view class="cu-avatar radius lg" :style="'background-image:url('+info.avatar+');'"></view>
				<view class="content">
					<view class="text-grey">{{info.nickname}}</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">{{info.remark}}</view>
					</view>
				</view>
			</view>
		</view>

		<view class="margin">
			<view class="padding-lr padding-tb-sm solid-bottom text-grey fixed titlebar">购买的样品</view>
			<view class="cu-list menu-avatar goods-list sm-border radius">
				<view class="cu-item">
					<view class="cu-avatar radius lg" style="'background-image:url('+item.cover+');'"></view>
					<view class="content">
						<view class="margin-bottom-xs">购买了【巴掌牛排】</view>
						<view class="flex text-sm text-grey">
							<view class="flex-sub">2份样品</view>
							<view class="flex-sub text-right">2021-11-12 10：20</view>
						</view>
					</view>
				</view>
				<view class="cu-item">
					<view class="cu-avatar radius lg" style="'background-image:url('+item.cover+');'"></view>
					<view class="content">
						<view class="margin-bottom-xs">购买了【巴掌牛排】</view>
						<view class="flex text-sm text-grey">
							<view class="flex-sub">2份样品</view>
							<view class="flex-sub text-right">2021-11-12 10：20</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</custom-page>
</template>

<script>
	export default {
		data() {
			return {
				id: 0,
				info: null,
				loaded: false,
			}
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
		methods: {
			// 加载数据
			loadData() {
				return uni.$models.user.getInvitedDetail(this.id).then(res => {
					this.info = res;
					this.loaded = true;
				});
			},
		}
	}
</script>

<style>
	.goods-list .cu-item {
		padding-top: 10px;
		padding-bottom: 10px;
	}

	.cu-list.menu-avatar>.cu-item>.content {
		width: calc(100% - 48px - 30px - 10px);
	}
</style>
