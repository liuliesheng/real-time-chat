<template>
	<custom-page class="page" :loaded="loaded">
		<template v-if="loaded">
			<view class="cu-bar fixed solid-bottom">
				<view class="content text-bold text-xl">
					{{info.title}}
				</view>
			</view>
			<view class="padding rich-text">
				<MPHtml :content="info.content" />
			</view>
		</template>
	</custom-page>
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
				return uni.$back();
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
		padding-top: 100rpx;
		padding-bottom: 100rpx;
	}

	.cu-bar {
		background-color: white;
	}
</style>
