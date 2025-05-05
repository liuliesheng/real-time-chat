<template>
	<view class="padding">
		<view class="margin-top-large flex justify-center">
			<canvas canvas-id="canvas" id="canvas"
					style="width:360rpx; height:360rpx;" @longpress="saveQrcode"></canvas>
		</view>
		<view class="margin-top text-center">
			<text class="text-small color-gray italic">请长按保存</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "custom-qrcode",
		data() {
			return {
				// 二维码绘制对象
				qrcode: null,
				// 二维码尺寸，单位 rpx
				qrcodeSize: 360,
				// 二维码数据
				qrcodeContent: 'https://fn.nlplant.cn',
				// 二维码背景颜色
				qrcodeBgColor: '#FFFFFF',
				// 二维码颜色
				qrcodeColor: '#008AFF',
				// 画布 id
				qrcodeId: 'canvas'
			};
		},
		created: function(options) {
			uni.showLoading({
				mask: true,
				title: 'loading ...'
			});
			console.log(uni.$QRCode.CorrectLevel)
			setTimeout(() => {
				this.qrcode = new uni.$QRCode(this.qrcodeId, {
					text: this.qrcodeContent,
					width: uni.upx2px(this.qrcodeSize),
					height: uni.upx2px(this.qrcodeSize),
					colorDark: this.qrcodeColor,
					colorLight: this.qrcodeBgColor,
					correctLevel: uni.$QRCode.CorrectLevel.H
				});
				uni.hideLoading();
			}, 1000);
		},
		methods: {
			saveQrcode: function() {
				uni.canvasToTempFilePath({
					x: 0,
					y: 0,
					width: uni.upx2px(this.qrcodeSize),
					height: uni.upx2px(this.qrcodeSize),
					destWidth: uni.upx2px(this.qrcodeSize),
					destHeight: uni.upx2px(this.qrcodeSize),
					canvasId: this.qrcodeId,
					success: (res) => {
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							fail: function(e) {
								console.log(e);
							},
							success: () => {
								uni.showToast({
									title: "图片已经保存到您的相册~"
								})
							}
						});
					}
				});
			}
		}
	}
</script>

<style>

</style>
