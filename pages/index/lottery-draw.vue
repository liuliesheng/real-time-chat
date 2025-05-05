<template>
	<view style="background-color:#FFD800;">

		<image class="lottery-draw-banner"
			   src='https://staticimgs.oss-cn-beijing.aliyuncs.com/choujiang-banner.png' mode='widthFix'></image>
		<view class="lottery-draw-msg margin-top">
			<custom-notice :items="speakerMsgs" :vertical="true"
						   styles="overflow:hidden; height:60rpx; line-height:60rpx; font-size:28rpx; color:#ED6A0C;">
			</custom-notice>
		</view>
		<view class="lottery-draw-main-bg">
			<view class="lottery-draw-main flex">
				<view v-for="(item, index) in prizes" :key="index"
					  :class="[
					'lottery-draw-main-items', 
					animateIndex == index ? 'lottery-draw-animate' : '']">
					<image :src="item.imgurl" class="lottery-draw-main-img" mode='widthFix'
						   v-if="index != 4"></image>
					<text class="lottery-draw-main-name block" v-if="index != 4">{{item.title}}</text>
					<text class="lottery-draw-main-btn block" v-if="index == 4" @tap="go">{{item.title}}</text>
				</view>
			</view>
		</view>
		<view class="margin-top-large padding"
			  style="padding-bottom:60rpx;">
			<view class="flex rows justify-center align-center">
				<text class="cuIcon-selection text text-white"></text>
				<text class="text-white blod h5 margin">活动说明</text>
				<text class="cuIcon-selection text text-white"></text>
			</view>
			<text class="text-small text-center text-white block" style="margin-top:8rpx;">
				活动有效期 : 2018-12-30 至 2019-12-30
			</text>
		</view>
	</view>
</template>
<script>
	var animateTimer = null;
	export default {
		data() {
			return {
				speakerMsgs: [
					{ title: "用户 *** 刚刚抽中一台 iphoneX", url: "", opentype: "navigate" },
					{ title: "用户 *** 刚刚抽中跑鞋", url: "", opentype: "navigate" }
				],
				// 奖品及按钮
				prizes: [
					{ title: 'iphoneX', 'imgurl': "https://img.alicdn.com/bao/uploaded/i1/809107100/TB2giNsX0LO8KJjSZPcXXaV0FXa_!!809107100.jpg" },
					{ title: '小米3', 'imgurl': "https://img.alicdn.com/bao/uploaded/i4/1714128138/O1CN015ZGeGj29zFfjpg41N_!!1714128138.jpg" },
					{ title: '记录仪', 'imgurl': "https://img.alicdn.com/bao/uploaded/i4/2631451752/O1CN01IyRW2w1OoSNvglF0E_!!2631451752.jpg" },
					{ title: '腾讯视频会员', 'imgurl': "https://img.alicdn.com/bao/uploaded/i4/2966815968/O1CN01DRE0eb1txOC21pZDc_!!0-item_pic.jpg" },
					{ title: 'GO', 'imgurl': "" },
					{ title: '小米手环', 'imgurl': "https://img.alicdn.com/bao/uploaded/i1/1099051825/TB2gMRodgHqK1RjSZFEXXcGMXXa_!!1099051825.jpg" },
					{ title: '跑鞋', 'imgurl': "https://img.alicdn.com/bao/uploaded/i1/890482188/O1CN01vzTaOr1S294ocZqkG_!!0-item_pic.jpg" },
					{ title: '台灯', 'imgurl': "https://img.alicdn.com/bao/uploaded/i3/2616970884/O1CN016tVSDi1IOubrk1Tjl_!!2616970884.jpg" },
					{ title: '谢谢参与', 'imgurl': "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3225805949,731297870&fm=26&gp=0.jpg" },
				],
				// 转圈 index
				turnIndex: 0,
				// 动画 index
				animateIndex: -1,
				// 动画 执行状态 stop 停止 ing 执行中 end 结束
				animateStatus: 'stop'
			}
		},
		methods: {
			// 抽奖动画
			go: function() {
				// 用户如果已经抽过奖或者不满足条件这里使用 return 返回，终止程序运行
				// your code ...

				// 判断是否正在执行动画
				if (this.animateStatus != 'stop') { return false; }
				this.animateStatus = 'ing';

				// 此处根据自己的业务决定抽奖结果[ 算法可以是后端或前端 自行百度根据自己概率做算法 ]

				// 比如模拟一个随机 0 - 8 数字[ 中奖率极高 ]
				var num = Math.floor(Math.random() * 8);
				// 不能抽中按钮所以抽中按钮等没中奖
				if (num == 4) { num = 8; }
				// num 代表奖品的 index 应该使用自己的算法得出

				// 动画
				this.animate(num);
			},
			animate: function(num) {
				//执行动画 100 代表动画切换时间可以调整动画速度
				this.turnIndex = 0;
				this.animateIndex = 0;
				animateTimer = setInterval(() => { this.turn(num); }, 100);
			},
			turn: function(num) {
				var orders = [0, 1, 2, 5, 8, 7, 6, 3]; //奖品序号
				var turnNumForPrizes = 0; //奖品的位置
				for (var i = 0; i < orders.length; i++) {
					if (orders[i] == num) {
						turnNumForPrizes = i;
						break;
					}
				}
				var turnNum = 3; //此处设置预先转几圈
				if (this.turnIndex >= 8 * turnNum + turnNumForPrizes) {
					clearInterval(animateTimer);
					// 动画结束 此处可以进行后续操作
					this.animateStatus = 'stop'; // 可以继续抽奖
					// this.animateStatus = 'end'; // 这样写就可以结束抽奖

					if (num == 8) {
						uni.showToast({
							title: '感谢参与 ^_^',
							icon: "none"
						});
					} else {
						uni.showToast({
							title: '恭喜您！抽中了 : ' + this.prizes[num].title,
							icon: "none"
						});
					}
					// your code ...
					return;
				}
				this.turnIndex++;
				var animateIndex = this.turnIndex % 8;
				this.animateIndex = orders[animateIndex];
			}
		}
	}
