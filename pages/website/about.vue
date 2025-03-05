<template>
	<view class="page">
		<template v-if="loaded">
			<view class="padding bg-white" v-if="info">
				<MPHtml :content="info.content" />
			</view>
			<Empty type="article" v-else />
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
				loaded: false,
				info: null,
			}
		},
		onLoad(options) {
			this.loadData();
		},
		methods: {
			loadData() {
				uni.$http.get('plugin/website/index/about').then((res) => {
					this.info = res;
					this.loaded = true;
				});
			}
		}
	}
</script>

<style>

</style>
