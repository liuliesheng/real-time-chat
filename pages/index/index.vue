<template>
	<custom-page class="page" :loaded="loaded" :showNavbar="true" navbarBackgroundColor="bg-gradual-red">
		<mescroll-body ref="mescrollRef" :up="mescrollOptions.up" @init="mescrollInit"
		               @down="downCallback" @up="upCallback">
			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-titles text-green"></text>
					<text class="text-xl">组件</text>
				</view>
			</view>
			<view class="cu-list menu sm-border">
				<view class="cu-item">
					<view class="content" @tap="$showLoading">Loading</view>
				</view>
				<view class="cu-item">
					<view class="content" @tap="hint('这是一个默认消息')">默认提示</view>
				</view>
				<view class="cu-item">
					<view class="content" @tap="hint('这是一个信息消息','info')">信息提示</view>
				</view>
				<view class="cu-item">
					<view class="content" @tap="hintError('这是一个错误消息')">错误提示</view>
				</view>
				<view class="cu-item">
					<view class="content" @tap="hintSuccess('这是一个成功消息')">成功提示</view>
				</view>
				<view class="cu-item">
					<view class="content" @tap="hint('这是一个警告消息','warn')">警告提示</view>
				</view>
				<view class="cu-item">
					<view class="content" @tap="loaded=false">页面初始状态</view>
				</view>
			</view>

			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-titles text-green"></text>
					<text class="text-xl">基础</text>
				</view>
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
				<view class="action">
					<text class="cuIcon-titles text-green"></text>
					<text class="text-xl">社区/论坛</text>
				</view>
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
			</view>

			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-titles text-green"></text>
					<text class="text-xl">商城</text>
				</view>
			</view>
			<view class="cu-list menu sm-border">
				<view class="cu-item arrow">
					<navigator class="content" url="/pages/mall/index">首页</navigator>
				</view>
				<view class="cu-item arrow">
					<navigator class="content" url="/pages/mall/category/index">分类</navigator>
				</view>
				<view class="cu-item arrow">
					<navigator class="content" url="/pages/mall/goods/list">商品列表</navigator>
				</view>
				<view class="cu-item arrow">
					<navigator class="content" url="/pages/mall/cart/index">购物车</navigator>
				</view>
				<view class="cu-item arrow">
					<navigator class="content" url="/pages/mall/order/list">订单列表</navigator>
				</view>
			</view>

			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-titles text-green"></text>
					<text class="text-xl">用户</text>
				</view>
			</view>
			<view class="cu-list menu sm-border">
				<view class="cu-item arrow">
					<navigator class="content" url="/pages/auth/login">登录</navigator>
				</view>
				<view class="cu-item arrow">
					<navigator class="content" url="/pages/auth/register">注册</navigator>
				</view>
				<view class="cu-item arrow">
					<navigator class="content" url="/pages/auth/rest.password">修改密码</navigator>
				</view>
				<view class="cu-item arrow">
					<navigator class="content" open-type="switchTab" url="/pages/user/index">个人中心</navigator>
				</view>
			</view>
		</mescroll-body>
	</custom-page>
</template>

<script>
	// 引入mescroll-mixins.js
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import MescrollEmpty from '@/components/mescroll-uni/components/mescroll-empty.vue';
	export default {
		mixins: [MescrollMixin],
		components: {
			MescrollEmpty
		},
		data() {
			return {
				loaded: true,

				mescrollOptions: {
					up: {
						use: false
					}
				}
			};
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
			$showLoading: function() {
				this.showLoading();
				setTimeout(() => {
					this.hideLoading();
				}, 3000);
			},
			downCallback() {
				// this.mescroll.resetUpScroll();
				setTimeout(() => {
					this.mescroll.endSuccess();
				}, 1500);
			}
		}
	};
</script>

<style>
	.page {
		padding: 30rpx;
		overflow-x: hidden;
	}

	.logo {
		text-align: center;
		margin: 0 auto;
		padding: 15% 0;
	}

	.logo image {
		display: block;
		margin: 0 auto;
		width: 200rpx;
		height: 200rpx;
	}
</style>
