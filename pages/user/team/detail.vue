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
			<view class="cu-list menu-avatar goods-list sm-border radius" v-if="data.length">
				<view class="cu-item" v-for="(item,index) in data" :key="item.key">
					<view class="cu-avatar radius lg" :style="'background-image:url('+item.goods_cover+');'"></view>
					<view class="content">
						<view class="margin-bottom-xs">
							<view class="text-cut">购买了【{{item.goods_title}}】</view>
						</view>
						<view class="flex text-sm text-grey">
							<view class="flex-sub">{{item.goods_num}}份样品</view>
							<view class="flex-sub text-right">{{item.create_time}}</view>
						</view>
					</view>
				</view>
			</view>
			<custom-empty v-else></custom-empty>
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
