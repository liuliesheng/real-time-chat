<template>
	<view class="page" v-if="loaded">
		<h1>order-create</h1>
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
	.order-create {}
</style>
