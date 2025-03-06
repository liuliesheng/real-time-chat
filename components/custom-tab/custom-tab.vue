<template>
	<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
		<view class="cu-item" :class="index==TabCur?'text-green cur':''" v-for="(item,index) in 10" :key="index"
			  @tap="tabSelect" :data-id="index">
			Tab{{index}}
		</view>
	</scroll-view>
</template>

<script>
	export default {
		name: "custom-tab",
		data() {
			return {
				scrollLeft: 0
			};
		}
	}
</script>

<style>

</style>
