<template>
	<view class="cu-bar" :class="wrapperClass">
		<view class="action">
			<text class="cuIcon-title text-green"></text>
			<text>{{title}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "custom-titlebar",
		props: {
			title: String,
			transparent: Boolean
		},
		computed: {
			wrapperClass() {
				const result = [];
				
				if (!this.transparent) {
					result.push('bg-white');
				}
				
				return result;
			},
		}
	}
</script>

<style>

</style>
