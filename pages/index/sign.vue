<template>
	<view class="padding">
		<view class="margin-top">
			<text class="h6 text-gray">手写签名</text>
		</view>
		<view class="margin-top bg-gray"
			  :style="{height:canvas.height+'rpx', overflow:'hidden'}">
			<canvas id="graceSign" canvas-id="graceSign"
					@touchstart="tstart" @touchmove="tmove"
					:style="{width:canvas.width+'rpx', height:canvas.height+'rpx'}"></canvas>
		</view>
		<view class="margin-top flex justify-between"
			  v-if="!isNew">
			<text class="sign-btn text-gray block" @tap="canvasInit">重新签名</text>
			<text class="sign-btn text-blue block" @tap="saveImg">提交签名</text>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				canvas: {
					width: 690, // 画布宽度，单位 rpx
					height: 380, // 画布高度, 单位 rpx
					bgColor: '#F6F7F8', // 画布演示
					textColor: '#000000', // 画笔颜色
					widthIn: 300, // 自动计算转换为 px
					heightIn: 300, // 自动计算转换为 px
					size: 3, // 画笔粗细
				},
				ctx: null, // 画布对象,
				drawTimer: null, // 演示存储计算器,
				isNew: true // 画布是否是空白的
			}
		},
		onReady: function() {
			this.canvasInit();
		},
		methods: {
			canvasInit: function() {
				setTimeout(() => {
					this.ctx = uni.createCanvasContext('graceSign');
					this.canvas.widthIn = uni.upx2px(this.canvas.width);
					this.canvas.heightIn = uni.upx2px(this.canvas.height);
					this.ctx.setFillStyle(this.canvas.bgColor);
					this.ctx.fillRect(0, 0, this.canvas.widthIn, this.canvas.heightIn);
					this.ctx.draw(true);
					this.ctx.setStrokeStyle(this.canvas.textColor);
					this.ctx.setLineWidth(this.canvas.size);
					this.isNew = true;
				}, 500);
			},
			tstart: function(e) {
				var x = e.touches[0].x;
				var y = e.touches[0].y;
				this.ctx.moveTo(x, y);
				this.isNew = false;
			},
			tmove: function(e) {
				var x = e.touches[0].x;
				var y = e.touches[0].y;
				this.ctx.lineTo(x, y);
				this.ctx.stroke();
				this.ctx.draw(true, this.saveImg);
				this.ctx.moveTo(x, y);
			},
			// 手写完毕后自动生成一个临时图片文件
			// 您可以利用临时图片完成后续的上传等工作
			saveImg: function() {
				if (this.drawTimer != null) { clearTimeout(this.drawTimer); }
				this.drawTimer = setTimeout(() => {
					uni.canvasToTempFilePath({
						x: 0,
						y: 0,
						width: this.widthIn,
						height: this.heightIn,
						destWidth: this.widthIn,
						destHeight: this.heightIn,
						canvasId: 'graceSign',
						success: (res) => {
							// 在H5平台下，tempFilePath 为 base64
							// console.log(res.tempFilePath);
						}
					});
				}, 200);
			}
		}
	}
</script>
<style>
	.sign-btn {
		width: 250rpx;
		margin: 25rx;
		line-height: 80rpx;
		text-align: center;
	}
</style>
