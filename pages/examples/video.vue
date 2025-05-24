<template>
	<custom-page :loaded="true">
		<scroll-view :scroll-y="true" :show-scrollbar="false"
					 :style="{height:mainHeight+'px'}"
					 @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend"
					 @scrolltolower="loadmorefun" @scroll="scroll">
			<!-- 视频播放区域 -->
			<view class="video-wrapper">
				<video id="myVideo" class="course-video"
					   :src="courseList[playIndex].src"
					   :poster="courseList[playIndex].poster" controls></video>
			</view>
			<!-- 基础信息 -->
			<view class="course-info flex nowrap justify-between align-center">
				<view class="course-info-body">
					<view class="course-title">{{courseList[playIndex].title}}</view>
					<view class="flex">
						<text class="course-info-text block">时长 : {{courseList[playIndex].timer}}</text>
						<text class="course-info-text block">播放 : {{courseList[playIndex].viewnumber}} 次</text>
					</view>
				</view>
				<view class="course-info-share"
					  hover-class="tap">
					<text class="cuIcon-share h4 text-gray text-center block"
						  style="line-height:50rpx;"></text>
					<text class="text-small text-gray text-center block">分享</text>
				</view>
			</view>
			<view class="common-line"></view>
			<!-- 切换导航 -->
			<view class="margin-top">
				<custom-tab :items="navs"
							lineHeight="60rpx" :isCenter="true"
							:currentIndex="navCurrentIndex" :size="160"
							activeLineBg="linear-gradient(to right, #008AFF,#008AFF)" textAlign="center"
							activeColor="#008AFF" activeLineWidth="160rpx"
							activeLineHeight="5rpx" :margin="30" @change="navChange"></custom-tab>
			</view>
			<!-- 课程描述 -->
			<view class="padding margin-top" v-if="navCurrentIndex == 0">
				<image src="" class="img-full" mode="widthFix"></image>
				<view class="margin-top">
					<text class="text text-black">我见过春日夏风秋叶冬雪，也踏遍南水北山东麓西岭，可这四季春秋 苍山泱水，都不及你冲我展眉一笑。</text>
				</view>
			</view>
			<!-- 课程目录 -->
			<view class="cu-list menu" v-if="navCurrentIndex == 1">
				<view class="cu-item" v-for="(item, index) in courseList" :key="index" @tap="play(index)">
					<view class="content padding-tb-sm">
						<view>
							<text class="list-title-text text-blue block bold"
								  v-if="playIndex ==  index">[ 播放中 ] {{item.title}}</text>
							<text class="list-title-text text-black block"
								  v-else>{{item.title}}</text>
						</view>
						<view class="text-df text-gray">
							时长 : {{item.timer}} · 播放 :{{item.viewnumber}} 次
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</custom-page>
</template>
<script>
	// 模拟一个视频地址减少代码量实际开发请在下面的视频数据中使用视频真实地址
	var vsrc =
		"http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400";
	export default {
		data() {
			return {
				playIndex: 0,
				navCurrentIndex: 0,
				navs: [{ id: 0, name: '课程描述' }, { id: 1, name: '课程目录' }],
				courseList: [{
						'title': '黄鹤楼送孟浩然之广陵(李白)',
						'src': vsrc,
						'poster': 'https://images.pexels.com/photos/2819353/pexels-photo-2819353.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
						'timer': '11分50秒',
						'viewnumber': '15025'
					},
					{
						'title': '将赴吴兴登乐游原一绝(杜牧)',
						'src': vsrc,
						'poster': 'https://images.pexels.com/photos/1352196/pexels-photo-1352196.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
						'timer': '09分18秒',
						'viewnumber': '13598'
					},
					{
						'title': '云阳馆与韩绅宿别(司空曙)',
						'src': vsrc,
						'poster': 'https://images.pexels.com/photos/2387869/pexels-photo-2387869.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
						'timer': '12分11秒',
						'viewnumber': '22880'
					},
					{
						'title': '至德二载甫自京金光门(杜甫)',
						'src': vsrc,
						'poster': 'https://images.pexels.com/photos/2387869/pexels-photo-2387869.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
						'timer': '06分51秒',
						'viewnumber': '19055'
					},
					{
						'title': '赋得暮雨送李曹(韦应物)',
						'src': vsrc,
						'poster': 'https://images.pexels.com/photos/2387869/pexels-photo-2387869.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
						'timer': '18分01秒',
						'viewnumber': '30258'
					},
					{
						'title': '饯别王十一南游(刘长卿)',
						'src': vsrc,
						'poster': 'https://images.pexels.com/photos/2387869/pexels-photo-2387869.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
						'timer': '03分01秒',
						'viewnumber': '50258'
					}
				],


				// 主体高度
				mainHeight: 600,
				// 滚动区域滚动距离
				scrollTop: 0,
				// 加载更多延迟
				loadMoreTimer: null,
			}
		},
		onLoad: function() {
			uni.setNavigationBarTitle({ title: this.courseList[this.playIndex].title });
		},
		methods: {
			navChange: function(index) {
				this.navCurrentIndex = index;
			},
			play: function(index) {
				this.playIndex = index;
				uni.setNavigationBarTitle({ title: this.courseList[this.playIndex].title });
				uni.pageScrollTo({
					scrollTop: 0
				})
			},

			scroll: function(e) {
				this.scrollTop = e.detail.scrollTop;
			},
			// 下拉刷新相关事件绑定
			touchstart: function(e) {
				if (this.scrollTop > 0) { return; }
				// this.$refs.refreshcom.touchstart(e);
			},
			touchmove: function(e) {
				if (this.scrollTop > 0) { return; }
				// this.$refs.refreshcom.touchmove(e);
			},
			touchend: function(e) {
				if (this.scrollTop > 0) { return; }
				// this.$refs.refreshcom.touchend(e);
			},
			// 刷新事件
			reload: function() {
				this.page = 1;
				this.getNews(true);
				// 刷新时重置加载组件状态
				// this.$refs.loadmorecom.stoploadmore();
			},
			// 加载更多事件
			loadmorefun: function() {
				// 获取加载组件状态看一下是否还能继续加载
				// 保证触底只执行一次加载
				if (this.loadMoreTimer != null) { clearTimeout(this.loadMoreTimer); }
				this.loadMoreTimer = setTimeout(() => {
					var status = this.$refs.loadmorecom.loadMoreStatus;
					if (status != 0) { return null; }
					this.$refs.loadmorecom.loading();
					// 此处开启加载动画执行加载数据的函数
					this.getNews();
				}, 80);
			},
		}
	}
</script>
<style>
	.course-video {
		width: 750rpx;
	}

	.course-info {
		background-color: #FFFFFF;
		padding: 20rpx 25rpx;
	}

	.course-info-body {
		width: 200rpx;
		flex: 1;
	}

	.course-info-share {
		width: 100rpx;
	}

	.course-title {
		font-size: 32rpx;
		line-height: 50rpx;
		color: #333333;
	}

	.course-info-text {
		font-size: 22rpx;
		color: #999999;
		line-height: 38rpx;
		margin-right: 30rpx;
		margin-top: 8rpx;
	}
</style>
