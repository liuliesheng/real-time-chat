<template>
	<custom-page class="page" :loaded="loaded">
		<template v-if="loaded">
			<view class="padding bg-white" v-if="info">
				<MPHtml :content="info.content" />
			</view>
			<Empty type="article" v-else />
		</template>
		<PageLoad @refresh="loadData" v-else />
	</custom-page>
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
				uni.$models.website.getAbout().then((res) => {
					this.info = res;
					this.loaded = true;
				});
			}
		}
	}
</script>

<style>

</style>
