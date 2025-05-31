<template>
	<view class="component">
		<image :src="image" mode="widthFix" class="img" @tap="$emit('refresh')"></image>
		<view class="padding-lr padding-tb-sm text-center text-black text-lg" v-if="tips">
			{{tips}}
		</view>
		<view class="padding text-center flex" v-if="btns.length">
			<button class="cu-btn round margin-right flex-sub" v-for="(item,index) in btns" :key="index"
					:class="item.class?item.class:'line-grey'" @tap="onBtnClick(item)">{{item.text}}</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		props: {
			type: {
				type: String,
				default: 'default',
			},
			tips: {
				type: String,
				default: ''
			},
			btns: {
				type: Array,
				default: () => []
			}
		},
		computed: {
			image() {
				let type = this.type;
				return `/static/empty/${type}.png`;
			},
		},
		methods: {
			onBtnClick(item) {
				if (item.click) {
					item.click();
				} else if (item.to) {
					uni.navigateTo({
						url: item.to,
						fail() {
							uni.switchTab({
								url: item.to
							})
						}
					})
				}
			}
		}
	}
</script>

<style scoped>
	.img {
		max-width: 400rpx;
		display: block;
		margin: 15% auto 30rpx auto;
	}
</style>
