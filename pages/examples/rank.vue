<template>
	<custom-page headerStyle="background-color:rgba(255,255,255,0)"
				 statusBarStyle="background-color:rgba(255,255,255,0)"
				 :loaded="true">
		<!-- 页面主体 -->
		<view class="" style="background-color:#F5F6F8;">
			<!-- 背景图片 -->
			<image src="https://staticimgs.oss-cn-beijing.aliyuncs.com/ydbg.png" class="bgimg"></image>
			<!-- 列表主体 -->
			<view class="ranking-list absolute-lt"
				  :style="{top:'440rpx', left:'30rpx', height:mainHeight+'px'}">
				<!-- 头部个人信息 -->
				<view class="flex justify-center"
					  style="margin-top:38rpx;">
					<view class="header-msg-item flex">
						<text class="header-msg-text">19000</text>
						<text class="header-msg-text-small">步</text>
					</view>
					<view class="header-msg-item flex">
						<image class="header-msg-face"
							   src="https://graceui.oss-cn-beijing.aliyuncs.com/faces/1.png" mode="widthFix"></image>
					</view>
					<view class="header-msg-item flex">
						<text class="header-msg-text">18</text>
						<text class="header-msg-text-small">名</text>
					</view>
				</view>
				<view class="ranking-lists">
					<scroll-view :scroll-y="true" :style="{height : (mainHeight - 100) + 'px'}">
						<view class="ranking-lists-item flex" v-for="(item,index) in rankingList" :key="index">
							<view class="ranking-lists-num block-text" :style="{color:item.color?item.color:''}">
								{{index+1}}</view>
							<image class="ranking-lists-image" :src="item.face" mode="widthFix"></image>
							<view class="ranking-lists-content">
								<text class="ranking-lists-content-name block">{{item.name}}</text>
								<text class="ranking-lists-content-desc block text-gray">{{item.num}}
									步</text>
							</view>
							<view class="ranking-lists-zan">
								<text :class="[
									'cuIcon-likefill', 'block', 
									'ranking-lists-zan-icon', 
									item.iszan ? 'zan-active':''
									]"></text>
								<text class="ranking-lists-zan-num block text-gray">{{item.zan}}</text>
							</view>
						</view>
						<view class="" style="height:60rpx;"></view>
					</scroll-view>
				</view>
			</view>
		</view>
	</custom-page>
</template>
<script>
	export default {
		data() {
			return {
				mainHeight: 300,
				rankingList: [{
						face: 'https://graceui.oss-cn-beijing.aliyuncs.com/faces/2.png',
						name: '小花儿',
						num: '30000',
						zan: 999,
						iszan: true,
						color: '#FF0036'
					},
					{
						face: 'https://graceui.oss-cn-beijing.aliyuncs.com/faces/1.png',
						name: '武哥哥',
						num: '28000',
						zan: 952,
						iszan: false,
						color: '#FF9B00'
					},
					{
						face: 'https://graceui.oss-cn-beijing.aliyuncs.com/faces/2.png',
						name: '李喜梅',
						num: '26000',
						zan: 900,
						iszan: false,
						color: '#FFCC00'
					},
					{
						face: 'https://graceui.oss-cn-beijing.aliyuncs.com/faces/1.png',
						name: '南宫喵',
						num: '25000',
						zan: 822,
						iszan: false
					},
					{
						face: 'https://graceui.oss-cn-beijing.aliyuncs.com/faces/2.png',
						name: '吴小莉',
						num: '23000',
						zan: 605,
						iszan: false
					},
					{
						face: 'https://graceui.oss-cn-beijing.aliyuncs.com/faces/1.png',
						name: '静默茶',
						num: '20000',
						zan: 582,
						iszan: false
					},
					{
						face: 'https://graceui.oss-cn-beijing.aliyuncs.com/faces/2.png',
						name: '小甜甜',
						num: '18000',
						zan: 521,
						iszan: false
					},
					{
						face: 'https://graceui.oss-cn-beijing.aliyuncs.com/faces/1.png',
						name: '九国公',
						num: '16000',
						zan: 500,
						iszan: false
					},
					{
						face: 'https://graceui.oss-cn-beijing.aliyuncs.com/faces/2.png',
						name: '冷风孙',
						num: '15000',
						zan: 388,
						iszan: false
					},
					{
						face: 'https://graceui.oss-cn-beijing.aliyuncs.com/faces/1.png',
						name: '布谷鸟',
						num: '10000',
						zan: 219,
						iszan: false
					}
				]
			}
		},
		onLoad: function() {
			this.mainHeight = uni.$systemInfo.windowHeight - uni.upx2px(500);
		},
		methods: {

		}
	}
</script>
<style scoped>
	.bgimg {
		width: 750rpx;
		height: 750rpx;
	}

	.ranking-list {
		width: 690rpx;
		background-color: rgba(255, 255, 255, 1);
		border-radius: 20rpx;
		overflow: hidden;
	}

	.header-msg-item {
		width: 200rpx;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.header-msg-text {
		font-size: 32rpx;
		font-weight: bold;
		color: #666666;
	}

	.header-msg-text-small {
		font-size: 22rpx;
		margin: 10rpx;
		color: #666666;
	}

	.header-msg-face {
		width: 138rpx;
		height: 138rpx;
		border-radius: 120rpx;
	}

	.ranking-lists {
		padding: 25rpx;
	}

	.ranking-lists-item {
		margin-bottom: 28rpx;
		flex-direction: row;
		justify-content: space-between;
		flex-wrap: nowrap;
		align-items: center;
	}

	.ranking-lists-num {
		width: 60rpx;
		line-height: 80rpx;
		font-size: 50rpx;
		color: #666666;
		font-weight: bold;
		font-style: italic;
		text-align: center;
	}

	.ranking-lists-image {
		width: 100rpx;
		height: 100rpx;
		border-radius: 80rpx;
		margin: 0 20rpx;
	}

	.ranking-lists-content {
		width: 200rpx;
		margin: 0 10rpx;
		flex: 1;
	}

	.ranking-lists-content-name {
		font-size: 30rpx;
		line-height: 56rpx;
		color: #333333;
		line-height: 50rpx;
	}

	.ranking-lists-content-desc {
		font-size: 24rpx;
		line-height: 36rpx
	}

	.ranking-lists-zan {
		width: 80rpx;
	}

	.ranking-lists-zan-icon {
		font-size: 50rpx;
		line-height: 60rpx;
		text-align: center;
	}

	.ranking-lists-zan-num {
		font-size: 22rpx;
		text-align: center;
	}

	.zan-active {
		color: #FF0036;
	}
</style>
