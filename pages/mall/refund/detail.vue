<template>
	<view class="page" v-if="loaded">
		<h1>posts-detail</h1>
	</view>
	<PageLoad v-else />
</template>

<script>
	export default {
		data() {
			return {
				loaded: false
			};
		},
		onLoad() {},
		methods: {}
	}
</script>

<style scoped>

</style>
