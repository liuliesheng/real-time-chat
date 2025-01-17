<template>
	<view class="page">
		<view class="userinfo">
			<image class="bg" src="/static/bg/user.jpg"></image>
			<view class="userinfo-inner flex" v-if="hasUserInfo">
				<image :src="userInfo.avatarUrl" background-size="cover"
				       class="cu-avatar xl round userinfo-avatar"></image>
				<view class="flex-sub padding-lr">
					<text class="userinfo-nickname">{{ userInfo.nickName }}</text>
				</view>
			</view>
			<view v-else>
				<button @tap="onLogin" @getUserInfo="getUserInfo"
				        class="cu-btn bg-blue lg block shadow"
				        open-type="getUserInfo">登 录</button>
			</view>
			<image class="arc-line" src="/static/icon/arc.png" mode="aspectFill"></image>
		</view>

		<!-- style="background-color: rgba(255,255,255,0.3);" -->
		<view class="grid col-3 margin padding-tb-sm text-center bg-white radius">
			<view class="padding-sm">
				<text class="num">{{userInfo.balance||'0.00'}}</text>
				<text class="text-sm">余额</text>
			</view>
			<view class="padding-sm">
				<text class="num">{{userInfo.coupon_count||'0'}}</text>
				<text class="text-sm">优惠券</text>
			</view>
			<view class="padding-sm">
				<text class="num">{{userInfo.growth||'0'}}</text>
				<text class="text-sm">积分</text>
			</view>
		</view>

		<view class="order-status margin radius">
			<view class="flex padding-lr padding-top" @tap="linkTo" data-url="/pages/mall/order/list">
				<text class="flex-sub text-bold">我的订单</text>
				<view class="text-sm text-gray">
					<text>全部订单</text>
					<text class="cuIcon-right"></text>
				</view>
			</view>
			<view class="cu-list grid col-5 no-border">
				<view class="cu-item" @tap="linkTo" data-url="/pages/mall/order/list?state=10">
					<view class="cuIcon-pay"></view>
					<text class="text-sm">待付款</text>
				</view>
				<view class="cu-item" @tap="linkTo" data-url="/pages/mall/order/list?state=20">
					<view class="cuIcon-deliver text-red lg"></view>
					<text class="text-sm">待发货</text>
				</view>
				<view class="cu-item" @tap="linkTo" data-url="/pages/mall/order/list?state=30">
					<view class="cuIcon-send text-red"></view>
					<text class="text-sm">待收货</text>
				</view>
				<view class="cu-item" @tap="linkTo" data-url="/pages/mall/order/list?state=40">
					<view class="cuIcon-evaluate text-red"></view>
					<text class="text-sm">待评价</text>
				</view>
				<view class="cu-item" @tap="linkTo" data-url="/pages/mall/refund/list">
					<view class="cuIcon-refund text-red"></view>
					<text class="text-sm">退款/售后</text>
				</view>
			</view>
		</view>

		<view class="cu-list menu sm-border card-menu radius margin-top">
			<view class="cu-item arrow">
				<navigator class="content" url="/pages/user/address/list">
					<text class="cuIcon-circlefill text-grey"></text>
					<text>我的钱包</text>
				</navigator>
			</view>
			<view class="cu-item arrow">
				<navigator class="content" url="/pages/user/address/list">
					<text class="cuIcon-locationfill text-grey"></text>
					<text>收货地址</text></navigator>
			</view>
			<view class="cu-item arrow">
				<navigator class="content" url="/pages/user/address/list">
					<text class="cuIcon-favorfill text-grey"></text>
					<text>我的收藏</text>
				</navigator>
			</view>
			<!-- #ifndef MP -->
			<view class="cu-item arrow">
				<navigator class="content" url="/pages/auth/rest.password">
					<text class="cuIcon-circlefill text-grey"></text>
					<text>修改密码</text>
				</navigator>
			</view>
			<!-- #endif -->
			<!-- #ifdef MP -->
			<view class="cu-item arrow">
				<button open-type="feedback" class="content text-left">
					<text class="cuIcon-commentfill text-grey"></text>
					<text>意见反馈</text>
				</button>
			</view>
			<!-- #endif -->
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
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
		onShow: function() {},

		/**
		 * 生命周期函数--监听页面隐藏
		 */
		onHide: function() {},

		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload: function() {},

		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {
			uni.$getUserInfo().then((res) => {
				this.userInfo = res;
				this.userInfoStr = JSON.stringify(res);
				this.hasUserInfo = true;
			}).finally(() => {
				uni.stopPullDownRefresh({ sound: true });
			});
		},

		methods: {
			onLogin(e) {
				uni.showLoading();
				setTimeout(() => {
					uni.$hintSuccess('登录成功！');
					this.userInfo = {
						avatarUrl: '/static/images/icons/logo.png',
						nickName: '刘小晋啦',
					};
					this.hasUserInfo = true;
				}, 1000);
			},

			getUserInfo(e) {
				const data = e.detail.value;
				console.log(data)
			}
		}
	};
</script>

<style>
	.userinfo {
		background-color: white;
		box-sizing: border-box;
		padding-top: calc(var(--status-bar-height) + 52rpx);
		padding-bottom: 3px;
		overflow: hidden;
		position: relative;
	}

	.userinfo image.bg {
		position: absolute;
		width: 100%;
		height: 330rpx;
		left: 0;
		top: 0;
	}

	.arc-line {
		position: absolute;
		left: 0;
		bottom: 0;
		z-index: 9;
		width: 100%;
		height: 16px;
	}

	.userinfo .userinfo-inner {
		/* 		display: flex;
		flex-direction: column; */
		align-items: center;
		position: relative;
		padding: 20rpx 30rpx 60rpx;
	}

	.userinfo-avatar {
		/* 		width: 128upx;
		height: 128upx;
		margin: 20upx;
		border-radius: 50%; */
		background-color: white;
		border: 2px solid #fff;
	}

	.userinfo-nickname {
		/* color: #343434; */
		font-size: 19px;
		color: #fff;
	}

	.userinfo .grid {
		position: absolute;
		bottom: 30upx;
		width: calc(100% - 60upx);
	}

	.num {
		margin-bottom: 10px;
		font-size: 16px;
		color: #333;
		font-weight: 700;
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

	.order-status {
		background-color: white;
		overflow: hidden;
	}

	.order-status .cu-list [class*=cuIcon] {
		color: #fa436a;
		font-size: 28px;
	}

	.cu-list.card-menu {
		border-radius: 6upx;
	}
</style>
