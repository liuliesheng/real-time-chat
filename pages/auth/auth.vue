<template>
	<custom-page class="page" :loaded="true">
		<view class="tips">
			<!-- #ifndef H5 -->
			<open-data class="avatar" type="userAvatarUrl"></open-data>
			<open-data class="nickname" type="userNickName"></open-data>
			<!-- #endif -->
			<view>为了你能够更好的体验，本应用需要获取你的基本信息（昵称、头像等）</view>
		</view>
		<view class="container">
			<button @tap="getUserInfo" type="primary">授权</button>
		</view>
	</custom-page>
</template>

<script>
	export default {
		name: 'auth',
		data() {
			return {
				userInfo: null
			};
		},

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
				uni.getUserProfile({
					lang: 'zh_CN',
					desc: '此操作需要您授权基本信息',
					success: (res) => {
						this.userInfo = res;
						uni.setStorageSync('user_profile', res.userInfo);
						uni.navigateBack();
					}
				});
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
		width: 128rpx;
		height: 128rpx;
		line-height: 128rpx;
		border-radius: 64rpx;
		font-size: 72px;
		margin: 0 auto;
	}

	.nickname {
		display: block;
		text-align: center;
		font-weight: bold;
		margin-top: 32rpx;
		margin-bottom: 32rpx;
	}

	.tips {
		position: relative;
		padding: 15% 30rpx 30rpx 30rpx;
	}

	.tips icon {
		display: block;
		text-align: center;
		line-height: 2rem;
	}
</style>
