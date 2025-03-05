<template>
	<view class="grid col-4">
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

				if (item.type === 'custom') {
					const result = {
						index: index,
						data: item,
					};
					this.$emit('itemtap', result);
				} else {
					this._dispatch(item);
				}
			},
			_dispatch(item) {
				switch (item.type) {
					case "page":
						this.navTo(item.url);
						break;
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
		padding-bottom: 80%;
	}

	.image>image {
		width: 80%;
		height: 100%;
		left: 10%;
		position: absolute;
	}
</style>
