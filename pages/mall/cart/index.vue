<template>
	<custom-page class="page" :loaded="loaded" @refresh="loadData" :showTechnicalSupport="false"
				 navbarBackgroundColor="bg-gradual-red">
		<!-- #ifndef H5 -->
		<block slot="navbar-title">购物车</block>
		<!-- #endif -->

		<!--顶部操作栏-->
		<view class="cu-bar fixed bg-white" :style="[{top:offsetTop+'px'}]">
			<view class="action">
				<text class="text-sm">共 {{goodsTotalCount}} 件商品</text>
			</view>
			<view class="action" @tap="isEdited=!isEdited">
				<text>{{isEdited?'完成':'管理'}}</text>
			</view>
		</view>

		<template v-if="loaded">
			<mescroll-uni ref="mescrollRef" @init="mescrollInit"
						  :top="mescrollOffset.top" :bottom="mescrollOffset.bottom" :safearea="true"
						  :down="{auto:false}" :up="{auto:false,empty:false}"
						  @down="downCallback" @up="upCallback">

				<!--购物车列表-->
				<view class="cu-list goods-list" v-if="data.length">
					<view class="cu-item flex padding-sm"
						  v-for="(item,index) in data" :key="item.id"
						  @tap="linkTo" :data-url="'../goods/detail?id='+item.goods_id">
						<view class="text-xxl" @tap.stop.prevent="itemToggleChecked(item)">
							<text class="margin-right-xs"
								  :class="item.checked?'cuIcon-roundcheckfill text-red':'cuIcon-roundcheck text-gray'"></text>
						</view>
						<view class="image-wrapper radius lg">
							<image :src="item.goods_cover" mode="aspectFit" lazy-load="true"></image>
						</view>
						<view class="content flex-sub padding-lr-sm">
							<view class="title ellipsis-2 text-black">{{ item.goods_title }}</view>
							<view class="text-gray text-sm margin-top-xs">
								<text>{{ item.goods_spec || '' }}</text>
							</view>
							<view class="flex margin-top-xs" @tap.stop.prevent="stopPrevent">
								<view class="flex-sub text-lg">
									<text class="text-price text-red">{{ item.goods_price }}</text>
								</view>
								<view style="display: inline-block;">
									<uni-number-box :min="1" :max="100" size="sm"
													:value="item.goods_num"
													@change="changeItemNum(item,$event)">
									</uni-number-box>
								</view>
							</view>
						</view>
					</view>
				</view>
				<custom-empty :btns="emptyBtnList" tips="购物车是空的" style="padding-top: 100px;" v-else></custom-empty>
			</mescroll-uni>
		</template>

		<!--底部操作栏-->
		<view class="cu-bar foot bg-white padding-lr" v-if="data.length">
			<view class="flex-sub">
				<view class="text-xxl" style="display: inline-block;" @tap="toggleCheckAll">
					<text class="margin-right-xs"
						  :class="isAllChecked?'cuIcon-roundcheckfill text-red':'cuIcon-roundcheck text-gray'"></text>
					<text class="margin-right-xs text-sm">全选</text>
				</view>
				<text class="text-df text-black text-bold">合计:</text>
				<text class="text-lg text-red text-price text-bold">{{choiceGoodsPrice}}</text>
			</view>
			<view class="">
				<template v-if="isEdited">
					<button class="cu-btn line-red round" @tap="deleteShoppingCart">删除({{choiceGoodsNum}})</button>
				</template>
				<template v-else>
					<button class="cu-btn bg-gradual-red round" @tap="linkTo"
							:data-url="'../order/create?cart_ids='+choiceGoodsIdListStr">去结算({{choiceGoodsNum}})</button>
				</template>
			</view>
		</view>
	</custom-page>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue";
	export default {
		mixins: [MescrollMixin],
		components: { uniNumberBox },
		data() {
			return {
				offsetTop: this.CustomBarUnH5,

				data: [],
				page: 1,
				more: true,
				loaded: false,

				isEdited: false,

				emptyBtnList: [{
					text: '逛逛商城',
					class: 'bg-red',
					to: '/pages/mall/index',
				}, {
					text: '看看收藏',
					class: 'line-red',
					to: '/pages/mall/favorite/index'
				}]
			};
		},
		computed: {
			// 获取商品数量总数
			goodsTotalCount() {
				return this.data.reduce((result, item) => {
					return result + (+item.goods_num);
				}, 0);
			},

			// 获取选中的商品列表
			choiceGoods() {
				return this.data.reduce((result, item) => {
					if (item.checked) {
						result.push(item);
					}

					return result;
				}, []);
			},

			// 获取选中的商品ID
			choiceGoodsIdListStr() {
				return this.choiceGoods.map(it => it.id).join(',');
			},

			// 获取选中的商品价格总和
			choiceGoodsPrice() {
				const result = this.choiceGoods.reduce((result, item) => {
					const goodsTotalPrice = uni.$BigNumber(item.goods_price).multipliedBy(item.goods_num);
					return result.plus(goodsTotalPrice);
				}, uni.$BigNumber(0));
				return result.toFixed(2);
			},

			// 获取选中的商品数量
			choiceGoodsNum() {
				return this.choiceGoods.reduce((result, item) => {
					return result + (+item.goods_num);
				}, 0);
			},

			// 是否是全选
			isAllChecked() {
				return this.choiceGoods.length === this.data.length;
			},

			// Mescroll 配置
			mescrollOffset() {
				return {
					top: (this.CustomBarUnH5 + uni.upx2px(100)) + 'px',
					bottom: 100
				};
			}
		},
		onShow() {
			if (this.mescroll) {
				this.mescroll.resetUpScroll();
			} else {
				this.loadData();
			}
		},
		methods: {
			// 上拉加载数据
			upCallback(mescroll) {
				this.loadData(mescroll.num).then((res) => {
					mescroll.endSuccess(res.data.length, this.more);
				}, () => {
					mescroll.mescroll.endErr();
				});
			},
			// 加载信息
			loadData: function(page = 1) {
				return uni.$models.mall.getShoppingCartList({
					page: page,
				}).then(res => {
					res.data.forEach(it => it.checked = true);

					this.data = page === 1 ? res.data : this.data.concat(res.data);
					this.more = res.data.length >= res.per_page;
					this.page = page;
					this.loaded = true;

					return res;
				});
			},

			//全选/取消全选
			toggleCheckAll() {
				const isChecked = !this.isAllChecked;
				this.data.forEach((it) => {
					it.checked = isChecked;
				});
			},

			// 切换单项是否选择
			itemToggleChecked(item) {
				item.checked = !item.checked;
			},

			// 更新商品数量
			changeItemNum(item, num) {
				item.goods_num = num;
				uni.$models.mall.changeShoppingCart(item.id, num, {
					successTips: false
				});
			},

			// 删除购物车
			deleteShoppingCart() {
				uni.$models.mall.forgetShoppingCart(this.choiceGoodsIdListStr, {
					loading: this,
					hint: this,
					successTips: true
				}).then(() => {
					for (let i = 0; i < this.data.length; i++) {
						const item = this.data[i];
						if (item.checked) {
							this.data.splice(i--, 1);
						}
					}
				});
			}
		}
	}
</script>

<style scoped>
	.page {
		/* padding-top: 100rpx; */
		/* padding-bottom: 130rpx; */
		background-color: white;
	}

	.goods-list .cu-item .title {
		font-size: 16px;
		line-height: 1.2;
		color: #333333;
		height: 38.4px;
	}

	.goods-list .cu-item .image-wrapper {
		width: 160rpx;
		height: 160rpx;
	}

	.m-price {
		font-size: 26rpx;
		text-decoration: line-through;
		margin-left: 10rpx;
		color: #999;
	}

	.cu-bar.foot {
		bottom: var(--window-bottom);
	}
</style>
