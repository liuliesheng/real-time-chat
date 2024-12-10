<template>
	<view class="index">
		<loading1/>
		<hint1/>

		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">组件</view>
		</view>
		<view class="cu-list menu sm-border">
			<view class="cu-item">
				<view class="content" @tap="loadData">Loading</view>
			</view>
			<view class="cu-item">
				<view class="content" @tap="hintError('这是一个警告消息')">警告提示</view>
			</view>
			<view class="cu-item">
				<view class="content" @tap="hintSuccess('这是一个成功消息')">成功提示</view>
			</view>
		</view>

		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">基础</view>
		</view>
		<view class="cu-list menu sm-border">
			<view class="cu-item arrow">
				<navigator class="content" url="/pages/examples/timer">计时器</navigator>
			</view>
			<view class="cu-item arrow">
				<navigator class="content" url="/pages/examples/listener/a">监听器</navigator>
			</view>
			<view class="cu-item arrow">
				<navigator class="content" url="/pages/examples/getUserInfo">获取用户信息</navigator>
			</view>
			<view class="cu-item arrow">
				<navigator class="content" url="/pages/examples/feedback">意见反馈</navigator>
			</view>
			<view class="cu-item arrow">
				<navigator class="content" url="/pages/examples/upload">文件上传</navigator>
			</view>
		</view>

		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">社区/论坛</view>
		</view>
		<view class="cu-list menu sm-border">
			<view class="cu-item arrow">
				<navigator class="content" url="/pages/forum/index">首页</navigator>
			</view>
			<view class="cu-item arrow">
				<navigator class="content" url="/pages/forum/category">分类</navigator>
			</view>
			<view class="cu-item arrow">
				<navigator class="content" url="/pages/forum/posts-list">文章列表</navigator>
			</view>
			<view class="cu-item arrow">
				<navigator class="content" url="/pages/forum/posts-create">发布文章</navigator>
			</view>
			<!-- 			<view class="cu-item arrow">
				<navigator class="content" url="/pages/forum/posts-detail">文章详情</navigator>
			</view> -->
		</view>

		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">商城</view>
		</view>
		<view class="cu-list menu sm-border">
			<view class="cu-item arrow">
				<navigator class="content" url="/pages/mall/index">首页</navigator>
			</view>
			<view class="cu-item arrow">
				<navigator class="content" url="/pages/mall/category">分类</navigator>
			</view>
			<view class="cu-item arrow">
				<navigator class="content" url="/pages/mall/goods-list">商品列表</navigator>
			</view>
			<!-- 			<view class="cu-item arrow">
				<navigator  class="content" url="/pages/mall/goods-detail">商品详情</navigator>
			</view> -->
			<view class="cu-item arrow">
				<navigator class="content" url="/pages/mall/shopping-cart">购物车</navigator>
			</view>
			<!-- 			<view class="cu-item arrow">
				<navigator  class="content" url="/pages/mall/order-create">下单</navigator>
			</view> -->
			<view class="cu-item arrow">
				<navigator class="content" url="/pages/mall/order-list">订单列表</navigator>
			</view>
			<!-- 			<view class="cu-item arrow">
				<navigator  class="content" url="/pages/mall/order-detail">订单详情</navigator>
			</view> -->
		</view>

		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">用户</view>
		</view>
		<view class="cu-list menu sm-border">
			<view class="cu-item arrow">
				<navigator class="content" url="/pages/auth/login">登录</navigator>
			</view>
			<view class="cu-item arrow">
				<navigator class="content" url="/pages/auth/register">注册</navigator>
			</view>
			<view class="cu-item arrow">
				<navigator class="content" url="/pages/user/repassword">修改密码</navigator>
			</view>
			<view class="cu-item arrow">
				<navigator class="content" url="/pages/user/settings">设置</navigator>
			</view>
			<view class="cu-item arrow">
				<navigator class="content" open-type="switchTab" url="/pages/user/index">个人中心</navigator>
			</view>
		</view>
	</view>
</template>

<script>
import hint1 from '@/components/hint';
import loading1 from '@/components/loading';

export default {
	components: {
		hint1,
		loading1
	},
	data() {
		return {};
	},
	onLoad() {
		// const data = [];
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
	methods: {
		loadData: function() {
			this.showLoading();
			setTimeout(() => {
				this.hideLoading();
			}, 3000);
		}
	}
};
</script>

<style>
	.index {
	}
</style>
