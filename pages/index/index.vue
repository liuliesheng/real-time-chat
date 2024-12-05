<template>
	<view class="index">
		<view class="logo">
			<image src="/static/logo.png" @tap="loadModal=true" />
		</view>

		<button type="default" @tap="loadData">Hello world</button>

		<loading/>
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
	page {
		background-color: white;
	}

	.index {}


	.logo {
		text-align: center;
		margin-bottom: 60upx;
		margin-top: 60upx;
	}

	.logo image {
		display: block;
		margin: 0 auto;
		border-radius: 50%;
		width: 300upx;
		height: 300upx;
	}
</style>