</script>
<style scoped>
	.lottery-draw-banner {
		width: 750rpx;
		height: 388rpx;
	}

	.lottery-draw-msg {
		width: 630rpx;
		border-width: 1rpx;
		border-style: solid;
		border-color: #FC5566;
		border-radius: 50px;
		color: #E81B54;
		background-color: rgba(255, 255, 255, 0.8);
		padding: 0rpx 30rpx;
		margin-left: 60rpx;
	}

	.lottery-draw-main-bg {
		width: 630rpx;
		padding: 15rpx;
		border-radius: 10px;
		margin: 30rpx 60rpx;
		background-color: #FC5566;
	}

	.lottery-draw-main {
		width: 600rpx;
		height: 630rpx;
		padding: 15rpx;
		background-color: #E81B54;
		border-radius: 8px;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.lottery-draw-main-items {
		width: 180rpx;
		height: 180rpx;
		background-color: rgba(255, 255, 255, 1);
		margin: 5rpx;
		border-radius: 5rpx;
		border-width: 8rpx;
		border-style: solid;
		border-color: #FFFFFF;
		overflow: hidden;
	}

	.lottery-draw-main-btn {
		color: #AB6120;
		background-color: #FFB001;
		font-weight: bold;
		height: 164rpx;
		line-height: 164rpx;
		text-align: center;
		font-size: 50rpx;
	}

	.lottery-draw-main-img {
		width: 100rpx;
		height: 100rpx;
		margin: 8rpx 30rpx;
		overflow: hidden;
	}

	.lottery-draw-main-name {
		line-height: 40rpx;
		height: 40rpx;
		overflow: hidden;
		text-align: center;
		color: #AB6120;
		font-size: 22rpx;
	}

	.lottery-draw-animate {
		border-color: #FFD800;
	}
</style>
