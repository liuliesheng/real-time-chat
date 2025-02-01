<template>
	<view class="page" v-if="loaded">
		<XLoading />
		<Hint />

		<view class="cu-list menu sm-border" v-if="data.length">
			<view class="cu-item"
			      v-for="(item, index) in data"
			      :key="index"
			      @click="checkAddress(item)"
			      @longtap="showActionList(index)">

				<view class="content padding-tb-sm">
					<view class="text-gray text-df">
						<view class="cu-tag bg-red radius text-xs default"
						      v-if="item.is_default">默认</view>
						<text>{{ item.province }}{{ item.city }}{{ item.district }}</text>
					</view>
					<view class="text-black text-bold text-lg">{{ item.address }}</view>
					<view class="flex flex-wrap text-gray text-df">
						<view class="margin-right">{{ item.name }}</view>
						<view>{{ item.phone }}</view>
					</view>
				</view>

				<view class="action" @tap.stop.prevent="stopPrevent">
					<view class="cuIcon-write text-bold" @tap="linkTo"
					      :data-url="'/pages/user/address/edit?id='+item.id"></view>
				</view>
			</view>
		</view>
		<Empty v-else />

		<view class="foot padding">
			<button class="cu-btn round block bg-gradual-red lg" @tap="linkTo"
			        data-url="/pages/user/address/edit">新建收货地址</button>
		</view>
	</view>
	<PageLoad v-else />
</template>

<script>
	export default {
		data() {
			return {
				source: 0,
				data: [],
				page: 1,
				more: true,
				keywords: '',
				loaded: false
			};
		},
		onLoad(option) {
			this.source = parseInt(option.source);
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
			// 加载地址
			loadData: function(page = 1) {
				return uni.$model.address.getList({
					keywords: this.keywords,
					page: page,
				}).then(res => {
					this.data = page === 1 ? res.data : this.data.concat(res.data);
					this.more = res.data.length >= res.per_page;
					this.page = page;
					this.loaded = true;
				}, () => {
					uni.navigateBack();
				});
			},

			// 显示命令操作
			showActionList: function(index) {
				uni.showActionSheet({
					itemList: [
						'删除', '设置为默认地址'
					],
					success: (res) => {
						const item = this.data[index];
						if (res.tapIndex === 0) {
							uni.$model.address.forget(item.id, {
								loading: this,
								hint: this
							}).then(() => {
								uni.$hintSuccess('已删除');
								this.data.splice(index, 1);
							});
						} else if (res.tapIndex === 1) {
							uni.$model.address.setDefault(item.id, {
								loading: this,
								hint: this
							}).then(() => {
								this.data.forEach(it => it.is_default = 0);
								item.is_default = 1;
								uni.$hintSuccess('已设置');
							});
						}
					},
				})
			},

			//选择地址
			checkAddress(item) {
				if (this.source === 1) {
					uni.$emitter.emit('address.choice', item);
					uni.$prePage(function(prePage) {
						if (prePage.onChoiceAddress) {
							prePage.onChoiceAddress(item);
						}
					});

					uni.navigateBack();
				}
			},

			//添加或修改成功之后回调
			refreshList(data, type) {
				this.$callHook('onPullDownRefresh');
			}
		}
	}
</script>

<style scoped>
	.page {
		background-color: white;
		padding-bottom: 140upx;
	}

	.foot {
		position: fixed;
		z-index: 99;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.default {
		line-height: 1.2;
		height: auto;
		padding: 4upx 6upx;
		margin-right: 6upx;
	}
</style>
