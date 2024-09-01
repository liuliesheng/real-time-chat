<template>
	<view>
		<view class="list">
			<view class="list-header">基础</view>
			<view class="list-item"><navigator url="/pages/examples/timer">计时器</navigator></view>
			<view class="list-item"><navigator url="/pages/examples/listener/a">监听器</navigator></view>
			<view class="list-item"><navigator url="/pages/examples/getUserInfo">获取用户信息</navigator></view>
			<view class="list-item"><navigator url="/pages/examples/feedback">意见反馈</navigator></view>
			<view class="list-item"><navigator url="/pages/examples/feedback">文件上传</navigator></view>
		</view>

		<view class="list">
			<view class="list-header">用户</view>
			<view class="list-item"><navigator url="/pages/user/login">登录</navigator></view>
			<view class="list-item"><navigator url="/pages/user/register">注册</navigator></view>
			<view class="list-item"><navigator url="/pages/user/repassword">修改密码</navigator></view>
			<view class="list-item"><navigator url="/pages/user/settings">设置</navigator></view>
			<view class="list-item"><navigator open-type="switchTab" url="/pages/user/index">个人中心</navigator></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	onLoad() {
		uni.$.sys.getUserInfo().then(console.log);

		const data = [];
		// for (let i = 0; i < 1000000; i++) {
		// 	data.push({
		// 		id: i,
		// 		title: '来了，老弟！！！',
		// 		content: '百壶载酒游凌云，醉中挥袖别故人。\n' +
		// 			'依依向我不忍别，谁似峨嵋半轮月？\n' +
		// 			'月窥船窗挂凄冷，欲到渝州酒初醒。\n' +
		// 			'江空袅袅钓丝风，人静翩翩葛巾影。\n' +
		// 			'哦诗不睡月满船，清寒入骨我欲仙。\n' +
		// 			'人间更漏不到处，时有沙禽背船去。'
		// 	});
		// }
		// const result = wx.arr2obj('data', data);
		// this.setData(result);
	},
	methods: {}
};
</script>

<style>
	.logo{
		text-align: center;
		margin-bottom: 60upx;
	}

	.logo image{
		display: block;
		margin: 0 auto;
		border-radius: 50%;
		width: 100upx;
		height: 100upx;
	}

	.list{
		margin-top: 0;
	}

	.list navigator {
		color: inherit;
	}

	.list-header {
	    background-color: #efefef;
		padding: 10upx 30upx;
	}

</style>
