<template>
	<view style="background-color:#fffedf;">
		<view class="canvas-in">
			<canvas v-if="heightIn > 0"
					:style="{
				width:widthIn+'px', 
				height:heightIn+'px', 
				opacity:0
			}"
					canvas-id="graceCanvas" class="grace-canvas"></canvas>
		</view>
		<view class="grace-canvas-img" v-if="imgSrc != null">
			<image :src="imgSrc" mode="widthFix" style="width:750rpx" @longpress="longpress"></image>
		</view>
	</view>
</template>

<script>
	export default {
		name: "custom-poster",
		data() {
			return {
				width: 750, // 画布宽度，单位 rpx
				height: 1280, // 画布高度
				widthIn: 300, // 自动计算转换为 px
				heightIn: 0, //  自动计算转换为 px
				bgColor: '#fffedf', // 背景颜色
				bgImg: 'http://res.nlplant.cn/image/49/e0787a71f8c0a13b27dc113217d104.jpg',
				imgSrc: null,
				multiple: 1 // 将画布放大 2.0 - 2.9 倍（支持小数，过大app端会出现无法渲染的问题），保存的图片更清晰
			}
		},
		created: function() {
			uni.showLoading({ title: 'loading ...' });
			// 画布初始化
			this.context = uni.createCanvasContext('graceCanvas');
			this.initSize();
			//延迟1秒等待画布创建
			setTimeout(() => { this.draw(); }, 1000);
		},
		methods: {
			// 画布初始化
			initSize: function() {
				this.widthIn = uni.upx2px(this.width) * this.multiple;
				this.heightIn = uni.upx2px(this.height) * this.multiple;
				console.log(this.widthIn, this.heightIn);
			},
			// 海报绘制代码
			draw: function() {
				// 步骤 01. 绘制背景颜色
				this.step01();
				// 步骤 02. 绘制背景图片（如果需要，条件结构）
				if (this.bgImg != '') {
					this.drawBGIMG(this.bgImg, () => {
						// 步骤 03
						this.step03();
					});
				} else {
					this.step03();
				}
			},
			// 步骤 01 : 绘制背景颜色
			step01: function() {
				this.context.setFillStyle(this.bgColor);
				this.context.fillRect(0, 0, this.widthIn, this.heightIn);
			},
			// 步骤 03 : 
			// 3.1 绘制标题 [ 居中对应 x = 画布的一半 ]
			// 3.2 绘制验证码
			step03: function() {
				// 3.1 绘制标题 [ 居中对应 x = 画布的一半 ]
				this.drawText(
					'更丰富 更漂亮',
					this.widthIn / 2, (this.heightIn - 12 * this.multiple),
					'#FFFFFF',
					16 * this.multiple,
					'center'
				);
				// 3.2 绘制二维码
				uni.downloadFile({
					// 请使用自己的后端来实现二维码的生成
					// 如 : php 的 qrcode, 此处换成自己的二维码图片 api 地址
					url: 'http://res.nlplant.cn/image/15/6c5741a78b465f49cb7cab4f3f1af4.jpg?imageView2/1/q/75',
					success: (res) => {
						if (res.statusCode === 200) {
							// 绘制二维码
							// x = (画布宽度 - 图片宽度 ) / 2
							var qrCodeWidth = 200 * this.multiple;
							var x = (this.widthIn - qrCodeWidth) / 2;
							this.context.drawImage(res.tempFilePath, x, 260 * this.multiple, qrCodeWidth,
								qrCodeWidth);
							// 3.3 二维码下面的小字描述 
							this.drawText('长按图片保存 ~ ', this.widthIn / 2, 500 * this.multiple,
								'#FFFFFF', 12 * this.multiple, 'center');
							// 在最后一步执行 drawIt 完整最终的绘制
							this.drawIt();
						}
					},
					fail: function(e) { console.log(e); }
				});
			},
			// 绘制文本, 参数 : 文本内容,x,y,颜色,文本大小,横向对齐方式
			drawText: function(content, x, y, color, size, align) {
				this.context.setFontSize(size);
				this.context.setFillStyle(color);
				this.context.setTextAlign(align);
				this.context.fillText(content, x, y);
			},
			// 最终绘制函数
			drawIt: function() {
				this.context.draw(true, () => {
					uni.canvasToTempFilePath({
						x: 0,
						y: 0,
						width: this.widthIn,
						height: this.heightIn,
						destWidth: this.widthIn,
						destHeight: this.heightIn,
						canvasId: 'graceCanvas',
						success: (res) => {
							// 在H5平台下，tempFilePath 为 base64
							console.log(res)
							this.imgSrc = res.tempFilePath;
							uni.hideLoading();
						}
					});
				});
			},
			// 绘制图片,参数 : 图片地址, 绘制完成后执行的回调函数
			drawBGIMG: function(img, callback) {
				uni.downloadFile({
					url: img,
					success: (res) => {
						if (res.statusCode == 200) {
							// 绘制
							uni.getImageInfo({
								src: res.tempFilePath,
								success: (res2) => {
									console.log(res2);
									var bgImgHeight = (this.widthIn / res2.width) * res2
									.height;
									console.log(this.widthIn, bgImgHeight);
									this.context.drawImage(res.tempFilePath, 0, 0, this
										.widthIn, bgImgHeight);
									callback();
								}
							});
						}
					}
				});
			},
			// 长按事件
			longpress: function() {
				uni.saveImageToPhotosAlbum({
					filePath: this.imgSrc,
					success: () => {
						console.log('save success');
						uni.showToast({
							title: "图片已经保存到您的相册~"
						})
					}
				});
			}
		}
	}
</script>

<style scoped>
	.canvas-in {
		width: 750rpx;
		overflow: hidden;
		position: absolute;
		z-index: 1;
		left: 0;
		top: -5000px;
	}

	.grace-canvas-img {
		font-size: 0;
		width: 750rpx;
	}
</style>
