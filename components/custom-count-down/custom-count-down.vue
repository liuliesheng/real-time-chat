<template>
	<view>
		倒计时：{{time}}
	</view>
</template>

<script>
	import countDown from './count-down.js';
	export default {
		name: "custom-count-down",
		data() {
			return {
				time: ''
			};
		},
		created() {
			countDown.push(() => {
				this.time = uni.$timeUtil.format.datetime(new Date, true);
			});
		},
	}
</script>

<style>

</style>
