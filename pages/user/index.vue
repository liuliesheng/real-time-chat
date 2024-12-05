<template>
	<view class="user">
		<view class="container userinfo">
			<image class="bg" src="/static/images/loading.gif"/>
			<view class="userinfo-inner" v-if="hasUserInfo">
				<image :src="userInfo.avatarUrl" background-size="cover" class="userinfo-avatar"></image>
				<text class="userinfo-nickname">{{ userInfo.nickName }}</text>
			</view>
			<view v-else>
				<button @tap="onLogin" type="primary">登 录</button>
			</view>

			<view class="grid text-center col-4" style="background-color: rgba(255,255,255,0.3);">
				<view class="padding-sm">
					<image src=""></image>
					<text>特权</text>
				</view>
				<view class="padding-sm">
					<image src=""></image>
					<text>收益</text>
				</view>
				<view class="padding-sm">
					<image src=""></image>
					<text>优惠券</text>
				</view>
				<view class="padding-sm">
					<image src=""></image>
					<text>积分</text>
				</view>
			</view>
		</view>

		<view class="grid text-center col-4 bg-white">
			<view class="padding-sm">
				<image src=""></image>
				<text>待付款</text>
			</view>
			<view class="padding-sm">
				<image src=""></image>
				<text>待收货</text>
			</view>
			<view class="padding-sm">
				<image src=""></image>
				<text>待评价</text>
			</view>
			<view class="padding-sm">
				<image src=""></image>
				<text>退款/售后</text>
			</view>
		</view>

		<view class="cu-list menu margin-top">
			<view class="cu-item">
				<navigator url="/pages/user/repassword">修改密码</navigator>
			</view>
			<view class="cu-item">
				<navigator url="/pages/examples/feedback">意见反馈</navigator>
			</view>
		</view>
	</view>
</template>

<script>

export default {
	components: {
	},
	/**
	 * 页面的初始数据
	 */
	data() {
		return {
			userInfo: {},
			hasUserInfo: false
		};
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		wx.startPullDownRefresh();
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {
	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {
	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function() {
		uni.stopPullDownRefresh();
		uni.$sys.getUserInfo({
			success: res => {
				uni.stopPullDownRefresh();
				this.userInfo = res;
				this.userInfoStr = JSON.stringify(res);
				this.hasUserInfo = true;
			},
			fail: () => {
				uni.stopPullDownRefresh();
			}
		});
	},

	methods: {
		onLogin(e) {
			const data = e.detail.value;
			console.log(data);

			uni.showLoading();
			setTimeout(() => {
				uni.$showTips('登录成功！');
				this.userInfo = {
					avatarUrl: '/static/images/icons/logo.png',
					nickName: '刘小晋啦',
				};
				this.hasUserInfo = true;
			}, 1000);
		}
	}
};
</script>

<style>

	.userinfo {
		background-color: white;
		box-sizing: border-box;
		border-bottom: 1upx solid #f9f9f9;
		box-shadow: 0 1upx 10upx #f9f9f9;
		height: 400upx;
		overflow: hidden;
		position: relative;
	}

	.userinfo image.bg{
		position: absolute;
		width: 100%;
		left: 0;
		top: 0;
	}

	.userinfo .userinfo-inner{
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 30upx;
	}

	.userinfo-avatar {
		width: 128upx;
		height: 128upx;
		margin: 20upx;
		border-radius: 50%;
	}

	.userinfo-nickname {
		color: #aaa;
	}

	.userinfo .grid {
		position: absolute;
		bottom: 30upx;
		width: calc(100% - 60upx);
	}
	.grid image {
		width: 64upx;
		height: 64upx;
		margin: 10upx auto;
		display: block;
		background-color: #f9f9f9;
	}

	.grid text {
		display: block;
		text-align: center;
	}
</style>
