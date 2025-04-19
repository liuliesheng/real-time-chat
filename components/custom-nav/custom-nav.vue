<template>
	<view class="grid col-4 padding-tb">
		<view class="item" v-for="(item,index) in list" :key="index"
			  @tap="itemClickHandle(index)">
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
		methods: {
			itemClickHandle(index) {
				const item = this.list[index];

				if (item.type !== 'custom') {
					this._dispatch(item);
				}

				const result = {
					index: index,
					data: item,
				};
				this.$emit('itemtap', result);
			},
			_dispatch(item) {
				const type = item.type || 'page';
				if ('page' === type && item.url) {
					this.navTo(item.url);
				}
			}
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
		margin-top: 10rpx;
		font-size: 12px;
	}

	.image {
		position: relative;
		/* padding-bottom: 80%; */
		text-align: center;
	}

	.image>image {
		width: 120rpx;
		height: 120rpx;
		/* position: absolute; */
	}
</style>
