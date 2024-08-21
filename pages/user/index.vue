<template>
	<view class="user-index">
		<view class="container">
			<view class="userinfo">
				<block v-if="hasUserInfo">
					<image class="userinfo-avatar" :src="userInfo.avatarUrl" background-size="cover"></image>
					<text class="userinfo-nickname">{{userInfo.nickName}}</text>
				</block>
			</view>
			<uni-grid class="main-menu" :column="4" :show-border="false">
				<uni-grid-item>
					<image src=""></image>
					<text>特权</text>
				</uni-grid-item>
				<uni-grid-item>
					<image src=""></image>
					<text>收益</text>
				</uni-grid-item>
				<uni-grid-item>
					<image src=""></image>
					<text>优惠券</text>
				</uni-grid-item>
				<uni-grid-item>
					<image src=""></image>
					<text>积分</text>
				</uni-grid-item>
			</uni-grid>
		</view>

		<uni-grid class="main-menu" style="margin-top: 30upx" :column="4" :show-border="false">
			<uni-grid-item>
				<image src=""></image>
				<text>待付款</text>
			</uni-grid-item>
			<uni-grid-item>
				<image src=""></image>
				<text>待收货</text>
			</uni-grid-item>
			<uni-grid-item>
				<image src=""></image>
				<text>待评价</text>
			</uni-grid-item>
			<uni-grid-item>
				<image src=""></image>
				<text>退款/售后</text>
			</uni-grid-item>
		</uni-grid>

		<view class="list">
			<view class="list-header">
				其他
			</view>
			<view class="list-item">
				<navigator url="/pages/user/repassword">修改密码</navigator>
			</view>
			<view class="list-item">
				<navigator url="/pages/examples/feedback">意见反馈</navigator>
			</view>
		</view>
	</view>
</template>

<script>
import uniGrid from '@/components/uni-grid/uni-grid.vue';
import uniGridItem from '@/components/uni-grid-item/uni-grid-item.vue';

export default {
	components: {
		uniGrid,
		uniGridItem
	},
	/**
	 * 页面的初始数据
	 */
	data() {
		return {
			userInfo: {},
			hasUserInfo: false
		}
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		wx.startPullDownRefresh();
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

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
		uni.$.sys.getUserInfo({
			success: (res) => {
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

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	}
}
</script>

<style>
	.list navigator {
		color: inherit;
	}

	.container {
		box-sizing: border-box;
		border-bottom: 1upx solid #f9f9f9;
		box-shadow: 0 1upx 10upx #f9f9f9;
	}

	.userinfo {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 30upx;
	}

	.userinfo-avatar {
		width: 128rpx;
		height: 128upx;
		margin: 20upx;
		border-radius: 50%;
	}

	.userinfo-nickname {
		color: #aaa;
	}

	.list-header {
		background-color: #efefef;
		padding: 20upx 30upx;
	}

	.main-menu {
	}

	.main-menu image {
		width: 64upx;
		height: 64upx;
		margin: 10upx auto;
		display: block;
		background-color: #f9f9f9;
	}

	.main-menu text {
		display: block;
		text-align: center;
	}
</style>
