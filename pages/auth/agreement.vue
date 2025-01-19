<template>
	<view class="page" v-if="loaded">
		<XLoading />
		<Hint />

		<view class="cu-bar fixed solid-bottom">
			<view class="content text-bold text-xl">
				{{info.title}}
			</view>
		</view>
		<view class="padding rich-text">
			<MPHtml :content="info.content" />
		</view>

	</view>
	<PageLoad v-else />
</template>

<script>
	import MPHtml from '@/components/mp-html/mp-html';
	export default {
		components: {
			MPHtml
		},
		data() {
			return {
				info: null,
				loaded: false,
			}
		},
		onLoad(options) {
			this.name = options.name;

			if (!this.name || !this.name.trim()) {
				uni.$hintError('参数错误！');
				return uni.$delayNavigateBack(1000);
			}

			this.loadData();
		},
		methods: {
			// 加载信息
			loadData: function(page = 1) {
				return uni.$http.get('index/getagreement', {
					name: this.name,
				}).then(res => {
					if (!res) {
						return;
					}

					this.info = res;
					this.loaded = true;
				});
			},
		}
	}
</script>

<style scoped>
	.page {
		background-color: white;
		padding-top: 100upx;
		padding-bottom: 100upx;
	}

	.cu-bar {
		background-color: white;
	}
</style>
