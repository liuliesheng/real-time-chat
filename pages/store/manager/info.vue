<template>
	<view class="page">
		<template v-if="loaded">
			<view class="margin bg-white radius">
				<view class="padding text-lg solid-bottom text-black">店铺信息</view>
				<view class="padding-lr">
					<view class="flex padding-tb-sm">
						<view class="label">联系人：</view>
						<view class="flex-sub">{{info.realname}}</view>
					</view>
					<view class="flex padding-tb-sm">
						<view class="label">联系电话：</view>
						<view class="flex-sub">{{info.phone}}</view>
					</view>
					<view class="flex padding-tb-sm">
						<view class="label">店铺名称：</view>
						<view class="flex-sub">{{info.title}}</view>
					</view>
					<view class="flex padding-tb-sm">
						<view class="label">店铺位置：</view>
						<view class="flex-sub">{{info.address}}</view>
					</view>
					<view class="flex padding-tb-sm">
						<view class="label">营业时间：</view>
						<view class="flex-sub">{{info.time}}</view>
					</view>
				</view>
			</view>

			<view class="margin bg-white radius margin-top">
				<view class="padding text-lg solid-bottom text-black">收款二维码</view>
				<view class="padding">
					<image :src="qrcode.url" mode="aspectFill" class="qrcode" v-if="qrcode"></image>
				</view>
			</view>

			<view class="margin">
				<button class="cu-btn block bg-gradual-orange lg shadow radius"
						:disabled="!qrcode" @tap="downloadQrcode">立即下载</button>
			</view>
		</template>
		<PageLoad v-else />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: null,
				qrcode: null,
				loaded: false
			}
		},
		onLoad() {
			this.loadData();
			this.getQrCode();
		},
		onPullDownRefresh() {
			Promise.all([
				this.loadData(),
				this.getQrCode()
			]).finally(() => {
				uni.stopPullDownRefresh();
			});
		},
		methods: {
			// 加载数据
			loadData() {
				return uni.$models.store.getMyDetail().then(res => {
					this.loaded = true;
					this.info = res;
				});
			},
			// 加载二维码信息
			getQrCode() {
				return uni.$models.store.getMyPayQrCode().then(res => {
					this.qrcode = res;
				});
			},

			// 下载二维码
			downloadQrcode() {
				uni.showLoading();
				uni.downloadFile({
					url: this.qrcode.url,
					success: (res) => {
						uni.hideLoading();
						if (res.statusCode !== 200) {
							return uni.$hintError('文件下载失败！');
						}

						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: () => {
								uni.$hintSuccess('已保存到图册！');
							},
							fail: () => {
								uni.$hintError('保存到图册失败！');
							}
						})
					},
					fail: () => {
						uni.hideLoading();
						uni.previewImage({
							urls: [this.qrcode.url]
						})
						// return uni.$hintError('文件下载失败：请检查是否配置合法域名！');
					}
				});
			}
		}
	}
</script>

<style>
	.label {
		width: 70px;
		margin-right: 30rpx;
	}

	.qrcode {
		display: block;
		margin: 0 auto;
		width: 256rpx;
		height: 256rpx;
	}
</style>
