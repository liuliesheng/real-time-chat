<template>
	<view class="cu-modal bottom-modal" :class="isShow?'show':''" @tap="cancel">
		<view class="cu-dialog spec-dialog" @tap.stop.prevent="stopPrevent">

			<view class="flex padding-lr padding-tb-sm">
				<image class="spec-image margin-right radius"
					   :src="chooseSku && chooseSku.cover?chooseSku.cover:info.cover"
					   @tap="previewSkuImage(chooseSku && chooseSku.cover?chooseSku.cover:info.cover)"></image>
				<view class="flex-sub">
					<view class="text-price text-red text-lg">{{chooseSku?chooseSku.price:info.price}}</view>
					<view>库存：
						<text>{{chooseSku?chooseSku.stock:0}}</text>
					</view>
					<view>已选：
						<text v-for="(choose,index) in chooseSpec" :key="index">{{choose.title}};</text>
					</view>
				</view>
			</view>

			<view class="padding-tb-sm padding-lr" v-for="(spec,index) in specList" :key="spec.id">
				<view class="text-lg text-grey">
					{{spec.title}}
				</view>
				<view class="flex-wrap spec-val-list margin-top-sm">
					<view class="cu-tag padding-tb-xs padding-lr round light" style="height: auto;"
						  v-for="(value,valueIndex) in spec.value" :key="value.id"
						  :class="chooseSpec[index].id==value.id?'bg-red':''"
						  @tap.stop="setChoiceSpecValue(index,value)">{{value.title}}</view>
				</view>
			</view>

			<view class="padding-tb-sm padding-lr">
				<view class="text-lg text-grey">选择数量</view>
				<view class="flex-wrap margin-top-sm">
					<uni-number-box :min="1" :max="100" :value="buyNumber"
									@change="buyNumber = $event">
					</uni-number-box>
				</view>
			</view>

			<view class="padding flex flex-direction">
				<button class="cu-btn bg-red lg" @tap="confirm" v-if="type=='cart'">加入购物车</button>
				<button class="cu-btn bg-red lg" @tap="confirm" v-else-if="type=='buy'"
						:disabled="allowClick">立即购买</button>
				<button class="cu-btn bg-red lg" @tap="confirm" v-else>完成</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			info: {
				type: Object,
				default: () => {}
			},
		},
		data() {
			return {
				type: 'cart',
				isShow: false,
				buyNumber: 1,

				specList: [],
				skuList: [],
				chooseSpec: [],
			};
		},
		computed: {
			chooseSku() {
				let skuId = this.chooseSpec.map(it => it.id).join('_');
				if (!this.chooseSpec.length) {
					skuId = '0';
				}

				return this.skuList[skuId];
			},
			allowClick() {
				const chooseSku = this.chooseSku;
				return !(chooseSku && chooseSku.stock > 0);
			}
		},
		created() {
			this.calcSpec();
		},
		methods: {
			// 计算规格数据
			calcSpec() {
				if (this.info.spec_list && this.info.spec_list.length) {
					this.chooseSpec = this.info.spec_list.map(it => it.value[0]);
					this.specList = this.info.spec_list;
				}

				// 转换sku
				this.skuList = uni.$collectionUtil.column(this.info.sku_list, null, 'spec_sku_id');
			},

			// 预览图片
			previewSkuImage(src) {
				uni.previewImage({
					urls: [src],
					showmenu: true
				})
			},

			// 设置选中规格
			setChoiceSpecValue(specIndex, value) {
				this.$set(this.chooseSpec, specIndex, value);
			},

			// 取消弹框
			cancel() {
				this.close();

				if (this.$options.resolve) {
					this.$options.resolve({
						cancel: true,
						confirm: false,
					});
				}

				this.$options.resolve = null;
			},

			// 确认弹框
			confirm() {
				if (!this.chooseSku) {
					return;
				}

				this.close();

				if (this.$options.resolve) {
					this.$options.resolve({
						cancel: false,
						confirm: true,
						sku: this.chooseSku,
						spec: this.chooseSpec,
						count: this.buyNumber
					});

					this.buyNumber = 1;
				}

				this.$options.resolve = null;
			},

			// 关闭弹窗
			close() {
				this.type = '';
				this.isShow = false;
			},

			// 显示弹窗
			open(type) {
				this.type = type;
				this.isShow = true;

				return new Promise((resolve, reject) => {
					this.$options.resolve = resolve;
				});
			}
		},

		watch: {
			info: 'calcSpec'
		}
	}
</script>

<style scoped>
	.cu-dialog.spec-dialog {
		text-align: left;
		overflow: visible;
		background-color: white;
		border-radius: 12rpx 12rpx 0 0;
		max-width: 1120rpx;
	}

	.spec-image {
		width: 170rpx;
		height: 170rpx;
		margin-top: -60rpx;
		flex-shrink: 0;
	}
</style>
