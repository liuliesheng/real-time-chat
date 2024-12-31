<template>
	<view class="cu-list goods-list">
		<view class="cu-item padding"
		      v-if="listType === 'row'"
		      v-for="item in list"
		      :key="item.id"
			  @tap="linkTo" :data-url="'/pages/mall/goods/detail?id='+item.id">
			<view class="image-wrapper radius" :class="{loaded: item.loaded}">
				<image :src="item.cover"
				       mode="aspectFill"
				       lazy-load="true"
				       @load="imageOnLoad(item)"></image>
			</view>
			<view class="content">
				<view class="ellipsis-2 title">{{ item.title }}</view>
				<view class="text-gray text-sm flex flex-wrap margin-top-xs">
					<text class="sales">月销 {{ item.sale_count || 0 }}</text>
				</view>
				<view class="flex flex-wrap margin-top-xs">
					<text class="text-price text-red">{{ item.price }}</text>
					<text v-if="item.market_price > item.price" class="m-price">￥{{ item.market_price }}</text>
				</view>
				<view class="tags margin-top-xs">
					<view class="cu-tag line-red text-xs"
					      v-if="!item.freight_template">免邮费</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		name: "goods-list",
		data() {
			return {
				loadType: 'add', //标记加载还是刷新数据
				renderList: []
			};
		},
		props: {
			list: {
				type: Array,
				default () {
					return []
				}
			},
			listType: {
				type: String,
				default: 'row'
			}
		},
		watch: {
			list(list) {
				if (this.loadType === 'add') {
					this.renderList = this.renderList.concat(list.slice(this.renderList.length));
				} else {
					this.renderList = list;
				}
			}
		},
	}
</script>

<style scoped lang="scss">
	.goods-list {
		background-color: white;
	}

	.image-wrapper {
		width: 212rpx;
		height: 212rpx;
		margin-right: 20rpx;
		border-radius: 6rpx;
		float: left;
	}

	.cu-item {}

	.cu-item::after {
		content: '';
		height: 0;
		display: block;
		clear: both;
	}

	.title {
		color: black;
		font-size: 16px;
		line-height: 1.2;
		height: 76rpx;
	}

	.text-price {
		font-size: 36rpx;
	}

	.m-price {
		font-size: 26rpx;
		text-decoration: line-through;
		margin-left: 10rpx;
		color: #999;
	}

	.tags {
		.cu-tag {
			padding: 2rpx 4rpx;
			height: auto;
		}
	}
</style>
