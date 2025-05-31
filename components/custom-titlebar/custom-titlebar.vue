<template>
	<view class="cu-bar" :class="wrapperClass">
		<view class="action sub-title">
			<text class="cuIcon-titles text-green"></text>
			<text>{{title}}</text>
			<text class="bg-green"></text>
		</view>
		<view class="action" @tap="moreHandle" v-if="isMore">
			<text class="text-gray text-sm">{{moreText}}</text>
			<text class="text-gray" :class="moreIcon"></text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "custom-titlebar",
		props: {
			title: String,
			transparent: Boolean,
			isMore: Boolean,
			moreText: {
				type: String,
				default: '更多'
			},
			moreIcon: {
				type: String,
				default: 'cuIcon-right'
			},
			moreUrl: String
		},
		computed: {
			wrapperClass() {
				const result = [];

				if (!this.transparent) {
					result.push('bg-white');
				}

				return result;
			},
		},
		methods: {
			moreHandle() {
				if (this.moreUrl) {
					this.navTo(this.moreUrl);
				} else {
					this.$emit('moretap');
				}
			}
		}
	}
</script>

<style scoped>

</style>
