<template>
	<view class="cu-load text-gray" :class="isLoading?'loading':'over'"></view>
</template>

<script>
	export default {
		props: {
			isLoading: {
				type: Boolean,
				default: true
			}
		}
	}
</script>

<style>

</style>
