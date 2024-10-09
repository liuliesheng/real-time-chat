<template>
	<div class="getUserInfo">
		<view class="container">
			<view class="userinfo">
				<block v-if="hasUserInfo">
					<image :src="userInfo.avatarUrl" background-size="cover" class="userinfo-avatar"></image>
					<text class="userinfo-nickname">{{ userInfo.nickName }}</text>
				</block>
			</view>
			<button @tap="getUserInfo">获取头像昵称</button>
			<view class="usermotto" v-if="hasUserInfo">
				<view class="user-motto">{{ userInfoStr }}</view>
			</view>
		</view>
	</div>
</template>

<script>
export default {
	name: 'getUserInfo',
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
		uni.$sys.getUserInfo().then(res => {
			this.userInfo = res;
			this.userInfoStr = JSON.stringify(res);
			this.hasUserInfo = true;
		});
	},

	methods: {
		getUserInfo: function() {
			uni.$sys.getUserInfo({
				force: true, //强制获取
				success: res => {
					this.setData({
						userInfo: res,
						userInfoStr: JSON.stringify(res),
						hasUserInfo: true
					});
				}
			});
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.getUserInfo {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
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

	.usermotto {
		margin-top: 100px;
		word-break: break-all;
	}
</style>
