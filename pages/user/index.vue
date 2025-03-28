<template>
	<view class="page">
		<!-- #ifndef H5 -->
		<cu-custom bgColor="bg-gradual-red" bgImage="./static/bg/user.jpg">
			<block slot="content"></block>
		</cu-custom>
		<!-- #endif -->

		<XLoading />
		<Hint />
		<xin-auth-modal />

		<mescroll-body ref="mescrollRef" :up="{use:false}" @init="mescrollInit"
					   @down="downCallback" @up="upCallback">

			<view class="userinfo">
				<image class="bg" src="/static/bg/user.jpg" mode="widthFix" :style="{top:-CustomBar+'px'}"></image>
				<view class="userinfo-inner flex" @tap="linkTo" data-url="/pages/user/info" data-logged
					  v-if="hasUserInfo">
					<image :src="userInfo.avatarUrl" background-size="cover"
						   class="cu-avatar xl round userinfo-avatar"></image>
					<view class="flex-sub padding-lr">
						<text class="userinfo-nickname"><text>Hi，</text>{{ userInfo.nickName }}</text>
					</view>
				</view>
				<view v-else>
					<!-- #ifdef MP-WEIXIN -->
					<view class="userinfo-inner flex">
						<view class="cu-avatar xl round userinfo-avatar">
							<open-data type="userAvatarUrl" default-avatar="/static/icon/default-avatar.png"
									   class="userinfo-avatar-inner" />
						</view>
						<view class="flex-sub padding-lr">
							<view class="userinfo-nickname">
								<text>Hi，</text>
								<open-data type="userNickName" default-text="匿名用户" />
							</view>
						</view>
						<!-- @getuserinfo="getUserInfo" -->
					</view>
					<!-- #endif -->
					<!-- #ifdef H5 -->
					<button @tap="onLogin" class="cu-btn bg-red lg block shadow"
							open-type="getUserInfo">登 录</button>
					<!-- #endif -->
				</view>
				<image class="arc-line" src="/static/icon/arc.png" mode="aspectFill"></image>
			</view>

			<!-- style="background-color: rgba(255,255,255,0.3);" -->
			<view class="grid col-3 margin padding-tb-sm text-center bg-white radius-lg">
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

			<OrderStatusNav />

			<view class="cu-list menu sm-border card-menu radius-lg margin-top">
				<view class="cu-item arrow">
					<view class="content" @tap="linkTo" data-url="/pages/user/address/list" data-logged>
						<text class="cuIcon-circlefill text-grey"></text>
						<text>我的钱包</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content" @tap="linkTo" data-url="/pages/user/address/list" data-logged>
						<text class="cuIcon-locationfill text-grey"></text>
						<text>收货地址</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content" @tap="linkTo" data-url="/pages/mall/favorite/index" data-logged>
						<text class="cuIcon-favorfill text-grey"></text>
						<text>我的收藏</text>
					</view>
				</view>
				<!-- #ifndef MP -->
				<view class="cu-item arrow">
					<view class="content" @tap="linkTo" data-url="/pages/auth/rest.password" data-logged>
						<text class="cuIcon-circlefill text-grey"></text>
						<text>修改密码</text>
					</view>
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
				<!-- #ifndef MP -->
				<view class="cu-item arrow">
					<view class="content" @tap="linkTo" data-url="/pages/index/feedback">
						<text class="cuIcon-circlefill text-grey"></text>
						<text>意见反馈</text>
					</view>
				</view>
				<!-- #endif -->
			</view>
		</mescroll-body>

	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import OrderStatusNav from '@/pages/mall/components/order-status-nav.vue';
	export default {
		mixins: [MescrollMixin],
		components: {
			OrderStatusNav
		},
		data() {
			return {
				userInfo: {},
				hasUserInfo: false
			};
		},

		onLoad: function(options) {},
		onShow: function() {},
		onHide: function() {},

		methods: {
			onLogin(options) {
				if (!options.firstLoad) {
					this.showAuthModal();
				}
			},

			getUserInfo(e) {
				const data = e.detail.value;
				console.log(data)
			},

			downCallback() {
				// this.mescroll.resetUpScroll();
				uni.$getUserInfo({
					firstLoad: true
				}).then((res) => {
					console.log(res)
					this.userInfo = res;
					this.userInfoStr = JSON.stringify(res);
					this.hasUserInfo = true;
				}).finally(() => {
					this.mescroll.endSuccess();
					// uni.stopPullDownRefresh({ sound: true });
				});
			}
		}
	};
</script>

<style>
	.page {
		padding-bottom: 30rpx;
	}

	.userinfo {
		background-color: white;
		box-sizing: border-box;
		/* padding-top: calc(var(--status-bar-height) + 52rpx); */
		padding-bottom: 3px;
		overflow: hidden;
		position: relative;
		/* min-height: 330rpx; */
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
		width: 128rpx;
		height: 128rpx;
		border-radius: 128rpx;
		background-color: white;
		border: 2px solid #fff;
		overflow: hidden;
	}

	.userinfo-avatar>.userinfo-avatar-inner {
		width: 128rpx;
		height: 128rpx;
	}

	.userinfo-nickname {
		/* color: #343434; */
		font-size: 19px;
		color: #fff;
	}

	.userinfo .grid {
		position: absolute;
		bottom: 30rpx;
		width: calc(100% - 60rpx);
	}

	.num {
		margin-bottom: 10px;
		font-size: 16px;
		color: #333;
		font-weight: 700;
	}

	.grid image {
		width: 64rpx;
		height: 64rpx;
		margin: 10rpx auto;
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
		border-radius: 6rpx;
	}
</style>
