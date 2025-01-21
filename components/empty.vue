<template>
	<view class="component">
		<image src="/static/empty/default.png" mode="widthFix" class="img"></image>
		<view class="padding-lr padding-tb-sm text-center text-black text-lg" v-if="tips">
			{{tips}}
		</view>
		<view class="padding text-center" v-if="btns.length">
			<button class="cu-btn round margin-right" v-for="(item,index) in btns" :key="index"
			        :class="item.class" @tap="item.click">{{item.text}}</button>
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
			tips: {
				type: String,
				default: ''
			},
			btns: {
				type: Array,
				default: () => []
			}
		}
	}
</script>

<style>
	.img {
		width: 240upx;
		display: block;
		margin: 15% auto 30upx auto;
	}
</style>
