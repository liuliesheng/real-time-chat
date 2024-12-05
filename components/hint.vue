<template>
	<view v-show="showMsg" class="tips animated" :class="{slideInDown:showCount,slideOutUp:!showCount}">
		{{showMsg}}
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showMsg: '',
				showCount: 0,
				showType: 'error',
				timeId: 0
			}
		},
		methods: {
			hint: function(type, msg) {
				this.showMsg = msg;
				this.showType = type;
				this.showCount++;

				this.autoClose();
			},

			hintError: function(msg) {
				this.hint('error', msg);
			},

			hintSuccess: function(msg) {
				this.hint('success', msg);
			},

			autoClose: function() {
				clearTimeout(this.timeId);
				this.timeId = setTimeout(() => {
					let showCount = this.showCount - 1;
					if (showCount < 0) {
						showCount = 0;
					}

					this.showCount = showCount;
				}, 1500);
			}
		}
	}
</script>

<style>
</style>
