<template>
	<view class="page" v-if="loaded">
		<XLoading />
		<Hint />

		<view class="cu-list goods-list" v-if="data.length">
			<view class="cu-item flex padding-sm solid-bottom"
			      v-for="(item,index) in data" :key="item.id"
			      :class="modalName=='move-box-'+ index?'move-cur':''"
			      @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd"
			      :data-target="'move-box-' + index"
			      @tap="linkTo" :data-url="'../goods/detail?id='+item.topic_id">
				<view class="image-wrapper radius lg">
					<image :src="item.cover" mode="aspectFit" lazy-load="true"></image>
				</view>
				<view class="content flex-sub padding-lr-sm">
					<view class="title ellipsis-2 text-black">{{ item.title }}</view>
					<view class="margin-top-xs">
						<text class="text-price text-red text-xl">{{ item.price }}</text>
						<text class="text-price m-price" style="vertical-align: middle;">{{ item.market_price }}</text>
					</view>
				</view>

				<view class="move">
					<view class="bg-red" @tap.stop="unFavorite(index)">删除</view>
				</view>
			</view>
		</view>
		<Empty type="favorite" v-else></Empty>

	</view>
	<PageLoad v-else />
</template>

<script>
	export default {
		data() {
			return {
				data: [],
				page: 1,
				more: true,
				loaded: false,

				modalName: null,
				listTouchStart: null,
				listTouchMove: null,
			}
		},
		onLoad() {
			this.loadData();
		},
		onPullDownRefresh() {
			this.loadData().finally(() => {
				uni.stopPullDownRefresh();
			});
		},
		onReachBottom() {
			if (!this.more) {
				return;
			}

			this.loadData(this.page + 1);
		},
		methods: {
			// 加载信息
			loadData: function(page = 1) {
				return uni.$model.mall.getGoodsFavoriteList({
					page: page,
				}).then(res => {
					res.data.forEach(it => it.checked = true);

					this.data = page === 1 ? res.data : this.data.concat(res.data);
					this.more = res.data.length >= res.per_page;
					this.page = page;
					this.loaded = true;
				});
			},

			// 取消收藏
			unFavorite(index) {
				const item = this.data[index];
				uni.$model.favorite.unfavoriteGoods(item.topic_id, {
					loading: this,
					hint: this
				}).then(() => {
					this.data.splice(index, 1);
				});
			},

			// ListTouch触摸开始
			ListTouchStart(e) {
				this.listTouchStart = {
					x: e.touches[0].pageX,
					y: e.touches[0].pageY,
				};
			},

			// ListTouch计算方向
			ListTouchMove(e) {
				this.listTouchMove = {
					x: e.touches[0].pageX,
					y: e.touches[0].pageY,
				};

				// e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
			},

			// ListTouch计算滚动
			ListTouchEnd(e) {
				const start = this.listTouchStart;
				const move = this.listTouchMove;

				if (!start || !move || Math.abs(move.y - start.y) >= 10) {
					return;
				}

				const direction = move.x - start.x > 0 ? 'right' : 'left';
				if (direction == 'left') {
					this.modalName = e.currentTarget.dataset.target
				} else {
					this.modalName = null
				}
			}
		}
	}
</script>

<style scoped>
	.page {
		background-color: white;
	}

	.goods-list .cu-item .title {
		font-size: 16px;
		line-height: 1.2;
		color: #333333;
		height: 38.4px;
	}

	.goods-list .cu-item .image-wrapper {
		width: 64px;
		height: 64px;
	}

	.goods-list>.cu-item.move-cur {
		transform: translateX(-130rpx);
	}

	.goods-list>.cu-item .move {
		top: 0;
		width: 130rpx;
	}

	.m-price {
		font-size: 26rpx;
		text-decoration: line-through;
		margin-left: 10rpx;
		color: #999;
	}
</style>
