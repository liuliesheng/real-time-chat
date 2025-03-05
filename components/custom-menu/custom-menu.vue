<template>
	<view class="grid col-5">
		<view class="item" v-for="(item,index) in list" :key="index">
			<view class="image">
				<image class="round" :src="item.icon" mode="aspectFill"></image>
			</view>
			<view class="text">{{item.text}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "custom-menu",
		props: {
			list: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style>
	.grid.col-2>view:nth-child(2n),
	.grid.col-3>view:nth-child(3n),
	.grid.col-4>view:nth-child(4n),
	.grid.col-5>view:nth-child(5n) {
		margin-right: 0;
	}

	.grid.col-2>view {
		width: calc((100% - 20rpx)/2);
	}

	.grid.col-3>view {
		width: calc((100% - 40rpx)/3);
	}

	.grid.col-4>view {
		width: calc((100% - 60rpx)/4);
	}

	.grid.col-5>view {
		width: calc((100% - 80rpx)/5);
	}

	.item {
		margin-right: 20rpx;
		margin-bottom: 20rpx;
		border-radius: 6rpx;
		position: relative;
		overflow: hidden;
	}

	.text {
		text-align: center;
	}

	.image {
		position: relative;
		padding-bottom: 100%;
	}

	.image>image {
		width: 100%;
		height: 100%;
		position: absolute;
	}
</style>
