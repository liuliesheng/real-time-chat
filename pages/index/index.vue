<template>
	<view class="index">
		<view class="logo">
			<image src="/static/logo.png" @tap="loadModal=true"/>
		</view>

		<navigator class="cu-btn bg-blue round lg shadow margin-top" style="display: block;line-height: 40px;"
				url="/pages/index/examples">查看示例</navigator>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	onLoad() {
	},
	methods: {

	}
};
</script>

<style>
	page {
		background-color: white;
	}

	.index {
		padding: 30upx;
		overflow-x: hidden;
	}

	.logo {
		text-align: center;
		margin:0 auto;
		padding: 15% 0;
	}

	.logo image {
		display: block;
		margin: 0 auto;
		width: 200upx;
		height: 200upx;
	}
</style>
