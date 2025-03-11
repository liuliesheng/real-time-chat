<template>
	<view class="page">
		<XLoading />
		<Hint />
		
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
						<text class="margin-left-xs">{{info.like_count}}</text>
					</view>
					<view class="margin-left-sm">
						<text class="cuIcon-favor"></text>
						<text class="margin-left-xs">{{info.collect_count}}</text>
					</view>
				</view>
				<MPHtml :content="info.content" />
			</view>
			<view class="cu-bar bg-white tabbar shop foot">
				<view class="action" :class="info.is_favorite?'text-orange':''" @tap="toggleFavorite">
					<view :class="info.is_favorite?'cuIcon-favorfill':'cuIcon-favor'"></view>
					{{info.is_favorite?'已收藏':'点赞'}}
				</view>
				<view class="action" :class="info.is_like?'text-red':''" @tap="onLike">
					<view :class="info.is_like?'cuIcon-appreciatefill':'cuIcon-appreciate'"></view>
					{{info.is_like?'已点赞':'点赞'}}
				</view>
				<!-- #ifdef MP -->
				<button class="bg-orange submit" open-type="share" style="border-radius: 0;">立即分享</button>
				<!-- #endif -->
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

		onShareAppMessage() {
			return {};
		},

		methods: {
			// 加载数据
			loadData() {
				return uni.$http.get('/plugin/website/article/detail', {
					id: this.id
				}).then(res => {
					this.info = res;
					this.loaded = true;
				});
			},

			// 去收藏
			toggleFavorite() {
				const options = {
					hint: this,
					loading: this
				};

				console.log(options)
				if (this.info.is_favorite) {
					uni.$http.get('/plugin/website/favorite/unfavorite', {
						topic_id: this.info.id
					}, options).then(() => {
						this.info.is_favorite = false;
						if (this.info.collect_count > 0) {
							this.info.collect_count--;
						}
					});
				} else {
					uni.$http.get('/plugin/website/favorite/favorite', {
						topic_id: this.info.id
					}, options).then(() => {
						this.info.is_favorite = true;
						this.info.collect_count++;
					});
				}
			},

			// 去点赞
			onLike() {
				if (this.info.is_like) {
					return;
				}

				uni.$http.get('/plugin/website/like/like', {
					topic_id: this.info.id
				}, {
					hint: this,
					loading: this
				}).then(() => {
					this.info.is_like = true;
					this.info.like_count++;
				});
			},
		}
	}
</script>

<style>

</style>
