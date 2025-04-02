<template>
	<view class="page">
		<XLoading />
		<Hint />

		<template v-if="loaded">
			<view class="padding bg-white">
				<swiper class="screen-swiper round-dot radius-lg" style="min-height: 356upx;overflow: hidden;"
						:indicator-dots="true" :circular="true"
						:autoplay="true" interval="5000" duration="500"
						@tap="previewImage" :data-urls="swiperList">
					<swiper-item v-for="(item,index) in swiperList" :key="index" :data-current="index">
						<image :src="item" mode="aspectFill"></image>
					</swiper-item>
				</swiper>

				<view class="margin-top">
					<view class="h4 text-black text-bold">{{info.title}}</view>

					<view class="flex padding-tb-xs margin-top-sm" @tap="openLocation">
						<view class="flex-sub">{{info.address}}</view>
						<view class="action">
							<text class="cuIcon-right"></text>
						</view>
					</view>

					<view class="padding-tb-xs">
						营业时间：{{info.start_time}} ~ {{info.end_time}}
					</view>
				</view>
			</view>

			<view class="margin-top bg-white">
				<view class="padding solid-bottom text-bold">经营范围</view>
				<view class="padding">
					{{info.description}}
				</view>
			</view>

			<view class="margin">
				<button class="cu-btn bg-gradual-blue block lg" v-if="isShowPayBtn"
						@tap="linkTo" :data-url="'/pages/pay/index?id='+info.id">支付</button>
			</view>

		</template>
		<PageLoad @refresh="loadData" v-else />
	</view>
</template>

<script>
	import MPHtml from '@/components/mp-html/mp-html';
	export default {
		components: {
			MPHtml,
		},
		data() {
			return {
				id: 0,
				info: null,
				loaded: false,

				isPayPageIn: false
			}
		},
		computed: {
			swiperList() {
				if (!this.info) {
					return [];
				}
				return this.info.picture;
			},
			isShowPayBtn() {
				return !this.isPayPageIn;
			}
		},
		onLoad(options) {
			this.id = parseInt(options.id);
			if (isNaN(this.id)) {
				uni.$hintError('参数错误！');
				return uni.$back();
			}

			this.isPayPageIn = options.is_pay_page_in || 0;

			this.loadData();
		},

		onPullDownRefresh() {
			this.loadData().finally(() => {
				uni.stopPullDownRefresh();
			});
		},

		methods: {
			// 加载数据
			loadData() {
				return uni.$models.store.getDetail(this.id).then(res => {
					this.info = res;
					this.loaded = true;
				});
			},

			// 打开地图位置
			openLocation() {
				uni.openLocation({
					latitude: parseFloat(this.info.lat),
					longitude: parseFloat(this.info.lng),
					address: this.info.address
				})
			}
		}
	}
</script>

<style>
	.page {}
</style>
