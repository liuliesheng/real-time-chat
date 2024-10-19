<template>
	<view class="user-index">
		<view class="container">
			<view class="userinfo" v-if="hasUserInfo">
				<image :src="userInfo.avatarUrl" background-size="cover" class="userinfo-avatar"></image>
				<text class="userinfo-nickname">{{ userInfo.nickName }}</text>
			</view>
			<view v-else>
				<button @tap="onLogin" type="primary">登 录</button>
			</view>
			<uni-grid :column="4" :show-border="false" class="main-menu" style="background-color: rgba(255,255,255,0.3);">
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

		<uni-grid :column="4" :show-border="false" class="main-menu" style="margin-top: 30upx">
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
			<view class="list-header">其他</view>
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
	.list navigator {
		color: inherit;
	}

	.container {
		background-color: white;
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
		width: 128upx;
		height: 128upx;
		margin: 20upx;
		border-radius: 50%;
	}

	.userinfo-nickname {
		color: #aaa;
	}

	.list-header {
		background-color: #F9F9F9;
		padding: 20upx 30upx;
	}

	.main-menu {
		background-color: white;
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
