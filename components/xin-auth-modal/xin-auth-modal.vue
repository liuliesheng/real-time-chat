<template>
	<view class="cu-modal bottom-modal" :class="{show:isShow}" @tap.stop="onClose">
		<view class="cu-dialog" @tap.stop="">
			<view class="padding-xl">
				<!-- #ifdef MP-WEIXIN -->
				<view class="auth-avatar-warpper">
					<open-data type="userAvatarUrl" default-avatar="/static/icon/default-avatar.png"
					           class="auth-avatar-inner" />
				</view>
				<view class="auth-nickname">
					<open-data type="userNickName" default-text="匿名用户" />
				</view>
				<!-- #endif -->

				<button @getuserinfo="getUserInfo"
				        class="cu-btn bg-red lg block shadow margin-top"
				        open-type="getUserInfo">登 录</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				allowClose: true,
				isShow: false,
			};
		},
		created: function() {
			this.$root.showAuthModal = this.show;
			this.$root.hideAuthModal = this.hide;
		},
		methods: {
			getUserInfo(e) {
				const data = e.detail;
				uni.$emitter.emit('sys.getUserInfo.result', data);

				this.hide();
			},
			show(allowClose = true) {
				this.allowClose = allowClose;
				this.isShow = true;
			},
			hide() {
				this.isShow = false;
			},
			onClose() {
				if (this.allowClose) {
					this.hide();
				}
			}
		}
	}
</script>

<style>
	.auth-avatar-warpper {
		margin: 30upx auto;
		width: 180upx;
		height: 180upx;
		overflow: hidden;
		background-color: white;
		border: 2px solid #e54d42;
		border-radius: 180upx;
	}

	.auth-avatar-inner {
		width: 180upx;
		height: 180upx;
	}

	.auth-nickname {
		font-size: 19px;
		text-align: center;
	}
</style>
