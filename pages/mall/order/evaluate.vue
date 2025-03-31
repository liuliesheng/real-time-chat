<template>
	<view class="page" v-if="loaded">
		<XLoading />
		<Hint />

		<view class="cu-list goods-list">
			<view class="cu-item bg-white" v-for="(goodsItem,goodsIndex) in info.goods_list" :key="goodsItem.id">
				<view class="flex padding-sm margin radius">
					<view class="image-wrapper radius lg">
						<image :src="goodsItem.goods_cover" mode="aspectFit" lazy-load="true"></image>
					</view>
					<view class="content flex-sub padding-lr-sm">
						<view class="title ellipsis-2 text-black">{{ goodsItem.goods_title }}</view>
						<view class="text-gray text-sm margin-top-xs">
							<text>{{ goodsItem.goods_spec || '' }}</text>
						</view>
					</view>
				</view>

				<view class="cu-form-group margin-top">
					<view class="title">综合评分</view>
					<view class="flex-sub">
						<uni-rate v-model="goodsItem.score"></uni-rate>
					</view>
				</view>
				<view class="cu-form-group">
					<textarea maxlength="500" v-model="goodsItem.content" placeholder="多多描述商品和使用感受,更受欢迎哦"></textarea>
				</view>
				<view class="cu-form-group">
					<custom-uploader/>
				</view>

			</view>
		</view>

		<view class="padding">
			<button class="cu-btn block bg-gradual-red lg" @tap="onSubmit">提交</button>
		</view>

	</view>
	<PageLoad v-else />
</template>

<script>
	export default {
		data() {
			return {
				id: 0,
				info: null,
				form: {
					rate: 0,
					content: ''
				},
				loaded: false,
			}
		},
		onLoad(options) {
			this.id = parseInt(options.id);

			if (isNaN(this.id)) {
				uni.$hintError('参数错误！');
				return uni.$delayNavigateBack();
			}

			this.loadData();
		},
		methods: {
			// 加载数据
			loadData() {
				return uni.$models.mall.getPreGoodsEvaluate(this.id).then(res => {
					res.goods_list.forEach(it => {
						it.score = 0;
						it.content = '';
						it.images = [];
					});
					this.info = res;
					this.loaded = true;
				});
			},
			// 提交数据
			onSubmit() {
				const data = this.info.goods_list.map(it => {
					return {
						order_goods_id: it.id,
						score: it.score,
						content: it.content,
						images: it.images,
					};
				});

				return uni.$models.mall.createGoodsEvaluate({
					order_id: this.id,
					data: data
				}, {
					hint: this,
					loading: this,
				}).then(() => {
					this.hintSuccess(`提交成功！`);
					uni.$delayNavigateBack();
				});
			}
		}
	}
</script>

<style>
	.goods-list .cu-item .title {
		color: #333333;
		height: 38px;
	}

	.goods-list .cu-item .image-wrapper {
		width: 120rpx;
		height: 120rpx;
	}
</style>
