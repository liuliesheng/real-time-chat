<template>
	<view class="cu-card case" :class="{'no-card':!isCard}">
		<view class="cu-item shadow" v-for="(item,index) in list" :key="item.id"
			  @tap="linkTo" :data-url="'/pages/website/product/detail?id='+item.id">
			<view class="image">
				<image :src="item.cover" mode="widthFix"></image>
				<!-- <view class="cu-tag bg-blue">史诗</view> -->
				<view class="cu-bar bg-shadeBottom">
					<text class="text-cut">{{item.title}}</text>
				</view>
			</view>
			<view class="padding-sm text-gray text-sm">
				<text class="cuIcon-attention margin-lr-xs"></text> {{item.view_count}}
				<text class="cuIcon-appreciate margin-lr-xs"></text> {{item.like_count}}
				<text class="cuIcon-favor margin-lr-xs"></text> {{item.collect_count}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default () {
					return []
				}
			},
			isCard: {
				type: Boolean,
				default: true
			}
		}
	}
</script>

<style>
	/* 	.cu-card>.cu-item:first-child {
		margin-top: 0;
	} */
</style>
