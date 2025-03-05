<template>
	<view class="cu-card article" :class="isCard?'':'no-card'">
		<view class="cu-item" :class="isCard?'':'solid-bottom'"
			  v-for="(item,index) in list"
			  :key="item.id"
			  @tap="linkTo" :data-url="'/pages/website/article/detail?id='+item.id">
			<view class="content">
				<image :src="item.cover" class="cover" mode="aspectFill" lazy-load="true"></image>
				<view class="desc">
					<view class="text-title text-cut">{{item.title}}</view>
					<view class="text-content">{{item.description}}</view>
					<view class="flex">
						<view>
							<text class="cuIcon-attention"></text>
							<text class="margin-left-xs">{{item.view_count}}</text>
						</view>
						<view class="margin-left-sm">
							<text class="cuIcon-appreciate"></text>
							<text class="margin-left-xs">{{item.good_count}}</text>
						</view>
						<view class="margin-left-sm">
							<text class="cuIcon-favor"></text>
							<text class="margin-left-xs">{{item.collect_count}}</text>
						</view>
					</view>
				</view>
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
	.cu-card.article>.cu-item {
		padding-top: 30rpx;
	}

	.cu-card.article>.cu-item .content>.cover {
		flex: 0 0 auto;
		background-color: #F9F9F9;
	}

	.cu-card.article>.cu-item .content .desc {
		min-width: 0;
	}

	.cu-card.article>.cu-item .content .text-title {
		font-size: 15px;
		color: #333333;
	}

	.cu-card.article>.cu-item .content .text-content {
		height: 3.2em;
	}
</style>
