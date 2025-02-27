<template>
	<view class="cu-modal" :class="{show:isShow}" @tap="close">
		<view class="cu-dialog bg-white" @tap.stop="">
			<view class="padding-top">
				<image :src="url" mode="aspectFit"
					   :show-menu-by-longpress="true"></image>
			</view>
			<view class="cu-bar bg-white">
				<view class="action margin-0 flex-sub  solid-left" @tap="saveWeappQrcodeAlbum">保存到相册</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			url: String
		},
		data() {
			return {
				isShow: false,
			};
		},
		mounted() {
			setTimeout(() => {
				this.isShow = true;
			}, 0);
		},
		methods: {
			close() {
				this.isShow = false;
				setTimeout(() => {
					this.$emit('close');
				}, 200);
			},
			// 保存小程序码到相册
			saveWeappQrcodeAlbum() {
				uni.downloadFile({
					url: this.info.weapp_qrcode.url,
					success: (res) => {
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							fail: () => {
								uni.showModal({
									content: '图片保存失败，请确认是否开启相册权限！'
								});
							}
						});
					},
					fail: () => {
						this.hintError('图片下载失败！');
					}
				});
			},
		}
	}
</script>

<style>
</style>
