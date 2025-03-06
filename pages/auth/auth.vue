<template>
	<div class="auth">
		<view class="tips">
			<!-- #ifndef H5 -->
			<open-data class="avatar" type="userAvatarUrl"></open-data>
			<open-data class="nickname" type="userNickName"></open-data>
			<!-- #endif -->
			<view>为了你能够更好的体验，本应用需要获取你的基本信息（昵称、头像等）</view>
		</view>
		<view class="container">
			<button @getuserinfo="getUserInfo" open-type="getUserInfo" type="primary">授权</button>
		</view>
	</div>
</template>

<script>
	export default {
		name: 'auth',
		data() {
			return {
				userInfo: null
			};
		},
		onLoad: function(options) {},
		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload: function() {
			uni.$emitter.emit('sys.getUserInfo.result', this.userInfo);
		},
		methods: {
			/**
			 * 获取用户信息
			 */
			getUserInfo: function(e) {
				if (e.detail.userInfo) {
					this.userInfo = e.detail;
					uni.navigateBack();
				}
			}
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.auth {}

	.avatar {
		display: block;
		text-align: center;
		background: #ccc;
		color: #fff;
		white-space: nowrap;
		position: relative;
		overflow: hidden;
		width: 128upx;
		height: 128upx;
		line-height: 128upx;
		border-radius: 64upx;
		font-size: 72px;
		margin: 0 auto;
	}

	.nickname {
		display: block;
		text-align: center;
		font-weight: bold;
		margin-top: 32upx;
		margin-bottom: 32upx;
	}

	.tips {
		position: relative;
		padding: 15% 30upx 30upx 30upx;
	}

	.tips icon {
		display: block;
		text-align: center;
		line-height: 2rem;
	}
</style>
