<template>
	<view class="pk-wrap"
		  :style="{height:height,borderRadius:borderRadius}">
		<!-- 背景 -->
		<image src="http://res.nlplant.cn/image/6f/664163040e8b39003511ff4baa720e.png"
			   class="pk-bg" style="width:100%; height:460rpx;"></image>
		<!-- pk 图标 -->
		<view class="pk-icon-wrap flex justify-center align-center"
			  :style="{height:height,borderRadius:borderRadius}">
			<view class="pk-icon border-box">
				<image src="http://res.nlplant.cn/image/20/63dd4fb65ca27a0e80a7b998703b4f.png"
					   mode="widthFix" style="width:80rpx; height:80rpx;"></image>
			</view>
		</view>
		<view class="pk flex justify-between align-center"
			  :style="{height:height,borderRadius:borderRadius}">
			<view class="pk-item">
				<text class="pk-title block">{{title[0]}}</text>
				<view class="pk-btn-wrap" hover-class="tap" v-if="status == 'button'">
					<text class="pk-btn block"
						  data-index="left" @tap="choose">{{btnName}}</text>
				</view>
				<view class="pk-btn-wrap" v-if="status == 'progress'">
					<progress :percent="progress[0]" activeColor="#FFFFFF" :active="active"
							  stroke-width="3" class="pk-progress" backgroundColor="#3699ff" />
				</view>
				<text class="pk-text block" v-if="status == 'progress'">{{progress[2]}}</text>
			</view>
			<view class="pk-item">
				<text class="pk-title block" style="text-align:right;">{{title[1]}}</text>
				<view class="pk-btn-wrap flex" hover-class="tap"
					  style="justify-content:flex-end;" v-if="status == 'button'">
					<text class="pk-btn block"
						  style="color:#FF0036;" data-index="right" @tap="choose">{{btnName}}</text>
				</view>
				<view class="pk-btn-wrap" style="justify-content:flex-end;" v-if="status == 'progress'">
					<progress :percent="progress[1]" stroke-width="3" class="pk-progress"
							  :active="active" activeColor="#FFFFFF" backgroundColor="#FF6666" />
				</view>
				<text class="pk-text block" style="text-align:right;"
					  v-if="status == 'progress'">{{progress[3]}}</text>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		name: "custom-pk",
		props: {
			width: { type: String, default: '690rpx' },
			height: { type: String, default: '260rpx' },
			borderRadius: { type: String, default: '8rpx' },
			title: { type: Array, default: function() { return ['', '']; } },
			btnName: { type: String, default: '站队' },
			status: { type: String, default: 'button' },
			progress: { type: Array, default: function() { return [80, 20, '8000 票', '2000 票']; } }
		},
		methods: {
			choose: function(e) {
				this.$emit('choose', e.currentTarget.dataset.index);
			}
		},
		data() {
			return {
				// #ifndef APP-NVUE
				active: true,
				// #endif
				// #ifdef APP-NVUE
				active: false
				// #endif
			}
		},
	}
</script>
<style scoped>
	.pk-wrap {
		font-size: 0;
		overflow: hidden;
		position: relative;
	}

	.pk-bg {
		position: absolute;
		left: 0;
		top: 0;
		z-index: 1;
	}

	.pk {
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		z-index: 3;
	}

	.pk-item {
		width: 220rpx;
		overflow: hidden;
		padding-left: 35rpx;
		padding-right: 35rpx;
	}

	/* #ifndef APP-PLUS */
	.pk-item {
		box-sizing: border-box;
	}

	/* #endif */
	.pk-title {
		color: #FFFFFF;
		font-size: 50rpx;
		line-height: 60rpx;
	}

	.pk-btn-wrap {
		margin-top: 32rpx;
	}

	.pk-btn {
		width: 120rpx;
		height: 50rpx;
		line-height: 50rpx;
		text-align: center;
		background-color: #FFFFFF;
		font-size: 24rpx;
		border-radius: 100rpx;
		color: #3687FF;
	}

	.pk-btn-hv {
		font-weight: bold;
	}

	.pk-progress {
		width: 150rpx;
	}

	.pk-text {
		font-size: 22rpx;
		color: #FFFFFF;
		line-height: 50rpx;
		margin-top: 2px;
	}

	.pk-icon-wrap {
		position: absolute;
		top: 0px;
		left: 0px;
		right: 0px;
		z-index: 2;
	}

	.pk-icon {
		width: 120rpx;
		height: 120rpx;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
		background-color: #FFFFFF;
		border-radius: 100rpx;
		font-size: 0;
	}
</style>
