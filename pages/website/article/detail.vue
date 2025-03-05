<template>
	<view class="page">
		<template v-if="loaded">
			<view class="padding bg-white">
				<view class="h3 text-black">{{info.title}}</view>
				<view class="flex">
					<view>
						<text class="cuIcon-attention"></text>
						<text class="margin-left-xs">{{info.view_count}}</text>
					</view>
					<view class="margin-left-sm">
						<text class="cuIcon-appreciate"></text>
						<text class="margin-left-xs">{{info.good_count}}</text>
					</view>
					<view class="margin-left-sm">
						<text class="cuIcon-favor"></text>
						<text class="margin-left-xs">{{info.collect_count}}</text>
					</view>
				</view>
				<MPHtml :content="info.content" />
			</view>
			<view class="cu-bar bg-white tabbar shop foot">
				<view class="action text-orange">
					<view class="cuIcon-favorfill"></view> 已收藏
				</view>
				<view class="action">
					<view class="cuIcon-appreciate"></view>点赞
				</view>
				<view class="bg-red submit">立即评论</view>
			</view>
		</template>
		<PageLoad @refresh="loadData" v-else />
	</view>
</template>

<script>
	import MPHtml from '@/components/mp-html/mp-html';
	export default {
		components: {
			MPHtml,
		},
		data() {
			return {
				info: null,
				loaded: false
			}
		},
		onLoad(options) {
			this.id = parseInt(options.id);
			if (isNaN(this.id)) {
				uni.$hintError('参数错误！');
				return uni.$delayNavigateBack();
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
				return uni.$http.get('/plugin/enterprise/article/detail', {
					id: this.id
				}).then(res => {
					this.info = res;
					this.loaded = true;
				});
			},
		}
	}
</script>

<style>

</style>
